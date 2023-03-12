import { FC, ReactElement, useEffect } from "react";

import "@shared/styles/globals.scss";
import { ErrorBoundary } from "@shared/ui/error-boundary";
import { Router } from "@src/pages";
import { Offline } from "@src/shared/ui/offline";
import cn from "classnames";

const App: FC = (): ReactElement => {
  useEffect(() => {
    if (
      !window.__PRELOADED_STATE__?.theme?.theme &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      /* Empty */
    }
  }, []);

  return (
    <ErrorBoundary>
      <div className={cn("app-wrapper")}>
        <Offline />
        <Router />
      </div>
    </ErrorBoundary>
  );
};

export { App };
