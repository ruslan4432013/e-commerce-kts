import { clientConfig as config } from "_webpack/client.config";
import { RequestHandler } from "express";
import webpack from "webpack";
import devMiddleware from "webpack-dev-middleware";
import hotMiddleware from "webpack-hot-middleware";

const compiler: webpack.Compiler = webpack({ ...config, mode: "development" });

export const devMiddlewareInstance = devMiddleware(compiler, {
  serverSideRender: true,
  writeToDisk: true,
  publicPath:
    config.output && config.output.publicPath
      ? String(config.output.publicPath)
      : "/",
});

export function hotReload(): RequestHandler[] {
  // as any - вынужденная мера, hotMiddleware принимает тип из @types/webpack,
  // а не те, которые идут с вебпаком
  return [devMiddlewareInstance, hotMiddleware(compiler as any)];
}

export default hotReload;
