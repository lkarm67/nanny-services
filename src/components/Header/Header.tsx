import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import css from "./Header.module.css";
import { signOut } from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from "../../firebase";
import sprite from "../../assets/symbol-defs.svg";
import MobileMenu from "../MobileMenu/MobileMenu";

interface HeaderProps {
  user: User | null;
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

const Header: React.FC<HeaderProps> = ({
  user,
  onLoginClick,
  onRegisterClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <header className={css.header}>
      <div className={`container ${css.headerContainer}`}>
        <p className={css.logo}>Nanny.Services</p>

        {/* Desktop navigation */}
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

        {/* Auth block */}
        <div className={css.authBlock}>
          {!user ? (
            <>
              <button className={css.loginBtn} onClick={onLoginClick}>
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
              <div className={css.userBox}>
                <div className={css.userIcon}>
                  <svg width="24" height="24">
                    <use href={`${sprite}#icon-mdi_user`} />
                  </svg>
                </div>

                <span className={css.username}>
                  {user?.displayName || "User"}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className={css.logoutBtn}
              >
                Log out
              </button>
            </div>
          )}
        </div>

        
        {/* Burger */}
        <button
          className={css.burger}
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
        >
          <svg className={css.menu} width="32" height="32">
            <use href={`${sprite}#icon-menu`}></use>
          </svg>
        </button>

        {/* Mobile menu */}
        {isOpen && (
          <MobileMenu
            user={user}
            onClose={() => setIsOpen(false)}
            onLoginClick={onLoginClick}
            onRegisterClick={onRegisterClick}
          />
        )}
      </div>
    </header>
  );
};

export default Header;