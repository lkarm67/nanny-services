import { NavLink, useNavigate } from "react-router-dom";
import css from "./MobileMenu.module.css";
import type { User } from "firebase/auth";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useFavorites } from "../../context/FavoritesContext";

interface MobileMenuProps {
  onClose: () => void;
  user: User | null;
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  user,
  onClose,
  onLoginClick,
  onRegisterClick,
}) => {
  const navigate = useNavigate();

  const { clearFavorites } = useFavorites();

  const handleLogout = async () => {
    await signOut(auth);
    clearFavorites();
    navigate("/");
    onClose();
  };

  return (
    <div
      className={`${css.mobileMenuOverlay} ${css.open}`}
      onClick={onClose}
    >
      <div className={css.mobileMenu} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeBtn} onClick={onClose}>
          <svg className={css.closeIcon} width="32" height="32">
            <use href="/sprite.svg#icon-x" />
          </svg>
        </button>
        <div className={css.menuContent}>
        <p className={css.logo}>Nanny.Services</p>

        <nav className={css.nav}>
          <NavLink 
            to="/" 
            className={({ isActive }) =>
              isActive ? `${css.link} ${css.activeLink}` : css.link
            } 
            onClick={onClose}
          >
            Home
          </NavLink>
          <NavLink 
            to="/nannies" 
            className={({ isActive }) =>
              isActive ? `${css.link} ${css.activeLink}` : css.link
            }
            onClick={onClose}
          >
            Nannies
          </NavLink>

          {user && (
            <NavLink 
              to="/favorites" 
              className={({ isActive }) =>
                isActive ? `${css.link} ${css.activeLink}` : css.link
            }
              onClick={onClose}
            >
              Favorites
            </NavLink>
          )}
        </nav>

        {!user ? (
          <div className={css.authBlock}>
            <button
              className={css.loginBtn}
              onClick={() => {
                onLoginClick();
                onClose();
              }}
            >
              Log In
            </button>

            <button
              className={css.registerBtn}
              onClick={() => {
                onRegisterClick();
                onClose();
              }}
            >
              Registration
            </button>
          </div>
        ) : (
          <div className={css.profile}>
            <div className={css.userBox}>
              <div className={css.userIcon}>
                <svg width="24" height="24">
                  <use href="/sprite.svg#icon-mdi_user" />
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
      </div>
    </div>
  );
};

export default MobileMenu;