import { ModalForm } from "../ModalForm/ModalForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import css from "./LoginForm.module.css";
import sprite from "../../../assets/symbol-defs.svg";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

type FormValues = {
  email: string;
  password: string;
};

const schema = yup.object({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const LoginForm: React.FC<Props> = ({ isOpen, onClose }) => {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: FormValues) => {
    console.log(data);
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };
  
  if (!isOpen) return null;

  return (
    <ModalForm isOpen={isOpen} onClose={handleClose} className={css.loginModal}>

      <div className={css.modalContentWrapper}>

        <div className={css.modalHeader}>
          <h2 className={css.modalTitle}>Log In</h2>
          <p className={css.modalDescription}>
            Welcome back! Please enter your credentials to access your account
            and continue your babysitter search.
          </p>
        </div>      

        <form onSubmit={handleSubmit(onSubmit)} className={css.modalForm}>

          <div className={css.modalFieldGroup}>
            <input 
              type="email" 
              className={css.modalInput} 
              placeholder='Email' 
              {...register("email")} 
            />

            {errors.email && 
              <p className={css.error}>{errors.email.message}</p>
            }
          </div>

          <div className={css.modalFieldGroup}>
                <div className={css.modalInputWrapper}>
                    
                  <input 
                    type={showPassword ? "text" : "password"} 
                    className={css.modalInput}
                    placeholder='Password' 
                    autoComplete="current-password"
                    {...register("password")} 
                  />
         
                  <button 
                    type="button" 
                    className={css.passwordToggle} 
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label="Toggle password visibility"
                  >
                    <svg className={css.passwordIcon} viewBox="0 0 32 32" width="20" height="20">
                      <use href={`${sprite}#${showPassword ? "icon-eye-open" : "icon-eye-off"}`} />
                    </svg>
                  </button>
                </div>  
                    
                {errors.password && 
                  <p className={css.error}>{errors.password.message}</p>
                }
              </div>

          <button type="submit" className={css.modalSubmitButton}>
            Log In
          </button>

        </form>

      </div>

    </ModalForm>
  );
};






/*import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import css from './LoginForm.module.css';
import sprite from "../../../assets/symbol-defs.svg";
import { createPortal } from "react-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase"; // перевір шлях


type FormValues = {
  email: string;
  password: string;
};

const schema = yup.object({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().required("Password is required"),
});

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}


const LoginForm: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const [showPassword, setShowPassword] = React.useState(false);

  const onSubmit = async (data: FormValues) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      onClose();
      reset();
    } catch (error) {
      alert("Invalid email or password");
      console.error(error);
    }
  };

  // Close on Esc
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

    return createPortal(
      <div className={css.backdrop} onClick={onClose}>  
        <div className={css.modal} onClick={(e) => e.stopPropagation()}>
          <button className={css.closeButton} onClick={onClose}>
            <svg className={css.closeIcon} width="32" height="32">
                <use href={`${sprite}#icon-x`} />
            </svg>
          </button>

          <div className={css.wrapper}>
            <div className={css.content}>
              <h2 className={css.title}>Log In</h2>
              <p className={css.description}>
                Welcome back! Please enter your credentials to access your account 
                and continue your babysitter search.
              </p>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
              <div className={css.fieldGroup}>
                <input 
                  type="email" 
                  className={css.input} 
                  placeholder='Email' 
                  {...register("email")} 
                />

                {errors.email && 
                  <p className={css.error}>{errors.email.message}</p>
                }
              </div>
              
              <div className={css.fieldGroup}>
                <div className={css.inputWrapper}>
                    
                  <input 
                    type={showPassword ? "text" : "password"} 
                    className={css.input}
                    placeholder='Password' 
                    autoComplete="current-password"
                    {...register("password")} 
                  />
         
                  <button 
                    type="button" 
                    className={css.passwordToggle} 
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label="Toggle password visibility"
                  >
                    <svg className={css.passwordIcon} viewBox="0 0 32 32" width="20" height="20">
                      <use href={`${sprite}#${showPassword ? "icon-eye-open" : "icon-eye-off"}`} />
                    </svg>
                  </button>
                </div>  
                    
                {errors.password && 
                  <p className={css.error}>{errors.password.message}</p>
                }
              </div>

              <button type="submit" className={css.submitButton}>
                Log In
              </button>
            </form>
          </div>
        </div>
      </div>,  
      document.getElementById("modal-root") as HTMLElement
    );
}

export default LoginForm;*/