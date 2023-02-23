import { ProductDetailedPage } from "@pages/product-detailed";
import { ProductsPage } from "@pages/products";
import { productsApi } from "@shared/api";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ProductsPage />,
    loader: async () => {
      return await productsApi.getProductsList();
    },
  },
  {
    path: "/product/:productId",
    element: <ProductDetailedPage />,
    loader: async ({ params }) => {
      const productId = params.productId;
      if (productId) {
        return await productsApi.getProductById({ productId });
      }

      return null;
    },
  },
]);
