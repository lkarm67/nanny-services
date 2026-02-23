import { Outlet, NavLink } from "react-router-dom";
import css from "./Layout.module.css";

const Layout = () => {
  return (
    <div>
      <header className={css.header}>
        <div className={css.logo}>Nanny.Services</div>

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
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive ? `${css.link} ${css.activeLink}` : css.link
            }
          >
            Favorites
          </NavLink>

          <NavLink to="/login" className={css.buttonLink}>
            Log In
          </NavLink>
          <NavLink to="/register" className={css.buttonLink}>
            Registration
          </NavLink>
        </nav>
      </header>

      <main className={css.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;