
import React from 'react';
import { Button } from '@/components/ui/button';
import { Building, Plus } from 'lucide-react';

interface FederationsEmptyStateProps {
  federationsError: any;
  onCreateClick: () => void;
}

const FederationsEmptyState: React.FC<FederationsEmptyStateProps> = ({
  federationsError,
  onCreateClick
}) => {
  return (
    <div className="text-center py-8">
      <Building className="mx-auto h-16 w-16 text-gray-400 mb-4" />
      <h3 className="text-lg font-semibold text-gray-600 mb-2">
        {federationsError 
          ? 'Erro ao carregar federações'
          : 'Nenhuma federação encontrada'
        }
      </h3>
      <p className="text-gray-500 mb-4">
        {federationsError 
          ? `Erro: ${federationsError.message}`
          : 'Comece criando a primeira federação'
        }
      </p>
      <Button onClick={onCreateClick}>
        <Plus className="w-4 h-4 mr-2" />
        Criar Primeira Federação
      </Button>
    </div>
  );
};

export default FederationsEmptyState;
