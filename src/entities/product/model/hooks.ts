import { useContext } from "react";

import { ProductListStoreContext, ProductStoreContext } from "./context";

export const useProductListStore = () => {
  const store = useContext(ProductListStoreContext);
  if (!store) {
    throw new Error("Product List Store has not been installed");
  }
  return store;
};

export const useProductStore = () => {
  const store = useContext(ProductStoreContext);
  if (!store) {
    throw new Error("Product Store has not been installed");
  }
  return store;
};
