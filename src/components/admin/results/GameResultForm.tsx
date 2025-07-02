
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMutation, useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

interface GameResult {
  id: string;
  game_id: string;
  home_team_score: number;
  away_team_score: number;
  game_status: string;
  start_time: string;
  end_time: string;
}

interface GameResultFormProps {
  result?: GameResult;
  onSuccess: () => void;
}

const GameResultForm: React.FC<GameResultFormProps> = ({ result, onSuccess }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    game_id: '',
    home_team_score: 0,
    away_team_score: 0,
    game_status: 'scheduled',
    start_time: '',
    end_time: ''
  });

  // Fetch available games
  const { data: games = [] } = useQuery({
    queryKey: ['games-for-results'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('games')
        .select('*')
        .order('scheduled_date', { ascending: false });

      if (error) throw error;
      return data || [];
    }
  });

  useEffect(() => {
    if (result) {
      setFormData({
        game_id: result.game_id || '',
        home_team_score: result.home_team_score || 0,
        away_team_score: result.away_team_score || 0,
        game_status: result.game_status || 'scheduled',
        start_time: result.start_time ? result.start_time.slice(0, 16) : '',
        end_time: result.end_time ? result.end_time.slice(0, 16) : ''
      });
    }
  }, [result]);

  const saveMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      if (result) {
        // Update existing result
        const { error } = await supabase
          .from('game_results')
          .update({
            ...data,
            start_time: data.start_time ? new Date(data.start_time).toISOString() : null,
            end_time: data.end_time ? new Date(data.end_time).toISOString() : null,
          })
          .eq('id', result.id);

        if (error) throw error;
      } else {
        // Create new result
        const { error } = await supabase
          .from('game_results')
          .insert({
            ...data,
            start_time: data.start_time ? new Date(data.start_time).toISOString() : null,
            end_time: data.end_time ? new Date(data.end_time).toISOString() : null,
          });

        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast({
        title: "Sucesso",
        description: result 
          ? "Resultado atualizado com sucesso" 
          : "Resultado criado com sucesso",
      });
      onSuccess();
    },
    onError: (error: any) => {
      toast({
        title: "Erro",
        description: "Erro ao guardar resultado: " + error.message,
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.game_id) {
      toast({
        title: "Erro",
        description: "Selecione um jogo",
        variant: "destructive",
      });
      return;
    }
    saveMutation.mutate(formData);
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="game_id">Jogo *</Label>
          <Select value={formData.game_id} onValueChange={(value) => handleInputChange('game_id', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione um jogo" />
            </SelectTrigger>
            <SelectContent>
              {games.map((game) => (
                <SelectItem key={game.id} value={game.id}>
                  {game.home_team_id} vs {game.away_team_id} - {new Date(game.scheduled_date).toLocaleDateString('pt-PT')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="home_team_score">Resultado Equipa Casa</Label>
          <Input
            id="home_team_score"
            type="number"
            min="0"
            value={formData.home_team_score}
            onChange={(e) => handleInputChange('home_team_score', parseInt(e.target.value) || 0)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="away_team_score">Resultado Equipa Visitante</Label>
          <Input
            id="away_team_score"
            type="number"
            min="0"
            value={formData.away_team_score}
            onChange={(e) => handleInputChange('away_team_score', parseInt(e.target.value) || 0)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="game_status">Estado do Jogo</Label>
          <Select value={formData.game_status} onValueChange={(value) => handleInputChange('game_status', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="scheduled">Agendado</SelectItem>
              <SelectItem value="in-progress">A Decorrer</SelectItem>
              <SelectItem value="completed">Finalizado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="start_time">Hora de Início</Label>
          <Input
            id="start_time"
            type="datetime-local"
            value={formData.start_time}
            onChange={(e) => handleInputChange('start_time', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="end_time">Hora de Fim</Label>
          <Input
            id="end_time"
            type="datetime-local"
            value={formData.end_time}
            onChange={(e) => handleInputChange('end_time', e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button
          type="submit"
          className="bg-cv-blue hover:bg-cv-blue/90"
          disabled={saveMutation.isPending}
        >
          {saveMutation.isPending ? (
            <LoadingSpinner size="sm" />
          ) : (
            result ? 'Atualizar Resultado' : 'Criar Resultado'
          )}
        </Button>
      </div>
    </form>
  );
};

export default GameResultForm;
