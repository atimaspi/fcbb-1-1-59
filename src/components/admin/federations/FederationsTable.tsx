
import React from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Trash2, Globe, Calendar } from 'lucide-react';

interface FederationsTableProps {
  federations: any[];
  onEdit: (federation: any) => void;
  onDelete: (federationId: string) => void;
}

const FederationsTable: React.FC<FederationsTableProps> = ({
  federations,
  onEdit,
  onDelete
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Acrónimo</TableHead>
          <TableHead>Contacto</TableHead>
          <TableHead>Website</TableHead>
          <TableHead>Fundação</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {federations.map((federation: any) => (
          <TableRow key={federation.id}>
            <TableCell className="font-medium">{federation.name}</TableCell>
            <TableCell>{federation.acronym || '—'}</TableCell>
            <TableCell>
              <div className="text-sm">
                {federation.contact_email && <div>{federation.contact_email}</div>}
                {federation.contact_phone && <div>{federation.contact_phone}</div>}
                {!federation.contact_email && !federation.contact_phone && '—'}
              </div>
            </TableCell>
            <TableCell>
              {federation.website ? (
                <a href={federation.website} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:underline">
                  <Globe className="h-3 w-3 mr-1" />
                  Website
                </a>
              ) : '—'}
            </TableCell>
            <TableCell>
              {federation.foundation_date ? (
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1 text-gray-400" />
                  {new Date(federation.foundation_date).toLocaleDateString('pt-PT')}
                </div>
              ) : '—'}
            </TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onEdit(federation)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onDelete(federation.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default FederationsTable;
