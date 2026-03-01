import React from "react";
import css from "./LoadMoreBtn.module.css";

interface Props {
  onClick: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
}

const LoadMoreBtn: React.FC<Props> = ({ onClick, disabled, children }) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur(); // знімає фокус після кліку
    onClick();
  };

  return (
    <button
      type="button"
      className={css.loadMoreBtn}
      onClick={handleClick}
      disabled={disabled}
    >
      {children ?? "Load more"}
    </button>
  );
};

export default LoadMoreBtn;