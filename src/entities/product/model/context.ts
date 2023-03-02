import { createContext } from "react";

import { ProductDetailedStore } from "./store";

export const ProductStoreContext = createContext<null | ProductDetailedStore>(
  null
);

export const { Provider: ProductProvider } = ProductStoreContext;
