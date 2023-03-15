import { useContext } from "react";

import { ProductStoreContext } from "./context";

export const useProductStore = () => {
  const store = useContext(ProductStoreContext);
  if (!store) {
    throw new Error("Category List Store has not been installed");
  }

  return store;
};

export const useProductListStore = () => {
  const { productListStore } = useProductStore();
  return productListStore;
};

export const useCategoryListStore = () => {
  const { categoryStore } = useProductStore();
  return categoryStore;
};
