import path from "path";

import "cross-fetch/polyfill";
import { ChunkExtractor } from "@loadable/server";
import { IS_RENDER_TO_STREAM, SERVER_PORT } from "@server/constants";
import { serverRenderer, nonce } from "@server/middlewares";
import { DIST_DIR, IS_DEV, SRC_DIR } from "_webpack/constants";
import compression from "compression";
import cookieParser from "cookie-parser";
import express, { RequestHandler } from "express";

const { PORT = SERVER_PORT } = process.env;

const runServer = (hotReload?: () => RequestHandler[]) => {
  const app = express();
  const statsFile = path.resolve("./dist/stats.json");
  const chunkExtractor = new ChunkExtractor({ statsFile });

  app
    .use(nonce)
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

  app.get("/*", serverRenderer(chunkExtractor));

  app.listen(PORT, () => {
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
