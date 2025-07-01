
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export type DetailedRole = 
  | 'admin' 
  | 'revisor' 
  | 'redator' 
  | 'editor' 
  | 'moderator' 
  | 'treinador' 
  | 'arbitro' 
  | 'dirigente' 
  | 'jornalista' 
  | 'user';

interface RoleSelectorProps {
  value: DetailedRole;
  onValueChange: (value: DetailedRole) => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ value, onValueChange }) => {
  const roleLabels: Record<DetailedRole, string> = {
    admin: 'Administrador',
    revisor: 'Revisor',
    redator: 'Redator',
    editor: 'Editor',
    moderator: 'Moderador',
    treinador: 'Treinador',
    arbitro: 'Árbitro',
    dirigente: 'Dirigente',
    jornalista: 'Jornalista',
    user: 'Utilizador'
  };

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder="Selecionar role" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(roleLabels).map(([role, label]) => (
          <SelectItem key={role} value={role}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default RoleSelector;
