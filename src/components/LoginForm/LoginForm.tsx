import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import css from './LoginForm.module.css';

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

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
    reset();
    onClose();
  };

  // Close on Esc
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

    return (
      <div className={css.backdrop} onClick={onClose}>  
        <div className={css.modal} onClick={(e) => e.stopPropagation()}>
          <button className={css.closeButton} onClick={onClose}>
            <svg>
                <use href="/src/assets/symbol-defs.svg#icon-x" />
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

                <div className={css.inputsContainer}>
                  <form onSubmit={handleSubmit(onSubmit)} className={css.form}>

                    <div className={css.fieldGroup}>
                      <input 
                        type={showPassword ? "text" : "password"} 
                        className={css.input}
                        placeholder='Password' 
                        {...register("password")} 
                    />

                    <button 
                      type="button" 
                      className={css.passwordToggle} 
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                        <svg className={css.passwordIcon}>
                          <use href={`/src/assets/symbol-defs.svg#${showPassword ? "icon-eye-open" : "icon-eye-off"}`} />
                        </svg>
                    </button>
                    
                      {errors.password && 
                        <p className={css.error}>{errors.password.message}</p>
                    }
                    </div>

                    <div className={css.fieldGroup}>
                      <input 
                        type="email" 
                        placeholder='Email' 
                        {...register("email")} />
                      {errors.email && 
                        <p className={css.error}>{errors.email.message}</p>
                    }
                    </div>

                    <button type="submit" className={css.submitButton}>
                      Log In
                    </button>
                  </form>  
                </div>

            </div>
        </div>
      </div>  
    );
}

export default LoginForm;

