import { useMemo, useState } from "react";
import { useNannies } from "../../hooks/useNannies";
import { FiltersBlock } from "../../components/FiltersBlock/FiltersBlock";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import { NannyCard } from "../../components/NannyCard/NannyCard";
import {
  filterMap,
  type FilterOption,
  PriceFilterType,
  SortType,
} from "../../types/filters";
import { useOutletContext } from "react-router-dom";
import type { LayoutContextType } from "../../types/layoutContext";
import { useNanniesQuery } from "../../hooks/useNanniesQuery";
import { processNannies } from "../../utils/nannyQueryProcessor";
import css from "./Nannies.module.css"
import LoaderDots from "../../components/LoaderDots/LoaderDots";
import { useAuth } from "../../hooks/useAuth";



const Nannies: React.FC = () => {
  const { nannies, loading } = useNannies();
  const { openMakeAppointment } = useOutletContext<LayoutContextType>();
  const [selectedOption, setSelectedOption] =
    useState<FilterOption>("aToZ");

  const [query, updateQuery] = useNanniesQuery();

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
      sort: updates.sort ?? SortType.A_TO_Z,
      price: updates.price ?? PriceFilterType.ALL,
      page: 1,
    });
  };

  const options = Object.keys(filterMap) as FilterOption[];

  const { user } = useAuth();

  console.log(nannies)

  return (
    <div className={css.page}>
      <FiltersBlock
        value={selectedOption}
        options={options}
        onChange={handleFilterChange}
      />

      {loading ? (
        <LoaderDots />
      ) : (
        <>
          <ul className={css.nanniesList}>
            {visible.length === 0 ? (
              <p className={css.noNanniesFound}>
                No nannies found for the selected filter
              </p>
            ) : (
              visible.map(nanny => (
                <NannyCard 
                  key={nanny.id} 
                  nanny={nanny}
                  isLoggedIn={!!user}
                  onMakeAnAppointmentClick={openMakeAppointment}
                />
              ))
            )}
          </ul>
        </>
      )}

      {hasMore && <LoadMoreBtn onClick={loadMore} />}
    </div>
  );
};

export default Nannies;