import { Outlet, NavLink } from "react-router-dom";
import css from "./Layout.module.css";

const HomeLayout = () => {
  return (
    <>
      <header className={css.header}>
        <div className={css.logo}>Nanny.Services</div>

        <nav className={css.nav}>
          <NavLink to="/" className={css.link}>
            Home
          </NavLink>
          <NavLink to="/nannies" className={css.link}>
            Nannies
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
    </>
  );
};

export default HomeLayout;