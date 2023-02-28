import { useContext } from "react";

import { CategoryListStoreContext } from "./context";

export const useCategoryListStore = () => {
  const store = useContext(CategoryListStoreContext);
  if (!store) {
    throw new Error("Category List Store has not been installed");
  }
  return store;
};
