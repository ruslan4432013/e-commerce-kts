import { createContext } from "react";

import { ProductPageStore } from "./store";

export const ProductStoreContext = createContext<null | ProductPageStore>(null);
