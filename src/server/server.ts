import path from "path";

import "cross-fetch/polyfill";
import { ChunkExtractor } from "@loadable/server";
import { render, serverRenderer } from "@server/middlewares/serverRenderer";
import { DIST_DIR, IS_DEV, SRC_DIR } from "_webpack/constants";
import compression from "compression";
import cookieParser from "cookie-parser";
import express, { RequestHandler } from "express";

import { IS_RENDER_TO_STREAM, SERVER_PORT } from "./constants";

const { PORT = SERVER_PORT } = process.env;

const runServer = (hotReload?: () => RequestHandler[]) => {
  const app = express();
  const statsFile = path.resolve("./dist/stats.json");
  const chunkExtractor = new ChunkExtractor({ statsFile });

  app
    .use(express.json())
    .use(compression())
    .use(express.static(path.resolve(DIST_DIR)))
    .use(cookieParser());

  if (IS_DEV) {
    if (hotReload) {
      app.get("/*", [...hotReload()]);
    }
  } else {
    app.get("/sw.js", (_req, res) => {
      res.sendFile(path.join(SRC_DIR, "sw.js"));
    });
  }

  app.use("/*", async (req, res) => {
    let url = req.originalUrl;

    try {
      let html = template.replace("<!--app-html-->", render(url as any));
      res.setHeader("Content-Type", "text/html");
      return res.status(200).end(html);
    } catch (error) {
      res.status(500).end("ERROR");
    }
  });

  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(
      `App listening on port ${PORT}! (render to ${
        IS_RENDER_TO_STREAM ? "stream" : "string"
      })`
    );
  });
};

if (IS_DEV) {
  (async () => {
    const { hotReload, devMiddlewareInstance } = await import(
      "./middlewares/hotReload"
    );
    devMiddlewareInstance.waitUntilValid(() => {
      runServer(hotReload);
    });
  })();
} else {
  runServer();
}
