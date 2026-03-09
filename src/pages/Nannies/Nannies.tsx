import { useEffect, useMemo, useState } from "react";
import { FiltersBlock } from "../../components/FiltersBlock/FiltersBlock";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import { NannyCard } from "../../components/NannyCard/NannyCard";
import type { Nanny } from "../../types/nannies";
import {
  filterMap,
  filterLabels,
  type FilterOption,
  PriceFilterType,
  SortType,
} from "../../types/filters";
import { useOutletContext } from "react-router-dom";

import { getNannies } from "../../services/nanniesService";
import { useNanniesQuery } from "../../hooks/useNanniesQuery";
import { processNannies } from "../../utils/nannyQueryProcessor";
import css from "./Nannies.module.css"
import LoaderDots from "../../components/LoaderDots/LoaderDots";
import { formatKey } from "../../utils/favoritesUtils";
import { getAuth } from "firebase/auth";

type LayoutContextType = {
  openLogin: () => void;
  openRegister: () => void;
  openMakeAppointment: (nanny: Nanny) => void;
};

const Nannies: React.FC = () => {
  const [nannies, setNannies] = useState<Nanny[]>([]);
  const [loading, setLoading] = useState(true);
  const { openMakeAppointment } = useOutletContext<LayoutContextType>();
  const [selectedOption, setSelectedOption] =
    useState<FilterOption>("aToZ");

  const [query, updateQuery] = useNanniesQuery();

  useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getNannies();
      setNannies(data);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
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
      sort: updates.sort ?? SortType.A_TO_Z,
      price: updates.price ?? PriceFilterType.ALL,
      page: 1,
    });
  };

  const options = Object.keys(filterLabels) as FilterOption[];

  const auth = getAuth();
  const user = auth.currentUser;

  return (
    <div className={css.nanniesPage}>
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
              visible.map((nanny: Nanny) => (
                <NannyCard
                  key={formatKey(nanny)}
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