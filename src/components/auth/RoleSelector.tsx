
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export type DetailedRole = 
  | 'admin' 
  | 'editor' 
  | 'moderator' 
  | 'treinador' 
  | 'arbitro' 
  | 'dirigente' 
  | 'jornalista' 
  | 'user';

export const ROLE_LABELS: Record<DetailedRole, string> = {
  admin: 'Administrador',
  editor: 'Editor',
  moderator: 'Moderador',
  treinador: 'Treinador',
  arbitro: 'Árbitro',
  dirigente: 'Dirigente',
  jornalista: 'Jornalista',
  user: 'Utilizador'
};

export const ROLE_DESCRIPTIONS: Record<DetailedRole, string> = {
  admin: 'Acesso total ao sistema',
  editor: 'Pode criar e editar conteúdo',
  moderator: 'Pode moderar conteúdo',
  treinador: 'Acesso para treinadores de clubes',
  arbitro: 'Acesso para árbitros e oficiais',
  dirigente: 'Acesso para dirigentes de clubes',
  jornalista: 'Acesso para profissionais de imprensa',
  user: 'Acesso básico apenas para visualização'
};

interface RoleSelectorProps {
  value: DetailedRole;
  onChange: (role: DetailedRole) => void;
  disabled?: boolean;
  showDescription?: boolean;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ 
  value, 
  onChange, 
  disabled = false,
  showDescription = true 
}) => {
  return (
    <div className="space-y-2">
      <Label>Função/Privilégio</Label>
      <Select 
        value={value} 
        onValueChange={(val) => onChange(val as DetailedRole)}
        disabled={disabled}
      >
        <SelectTrigger>
          <SelectValue placeholder="Selecione uma função" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(ROLE_LABELS).map(([role, label]) => (
            <SelectItem key={role} value={role}>
              <div className="flex flex-col">
                <span className="font-medium">{label}</span>
                {showDescription && (
                  <span className="text-xs text-gray-500">
                    {ROLE_DESCRIPTIONS[role as DetailedRole]}
                  </span>
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default RoleSelector;
