import { useEffect, useState } from "react";
import { getNannies } from "../services/nanniesService";
import type { Nanny } from "../types/nannies";

export const useNannies = () => {
  const [nannies, setNannies] = useState<Nanny[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNannies = async () => {
      try {
        const data = await getNannies();
        setNannies(data);
      } finally {
        setLoading(false);
      }
    };

    fetchNannies();
  }, []);

  return { nannies, loading };
};