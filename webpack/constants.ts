import path from "path";

const IS_DEV: boolean = String(process.env.NODE_ENV).trim() === "development";

const IS_PREACT: boolean = false;
const IS_SWC: boolean = true;
const DEV_SERVER_PORT: number = 8080;

const SRC_DIR: string = path.join(__dirname, "../src");
const DIST_DIR: string = path.join(__dirname, "../dist");
const SERVER_SRC_DIR: string = path.join(__dirname, "../src/server");

const SERVER_BUNDLE_NAME: string = "server";

const ALIAS: Record<string, string> = {
  "@server": `${SRC_DIR}/server`,
  "@src": `${SRC_DIR}`,
  "@shared": `${SRC_DIR}/shared`,
  "@app": `${SRC_DIR}/app`,
  "@entities": `${SRC_DIR}/entities`,
  "@pages": `${SRC_DIR}/pages`,
  "@features": `${SRC_DIR}/features`,
  "@widgets": `${SRC_DIR}/widgets`,
  "@styles": `${SRC_DIR}/shared/styles/index.scss`,
  _webpack: path.join(__dirname, "../webpack"),
};

if (IS_PREACT) {
  Object.assign(ALIAS, {
    react: "preact/compat",
    "react-dom": "preact/compat",
    "react-dom/test-utils": "preact/test-utils",
  });
}

export {
  ALIAS,
  DEV_SERVER_PORT,
  DIST_DIR,
  IS_DEV,
  IS_PREACT,
  IS_SWC,
  SERVER_BUNDLE_NAME,
  SERVER_SRC_DIR,
  SRC_DIR,
};
