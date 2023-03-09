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

type PrivateFields =
  | "_list"
  | "_page"
  | "_meta"
  | "_qpReaction"
  | "_reset"
  | "_hasMore"
  | "_search";

export class ProductsStore {
  private _list: ProductModel[] = [];
  private _page: number = 0;
  private _meta: Meta = Meta.initial;
  private _hasMore = true;
  private _search = "";

  constructor() {
    makeObservable<ProductsStore, PrivateFields>(this, {
      _list: observable.ref,
      _page: observable,
      _meta: observable,
      _hasMore: observable,
      _search: observable,
      _qpReaction: action,
      list: computed,
      meta: computed,
      hasMore: computed,
      getProductList: action,
      _reset: action,
    });
  }

  get hasMore() {
    return this._hasMore;
  }

  get list() {
    return this._list;
  }

  get meta() {
    return this._meta;
  }

  getProductList = async (count = 20, limit = 20) => {
    this._meta = Meta.loading;

    try {
      const response = await axios.get<ProductApi[]>(urls.products(), {
        params: {
          offset: this._page * count,
          limit,
          title: this._search,
        },
      });
      runInAction(() => {
        if (response.status === 200) {
          this._page += 1;
          this._list = [...this._list, ...response.data.map(normalizeProduct)];
          this._meta = Meta.success;
          if (response.data.length === 0) {
            this._hasMore = false;
          }
          return;
        }
        this._meta = Meta.error;
        this._list = [];
      });
    } catch (error) {
      this._meta = Meta.error;
    }
  };

  private _reset = () => {
    this._list = [];
    this._page = 0;
    this._hasMore = true;
  };

  private readonly _qpReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam("search"),
    (search) => {
      this._reset();
      this._search = search?.toString() ?? "";
      this.getProductList();
    }
  );

  destroy() {
    this._reset();
    this._qpReaction();
  }
}
