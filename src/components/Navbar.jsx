

import { useContext, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

export default function Navbar() {
  const { searchParam, setSearchParam, handleSubmit, resetToDefaultRecipes } =
    useContext(GlobalContext);
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-blue-600">
          <NavLink to="/" onClick={resetToDefaultRecipes}>
            FoodRecipe
          </NavLink>
        </h1>

        {/* Search Bar */}
        {location.pathname !== "/favorites" && (
          <form
            className="hidden sm:flex items-center space-x-2 w-full max-w-md mx-4"
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

        {/* Hamburger Menu for Mobile */}
        <button
          className="sm:hidden p-2 text-gray-700 rounded-lg focus:outline-none hover:bg-gray-100"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Navigation Links */}
        <ul className="hidden sm:flex space-x-4">
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

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-white border-t">
          {location.pathname !== "/favorites" && (
            <form
              className="flex items-center space-x-2 p-4"
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
          <ul className="flex flex-col space-y-2 p-4">
            <li>
              <NavLink
                to="/"
                onClick={() => {
                  resetToDefaultRecipes();
                  setIsMobileMenuOpen(false);
                }}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-lg transition ${
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
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-lg transition ${
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
      )}
    </nav>
  );
}

