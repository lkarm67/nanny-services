import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home/Home";
import Nannies from "./pages/Nannies/Nannies";
import Favorites from "./pages/Favorites";
import { LoginForm } from "./components/Modal/LoginForm/LoginForm";
import RegisterForm from "./components/Modal/RegisterForm/RegisterForm";
import ProtectedRoute from "./components/ProtectedRoute"; 
import { useState } from "react";
import { useAuth } from "./hooks/useAuth";

const App: React.FC = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);

  const openRegister = () => setIsRegisterOpen(true);
  const closeRegister = () => setIsRegisterOpen(false);
  
  const { user } = useAuth();

  return (
    <>
      <Routes>
        <Route path="/" element={
          <Home
            openLogin={openLogin} 
            openRegister={openRegister} 
            />
        } />
      
        <Route path="/" element={
          <Layout 
            user={user} 
            openLogin={openLogin} 
            openRegister={openRegister} 
          />
        }>

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

      <RegisterForm
        isOpen={isRegisterOpen}
        onClose={closeRegister}
      />
      
      <LoginForm
        isOpen={isLoginOpen}
        onClose={closeLogin}
      />
    </>
  );
};

export default App;