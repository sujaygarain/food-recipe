
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

export default function Details() {
  const { id } = useParams();
  const {
    recipeDetailsData,
    setRecipeDetailsData,
    favoritesList,
    handleAddToFavorite,
  } = useContext(GlobalContext);

  useEffect(() => {
    async function fetchDetails() {
      try {
        const res = await fetch(
          `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
        );
        const data = await res.json();
        if (data?.data) {
          setRecipeDetailsData(data.data.recipe);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchDetails();
  }, [id, setRecipeDetailsData]);

  if (!recipeDetailsData) return <div>Loading details...</div>;

  return (
    <div className="container mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="order-last lg:order-first">
        <div className="h-96 overflow-hidden rounded-xl">
          <img
            src={recipeDetailsData.image_url}
            alt={recipeDetailsData.title}
            className="w-full h-full object-cover block"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <span className="text-sm text-cyan-700 font-medium">
          {recipeDetailsData.publisher}
        </span>
        <h3 className="font-bold text-2xl text-black">
          {recipeDetailsData.title}
        </h3>
        <button
          onClick={() => handleAddToFavorite(recipeDetailsData)}
          className="p-3 px-8 rounded-lg text-sm uppercase font-medium tracking-wider shadow-md bg-black text-white"
        >
          {favoritesList.some((item) => item.id === recipeDetailsData.id)
            ? "Remove from Favorites"
            : "Add to Favorites"}
        </button>
        <div>
          <h4 className="text-2xl font-semibold">Ingredients:</h4>
          <ul className="flex flex-col gap-3">
            {recipeDetailsData.ingredients.map((ingredient, index) => (
              <li key={index}>
                <span className="text-lg">
                  {ingredient.quantity} {ingredient.unit} - {ingredient.description}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
