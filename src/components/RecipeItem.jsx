
import { Link } from "react-router-dom"; // Add this import

export default function RecipeItem({ item }) {
  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition">
      <img
        src={item.image_url}
        alt={item.title}
        className="h-48 w-full object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-bold truncate text-gray-800">{item.title}</h2>
        <p className="text-sm text-gray-600">By {item.publisher}</p>
        <Link
          to={`/recipe-item/${item.id}`}
          className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
