import { Meta, Product, productsApi } from "@shared/api";
import { GetProductsListParams } from "@shared/api/products";
import { collection, CollectionModel, ILocalStore } from "@shared/lib";
import { getInitialCollectionModel } from "@shared/lib/collection";
import { makeAutoObservable, runInAction } from "mobx";

const PRODUCTS_LIMIT = 10;

export class ProductListStore implements ILocalStore {
  private _meta: Meta = Meta.INITIAL;
  private _list: CollectionModel<number, Product> = getInitialCollectionModel();

  private _qParam = "";

  private _categoryId: null | string = null;

  private _hasMore = true;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true, deep: false });
  }

  get meta() {
    return this._meta;
  }

  get hasMore() {
    return this._hasMore;
  }

  get products() {
    return collection.linearizeCollection(this._list);
  }

  public setCategoryId(categoryId?: string | null) {
    this._categoryId = categoryId || null;
  }

  public setTitle(title: string) {
    this._qParam = title;
  }

  private _setHasMore(val: boolean) {
    this._hasMore = val;
  }

  private _setProducts(products: Product[]) {
    this._list = collection.normalizeCollection(
      products,
      (product) => product.id
    );
  }

  private _setMeta(meta: Meta) {
    this._meta = meta;
  }

  public async load(outParams: GetProductsListParams) {
    const { categoryId, title, ...other } = outParams;
    const params: GetProductsListParams = {
      ...(categoryId && { categoryId }),
      ...(title && { title }),
      ...other,
    };
    this._setMeta(Meta.LOADING);
    try {
      if (!params.limit) {
        params.limit = PRODUCTS_LIMIT;
      }
      const productsResponse = await productsApi.getProductsList(params);
      runInAction(() => {
        if (productsResponse.length < PRODUCTS_LIMIT) {
          this._setHasMore(false);
        } else {
          this._setHasMore(true);
        }
        if (!params.offset || params.offset === 0) {
          this._setProducts(productsResponse);
        } else {
          const currentList = collection.linearizeCollection(this._list);
          this._setProducts([...currentList, ...productsResponse]);
        }

        this._setMeta(Meta.SUCCESS);
      });
    } catch {
      this._setMeta(Meta.ERROR);
    }
  }

  public init() {
    const offset = 0;
    const limit = PRODUCTS_LIMIT;
    const title = this._qParam;
    const categoryId = this._categoryId;
    this.clearList();
    this.load({ offset, limit, title, categoryId });
  }

  public clearList() {
    this._list = collection.getInitialCollectionModel();
  }

  public destroy() {
    this._qParam = "";
    this.clearList();
  }

  public async loadMore() {
    const limit = PRODUCTS_LIMIT;
    const offset = this._list.order.length + PRODUCTS_LIMIT;
    const title = this._qParam || null;
    const categoryId = this._categoryId || null;
    await this.load({ limit, offset, title, categoryId });
  }
}
