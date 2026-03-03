import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home/Home";
import Nannies from "./pages/Nannies/Nannies";
import Favorites from "./pages/Favorites";
import LoginForm from "./components/LoginForm/LoginForm";
import ProtectedRoute from "./components/ProtectedRoute"; 
import { useState } from "react";

const App: React.FC = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home openLogin={openLogin} />} />
      
        <Route path="/" element={<Layout openLogin={openLogin} />}
        >        
          <Route path="/nannies" element={<Nannies />} />

          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>

      <LoginForm
        isOpen={isLoginOpen}
        onClose={closeLogin}
      />
    </>
  );
};

export default App;