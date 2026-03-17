import { useMemo, useState } from "react";
import { useFavorites } from "../context/FavoritesContext";
import { NannyCard } from "../components/NannyCard/NannyCard";
import { formatKey } from "../utils/favoritesUtils";
import { useOutletContext } from "react-router-dom";
import type { LayoutContextType } from "../types/layoutContext";
import css from "./Nannies/Nannies.module.css";
import { FiltersBlock } from "../components/FiltersBlock/FiltersBlock";
import LoaderDots from "../components/LoaderDots/LoaderDots";
import LoadMoreBtn from "../components/LoadMoreBtn/LoadMoreBtn";
import {
  filterMap,
  type FilterOption,
  PriceFilterType,
  SortType,
} from "../types/filters";
import { useAuth } from "../hooks/useAuth";
import { useNannies } from "../hooks/useNannies";

const Favorites: React.FC = () => {
  const { favorites } = useFavorites();
  const { nannies, loading } = useNannies();
  
  const { user } = useAuth();
  const { openMakeAppointment } = useOutletContext<LayoutContextType>();

  const [selectedOption, setSelectedOption] = useState<FilterOption>("popular");
  const [page, setPage] = useState(1);

  // options для FiltersBlock
  const options = Object.keys(filterMap) as FilterOption[];

   // Фільтрація та сортування на основі вибраного фільтра
  const processedFavorites = useMemo(() => {
    const favs = nannies.filter(nanny => favorites.includes(nanny.id));
    const updates = filterMap[selectedOption];
    let sorted = [...favs];

    // Сортування
  if (updates?.sort === SortType.A_TO_Z) {
    sorted.sort((a, b) => a.name.localeCompare(b.name));
  } else if (updates?.sort === SortType.Z_TO_A) {
    sorted.sort((a, b) => b.name.localeCompare(a.name));
  } else if (updates?.sort === SortType.POPULAR) {
    sorted.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
  }

  // Фільтр по ціні
  if (updates?.price === PriceFilterType.LESS_THAN_10) {
    sorted = sorted.filter(n => n.price_per_hour < 10);
  } else if (updates?.price === PriceFilterType.GREATER_THAN_10) {
    sorted = sorted.filter(n => n.price_per_hour >= 10);
  }

    return sorted;
  }, [nannies, favorites, selectedOption]);

  // Пагінація
  const visibleFavorites = processedFavorites.slice(0, page * 3);
  const hasMore = page * 3 < processedFavorites.length;

  const loadMore = () => setPage(prev => prev + 1);

  const handleFilterChange = (option: FilterOption) => {
    setSelectedOption(option);
    setPage(1); // Скидаємо сторінку при зміні фільтру
  };

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
            {visibleFavorites.length === 0 ? (
              <p className={css.noNanniesFound}>
                You don't have favorite nannies yet
              </p>
            ) : (
              visibleFavorites.map(nanny => (
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

export default Favorites;