import React, { useState, useEffect } from 'react';
import type { Nanny } from '../../types/nannies';
import css from './NannyCard.module.css';
import sprite from "../../assets/symbol-defs.svg";
import { useAge } from '../../hooks/useAge';
import { ReviewItem } from './ReviewItem';
import { useFavorites } from "../../context/FavoritesContext";
import { formatKey } from '../../utils/favoritesUtils';

/*import { toggleFavoriteInFirebase } from '../../services/favoritesService';*/

interface NannyCardProps {
  nanny: Nanny & {
    reviews?: { reviewer: string; rating: number; comment: string }[];
  };
  isLoggedIn: boolean;
  onMakeAnAppointmentClick: (nanny: Nanny) => void;
}

export const NannyCard: React.FC<NannyCardProps> = ({ nanny, onMakeAnAppointmentClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const age = useAge(nanny.birthday);
  const { favorites, toggleFavorite } = useFavorites();

  const isFavorite = favorites.includes(formatKey(nanny));

  const handleFavorite = async () => {

   /* if (!isLoggedIn) {
      onMakeAnAppointmentClick(nanny);
      return;
    }*/

    const key = formatKey(nanny);

    toggleFavorite(key);

    /*await toggleFavoriteInFirebase(key, isFavorite);*/
  };


  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleEsc);
    
    return () => {
        window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div 
          className={css.backdrop} 
          onClick={() => setIsOpen(false)}>
        </div>
      )}

      <div className={css.card}>
        <div className={css.cardTop}>
          {/* --- ФОТО --- */}
          <div className={css.avatarWrapper}>
            <img
              src={nanny.avatar_url}
              alt={nanny.name}
              className={css.avatar}
              width={120}
              height={120} 
            />

            <span className={css.onlineOuter}>
              <span className={css.onlineInner}></span>
            </span>
          </div>  

          {/* --- ГОЛОВНИЙ РЯД (ІНФО) --- */}
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
                  
                    <li className={css.detailesBox}> 
                      <p className={css.detailesText}>Price / 1 hour:  </p>
                      <span className={css.priceText}>{nanny.price_per_hour}$</span>
                    </li>
                  </ul>
                  <button type="button" 
                    className={css.heartButton} 
                    onClick={handleFavorite}
                  >
                    <svg className={isFavorite ? css.heartActive : css.heartIcon} width="26" height="26" aria-label="Add to favorites">
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
                <span className={css.badgeAge}>{age}</span>
              </li>
              <li className={css.badgesItem}>
                Experience: 
                <span className={css.badge}> {nanny.experience}</span>
              </li>
              <li className={css.badgesItem}>
                Kids Age: 
                <span className={css.badge}> {nanny.kids_age}</span>
              </li>
              <li className={css.badgesItem}>
                Characters: 
                <span className={css.badge}>{nanny.characters.join(', ')}</span>
              </li>
              <li className={css.badgesItem}>
                Education: 
                <span className={css.badge}> {nanny.education}</span>
              </li>
            </ul>

            <p className={css.infoAbout}>{nanny.about}</p>  
      
            <button 
              onClick={() => setIsOpen(prev => !prev)}
              className={css.readMoreButton}
            >
              {isOpen  ? '' : 'Read more'}
            </button>
          </div>
        </div>
      
      
      {/* --- НИЖНЯ ЧАСТИНА (РОЗКРИТТЯ) --- */}
      
      {isOpen && (
        <div className={css.cardBottom}>

          <ul className={css.reviewsList}>
            {nanny.reviews && nanny.reviews.length > 0 ? (
              nanny.reviews.map((r, i) => (
                <ReviewItem key={i} review={r} />
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </ul>

          <button
            onClick={() => {
              onMakeAnAppointmentClick(nanny);
            }}
           /*} onClick={() => {
              setIsOpen(false);
              setIsModalOpen(true);
            }}*/
            className={css.makeAppointmentButton}
          >
            Make an appointment
          </button>

        </div>
      )}

      {/* --- МОДАЛЬНЕ ВІКНО ЗАПИСУ НА ПРИЙОМ --- */}
      {/*<MakeAnAppointmentForm 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        nanny={nanny} 
        onMakeAppointmentClick={() => setIsModalOpen(false)} 
      />*/}
      </div>
    </>

  );
};

