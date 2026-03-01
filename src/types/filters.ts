/* =========================
   1. DOMAIN VALUES (machine-safe)
   ========================= */

export const SortType = {
  A_TO_Z: "aToZ",
  Z_TO_A: "zToA",
  POPULAR: "popular",
  NOT_POPULAR: "notPopular",
} as const;

export type SortType = typeof SortType[keyof typeof SortType];

export const PriceFilterType = {
  ALL: "all",
  LESS_THAN_10: "lt10",
  GREATER_THAN_10: "gt10",
} as const;

export type PriceFilterType =
  typeof PriceFilterType[keyof typeof PriceFilterType];

/* =========================
   2. QUERY MODEL
   ========================= */

export interface NannyQuery {
  sort: SortType;
  price: PriceFilterType;
  page: number;
}

/* =========================
   3. FILTER OPTION (union)
   ========================= */

export type FilterOption = SortType | PriceFilterType;

/* =========================
   4. FILTER → QUERY UPDATE MAP
   ========================= */

interface QueryUpdate {
  sort?: SortType;
  price?: PriceFilterType;
}

export const filterMap: Record<FilterOption, QueryUpdate> = {
  aToZ: { sort: SortType.A_TO_Z },
  zToA: { sort: SortType.Z_TO_A },
  popular: { sort: SortType.POPULAR },
  notPopular: { sort: SortType.NOT_POPULAR },
  lt10: { price: PriceFilterType.LESS_THAN_10 },
  gt10: { price: PriceFilterType.GREATER_THAN_10 },
  all: { price: PriceFilterType.ALL },
};

/* =========================
   5. UI LABELS (presentation layer)
   ========================= */

export const filterLabels: Record<FilterOption, string> = {
  aToZ: "A to Z",
  zToA: "Z to A",
  popular: "Popular",
  notPopular: "Not popular",
  lt10: "Less than 10$",
  gt10: "Greater than 10$",
  all: "Show all",
};