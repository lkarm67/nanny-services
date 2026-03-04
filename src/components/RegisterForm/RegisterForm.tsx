import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import css from './RegisterForm.module.css';
import sprite from "../../assets/symbol-defs.svg";
import { createPortal } from "react-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { FirebaseError } from "firebase/app";

type FormValues = {
  name: string;
  email: string;
  password: string;
};

const schema = yup.object({
  name: yup.string().required("Name is required"),  
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}


const RegisterForm: React.FC<ModalProps> = ({ isOpen, onClose }) => {
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
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      console.log("User registered:", userCredential.user);

      alert("Registration successful");

      reset();
      onClose();
    } catch (error) {
      const firebaseError = error as FirebaseError;  
      console.error(firebaseError);

      if (firebaseError.code === "auth/email-already-in-use") {
        alert("This email is already registered");
      } else if (firebaseError.code === "auth/weak-password") {
        alert("Password should be at least 6 characters");
      } else {
        alert("Something went wrong");
      }
    }
  }


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
              <h2 className={css.title}>Registration</h2>
              <p className={css.description}>
                Thank you for your interest in our platform! 
                In order to register, we need some information. 
                Please provide us with the following information.
              </p>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
              <div className={css.fieldGroup}>
                <input 
                  type="text" 
                  className={css.input} 
                  placeholder='Name' 
                  {...register("name")} 
                />

                {errors.name && 
                  <p className={css.error}>{errors.name.message}</p>
                }
              </div>
              
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
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>,  
      document.getElementById("modal-root") as HTMLElement
    );
}

export default RegisterForm;