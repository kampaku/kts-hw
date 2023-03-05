import { urls } from "@config/urls";
import { ProductModel } from "@store/models";
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

type PrivateFields = "_product" | "_meta";

export class ProductDetailsStore implements ILocalStore {
  private _product: ProductModel | null = null;
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<ProductDetailsStore, PrivateFields>(this, {
      _product: observable,
      _meta: observable,
      product: computed,
      meta: computed,
      getProduct: action,
    });
  }

  get product() {
    return this._product;
  }

  get meta() {
    return this._meta;
  }

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

  destroy() {}
}
