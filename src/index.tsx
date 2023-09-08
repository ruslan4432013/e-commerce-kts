import { StrictMode } from "react";

import { loadableReady } from "@loadable/component";
import { USE_SERVICE_WORKER } from "@shared/config";
import { createRoot, hydrateRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { HashRouter } from "react-router-dom";

import { App } from "./app";

if (module.hot) {
  module.hot.accept();
}

if (
  USE_SERVICE_WORKER &&
  String(process.env.NODE_ENV).trim() !== "development"
) {
  const startServiceWorkerPromise = async () => {
    const { startServiceWorker } = await import("./serviceWorker");
    startServiceWorker();
  };

  startServiceWorkerPromise();
}

const indexJSX = (
  <StrictMode>
    <HelmetProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </HelmetProvider>
  </StrictMode>
);

const container = document.getElementById("root")!;

// eslint-disable-next-line no-undef
if (NO_SSR) {
  createRoot(container).render(indexJSX);
} else {
  loadableReady(() => {
    hydrateRoot(container, indexJSX);
  });
}
