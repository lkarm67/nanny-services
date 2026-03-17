import { useEffect } from "react";
import { createPortal } from "react-dom";
import css from "./ModalForm.module.css";
import sprite from "../../../assets/symbol-defs.svg";

interface ModalFormProps {
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
  isOpen: boolean;
}

const modalRoot = document.getElementById("modal-root") as HTMLElement;

export const ModalForm: React.FC<ModalFormProps> = ({
  children,
  onClose,
  className,
  isOpen,
}) => {

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleBackdrop = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div className={css.modalBackdrop} onClick={handleBackdrop}>
      <div
        className={`${css.modalContent} ${className || ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={css.modalCloseButton} onClick={onClose}>
          <svg className={css.modalCloseIcon}>
            <use href={`${sprite}#icon-x`} />
          </svg>
        </button>

        {children}

      </div>
    </div>,
    modalRoot
  );
};