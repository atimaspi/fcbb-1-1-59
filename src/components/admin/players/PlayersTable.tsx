
import React from 'react';
import { PenLine, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

interface PlayersTableProps {
  players: Player[];
  loading: boolean;
  onEdit: (player: Player) => void;
  onDelete: (id: string) => void;
}

const PlayersTable: React.FC<PlayersTableProps> = ({
  players,
  loading,
  onEdit,
  onDelete
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Clube</TableHead>
            <TableHead>Posição</TableHead>
            <TableHead>Nº</TableHead>
            <TableHead>Idade</TableHead>
            <TableHead>Nacionalidade</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center">Carregando...</TableCell>
            </TableRow>
          ) : players.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center">Nenhum jogador encontrado</TableCell>
            </TableRow>
          ) : (
            players.map((player) => (
              <TableRow key={player.id}>
                <TableCell className="font-medium">{`${player.first_name} ${player.last_name}`}</TableCell>
                <TableCell>{player.club}</TableCell>
                <TableCell>{player.position}</TableCell>
                <TableCell>{player.jersey_number}</TableCell>
                <TableCell>{player.age}</TableCell>
                <TableCell>{player.nationality}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    player.status === 'Ativo' ? 'bg-green-100 text-green-800' : 
                    player.status === 'Lesionado' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {player.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => onEdit(player)}
                      className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-1 rounded"
                      title="Editar"
                    >
                      <PenLine size={16} />
                    </button>
                    <button 
                      onClick={() => onDelete(player.id)}
                      className="text-red-600 hover:text-red-800 hover:bg-red-50 p-1 rounded"
                      title="Eliminar"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default PlayersTable;
