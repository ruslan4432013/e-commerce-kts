import { randomUUID } from "crypto";

import { IS_DEV } from "_webpack/constants";
import { Response, Request, NextFunction } from "express";
import helmet from "helmet";

const nonce = (_req: Request, res: Response, next: NextFunction): void => {
  res.locals.cspNonce = Buffer.from(randomUUID()).toString("base64");
  next();
};

const csp = (req: Request, res: Response, next: NextFunction): void => {
  const middleware = helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        defaultSrc: ["'self'", "api.escuelajs.co"],
        imgSrc: ["'self'", "api.escuelajs.co"],
        scriptSrc: [
          "'self'",
          `'nonce-${(<Response>res).locals.cspNonce}'`,
          IS_DEV ? "'unsafe-eval'" : "",
        ],
      },
    },
    crossOriginEmbedderPolicy: { policy: "credentialless" },
    noSniff: false,
    originAgentCluster: false,
  });

  return middleware(req, res, next);
};

export { nonce, csp };
