
import { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext();

export default function GlobalState({ children }) {
  const [searchParam, setSearchParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipeList, setRecipeList] = useState([]);
  const [recipeDetailsData, setRecipeDetailsData] = useState(null);
  const [favoritesList, setFavoritesList] = useState([]);
  const [searchMode, setSearchMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const DEFAULT_RECIPE_CATEGORY = "pizza";

  async function fetchRecipes(category, page = 1) {
    setLoading(true);
    try {
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${category}&page=${page}`
      );
      const data = await res.json();
      return data.data.recipes || [];
    } catch (e) {
      console.error("Error fetching recipes:", e);
      return [];
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function fetchDefaultRecipes() {
      const recipes = await fetchRecipes(DEFAULT_RECIPE_CATEGORY, 1);
      setRecipeList(recipes);
    }
    fetchDefaultRecipes();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setSearchMode(true);
    try {
      const recipes = await fetchRecipes(searchParam);
      setRecipeList(recipes);
    } catch (e) {
      console.error("Error fetching recipes:", e);
    } finally {
      setLoading(false);
      setSearchParam("");
    }
  }

  async function resetToDefaultRecipes() {
    setSearchMode(false);
    setCurrentPage(1);
    const recipes = await fetchRecipes(DEFAULT_RECIPE_CATEGORY, 1);
    setRecipeList(recipes);
  }

  async function loadMoreRecipes() {
    const nextPage = currentPage + 1;
    const newRecipes = await fetchRecipes(DEFAULT_RECIPE_CATEGORY, nextPage);
    setRecipeList((prev) => [...prev, ...newRecipes]);
    setCurrentPage(nextPage);
  }

  function handleAddToFavorite(getCurrentItem) {
    const updatedFavorites = [...favoritesList];
    const index = updatedFavorites.findIndex((item) => item.id === getCurrentItem.id);

    if (index === -1) {
      updatedFavorites.push(getCurrentItem);
    } else {
      updatedFavorites.splice(index, 1);
    }

    setFavoritesList(updatedFavorites);
  }

  return (
    <GlobalContext.Provider
      value={{
        searchParam,
        setSearchParam,
        loading,
        recipeList,
        recipeDetailsData,
        setRecipeDetailsData,
        handleSubmit,
        resetToDefaultRecipes,
        handleAddToFavorite,
        favoritesList,
        searchMode,
        loadMoreRecipes,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
