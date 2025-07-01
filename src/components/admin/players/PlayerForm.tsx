
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";

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

interface PlayerFormProps {
  showDialog: boolean;
  editingItem: Player | null;
  formData: FormData;
  loading: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onFormDataChange: (data: FormData) => void;
}

const PlayerForm: React.FC<PlayerFormProps> = ({
  showDialog,
  editingItem,
  formData,
  loading,
  onClose,
  onSubmit,
  onFormDataChange
}) => {
  const handleInputChange = (field: keyof FormData, value: string | number) => {
    onFormDataChange({
      ...formData,
      [field]: value
    });
  };

  return (
    <Dialog open={showDialog} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>
            {editingItem ? 'Editar Jogador' : 'Adicionar Novo Jogador'}
          </DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para {editingItem ? 'atualizar' : 'registar'} o jogador.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="first_name" className="text-sm font-medium">
                  Primeiro Nome
                </label>
                <Input
                  id="first_name"
                  value={formData.first_name}
                  onChange={(e) => handleInputChange('first_name', e.target.value)}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="last_name" className="text-sm font-medium">
                  Último Nome
                </label>
                <Input
                  id="last_name"
                  value={formData.last_name}
                  onChange={(e) => handleInputChange('last_name', e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="club" className="text-sm font-medium">
                  Clube
                </label>
                <Input
                  id="club"
                  value={formData.club}
                  onChange={(e) => handleInputChange('club', e.target.value)}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="position" className="text-sm font-medium">
                  Posição
                </label>
                <select
                  id="position"
                  value={formData.position}
                  onChange={(e) => handleInputChange('position', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="Base">Base</option>
                  <option value="Extremo">Extremo</option>
                  <option value="Ala">Ala</option>
                  <option value="Poste-Baixo">Poste-Baixo</option>
                  <option value="Poste">Poste</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <label htmlFor="jersey_number" className="text-sm font-medium">
                  Número
                </label>
                <Input
                  id="jersey_number"
                  type="number"
                  value={formData.jersey_number}
                  onChange={(e) => handleInputChange('jersey_number', parseInt(e.target.value))}
                  min="0"
                  max="99"
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="age" className="text-sm font-medium">
                  Idade
                </label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
                  min="16"
                  max="50"
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="nationality" className="text-sm font-medium">
                  Nacionalidade
                </label>
                <Input
                  id="nationality"
                  value={formData.nationality}
                  onChange={(e) => handleInputChange('nationality', e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="status" className="text-sm font-medium">
                Estado
              </label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="active">Ativo</option>
                <option value="injured">Lesionado</option>
                <option value="suspended">Suspenso</option>
                <option value="inactive">Inativo</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-cv-blue" disabled={loading}>
              {loading ? 'A processar...' : editingItem ? 'Atualizar' : 'Registar'} Jogador
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PlayerForm;
