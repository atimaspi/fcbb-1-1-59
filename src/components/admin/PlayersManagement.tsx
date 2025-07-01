
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import PlayersHeader from './players/PlayersHeader';
import PlayersTable from './players/PlayersTable';
import PlayerForm from './players/PlayerForm';

interface Player {
  id: string;
  first_name: string;
  last_name: string;
  club: string;
  position: string;
  jersey_number: number;
  age: number;
  nationality: string;
  status: string;
}

interface FormData {
  first_name: string;
  last_name: string;
  club: string;
  position: string;
  jersey_number: number;
  age: number;
  nationality: string;
  status: string;
}

const PlayersManagement = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<Player | null>(null);
  const [formData, setFormData] = useState<FormData>({
    first_name: '',
    last_name: '',
    club: '',
    position: 'Base',
    jersey_number: 0,
    age: 0,
    nationality: 'Cabo Verde',
    status: 'active'
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    setLoading(true);
    try {
      console.log('Fetching players...');
      const { data, error } = await supabase
        .from('players')
        .select('*')
        .order('created_at', { ascending: false });

      console.log('Players fetch result:', { data, error });

      if (error) {
        console.error('Erro ao carregar jogadores:', error);
        throw error;
      }

      const formattedPlayers = data?.map(item => ({
        id: item.id,
        first_name: item.first_name,
        last_name: item.last_name,
        club: item.club || '',
        position: item.position || 'Base',
        jersey_number: item.jersey_number || 0,
        age: item.age || 0,
        nationality: item.nationality || 'Cabo Verde',
        status: item.status === 'active' ? 'Ativo' : item.status === 'injured' ? 'Lesionado' : 'Inativo'
      })) || [];

      console.log('Formatted players:', formattedPlayers);
      setPlayers(formattedPlayers);
    } catch (error: any) {
      console.error('Erro ao carregar jogadores:', error);
      toast({
        title: "Erro",
        description: `Erro ao carregar jogadores: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    console.log('Adding new player');
    setEditingItem(null);
    setFormData({ first_name: '', last_name: '', club: '', position: 'Base', jersey_number: 0, age: 0, nationality: 'Cabo Verde', status: 'active' });
    setShowDialog(true);
  };

  const handleEdit = (item: Player) => {
    console.log('Editing player:', item);
    setEditingItem(item);
    setFormData({
      first_name: item.first_name,
      last_name: item.last_name,
      club: item.club,
      position: item.position,
      jersey_number: item.jersey_number,
      age: item.age,
      nationality: item.nationality,
      status: item.status === 'Ativo' ? 'active' : item.status === 'Lesionado' ? 'injured' : 'inactive'
    });
    setShowDialog(true);
  };

  const handleDelete = async (id: string) => {
    console.log('Delete button clicked for id:', id);
    if (!window.confirm('Tem certeza que deseja eliminar este jogador?')) {
      console.log('Delete cancelled by user');
      return;
    }

    setLoading(true);
    try {
      console.log('Deleting player with id:', id);
      const { error } = await supabase
        .from('players')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Delete error:', error);
        throw error;
      }

      console.log('Player deleted successfully');
      toast({
        title: "Sucesso",
        description: "Jogador eliminado com sucesso.",
      });

      await fetchPlayers();
    } catch (error: any) {
      console.error('Erro ao eliminar jogador:', error);
      toast({
        title: "Erro",
        description: `Erro ao eliminar jogador: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    setLoading(true);

    try {
      if (editingItem) {
        console.log('Updating player with id:', editingItem.id);
        const { data, error } = await supabase
          .from('players')
          .update({
            first_name: formData.first_name,
            last_name: formData.last_name,
            club: formData.club,
            position: formData.position,
            jersey_number: formData.jersey_number,
            age: formData.age,
            nationality: formData.nationality,
            status: formData.status
          })
          .eq('id', editingItem.id)
          .select();

        console.log('Update result:', { data, error });

        if (error) {
          console.error('Update error:', error);
          throw error;
        }

        toast({
          title: "Sucesso",
          description: "Jogador atualizado com sucesso.",
        });
      } else {
        console.log('Creating new player');
        const { data, error } = await supabase
          .from('players')
          .insert({
            first_name: formData.first_name,
            last_name: formData.last_name,
            club: formData.club,
            position: formData.position,
            jersey_number: formData.jersey_number,
            age: formData.age,
            nationality: formData.nationality,
            status: formData.status
          })
          .select();

        console.log('Insert result:', { data, error });

        if (error) {
          console.error('Insert error:', error);
          throw error;
        }

        toast({
          title: "Sucesso",
          description: "Jogador registado com sucesso.",
        });
      }

      setShowDialog(false);
      setFormData({ first_name: '', last_name: '', club: '', position: 'Base', jersey_number: 0, age: 0, nationality: 'Cabo Verde', status: 'active' });
      await fetchPlayers();
    } catch (error: any) {
      console.error('Erro ao salvar jogador:', error);
      toast({
        title: "Erro",
        description: `Erro ao salvar jogador: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setFormData({ first_name: '', last_name: '', club: '', position: 'Base', jersey_number: 0, age: 0, nationality: 'Cabo Verde', status: 'active' });
  };

  return (
    <div className="space-y-6">
      <PlayersHeader onAddClick={handleAdd} />
      
      <PlayersTable
        players={players}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <PlayerForm
        showDialog={showDialog}
        editingItem={editingItem}
        formData={formData}
        loading={loading}
        onClose={handleCloseDialog}
        onSubmit={handleSubmit}
        onFormDataChange={setFormData}
      />
    </div>
  );
};

export default PlayersManagement;
