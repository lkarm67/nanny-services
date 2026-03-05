import { useEffect, useState } from "react";
import { useFavorites } from "../context/FavoritesContext";
import { getNannies } from "../services/nanniesService";
import { NannyCard } from "../components/NannyCard/NannyCard";
import type { Nanny } from "../types/nannies";
import { formatKey } from "../utils/favoritesUtils";

const Favorites: React.FC = () => {
  const { favorites } = useFavorites();
  const [nannies, setNannies] = useState<Nanny[]>([]);

  useEffect(() => {
    const fetchNannies = async () => {
      const data = await getNannies();
      setNannies(data);
    };

    fetchNannies();
  }, []);

  const favoriteNannies = nannies.filter(n =>
    favorites.includes(formatKey(n))
  );

  return (
    <section className="container">
      {favoriteNannies.length === 0 ? (
        <p>You don't have favorite nannies yet</p>
      ) : (
        favoriteNannies.map(nanny => (
          <NannyCard
            key={formatKey(nanny)}
            nanny={nanny}
            isLoggedIn={true}
            onLoginClick={() => {}}
          />
        ))
      )}
    </section>
  );
};

export default Favorites;