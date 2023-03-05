import { QueryParamsStore } from "./QueryParamsStore";

export class RootStore {
  readonly query = new QueryParamsStore();
}
