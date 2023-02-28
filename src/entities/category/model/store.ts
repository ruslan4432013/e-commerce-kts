import { Category, Meta, categoryApi } from "@shared/api";
import {
  type ILocalStore,
  collection,
  type CollectionModel,
  filterUniqueByKey,
} from "@shared/lib";
import { makeAutoObservable, runInAction } from "mobx";

export class CategoryListStore implements ILocalStore {
  private _meta: Meta = Meta.INITIAL;

  private _categories: CollectionModel<number, Category> =
    collection.getInitialCollectionModel();

  private _currentCategory: null | Category = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true, deep: false });
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
    if (categoryId) {
      this._currentCategory = this._categories.entities[categoryId];
    } else {
      this._currentCategory = null;
    }
  }

  public async load() {
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

  destroy(): void {
    this._categories = collection.getInitialCollectionModel();
  }
}
