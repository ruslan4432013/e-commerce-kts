import type { ReactNode } from "react";

import { hooks } from "@shared/lib";

import { ProductStoreContext } from "./context";
import { ProductPageStore } from "./store";

type Props = {
  children?: ReactNode;
};

export const ProductSessionProvider = ({ children }: Props) => {
  const store = hooks.useLocalStore(() => new ProductPageStore());
  return (
    <ProductStoreContext.Provider value={store}>
      {children}
    </ProductStoreContext.Provider>
  );
};
