import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import css from "./MakeAnAppointmentForm.module.css";
import sprite from "../../../assets/symbol-defs.svg";
import type { Nanny } from "../../../types/nannies";
import { ModalForm } from "../ModalForm/ModalForm";

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
  phone: yup
    .string()
    .matches(
      /^(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
      "Invalid phone number format"
    )
    .required("Phone number is required"),
  childAge: yup
    .number()
    .typeError("Child's age is required")
    .positive("Age must be a positive number")
    .required(),
  meetingTime: yup
    .string()
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Format HH:MM")
    .required("Preferred meeting time is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  parentName: yup.string().required("Father's or mother's name is required"),
  comments: yup
    .string()
    .min(2)
    .max(500, "Comments must be at most 500 characters long")
    .required("Comments are required"),
});

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  nanny: Nanny & {
    name: string;
    avatar_url: string;
  };
  onMakeAppointmentClick: (nanny: Nanny) => void;
}

const timeOptions = [
  "09:00","09:30","10:00","10:30",
];

export const MakeAnAppointmentForm: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  nanny,
}) => {

  const [isTimeOptionsShow, setIsTimeOptionsShow] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    trigger,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const meetingTime = useWatch({
    control,
    name: "meetingTime",
  });

  const handleTimeSelect = (time: string) => {
    setValue("meetingTime", time);
    trigger("meetingTime");
    setIsTimeOptionsShow(false);
  };

  const onSubmit = () => {
    toast.success("Your appointment request has been sent!");
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalForm
      isOpen={isOpen}
      onClose={handleClose}
      className={css.makeAnAppointmentModal}
    >
      <div className={css.modalContentWrapper}>

        <div className={css.modalHeader}>
          <h2 className={css.modalTitle}>
            Make an appointment with a babysitter
          </h2>

          <p className={css.modalDescription}>
            Arranging a meeting with a caregiver for your child is the first
            step to creating a safe and comfortable environment. Fill out the
            form below so we can match you with the perfect care partner.
          </p>
        </div>

        <div className={css.nannyInfo}>
          <img
            src={nanny.avatar_url}
            alt={nanny.name}
            className={css.nannyPhoto}
          />

          <div className={css.nannyName}>
            <p className={css.nannyNameText}>Your nanny</p>
            <p className={css.nannyNameSubtitle}>{nanny.name}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={css.modalForm}>

          <div className={css.fieldsWrapper}>
            <div className={css.modalFieldGroup}>
              <input
                type="text"
                className={errors.address ? css.modalInputError : css.modalInput}
                placeholder="Address"
                {...register("address")}
              />

              {errors.address && (
                <p className={css.error}>{errors.address.message}</p>
              )}
            </div>

            <div className={css.modalFieldGroup}>
              <input
                type="tel"
                className={errors.phone ? css.modalInputError : css.modalInput}
                placeholder="+380"
                {...register("phone")}
              />

              {errors.phone && (
                <p className={css.error}>{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div className={css.fieldsWrapper}>
            <div className={css.modalFieldGroup}>
              <input
                type="number"
                className={errors.childAge ? css.modalInputError : css.modalInput}
                placeholder="Child's age"
                {...register("childAge")}
              />

              {errors.childAge && (
                <p className={css.error}>{errors.childAge.message}</p>
              )}
            </div>

            <div className={css.modalFieldGroup}>
              <div className={css.modalInputWrapper}>

                <input
                  type="text"
                  className={errors.meetingTime ? css.modalInputError : css.modalInput}
                  placeholder="00:00"
                  readOnly
                  value={meetingTime || ""}
                  {...register("meetingTime")}
                  onClick={() =>
                    setIsTimeOptionsShow((prev) => !prev)
                  }
                />

                <button
                  type="button"
                  className={css.clockToggle}
                  onClick={() =>
                    setIsTimeOptionsShow((prev) => !prev)
                  }
                  aria-label="Select time"
                >
                  <svg
                    className={css.clockIcon}
                    viewBox="0 0 32 32"
                    width="20"
                    height="20"
                  >
                    <use href={`${sprite}#icon-clock`} />
                  </svg>
                </button>

                {isTimeOptionsShow && (
                  <div className={css.dropdown}> 
                    <p className={css.timeOptionsTitle}>Meeting time</p>  
                    <ul className={css.timeOptions}>
                      {timeOptions.map((meetingTime) => (
                        <li
                          key={meetingTime}
                          className={css.meetingTime}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTimeSelect(meetingTime);
                          }}
                        >
                          {meetingTime}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {errors.meetingTime && (
                <p className={css.error}>{errors.meetingTime.message}</p>
              )}
            </div>
          </div>

          <div className={css.modalFieldGroup}>
            <input
              type="email"
              className={errors.email ? css.modalInputError : css.modalInput}
              placeholder="Email"
              {...register("email")}
            />

            {errors.email && (
              <p className={css.error}>{errors.email.message}</p>
            )}
          </div>

          <div className={css.fieldGroup}>
            <input
              type="text"
              className={errors.parentName ? css.modalInputError : css.modalInput}
              placeholder="Father's or mother's name"
              {...register("parentName")}
            />

            {errors.parentName && (
              <p className={css.error}>{errors.parentName.message}</p>
            )}
          </div>

          <div className={css.fieldGroup}>
            <textarea
              className={errors.comments ? css.modalInputError : css.textarea}
              placeholder="Comments"
              {...register("comments")}
            />

            {errors.comments && (
              <p className={css.error}>{errors.comments.message}</p>
            )}
          </div>

          <button 
            type="submit" 
            className={css.modalSubmitButton} 
        >
            Send
          </button>



        </form>
      </div>
    </ModalForm>
  );
};

export default MakeAnAppointmentForm;