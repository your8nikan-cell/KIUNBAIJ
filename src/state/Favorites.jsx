import { createContext, useContext, useEffect, useState } from 'react';

const FavoritesContext = createContext();
export const useFavorites = () => useContext(FavoritesContext);
export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const value = JSON.parse(localStorage.getItem('dubai-house-favorites') || '[]');
      return Array.isArray(value) ? value.filter(x => typeof x === 'string') : [];
    } catch { return []; }
  });
  function toggle(id) { setFavorites(previous => previous.includes(id) ? previous.filter(item => item !== id) : [...previous, id]); }
  useEffect(() => { try { localStorage.setItem('dubai-house-favorites', JSON.stringify(favorites)); } catch { /* Still usable for this session when browser storage is unavailable. */ } }, [favorites]);
  return <FavoritesContext.Provider value={{ favorites, toggle }}>{children}</FavoritesContext.Provider>;
}
