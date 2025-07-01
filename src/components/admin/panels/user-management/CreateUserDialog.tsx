
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';

interface CreateUserDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateUserDialog: React.FC<CreateUserDialogProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Criar Novo Utilizador</DialogTitle>
          <DialogDescription>
            Adicionar novo utilizador ao sistema
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="fullName">Nome Completo</Label>
            <Input id="fullName" placeholder="Nome completo" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="email@fcbb.cv" />
          </div>
          <div>
            <Label htmlFor="role">Perfil de Acesso</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecionar perfil" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Administrador</SelectItem>
                <SelectItem value="editor">Editor</SelectItem>
                <SelectItem value="gestor">Gestor</SelectItem>
                <SelectItem value="user">Utilizador</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="password">Palavra-passe Temporária</Label>
            <Input id="password" type="password" placeholder="••••••••" />
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="sendEmail" />
            <Label htmlFor="sendEmail">Enviar email de boas-vindas</Label>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button className="bg-cv-blue hover:bg-cv-blue/90">
              Criar Utilizador
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUserDialog;
