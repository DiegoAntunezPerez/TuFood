import { useContext } from "react";
import { FavoritesContext } from "../Context/FavoritesContext";

// Creamos el acesso al contexto para usar en los componentes
export const useFavorites = () => {
  return useContext(FavoritesContext);
};
