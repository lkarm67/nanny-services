import { useEffect, useRef, useState } from "react";
import css from "./FiltersBlock.module.css";
import sprite from "../../assets/symbol-defs.svg";
import { filterLabels } from "../../types/filters";

interface FiltersBlockProps<T extends keyof typeof filterLabels> {
  value: T;
  options: T[];
  onChange: (value: T) => void;
}

export const FiltersBlock = <T extends keyof typeof filterLabels>({
  value,
  options,
  onChange,
}: FiltersBlockProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className={css.wrapper}>
      <p className={css.filterLabel}>Filters</p>
      <button
        type="button"
        className={css.button}
        aria-expanded={isOpen}
        onClick={() => setIsOpen(prev => !prev)}
      >
        {filterLabels[value]}
        <svg
          className={`${css.icon} ${isOpen ? css.rotate : ""}`}
          width="20"
          height="20"
        >
          <use href={`${sprite}#icon-chevron-down`} />
        </svg>
      </button>

      <ul className={`${css.dropdown} ${isOpen ? css.open : ""}`}>
        {options.map(option => (
          <li key={option} className={`${css.option} ${option === value ? css.active : ""}`}>
            <button
              type="button"
              className={css.optionBtn}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              {filterLabels[option]}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};











