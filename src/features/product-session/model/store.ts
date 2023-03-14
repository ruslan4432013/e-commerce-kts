import { CategoryListStore, categoryModel } from "@entities/category";
import { ProductListStore, productModel } from "@entities/product";
import { ILocalStore } from "@shared/lib";

export class ProductPageStore implements ILocalStore {
  public productListStore: ProductListStore;

  public categoryStore: CategoryListStore;

  constructor() {
    this.categoryStore = new categoryModel.store.CategoryListStore();
    this.productListStore = new productModel.store.ProductListStore(this);
  }

  public destroy() {
    this.categoryStore.destroy();
    this.productListStore.destroy();
  }
}
