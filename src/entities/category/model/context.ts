import { createContext } from "react";

import { CategoryListStore } from "./store";

export const CategoryListStoreContext = createContext<null | CategoryListStore>(
  null
);

export const { Provider } = CategoryListStoreContext;
