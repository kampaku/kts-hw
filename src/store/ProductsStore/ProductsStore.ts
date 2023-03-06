import { urls } from "@config/urls";
import { normalizeProduct, ProductApi, ProductModel } from "@store/models";
import { rootStore } from "@store/RootStore/instance";
import { Meta } from "@utils/meta";
import axios from "axios";
import {
  makeObservable,
  computed,
  observable,
  action,
  runInAction,
  IReactionDisposer,
  reaction,
} from "mobx";

type PrivateFields = "_list" | "_page" | "_meta" | "_qpReaction";

export class ProductsStore {
  private _list: ProductModel[] = [];
  private _page: number = 0;
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<ProductsStore, PrivateFields>(this, {
      _list: observable.ref,
      _page: observable,
      _meta: observable,
      _qpReaction: action,
      list: computed,
      meta: computed,
      getProductList: action,
      reset: action,
    });
  }

  get list() {
    return this._list;
  }

  get meta() {
    return this._meta;
  }

  getProductList = async (count = 20, limit = 20) => {
    this._meta = Meta.loading;
    this._page += 1;

    const response = await axios.get<ProductApi[]>(
      urls.products({
        offset: this._page * count,
        limit,
        title: rootStore.query.getParam("search")?.toString() || "",
      })
    );

    runInAction(() => {
      if (response.status === 200) {
        this._list = [...this._list, ...response.data.map(normalizeProduct)];
        this._meta = Meta.success;
        return;
      }
      this._meta = Meta.error;
      this._list = [];
    });
  };

  reset = () => {
    this._list = [];
    this._page = 0;
  };

  private readonly _qpReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam("search"),
    async (search) => {
      this.reset();
      await this.getProductList(0);
    }
  );

  destroy() {
    this._qpReaction();
  }
}
