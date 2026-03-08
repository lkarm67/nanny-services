import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import type { User } from "firebase/auth";
import type { Nanny } from "./types/nannies";

interface LayoutProps {
  user: User | null;
  openLogin: () => void;
  openRegister: () => void;
  openMakeAppointment: (nanny: Nanny) => void;
}

const Layout: React.FC<LayoutProps> = ({ user, openLogin, openRegister, openMakeAppointment }) => {
  return (
    <>
       <Header
        user={user}
        onRegisterClick={openRegister}
        onLoginClick={openLogin}
      />

      <Outlet context={{ openLogin, openRegister, openMakeAppointment }} />

    </>
  );
};

export default Layout;