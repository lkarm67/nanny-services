import { ModalForm } from "../ModalForm/ModalForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import css from "./LoginForm.module.css";
import sprite from "../../../assets/symbol-defs.svg";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";

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
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: FormValues) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      console.log("LOGIN SUCCESS:", userCredential.user);

      reset();
      onClose();
    } catch (error) {
      console.error("LOGIN ERROR:", error);
      setError("password", {
        type: "manual",
        message: "Invalid email or password",
      });
    }
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






