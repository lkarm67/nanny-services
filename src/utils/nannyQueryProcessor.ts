import type { Nanny } from "../types/nannies";
import type { NannyQuery } from "../types/filters";
import { SortType, PriceFilterType } from "../types/filters";

export const processNannies = (
  nannies: Nanny[],
  query: NannyQuery
): Nanny[] => {
  let result = [...nannies];

  // FILTER
  if (query.price === PriceFilterType.LESS_THAN_10) {
    result = result.filter(n => n.price_per_hour < 10);
  }

  if (query.price === PriceFilterType.GREATER_THAN_10) {
    result = result.filter(n => n.price_per_hour > 10);
  }

  // SORT
  const sortMap: Record<SortType, (a: Nanny, b: Nanny) => number> = {
    [SortType.A_TO_Z]: (a, b) => a.name.localeCompare(b.name),
    [SortType.Z_TO_A]: (a, b) => b.name.localeCompare(a.name),
    [SortType.POPULAR]: (a, b) => (b.rating ?? 0) - (a.rating ?? 0),
    [SortType.NOT_POPULAR]: (a, b) => (a.rating ?? 0) - (b.rating ?? 0),
  };

  result.sort(sortMap[query.sort]);

  return result;
};