import { useEffect, useState } from "react";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import "./Recetas.css";

// Seleccionamos los paises con mas recetas de la API
const COUNTRIES = [
  "Spanish", "Italian", "Japanese", "British", "Indian",
  "Thai", "American", "French", "Australian", "Chinese",
  "Mexican", "Turkish", "Argentinian", "Canadian"
];

const Recetas = ({ searchQuery }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);

  // Carga inicial aleatoria (solo si no hay filtros activos)
  useEffect(() => {
    if (searchQuery || selectedCountry) return;

    const fetchRandom = async () => {
      setLoading(true);
      try {
        const requests = Array.from({ length: 8 }, () =>
          fetch("https://www.themealdb.com/api/json/v1/1/random.php")
            .then(res => res.json())
            .then(data => data.meals[0])
        );

        const randomMeals = await Promise.all(requests);
        setRecipes(randomMeals);
      } catch {
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRandom();
  }, [searchQuery, selectedCountry]);

  // Búsqueda por nombre
  useEffect(() => {
    if (!searchQuery) return;

    const fetchByName = async () => {
      setLoading(true);
      setSelectedCountry(null);

      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`
        );
        const data = await res.json();
        setRecipes(data.meals || []);
      } finally {
        setLoading(false);
      }
    };

    fetchByName();
  }, [searchQuery]);

  // Búsqueda por país
  useEffect(() => {
    if (!selectedCountry) return;

    const fetchByCountry = async () => {
      setLoading(true);

      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedCountry}`
        );
        const data = await res.json();

        if (!data.meals) {
          setRecipes([]);
          return;
        }

      const detailedMeals = await Promise.all(
        data.meals.map(meal =>
          fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
          )
            .then(res => res.json())
            .then(detail => detail.meals[0])
        )
      );

        setRecipes(detailedMeals);
      } finally {
        setLoading(false);
      }
    };

    fetchByCountry();
  }, [selectedCountry]);

  return (
    <>
      <h2 className="recetas-title">🍽️ Recetas</h2>

      <p className="recetas-intro">
        Busca tus platos favoritos por nombre o explora por país:
      </p>

      <div className="recetas-filters">
        {COUNTRIES.map(country => (
          <button
            key={country}
            onClick={() => setSelectedCountry(country)}
            className={selectedCountry === country ? "active-filter" : ""}
          >
            {country}
          </button>
        ))}
      </div>

      <div className="recetas">
        {loading && <p>Cargando...</p>}

        {!loading && recipes.length === 0 && <p>No hay resultados.</p>}

        {!loading && recipes.length > 0 && (
          <div className="recipes-grid">
            {recipes.map(meal => (
              <RecipeCard key={meal.idMeal} meal={meal} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Recetas;


