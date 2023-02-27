import "@styles/globals.scss";
import { router } from "@pages/index";
import { RouterProvider } from "react-router-dom";

export function App() {
  return <RouterProvider router={router} />;
}
