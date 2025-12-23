import { useNavigate } from "react-router-dom";
import "./RecipeCard.css";
import { useFavorites } from "../../hooks/useFavorites";

const RecipeCard = ({ meal }) => {
    // Para navegar al detalle al hacer click en la card
    const navigate = useNavigate();
    // Leemos y actualizamos favoritos desde el contexto global
    const { favorites, setFavorites } = useFavorites()
    // Para saber si esta receta ya está en favoritos
    const isFavorite = favorites.some(fav => fav.idMeal === meal.idMeal);

    // Para añadir o quitar de favoritos sin recargar página
  const toggleFavorite = () => {
    if (isFavorite) {
      setFavorites(favorites.filter(fav => fav.idMeal !== meal.idMeal));
    } else {
      setFavorites([...favorites, meal]);
    }
  };

    // Para navegar al detalle de receta (card clicable)
    const handleClick = () => {
      navigate(`/recipe/${meal.idMeal}`);
    };

  return (
    <div className="recipe-card" onClick={handleClick}>
      <img src={meal.strMealThumb} alt={meal.strMeal} />
      <h3>{meal.strMeal}</h3>

    <p className="recipe-desc">
    {meal.strInstructions
    ? meal.strInstructions.slice(0,120) + " ... Ver mas "
    : "Pulsa para ver la receta completa"}
</p>

      <p>{meal.strArea}</p>
      <button onClick={(e) => 
      // Para que al hacer click en el botón NO navegue al detalle
      {e.stopPropagation();
      // Para alternar favorito/no favorito
    toggleFavorite();
  }}>
  {isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
</button>

    </div>
  );
};

export default RecipeCard;