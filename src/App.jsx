
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Details from "./pages/Details";
import "./index.css";

function App() {
  return (
    <div className="App bg-gray-100 min-h-screen">
      <Navbar />
      <main className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/recipe-item/:id" element={<Details />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

