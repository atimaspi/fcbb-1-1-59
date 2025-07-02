
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

interface Competition {
  id: string;
  name: string;
  type: string;
  status: string;
  season: string;
  start_date: string;
  end_date: string;
  description: string;
  venue: string;
  logo_url?: string;
}

interface CompetitionFormProps {
  competition?: Competition;
  onSuccess: () => void;
}

const CompetitionForm: React.FC<CompetitionFormProps> = ({ competition, onSuccess }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    type: 'championship',
    status: 'upcoming',
    season: new Date().getFullYear().toString(),
    start_date: '',
    end_date: '',
    description: '',
    venue: '',
    logo_url: ''
  });

  useEffect(() => {
    if (competition) {
      setFormData({
        name: competition.name || '',
        type: competition.type || 'championship',
        status: competition.status || 'upcoming',
        season: competition.season || new Date().getFullYear().toString(),
        start_date: competition.start_date ? competition.start_date.split('T')[0] : '',
        end_date: competition.end_date ? competition.end_date.split('T')[0] : '',
        description: competition.description || '',
        venue: competition.venue || '',
        logo_url: competition.logo_url || ''
      });
    }
  }, [competition]);

  const saveMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      if (competition) {
        // Update existing competition
        const { error } = await supabase
          .from('championships')
          .update({
            ...data,
            start_date: data.start_date ? new Date(data.start_date).toISOString() : null,
            end_date: data.end_date ? new Date(data.end_date).toISOString() : null,
          })
          .eq('id', competition.id);

        if (error) throw error;
      } else {
        // Create new competition
        const { error } = await supabase
          .from('championships')
          .insert({
            ...data,
            start_date: data.start_date ? new Date(data.start_date).toISOString() : null,
            end_date: data.end_date ? new Date(data.end_date).toISOString() : null,
          });

        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast({
        title: "Sucesso",
        description: competition 
          ? "Competição atualizada com sucesso" 
          : "Competição criada com sucesso",
      });
      onSuccess();
    },
    onError: (error: any) => {
      toast({
        title: "Erro",
        description: "Erro ao guardar competição: " + error.message,
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast({
        title: "Erro",
        description: "O nome da competição é obrigatório",
        variant: "destructive",
      });
      return;
    }
    saveMutation.mutate(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome da Competição *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Ex: Campeonato Nacional 2024/25"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Tipo de Competição</Label>
          <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="championship">Campeonato</SelectItem>
              <SelectItem value="cup">Taça</SelectItem>
              <SelectItem value="tournament">Torneio</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Estado</Label>
          <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="upcoming">Próxima</SelectItem>
              <SelectItem value="active">Ativa</SelectItem>
              <SelectItem value="completed">Finalizada</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="season">Época</Label>
          <Input
            id="season"
            value={formData.season}
            onChange={(e) => handleInputChange('season', e.target.value)}
            placeholder="Ex: 2024/25"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="start_date">Data de Início</Label>
          <Input
            id="start_date"
            type="date"
            value={formData.start_date}
            onChange={(e) => handleInputChange('start_date', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="end_date">Data de Fim</Label>
          <Input
            id="end_date"
            type="date"
            value={formData.end_date}
            onChange={(e) => handleInputChange('end_date', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="venue">Local</Label>
          <Input
            id="venue"
            value={formData.venue}
            onChange={(e) => handleInputChange('venue', e.target.value)}
            placeholder="Ex: Pavilhão Nacional, Praia"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="logo_url">URL do Logotipo</Label>
          <Input
            id="logo_url"
            type="url"
            value={formData.logo_url}
            onChange={(e) => handleInputChange('logo_url', e.target.value)}
            placeholder="https://exemplo.com/logo.png"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Descrição da competição..."
          rows={4}
        />
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
            competition ? 'Atualizar Competição' : 'Criar Competição'
          )}
        </Button>
      </div>
    </form>
  );
};

export default CompetitionForm;
