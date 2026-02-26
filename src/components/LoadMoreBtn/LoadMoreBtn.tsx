import css from "./LoadMoreBtn.module.css";
import React from "react";

type LoadMoreBtnProps = {
  onClick: () => void;
  disabled?: boolean;
  children?: React.ReactNode; 
};

const LoadMoreBtn = ({ onClick, disabled, children }: LoadMoreBtnProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={css.loadMoreButton}
    >
      {children} {/* ← тут рендериться переданий текст */}
    </button>
  );
};

export default LoadMoreBtn;