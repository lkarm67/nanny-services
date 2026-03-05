import type { Nanny } from "../types/nannies";

export const formatKey = (nanny: Nanny) =>
  `${nanny.name}-${nanny.location}-${nanny.price_per_hour}`;