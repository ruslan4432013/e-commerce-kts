import { ChunkExtractor } from "@loadable/server";
import { IS_RENDER_TO_STREAM } from "@server/constants";
import { getHtmlTemplate } from "@server/template";
import { ROUTE_CONSTANTS } from "@shared/config";
import { App } from "@src/app";
import { Request, Response, RequestHandler } from "express";
import { renderToPipeableStream, renderToString } from "react-dom/server";
import { HelmetProvider, FilledContext } from "react-helmet-async";
import { StaticRouter } from "react-router-dom/server";

const serverRenderer =
  (chunkExtractor: ChunkExtractor): RequestHandler =>
  async (req: Request, res: Response) => {
    const isPageAvailable = (
      Object.values(ROUTE_CONSTANTS) as string[]
    ).includes(req.path);

    if (!isPageAvailable) {
      req.url = ROUTE_CONSTANTS.NOT_FOUND;
    }

    const location: string = req.url;

    const helmetContext = {};

    const jsx = (
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={location}>
          <App />
        </StaticRouter>
      </HelmetProvider>
    );

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
          console.error(err);
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

export { serverRenderer };
