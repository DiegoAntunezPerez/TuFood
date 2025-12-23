import RecipeCard from '../../components/RecipeCard/RecipeCard'
import { useFavorites } from '../../hooks/useFavorites'
import "./favorites.css"

const Favorites = () => {
    // Uso el Custom Hook
    const { favorites } = useFavorites()
    // Creo un estado vacio para añadir recetas
    if (favorites.length === 0) {
      return <p>Añade tus recetas favoritas aqui:</p>
    }
  

  return (
    <>
    <div><h2>TUS RECETAS FAVORITAS</h2></div>
    <div className='recipes-favs'>
      {favorites.map((meal)=> (
        <RecipeCard key={meal.idMeal} meal={meal} />
      ))}
    </div>
    </>
  )
}

export default Favorites