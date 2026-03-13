import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home/Home";
import Nannies from "./pages/Nannies/Nannies";
import type { Nanny } from "./types/nannies";
import Favorites from "./pages/Favorites";
import { LoginForm } from "./components/Modal/LoginForm/LoginForm";
import { RegisterForm } from "./components/Modal/RegisterForm/RegisterForm";
import ProtectedRoute from "./components/ProtectedRoute"; 
import { useState } from "react";
import { useAuth } from "./hooks/useAuth";
import MakeAnAppointmentForm from "./components/Modal/MakeAnAppointmentForm/MakeAnAppointmentForm";

const App: React.FC = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isMakeAppointmentOpen, setIsMakeAppointmentOpen] = useState(false);
  

  const [selectedNanny, setSelectedNanny] = useState<Nanny | null>(null);

  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);

  const openRegister = () => setIsRegisterOpen(true);
  const closeRegister = () => setIsRegisterOpen(false);

  const closeMakeAppointment = () => setIsMakeAppointmentOpen(false);
  const handleMakeAppointmentClick = (nanny: Nanny) => {
    setSelectedNanny(nanny);
    setIsMakeAppointmentOpen(true);
  };
  
  const { user, loading } = useAuth();

  if (loading) return null;

  return (
    <>
      <Routes>
      
        <Route path="/" element={
          <Layout 
            user={user} 
            openLogin={openLogin} 
            openRegister={openRegister}
            openMakeAppointment={handleMakeAppointmentClick} 
          />
        }>

          <Route
            index
            element={
              <Home
                user={user}
                onLoginClick={openLogin}
                onRegisterClick={openRegister}
              />
            }
          />

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

      {selectedNanny && (
        <MakeAnAppointmentForm
          isOpen={isMakeAppointmentOpen}
          onClose={closeMakeAppointment}
          nanny={selectedNanny}
          onMakeAppointmentClick={closeMakeAppointment}
        />
      )}
    </>
  );
};

export default App;