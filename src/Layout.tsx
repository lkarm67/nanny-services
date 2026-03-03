import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";

interface LayoutProps {
  openLogin: () => void;
}

const Layout: React.FC<LayoutProps> = ({ openLogin }) => {
  return (
    <>
       <Header
        user={null}
        onLogout={() => {}}
        onLoginClick={openLogin}
      />

      <Outlet context={{ openLogin }} />

    </>
  );
};

export default Layout;