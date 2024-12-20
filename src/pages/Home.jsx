
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import RecipeItem from "../components/RecipeItem";

export default function Home() {
  const {
    recipeList,
    loading,
    searchMode,
    loadMoreRecipes,
    resetToDefaultRecipes,
  } = useContext(GlobalContext);

  if (loading && recipeList.length === 0) {
    return <p className="text-center text-lg">Loading recipes...</p>;
  }

  if (searchMode && recipeList.length === 0) {
    return (
      <div className="text-center">
        <p className="text-gray-700 text-lg col-span-full">
          No recipes found. Please search for something else.
        </p>
        <button
          onClick={resetToDefaultRecipes}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
        >
          ← Back to Default Recipes
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipeList.map((item) => (
          <RecipeItem key={item.id} item={item} />
        ))}
      </div>
      {!searchMode && (
        <div className="text-center mt-8">
          <button
            onClick={loadMoreRecipes}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            View More
          </button>
        </div>
      )}
    </div>
  );
}
