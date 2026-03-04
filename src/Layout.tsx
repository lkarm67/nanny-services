import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";

interface LayoutProps {
  openLogin: () => void;
  openRegister: () => void;
}

const Layout: React.FC<LayoutProps> = ({ openLogin, openRegister }) => {
  return (
    <>
       <Header
        user={null}
        onLogout={() => {}}
        onRegisterClick={openRegister}
        onLoginClick={openLogin}
      />

      <Outlet context={{ openLogin, openRegister }} />

    </>
  );
};

export default Layout;