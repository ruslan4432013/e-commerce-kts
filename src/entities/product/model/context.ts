import { createContext } from "react";

import { ProductListStore, ProductDetailedStore } from "./store";

export const ProductListStoreContext = createContext<null | ProductListStore>(
  null
);
export const ProductStoreContext = createContext<null | ProductDetailedStore>(
  null
);

export const { Provider: ProductListProvider } = ProductListStoreContext;
export const { Provider: ProductProvider } = ProductStoreContext;
