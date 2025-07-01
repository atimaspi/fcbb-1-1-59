
import { useState, useEffect } from 'react';

interface Club {
  id: number;
  name: string;
  island: string;
  founded: number;
  logo: string;
  description: string;
  championships: number;
  website: string;
  social: {
    facebook: string;
    instagram: string;
  };
}

interface ClubsData {
  clubs: Club[];
}

export const useClubsData = () => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/clubs.json');
        if (!response.ok) {
          throw new Error('Erro ao carregar dados dos clubes');
        }
        const data: ClubsData = await response.json();
        setClubs(data.clubs);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchClubs();
  }, []);

  return { clubs, loading, error };
};
