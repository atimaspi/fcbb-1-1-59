
import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';

interface PlayersHeaderProps {
  onAddClick: () => void;
}

const PlayersHeader: React.FC<PlayersHeaderProps> = ({ onAddClick }) => {
  return (
    <div className="flex justify-between items-center">
      <h3 className="text-xl font-semibold text-cv-blue">Gestão de Jogadores</h3>
      <Button onClick={onAddClick} className="bg-cv-blue hover:bg-blue-700 flex items-center gap-2">
        <Plus size={18} />
        Adicionar Jogador
      </Button>
    </div>
  );
};

export default PlayersHeader;
