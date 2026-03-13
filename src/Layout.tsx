import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import type { User } from "firebase/auth";
import type { Nanny } from "./types/nannies";
import type { LayoutContextType } from "./types/layoutContext";import { useLocation } from "react-router-dom";



interface LayoutProps {
  user: User | null;
  openLogin: () => void;
  openRegister: () => void;
  openMakeAppointment: (nanny: Nanny) => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  user, 
  openLogin, 
  openRegister, 
  openMakeAppointment 
}) => {
  const location = useLocation();

  const isHome = location.pathname === "/";
  
  return (
    <>
      <Header
        user={user}
        onRegisterClick={openRegister}
        onLoginClick={openLogin}
        variant={isHome ? "home" : "default"}
      />

      <Outlet context={{ 
        openLogin, 
        openRegister, 
        openMakeAppointment 
      } as LayoutContextType}  
      />

    </>
  );
};

export default Layout;