import * as React from "react";

import { ChunkExtractor } from "@loadable/server";
import { createStaticHandler } from "@remix-run/router";
import { IS_RENDER_TO_STREAM } from "@server/constants";
import { getHtmlTemplate } from "@server/template";
import { routes } from "@src/app";
import { ROUTE_CONSTANTS } from "@src/shared/config";
import { Request as ExRequest, Response, RequestHandler } from "express";
import type * as express from "express";
import { renderToPipeableStream, renderToString } from "react-dom/server";
import ReactDOMServer from "react-dom/server";
import { HelmetProvider, FilledContext } from "react-helmet-async";
import { StaticRouter } from "react-router-dom/server";
import {
  createStaticRouter,
  StaticRouterProvider,
} from "react-router-dom/server";

const serverRenderer =
  (chunkExtractor: ChunkExtractor): RequestHandler =>
  async (req: ExRequest, res: Response) => {
    const isPageAvailable = (
      Object.values(ROUTE_CONSTANTS) as string[]
    ).includes(req.path);

    if (!isPageAvailable) {
      req.url = ROUTE_CONSTANTS.NOT_FOUND;
    }
    const helmetContext = {};
    const jsx = await render(req);
    if (IS_RENDER_TO_STREAM) {
      const { helmet } = helmetContext as FilledContext;

      const { header, footer } = getHtmlTemplate({
        helmetData: helmet,
        scriptTags: chunkExtractor.getScriptTags({
          nonce: res.locals.cspNonce,
        }),
        styleTags: chunkExtractor.getStyleTags(),
        nonce: res.locals.cspNonce,
      });

      res.write(header);
      let didError = false;
      const stream = renderToPipeableStream(jsx, {
        onShellReady() {
          res.statusCode = didError ? 500 : 200;
          stream.pipe(res);
        },
        onAllReady() {
          res.end(footer);
        },
        onError(err) {
          didError = true;
        },
      });
    } else {
      const reactHtml = renderToString(jsx);
      const { helmet } = helmetContext as FilledContext;

      const { header, footer } = getHtmlTemplate({
        helmetData: helmet,
        scriptTags: chunkExtractor.getScriptTags(),
        styleTags: chunkExtractor.getStyleTags(),
        nonce: res.locals.cspNonce,
      });

      res.send(header + reactHtml + footer);
    }
  };

export async function render(request: express.Request) {
  let { query, dataRoutes } = createStaticHandler(routes);
  let remixRequest = createFetchRequest(request);
  let context = await query(remixRequest);
  if (context instanceof Response) {
    throw context;
  }

  let router = createStaticRouter(dataRoutes, context);
  return (
    <React.StrictMode>
      <StaticRouterProvider
        router={router}
        context={context}
        nonce="the-nonce"
      />
    </React.StrictMode>
  );
}

export function createFetchHeaders(
  requestHeaders: express.Request["headers"]
): Headers {
  let headers = new Headers();

  for (let [key, values] of Object.entries(requestHeaders)) {
    if (values) {
      if (Array.isArray(values)) {
        for (let value of values) {
          headers.append(key, value);
        }
      } else {
        headers.set(key, values);
      }
    }
  }

  return headers;
}

export function createFetchRequest(req: express.Request): Request {
  let origin = `${req.protocol}://${req.get("host")}`;
  // Note: This had to take originalUrl into account for presumably vite's proxying
  let url = new URL(req.originalUrl || req.url, origin);

  let controller = new AbortController();

  req.on("close", () => {
    controller.abort();
  });

  let init: RequestInit = {
    method: req.method,
    headers: createFetchHeaders(req.headers),
    signal: controller.signal,
  };

  if (req.method !== "GET" && req.method !== "HEAD") {
    init.body = req.body;
  }

  return new Request(url.href, init);
}

export { serverRenderer };
