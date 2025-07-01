
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import FederationsTable from './FederationsTable';
import FederationsDebugInfo from './FederationsDebugInfo';
import FederationsEmptyState from './FederationsEmptyState';

interface FederationsContentProps {
  federations: any[];
  federationsError: any;
  debugInfo: any;
  onEdit: (federation: any) => void;
  onDelete: (federationId: string) => void;
  onCreateClick: () => void;
}

const FederationsContent: React.FC<FederationsContentProps> = ({
  federations,
  federationsError,
  debugInfo,
  onEdit,
  onDelete,
  onCreateClick
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Federações ({federations?.length || 0})</CardTitle>
        <CardDescription>
          Lista de federações de basquetebol
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FederationsDebugInfo debugInfo={debugInfo} />
        
        {federations?.length > 0 ? (
          <FederationsTable
            federations={federations}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ) : (
          <FederationsEmptyState
            federationsError={federationsError}
            onCreateClick={onCreateClick}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default FederationsContent;
