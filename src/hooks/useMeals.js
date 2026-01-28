import { useState } from "react";

// Hook de peticiones a la API de recetas
export function useMeals() {
  const [trendingMeals, setTrendingMeals] = useState([]);
  const [countryMeals, setCountryMeals] = useState({}); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Recetas en tendencia
  const fetchTrending = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        "https://www.themealdb.com/api/json/v1/1/search.php?s=chicken"
      );
      const data = await res.json();
      setTrendingMeals(data.meals ? data.meals.slice(0, 4) : []);
    } catch {
      setError("Error al cargar recetas en tendencia");
    } finally {
      setLoading(false);
    }
  };

  // Recetas detalladas por país
  const fetchByCountry = async (country) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`
      );
      const data = await res.json();
      const detailedMeals = await Promise.all(
        (data.meals ? data.meals.slice(0, 4) : []).map(async (meal) => {
          const resDetail = await fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
          );
          const detailData = await resDetail.json();
          return detailData.meals[0];
        })
      );
      setCountryMeals((prev) => ({ ...prev, [country]: detailedMeals }));
    } catch {
      setError(`Error al cargar recetas de ${country}`);
    } finally {
      setLoading(false);
    }
  };

  return {
    trendingMeals,
    countryMeals,
    loading,
    error,
    fetchTrending,
    fetchByCountry,
  };
}
