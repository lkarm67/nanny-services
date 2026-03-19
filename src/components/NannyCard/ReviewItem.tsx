import React from 'react';
import css from './NannyCard.module.css';

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
        <div className={css.reviewAvatar}>
          {review.reviewer.charAt(0).toUpperCase()}
        </div> 
        <div className={css.reviewerRating}>
          <p className={css.reviewReviewer}>{review.reviewer}</p>
          <div className={css.starReting}>
            <svg className={css.reviewStarReting} width="16" height="16">
              <use href="/sprite.svg#icon-star" />
            </svg>
            <span className={css.ratingText}> {review.rating}</span>
          </div>
        </div> 
      </div>
      <p className={css.reviewComment}>{review.comment}</p>
    </li>
  );
};