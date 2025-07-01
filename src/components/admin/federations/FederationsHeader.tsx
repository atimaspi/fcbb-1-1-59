
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Building, RefreshCw, Plus } from 'lucide-react';
import FederationForm from './FederationForm';

interface FederationsHeaderProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  editingFederation: any;
  formData: any;
  onInputChange: (field: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  resetForm: () => void;
}

const FederationsHeader: React.FC<FederationsHeaderProps> = ({
  isDialogOpen,
  setIsDialogOpen,
  editingFederation,
  formData,
  onInputChange,
  onSubmit,
  resetForm
}) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold text-cv-blue flex items-center gap-2">
          <Building className="h-6 w-6" />
          Gestão de Federações
        </h2>
        <p className="text-gray-600">Gerir federações de basquetebol</p>
      </div>
      
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          onClick={() => window.location.reload()}
          className="flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Recarregar
        </Button>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="bg-cv-blue hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Nova Federação
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingFederation ? 'Editar Federação' : 'Nova Federação'}
              </DialogTitle>
              <DialogDescription>
                Preencha as informações da federação
              </DialogDescription>
            </DialogHeader>
            <FederationForm
              formData={formData}
              isEditing={!!editingFederation}
              onInputChange={onInputChange}
              onSubmit={onSubmit}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default FederationsHeader;
