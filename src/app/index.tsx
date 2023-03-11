import "@shared/styles/globals.scss";
import "@shared/config/configureMobX";
import { ProductDetailedPage } from "@pages/product-detailed";
import { ProductsPage } from "@pages/products";
import type { RouteObject } from "react-router-dom";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <ProductsPage />,
  },
  {
    path: "/product/:productId",
    element: <ProductDetailedPage />,
  },
];
