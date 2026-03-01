import { useEffect, useMemo, useState } from "react";
import { FiltersBlock } from "../../components/FiltersBlock/FiltersBlock";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import { NannyCard } from "../../components/NannyCard/NannyCard";
import type { Nanny } from "../../types/nannies";
import {
  filterMap,
  filterLabels,
  type FilterOption,
} from "../../types/filters";

import { getNannies } from "../../services/nanniesService";
import { useNanniesQuery } from "../../hooks/useNanniesQuery";
import { processNannies } from "../../utils/nannyQueryProcessor";
import css from "./Nannies.module.css"

const Nannies: React.FC = () => {
  const [nannies, setNannies] = useState<Nanny[]>([]);

  const [selectedOption, setSelectedOption] =
    useState<FilterOption>("aToZ");

  const [query, updateQuery] = useNanniesQuery();

  useEffect(() => {
    getNannies().then(setNannies);
  }, []);

  const processed = useMemo(
    () => processNannies(nannies, query),
    [nannies, query]
  );

  const visible = processed.slice(0, query.page * 3);
  const hasMore = query.page * 3 < processed.length;

  const loadMore = () => {
    updateQuery({ page: query.page + 1 });
  };

  const handleFilterChange = (option: FilterOption) => {
    setSelectedOption(option);

    const updates = filterMap[option];

    updateQuery({
      ...updates,
      page: 1,
    });
  };

  const options = Object.keys(filterLabels) as FilterOption[];

  return (
    <div className={css.nanniesPage}>
      <FiltersBlock
        value={selectedOption}
        options={options}
        onChange={handleFilterChange}
      />

      <ul className={css.nanniesList}>
        {visible.length === 0 ? (
          <p className={css.noNanniesFound}>No nannies found for the selected filter</p>
        ) : (
          visible.map((nanny: Nanny) => (
            <NannyCard
              key={`${nanny.name}-${nanny.location}-${nanny.price_per_hour}`}
              nanny={nanny}
            />
          ))
        )}
      </ul>

      {hasMore && <LoadMoreBtn onClick={loadMore} />}
    </div>
  );
};

export default Nannies;