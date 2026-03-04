import React from 'react';
import { NavLink, useNavigate  } from "react-router-dom";
import css from "./Header.module.css";

interface User {
  name: string;
  avatar: string;
}

interface HeaderProps {
  user: User | null;
  onLoginClick: () => void;
  onRegisterClick: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  user, 
  onLoginClick,
  onRegisterClick,
  onLogout 
}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <header className={css.header}>
      <div className={`container ${css.headerContainer}`}>  
        <p className={css.logo}>Nanny.Services</p>

        <nav className={css.nav}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? `${css.link} ${css.activeLink}` : css.link
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/nannies"
            className={({ isActive }) =>
              isActive ? `${css.link} ${css.activeLink}` : css.link
            }
          >
            Nannies
          </NavLink>

          {user && (
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                isActive ? `${css.link} ${css.activeLink}` : css.link
              }
            >
              Favorites
            </NavLink>
          )}
        </nav>

        <div className={css.authBlock}>
          {!user ? (
            <>
              <button
                className={css.loginBtn}
                onClick={onLoginClick}
              >
                Log In
              </button>
              <button
                className={css.registerBtn}
                onClick={onRegisterClick}
              >
                Registration
              </button>
            </>
          ) : (
            <div className={css.profile}>
              <img
                src={user.avatar}
                alt={user.name}
                className={css.avatar}
              />
              <span className={css.username}>{user.name}</span>
              <button
                onClick={handleLogout}
                className={css.logoutBtn}
              >
                Logout
              </button>
            </div>
          )}
        </div>  
      </div>  
    </header>

    );
};  

export default Header;