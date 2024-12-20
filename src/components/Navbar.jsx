
import { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

export default function Navbar() {
  const { searchParam, setSearchParam, handleSubmit, resetToDefaultRecipes } =
    useContext(GlobalContext);
  const location = useLocation();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold text-blue-600">
          <NavLink to="/" onClick={resetToDefaultRecipes}>
            FoodRecipe
          </NavLink>
        </h1>
        {location.pathname !== "/favorites" && (
          <form
            className="flex items-center space-x-2 w-full max-w-md"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchParam}
              onChange={(e) => setSearchParam(e.target.value)}
              className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Search
            </button>
          </form>
        )}
        <ul className="flex space-x-4">
          <li>
            <NavLink
              to="/"
              onClick={resetToDefaultRecipes}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "hover:bg-blue-100 text-gray-700"
                }`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "hover:bg-blue-100 text-gray-700"
                }`
              }
            >
              Favorites
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
