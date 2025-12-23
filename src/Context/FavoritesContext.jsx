import { createContext, useState, useEffect } from "react";
// Creamos el contexto de favoritos
export const FavoritesContext = createContext()

// Provider que envuelve la app y comparte favoritos
export const FavoritesProvider = ({ children }) => {

  // Estado inicial: cargar favoritos desde localStorage
  const [favorites, setFavorites] = useState(() => {
  const stored = localStorage.getItem("favorites");
  return stored ? JSON.parse(stored) : [];
});

// Guardarmos favoritos en localStorage
useEffect(() => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}, [favorites]);

// Devolvemos el estado y setter al resto de la app
  return (
    <FavoritesContext.Provider value = {{favorites, setFavorites}}>
      {children}
    </FavoritesContext.Provider>
  )
}