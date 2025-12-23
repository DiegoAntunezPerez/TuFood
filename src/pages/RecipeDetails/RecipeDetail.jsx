import { useState, useEffect} from 'react'
import { useParams } from "react-router-dom"
import "./recipeDetails.css"


const RecipeDetail = () => {
const [meal, setMeal] = useState(null);
const [loading, setLoading] = useState(false);

const { id } = useParams();

useEffect(() => {
  const fetchMeal = async () => {
    setLoading(true);

    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      const data = await res.json();
      setMeal(data.meals ? data.meals[0] : null);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };
  fetchMeal();
}, [id]);

  return (

  <div>
    {loading && <p>Cargando...</p>}

    {!loading && meal && (
      <>
        <h2>{meal.strMeal}</h2>
        <div className="recipe-detail">
        <img src={meal.strMealThumb} className='photo' />
        <p className='parrafo'>{meal.strInstructions}</p> {/*La Api está en ingles y no se traducir el texto actualmente*/}
        </div>
        <p className='pais'>{meal.strArea}</p>
        <p className='ytname'>{meal.strYoutube}</p>

{meal.strYoutube && (
  <div className="video">
    <iframe
      src={`https://www.youtube.com/embed/${meal.strYoutube.split("v=")[1]}`}
      title="YouTube video player"
      allowFullScreen
    />
  </div>
)}
      </>
    )}

    {!loading && !meal && <p>No encontrado</p>}
  </div>
  )
}

export default RecipeDetail