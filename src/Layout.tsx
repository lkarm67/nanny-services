import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import type { User } from "firebase/auth";

interface LayoutProps {
  user: User | null;
  openLogin: () => void;
  openRegister: () => void;
}

const Layout: React.FC<LayoutProps> = ({ user, openLogin, openRegister }) => {
  return (
    <>
       <Header
        user={user}
        onRegisterClick={openRegister}
        onLoginClick={openLogin}
      />

      <Outlet context={{ openLogin, openRegister }} />

    </>
  );
};

export default Layout;