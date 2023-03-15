export const API_URL = "https://api.escuelajs.co/api/v1";
export { ROUTE_CONSTANTS } from "./routes";
export const isServer: boolean = !(typeof window !== "undefined");

export const APP_NAME = "App Name";

export const USE_SERVICE_WORKER: boolean = false;

export const PAGE_NAMES = {
  ABOUT: "About",
  FETCH: "Fetch",
  HOME: "Home",
  PAGE_NOT_FOUND: "Page Not Found",
};

export const NOT_FOUND_TEXT = "Wrong page, sorry...";

export const OFFLINE_TEXT = "Offline";
