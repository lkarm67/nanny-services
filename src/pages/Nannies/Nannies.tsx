import { useEffect, useState } from 'react';
import { FiltersBlock } from '../../components/FiltersBlock/FiltersBlock';
import { LoadMoreBtn } from '../../components/LoadMoreBtn/LoadMoreBtn';
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
    <div className={css.nanniesPage}>
      <FiltersBlock />
    
      <ul className={css.nanniesList}>
        {nannies.map((nanny) => (
          <NannyCard 
            key={`${nanny.name}-${nanny.location}-${nanny.price_per_hour}`} 
            nanny={nanny} 
          />
        ))}
      </ul>
      
      {hasMore && (
        <LoadMoreBtn
          onClick={loadMore}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Load more"}
        </LoadMoreBtn>
       )}
    </div>
  );
};

export default Nannies;







