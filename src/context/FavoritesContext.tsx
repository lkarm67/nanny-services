/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (id: string) => void;
};

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : []; 
  });

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      let updated;

      if (prev.includes(id)) {
        updated = prev.filter(item => item !== id);
      } else {
        updated = [...prev, id];
      }

      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("useFavorites must be used inside FavoritesProvider");
  return context;
};