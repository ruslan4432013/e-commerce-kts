import { useEffect } from "react";

import { categoryModel } from "@entities/category";
import { productModel } from "@entities/product";
import { hooks } from "@shared/lib";
import { Catalog } from "@widgets/catalog";
import { Header } from "@widgets/header";

export const ProductsPage = () => {
  const productListStore = hooks.useLocalStore(
    () => new productModel.store.ProductListStore()
  );
  const categoryListStore = hooks.useLocalStore(
    () => new categoryModel.store.CategoryListStore()
  );
  useEffect(() => {
    productListStore.init();
    categoryListStore.init();
  }, []);
  return (
    <productModel.context.ProductListProvider value={productListStore}>
      <categoryModel.context.Provider value={categoryListStore}>
        <div>
          <Header />
          <Catalog />
        </div>
      </categoryModel.context.Provider>
    </productModel.context.ProductListProvider>
  );
};
