
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import RecipeItem from "../components/RecipeItem";

export default function Favorites() {
  const { favoritesList } = useContext(GlobalContext);

  return (
    <div className="container mx-auto py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {favoritesList && favoritesList.length > 0 ? (
        favoritesList.map((item) => <RecipeItem key={item.id} item={item} />)
      ) : (
        <p className="text-gray-700 text-center col-span-full">
          No favorites added yet.
        </p>
      )}
    </div>
  );
}
