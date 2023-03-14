import type { ProductPageStore } from "@features/product-session";
import { Category, categoryApi, Meta } from "@shared/api";
import {
  collection,
  type CollectionModel,
  filterUniqueByKey,
  type ILocalStore,
} from "@shared/lib";
import { makeAutoObservable, runInAction } from "mobx";

type PrivateFields = "_root";

export class CategoryListStore implements ILocalStore {
  private _meta: Meta = Meta.INITIAL;

  private _categories: CollectionModel<number, Category> =
    collection.getInitialCollectionModel();

  private _currentCategory: null | Category = null;

  private _root: ProductPageStore;
  constructor(root: ProductPageStore) {
    makeAutoObservable<this, PrivateFields>(
      this,
      { _root: false },
      { autoBind: true, deep: false }
    );
    this._root = root;
    this.init();
  }

  get meta() {
    return this._meta;
  }

  get currentCategory() {
    return this._currentCategory;
  }

  get categories() {
    return collection.linearizeCollection(this._categories);
  }

  public setCurrentCategory(categoryId: number | null) {
    this._currentCategory = categoryId
      ? this._categories.entities[categoryId]
      : null;
  }

  public async load() {
    if (this._meta === Meta.LOADING) return;
    this.setMeta(Meta.LOADING);
    try {
      const categoryResponse = await categoryApi.getCategoryList();
      runInAction(() => {
        this._categories = collection.normalizeCollection(
          filterUniqueByKey(categoryResponse, "name"),
          (category) => category.id
        );
        this.setMeta(Meta.SUCCESS);
      });
    } catch {
      this.setMeta(Meta.ERROR);
    }
  }

  public init() {
    this.load();
  }

  private setMeta(meta: Meta) {
    this._meta = meta;
  }

  destroy(): void {}
}
