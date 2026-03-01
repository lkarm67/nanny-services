import css from "./LoaderDots.module.css";

const LoaderDots: React.FC = () => {
  return (
    <div className={css.dots}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default LoaderDots;