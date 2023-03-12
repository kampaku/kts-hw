import { action, computed, makeObservable, observable } from "mobx";
import * as qs from "qs";

type PrivateFields = "_params";

export class QueryParamsStore {
  private _params: qs.ParsedQs = {};
  private _search: string = "";

  constructor() {
    makeObservable<QueryParamsStore, PrivateFields>(this, {
      _params: observable.ref,
      setSearch: action,
      params: computed,
      setParam: action,
    });
  }

  get params() {
    return qs.stringify(this._params);
  }

  get search() {
    return this._search;
  }

  getParam(
    key: string
  ): undefined | string | string[] | qs.ParsedQs | qs.ParsedQs[] {
    return this._params[key];
  }

  setParam = (key: string, value: string) => {
    if (this._params[key] === value) {
      return;
    }
    this._params = {
      ...this._params,
      [key]: value,
    };
  };

  setSearch(search: string) {
    search = search.startsWith("?") ? search.slice(1) : search;
    if (this._search !== search) {
      this._search = search;
      this._params = qs.parse(search);
    }
  }
}
