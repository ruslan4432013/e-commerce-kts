import { useContext } from "react";

import { ProductStoreContext } from "./context";

export const useProductStore = () => {
  const store = useContext(ProductStoreContext);
  if (!store) {
    throw new Error("Product Store has not been installed");
  }

  return store;
};
