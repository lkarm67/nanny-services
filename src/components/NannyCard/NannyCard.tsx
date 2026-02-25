// NannyCard.tsx
import React, { useState } from 'react';
import type { Nanny } from '../../types/nannies';
import css from './NannyCard.module.css';
import sprite from "../../assets/symbol-defs.svg";
import { useNavigate } from 'react-router-dom';
import { useAge } from '../../hooks/useAge';
import { ReviewItem } from './ReviewItem';



interface NannyCardProps {
  nanny: Nanny & { reviews?: { reviewer: string; rating: number; comment: string }[] };
}

export const NannyCard: React.FC<NannyCardProps> = ({ nanny }) => {
  const [showReviews, setShowReviews] = useState(false);
  const navigate = useNavigate();
  const age = useAge(nanny.birthday);

  const handleClick = () => {
    navigate("/login");
  };
  

  return (
    <div className={css.card}>
        <div className={css.avatarWrapper}>
          <img
            src={nanny.avatar_url}
            alt={nanny.name}
            className={css.avatar}
          /> 
          {nanny.isOnline && (
            <span className={css.onlineOuter}>
              <span className={css.onlineInner}></span>
            </span>
          )} 
        </div> 
        <div className={css.info}>
          <div className={css.infoTop}>
            <div className={css.infoTopDetailesFav}>
              <p className={css.infoTopCategory}>Nanny</p>  
              <div className={css.infoTopDetailesWrapper}>
                <ul className={css.infoTopDetailesList}>
                  <li className={css.detailesBox}> 
                    <svg width="16" height="16">
                      <use href={`${sprite}#icon-map-pin`} />
                    </svg> 
                    <span className={css.detailesText}>{nanny.location}</span> 
                  </li>
                  <li className={css.detailesBox}>
                    <svg width="16" height="16">
                      <use href={`${sprite}#icon-star`} />
                    </svg> 
                    <span className={css.detailesText}>Rating: {nanny.rating}</span>
                  </li>
                  <li className={css.detailesText}>Price / 1 hour: {nanny.price_per_hour}$</li>
                </ul>
                <button type="button" className={css.heartButton} onClick={handleClick}>
                  <svg className={css.heartIcon} width="26" height="26" aria-label="Add to favorites">
                    <use href={`${sprite}#icon-heart`} />
                  </svg>
                </button>
              </div>

            </div>
            <h3 className={css.infoTopName}>{nanny.name}</h3>  
          </div>
          
          <ul className={css.badgesList}>
            <li className={css.badgesItem}>
              Age:
              <span className={css.infoTopName}>{age}</span>
            </li>
            <li className={css.badgesItem}>
              Experience: 
              <span className={css.infoTopName}>{nanny.experience}</span>
            </li>
            <li className={css.badgesItem}>
              Kids Age: 
              <span className={css.infoTopName}>{nanny.kids_age}</span>
            </li>
            <li className={css.badgesItem}>
              Characters: 
              <span className={css.infoTopName}>{nanny.characters.join(', ')}</span>
            </li>
            <li className={css.badgesItem}>
              Education: 
              <span className={css.infoTopName}>{nanny.education}</span>
            </li>
          </ul>

          <p className={css.infoAbout}>{nanny.about}</p>

        </div>    
      
      {nanny.reviews && nanny.reviews.length > 0 && (
        <>
          <button 
            onClick={() => setShowReviews(prev => !prev)}
            className={css.readMoreButton}
          >
            {showReviews ? 'Hide Reviews' : 'Read more'}
          </button>

          {showReviews && (
            <ul className={css.reviewsList}>
              {nanny.reviews.length === 0 ? (
                <p className={css.noReview}>No review is found.</p>
              ) : (
                nanny.reviews.map((r, i) => <ReviewItem key={i} review={r} />)
           )}
            </ul>
  )}
  

          <button 
              onClick={() => navigate("/login")}
              className={css.makeAppointmentButton}
            >
            Make an appointment
          </button>
        </>
      )}
    </div>
  );
};

