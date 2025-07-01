
import { useState, useEffect } from 'react';

interface Competition {
  id: number;
  name: string;
  type: string;
  season: string;
  status: string;
  description: string;
  participants: number;
  startDate: string;
  endDate: string;
  currentChampion: string;
  website: string;
}

interface CompetitionsData {
  competitions: Competition[];
}

export const useCompetitionsData = () => {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/competitions.json');
        if (!response.ok) {
          throw new Error('Erro ao carregar dados das competições');
        }
        const data: CompetitionsData = await response.json();
        setCompetitions(data.competitions);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchCompetitions();
  }, []);

  return { competitions, loading, error };
};
