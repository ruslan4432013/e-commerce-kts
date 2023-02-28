import "@shared/styles/globals.scss";
import "@shared/config/configureMobX";
import { router } from "@pages/index";
import { RouterProvider } from "react-router-dom";

export function App() {
  return <RouterProvider router={router} />;
}
