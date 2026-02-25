import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Nannies from "./pages/Nannies/Nannies";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute"; 

const App: React.FC = () => {
  return (
    <Routes>
  <Route path="/" element={<Home />} />

  {/* Основний Layout */}
  <Route element={<Layout />}>
    <Route path="/nannies" element={<Nannies />} />
    <Route
      path="/favorites"
      element={
        <ProtectedRoute>
          <Favorites />
        </ProtectedRoute>
      }
    />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
  </Route>
</Routes>
  );
};

export default App;