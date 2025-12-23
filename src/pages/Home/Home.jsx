import { useEffect, useState } from "react";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import "./home.css";

const Home = () => {
  const [trendingMeals, setTrendingMeals] = useState([]);
  const [spainMeals, setSpainMeals] = useState([]);
  const [italyMeals, setItalyMeals] = useState([]);
  const [mexicoMeals, setMexicoMeals] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      const res = await fetch(
        "https://www.themealdb.com/api/json/v1/1/search.php?s=chicken"
      );
      const data = await res.json();
      setTrendingMeals(data.meals.slice(0, 4));
    };

  const fetchByCountry = async (country, setter) => {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`
    );
    const data = await res.json();

  const detailedMeals = await Promise.all(
    data.meals.slice(0, 4).map(async (meal) => {
      const resDetail = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
      );
      const detailData = await resDetail.json();
      return detailData.meals[0];
    })
  );

  setter(detailedMeals);
};


    fetchTrending();
    fetchByCountry("Spanish", setSpainMeals);
    fetchByCountry("Italian", setItalyMeals);
    fetchByCountry("Mexican", setMexicoMeals);
  }, []);


  return (
  <section className="home"> 
  <section className="home-trending"> 
    <h2>🔥 En tendencia</h2> 
    <div className="recipes-grid"> {trendingMeals.map((meal) => ( 
      <RecipeCard key={meal.idMeal} meal={meal} /> ))} 
    </div> 
  </section>


      <h2>Elige en qué país comer hoy: </h2>
      <p className="recetas">Entra en Recetas para decubrir +300 recetas de diferentes paises...</p>

      <h3>Comida Española:</h3>
      <div className="recipes-grid">
        {spainMeals.map((meal) => (
          <RecipeCard key={meal.idMeal} meal={meal} />
        ))}
      </div>

      <h3>Comida Italiana:</h3>
      <div className="recipes-grid">
        {italyMeals.map((meal) => (
          <RecipeCard key={meal.idMeal} meal={meal} />
        ))}
      </div>

      <h3>Comida Méxicana:</h3>
      <div className="recipes-grid">
        {mexicoMeals.map((meal) => (
          <RecipeCard key={meal.idMeal} meal={meal} />
        ))}
      </div>
    </section>
  );
};

export default Home;

