import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import css from './LoginForm.module.css';
import sprite from "../../assets/symbol-defs.svg";
import { createPortal } from "react-dom";
import type { Nanny } from '../../types/nannies';

type FormValues = {
    address: string;
    phone: string;
    childAge: number;
    meetingTime: string;
    email: string;
    parentName: string;
    comments: string;
};

const schema = yup.object({
    address: yup.string().required("Address is required"),
    phone: yup.string().required("Phone number is required"),
    childAge: yup.number().required("Child's age is required").positive("Age must be a positive number"),
    meetingTime: yup.string().required("Preferred meeting time is required"),
    email: yup.string().email("Invalid email format").required("Email is required"),
    parentName: yup.string().required("Father's or mother's name is required"),
    comments: yup.string().min(2).max(500, "Comments must be at most 500 characters long").required("Comments are required"),
});

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    nanny: Nanny & {
      name: string;
      avatar_url: string;
    };
  onMakeAppointmentClick: () => void;
}

const timeOptions = [
    "09:00", 
    "09:30", 
    "10:00", 
    "10:30",
    "11:00",
    "11:30", 
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
];


const MakeAnAppointmentForm: React.FC<ModalProps> = ({ isOpen, onClose, nanny, onMakeAppointmentClick }) => {
    const [showTimer, setShowTimer] = React.useState(false);
    const {
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: FormValues) => {
        console.log("Form submitted:", data);
        reset();
        onClose();
        onMakeAppointmentClick();
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
                        <h2 className={css.title}>Make an appointment with a babysitter</h2>
                        <p className={css.description}>
                            Arranging a meeting with a caregiver for your child is 
                            the first step to creating a safe and comfortable environment. 
                            Fill out the form below so we can match you with the 
                            perfect care partner.
                        </p>
                    </div>

                    <div className={css.nannyInfo}>
                        <img 
                            src={nanny.avatar_url} 
                            alt="Nanny" 
                            className={css.nannyPhoto} 
                        />

                        <div className={css.nannyName}>
                            <p className={css.nannyNameText}></p>
                            <p className={css.nannyNameSubtitle}>{nanny.name}</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
                        <div className={css.fieldsWrapper}>
                            <div className={css.fieldGroup}>
                                <input 
                                    type="address" 
                                    className={css.inputShort} 
                                    placeholder='Address' 
                                />

                                {errors.address && 
                                    <p className={css.error}>{errors.address.message}</p>
                                }
                            </div>

                            <div className={css.fieldGroup}>
                                <input 
                                    type="phone" 
                                    className={css.inputShort} 
                                    placeholder='+380' 
                                />

                                {errors.phone && 
                                    <p className={css.error}>{errors.phone.message}</p>
                                }
                            </div>
                        </div>

                        <div className={css.fieldsWrapper}>
                            <div className={css.fieldGroup}>
                                <input 
                                    type="age" 
                                    className={css.inputShort} 
                                    placeholder="Child's age" 
                                />

                                {errors.childAge && 
                                    <p className={css.error}>{errors.childAge.message}</p>
                                }
                            </div>

                            <div className={css.fieldGroup}>
                                <div className={css.inputWrapper}>
                                    <input 
                                        type="time" 
                                        className={css.inputShort} 
                                        placeholder='00:00' 
                                    />

                                    <button 
                                        type="button" 
                                        className={css.passwordToggle} 
                                        onClick={() => setShowTimer((prev) => !prev)}
                                        aria-label="Toggle password visibility"
                                    >
                                        <svg className={css.passwordIcon} viewBox="0 0 32 32" width="20" height="20">
                                            <use href={`${sprite}#icon-clock`} />
                                        </svg>
                                    </button>
                                </div>

                                {errors.meetingTime && 
                                    <p className={css.error}>{errors.meetingTime.message}</p>
                                }
                            </div>
                        </div>

                        <div className={css.fieldGroup}>
                            <input 
                                type="email" 
                                className={css.input} 
                                placeholder='Email' 
                            />

                            {errors.email && 
                                <p className={css.error}>{errors.email.message}</p>
                            }
                        </div>

                        <div className={css.fieldGroup}>
                            <input 
                                type="name" 
                                className={css.input} 
                                placeholder="Father's or mother's name" 
                            />

                            {errors.parentName && 
                                <p className={css.error}>{errors.parentName.message}</p>
                            }
                        </div>

                        <div className={css.fieldGroup}>
                            <textarea 
                                className={css.textarea} 
                                placeholder='Comments' 
                            />

                            {errors.comments && 
                                <p className={css.error}>{errors.comments.message}</p>
                            }
                        </div>  

                        <button type="submit" className={css.submitButton}>
                            Comment
                        </button>                      
                    </form>
                </div>
            </div>
        </div>,
        document.getElementById("modal-root") as HTMLElement
    );
};

export default MakeAnAppointmentForm;