import { useContext } from "react";
import { FavoritesContext } from "../Context/FavoritesContext";

export const useFavorites = () => {
  const { favorites, setFavorites } = useContext(FavoritesContext);

  // Añadir favorito
  const addFavorite = (meal) => {
    if (!favorites.some((fav) => fav.idMeal === meal.idMeal)) {
      setFavorites([...favorites, meal]);
    }
  };

  // Quitar favorito
  const removeFavorite = (idMeal) => {
    setFavorites(favorites.filter((fav) => fav.idMeal !== idMeal));
  };
  
  const isFavorite = (idMeal) => {
    return favorites.some((fav) => fav.idMeal === idMeal);
  };

  // Alterno favoritos
  const toggleFavorite = (meal) => {
    if (isFavorite(meal.idMeal)) {
      removeFavorite(meal.idMeal);
    } else {
      addFavorite(meal);
    }
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
    setFavorites, 
  };
};
