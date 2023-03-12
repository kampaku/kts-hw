import { urls } from "@config/urls";
import { ProductModel } from "@store/models";
import { ProductsStore } from "@store/ProductsStore";
import { Meta } from "@utils/meta";
import { ILocalStore } from "@utils/useLocalStore";
import axios from "axios";
import {
  makeObservable,
  computed,
  observable,
  action,
  runInAction,
} from "mobx";

type PrivateFields = "_product" | "_meta" | "_productsStore";

export class ProductDetailsStore implements ILocalStore {
  private _product: ProductModel | null = null;
  private _meta: Meta = Meta.initial;
  private _productsStore = new ProductsStore();

  constructor() {
    makeObservable<ProductDetailsStore, PrivateFields>(this, {
      _product: observable,
      _meta: observable,
      _productsStore: observable,
      product: computed,
      meta: computed,
      relatedProducts: computed,
      getProduct: action,
      init: action,
      destroy: action,
    });
  }

  get product() {
    return this._product;
  }

  get meta() {
    return this._meta;
  }

  get relatedProducts() {
    return this._productsStore.list;
  }

  init = async (id: string) => {
    this.destroy();
    this.getProduct(id);
    this._productsStore.getProductList({ count: 0, limit: 3 });
  };

  getProduct = async (id: string) => {
    this._product = null;
    this._meta = Meta.loading;

    const response = await axios.get(urls.product(id));

    runInAction(() => {
      if (response.status === 200) {
        this._product = response.data;
        this._meta = Meta.success;
        return;
      }
      this._meta = Meta.error;
    });
  };

  destroy() {
    this._product = null;
    this._productsStore?.destroy();
  }
}
