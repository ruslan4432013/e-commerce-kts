import { ProductDetailedPage } from "@pages/product-detailed";
import { ProductsPage } from "@pages/products";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ProductsPage />,
  },
  {
    path: "/product/:productId",
    element: <ProductDetailedPage />,
  },
]);
