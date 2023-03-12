import { useEffect } from "react";

import { autorun } from "mobx";
import { useLocation, useSearchParams } from "react-router-dom";

import { rootStore } from "../instance";

export const useQueryParamsStoreInit = (): void => {
  const { search } = useLocation();
  const [, setParam] = useSearchParams();

  useEffect(() => {
    autorun(() => {
      setParam(rootStore.query.params);
    });
    rootStore.query.setSearch(search);
  }, []);
};
