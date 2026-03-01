import { useSearchParams } from "react-router-dom";
import { SortType, PriceFilterType, type NannyQuery } from "../types/filters";

export const useNanniesQuery = (): [
  NannyQuery,
  (updates: Partial<NannyQuery>) => void
] => {
  const [params, setParams] = useSearchParams();

  const query: NannyQuery = {
    sort: (params.get("sort") as SortType) ?? SortType.A_TO_Z,
    price: (params.get("price") as PriceFilterType) ?? PriceFilterType.ALL,
    page: Number(params.get("page")) || 1,
  };

  const updateQuery = (updates: Partial<NannyQuery>) => {
    const newParams = new URLSearchParams(params);

    Object.entries(updates).forEach(([key, value]) => {
      newParams.set(key, String(value));
    });

    setParams(newParams);
  };

  return [query, updateQuery];
};