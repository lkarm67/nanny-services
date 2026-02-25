import React from 'react';
import css from './NannyCard.module.css';
import sprite from "../../assets/symbol-defs.svg";

interface Review {
  reviewer: string;
  rating: number;
  comment: string;
}

interface ReviewItemProps {
  review: Review;
}

export const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
  return (
    <li className={css.reviewItem}>
      <div className={css.reviewHeader}>
        <div className={css.avatar}>
          {review.reviewer.charAt(0).toUpperCase()}
        </div> 
        <div className={css.reviewerRating}>
          <p className={css.reviewReviewer}>{review.reviewer}</p>
          <div className={css.starReting}>
            <svg width="16" height="16">
              <use href={`${sprite}#icon-star`} />
            </svg>
            <span className={css.ratingText}>{review.rating}</span>
          </div>
        </div> 
      </div>
      <p className={css.reviewComment}>{review.comment}</p>
    </li>
  );
};