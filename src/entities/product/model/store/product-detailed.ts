import { Meta, Product, productsApi } from "@shared/api";
import { ILocalStore } from "@shared/lib";
import { makeAutoObservable, runInAction } from "mobx";

export class ProductDetailedStore implements ILocalStore {
  private _meta: Meta = Meta.INITIAL;

  private _product: Product | null = null;

  constructor(private _productId: string) {
    makeAutoObservable(this, {}, { autoBind: true, deep: false });
    this.init(_productId);
  }

  get meta() {
    return this._meta;
  }

  get product() {
    return this._product;
  }

  public async load(productId: string | number) {
    if (this._meta === Meta.LOADING) return;
    this.setMeta(Meta.LOADING);
    try {
      const productResponse = await productsApi.getProductById({ productId });
      runInAction(() => {
        this._product = productResponse;
        this.setMeta(Meta.SUCCESS);
      });
    } catch {
      this.setMeta(Meta.ERROR);
    }
  }

  public init(productId: string | number) {
    this.load(productId);
  }

  private setMeta(meta: Meta) {
    this._meta = meta;
  }

  destroy(): void {}
}
