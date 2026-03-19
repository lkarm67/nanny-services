import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import css from './RegisterForm.module.css';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../../firebase";
import { FirebaseError } from "firebase/app";
import { ModalForm } from '../ModalForm/ModalForm';
import { useState } from "react";

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


export const RegisterForm: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: FormValues) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(userCredential.user, {
        displayName: data.name,
      });

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
        alert(firebaseError.code);
      }
    }
  }
  
  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalForm isOpen={isOpen} onClose={handleClose} className={css.registerModal}>
      <div className={css.modalContentWrapper}>
        <div className={css.modalHeader}>
          <h2 className={css.modalTitle}>Registration</h2>
          <p className={css.modalDescription}>
            Thank you for your interest in our platform! 
            In order to register, we need some information. 
            Please provide us with the following information.
          </p>
        </div>
            
        <form onSubmit={handleSubmit(onSubmit)} className={css.modalForm}>
          <div className={css.modalFieldGroup}>
            <input 
              type="text" 
              className={css.modalInput} 
              placeholder='Name' 
              {...register("name")} 
            />

            {errors.name && 
              <p className={css.error}>{errors.name.message}</p>
            }
          </div>
              
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
                  <use href={`/sprite.svg#${showPassword ? "icon-eye-open" : "icon-eye-off"}`} />
                </svg>
              </button>
            </div>  
          
            {errors.password && 
              <p className={css.error}>{errors.password.message}</p>
            }
          </div>
        
          <button type="submit" className={css.modalSubmitButton}>
            Sign Up
          </button>
        </form>
      </div>
    </ModalForm>
  );
};