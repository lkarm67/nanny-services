import { useEffect, useState } from 'react';
import { NannyCard } from '../../components/NannyCard/NannyCard';
import type { Nanny } from '../../types/nannies';
import css from './Nannies.module.css';

const Nannies: React.FC = () => {
  const [nannies, setNannies] = useState<Nanny[]>([]);

  useEffect(() => {
    fetch('/babysitters.json')
      .then(res => res.json())
      .then(data => setNannies(data));
  }, []);

  return (
    <ul className={css.nanniesList}>
      {nannies.map((nanny) => (
        <NannyCard 
          key={`${nanny.name}-${nanny.location}-${nanny.price_per_hour}`} 
          nanny={nanny} 
        />
      ))}
    </ul>
  );
};

export default Nannies;









 /*key={`${nanny.name}-${nanny.location}-${nanny.price_per_hour}`}
          babysitter={{
            id: `${nanny.name}-${nanny.location}-${nanny.price_per_hour}`, // тільки для frontend
            name: nanny.name,
            avatar_url: nanny.avatar_url,
            experience: nanny.experience,
            kids_age: nanny.kids_age,
            price_per_hour: nanny.price_per_hour,
            location: nanny.location,
            about: nanny.about,
            rating: nanny.rating,
            isOnline: true, // ⚡ додаємо вручну для UI
          }}*/