import { useNavigate, NavLink } from "react-router-dom";
import css from "./Home.module.css";
import heroImage1x from "../../assets/heroImage1x.jpg";
import heroImage2x from "../../assets/heroImage2x.jpg";
import sprite from "../../assets/symbol-defs.svg";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/nannies");
  };

  return (
    
    <section className={css.hero}>
      <div className={css.homeBackground}>
        <header className={css.header}>
            <p className={css.logo}>Nanny.Services</p>

            <nav className={css.nav}>
              <div className={css.navLinks}>
                <NavLink to="/" className={css.link}>
                  Home
                </NavLink>
                <NavLink to="/nannies" className={css.link}>
                  Nannies
                </NavLink>
              </div>
              <div className={css.navButtons}>
                <NavLink to="/login" className={css.buttonLogin}>
                  Log In
                </NavLink>
                <NavLink to="/register" className={css.buttonRegistration}>
                  Registration
                </NavLink>
              </div>
            </nav>
        </header>
      
        <hr className={css.devider} />

        <div className={css.imgWrapper}>
          <img
            src={heroImage1x}
            srcSet={`${heroImage1x} 1x, ${heroImage2x} 2x`}
            alt="Child looking at a picture book"
            className={css.image}
          />
        </div>

        <div className={css.nannyQuantityBox}>
          <div className={css.iconBox}>
            <svg className={css.checkIcon} width="30" height="30">
              <use href={`${sprite}#icon-fe_check`} />
            </svg>
          </div>

          <div className={css.textBox}>
            <p className={css.text}>Experienced nannies</p>
            <p className={css.quantityText}>15,000</p>
          </div>
        </div>

        <div className={css.content}>
          <div className={css.heroTextBox}>
            <h1 className={css.title}>Make Life Easier for the Family:</h1>
            <p className={css.description}>
              Find Babysitters Online for All Occasions
            </p>
          </div>
          <button className={css.heroButton} onClick={handleClick}>
            Get started
            <svg width="14" height="16">
              <use href={`${sprite}#icon-Arrow`} />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;