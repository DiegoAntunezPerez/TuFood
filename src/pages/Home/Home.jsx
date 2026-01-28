import { useEffect } from "react";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import { useMeals } from "../../hooks/useMeals";
import "./home.css";

const Home = () => {
  const {
    trendingMeals,
    countryMeals,
    fetchTrending,
    fetchByCountry,
    loading,
    error,
  } = useMeals();

  useEffect(() => {
    fetchTrending();
    fetchByCountry("Spanish");
    fetchByCountry("Italian");
    fetchByCountry("Mexican");
    // eslint-disable-next-line
  }, []);

  return (
    <section className="home">
      <section className="home-trending">
        <h2>🔥 En tendencia</h2>
        <div className="recipes-grid">
          {trendingMeals.map((meal) => (
            <RecipeCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      </section>

      <h2>Elige en qué país comer hoy: </h2>
      <p className="recetas">Entra en Recetas para decubrir +300 recetas de diferentes paises...</p>

      <h3>Comida Española:</h3>
      <div className="recipes-grid">
        {(countryMeals["Spanish"] || []).map((meal) => (
          <RecipeCard key={meal.idMeal} meal={meal} />
        ))}
      </div>

      <h3>Comida Italiana:</h3>
      <div className="recipes-grid">
        {(countryMeals["Italian"] || []).map((meal) => (
          <RecipeCard key={meal.idMeal} meal={meal} />
        ))}
      </div>

      <h3>Comida Méxicana:</h3>
      <div className="recipes-grid">
        {(countryMeals["Mexican"] || []).map((meal) => (
          <RecipeCard key={meal.idMeal} meal={meal} />
        ))}
      </div>

      {loading && <p>Cargando recetas...</p>}
      {error && <p style={{color: 'red'}}>{error}</p>}
    </section>
  );
};

export default Home;

