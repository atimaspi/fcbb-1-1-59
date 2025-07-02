
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Edit, Trash2, UserCheck, Mail, Phone } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface FederationMember {
  id: string;
  full_name: string;
  position: string;
  department: string;
  bio: string;
  photo_url: string;
  email: string;
  phone: string;
  active: boolean;
  status: string;
  order_priority: number;
  created_at: string;
}

const FederationMembersManager = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<FederationMember | null>(null);
  const [formData, setFormData] = useState({
    full_name: '',
    position: '',
    department: '',
    bio: '',
    photo_url: '',
    email: '',
    phone: '',
    active: true,
    status: 'publicado',
    order_priority: 0
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const positions = [
    'Presidente',
    'Vice-Presidente',
    'Secretário-Geral',
    'Tesoureiro',
    'Vogal',
    'Diretor Técnico',
    'Coordenador'
  ];

  const departments = [
    'Direção',
    'Administração',
    'Finanças',
    'Técnica',
    'Arbitragem',
    'Comunicação',
    'Jurídica'
  ];

  const { data: members = [], isLoading } = useQuery({
    queryKey: ['federation-members'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('federation_members')
        .select('*')
        .order('order_priority', { ascending: true });
      
      if (error) throw error;
      return data as FederationMember[];
    }
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const { error } = await supabase
        .from('federation_members')
        .insert([data]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['federation-members'] });
      setIsDialogOpen(false);
      resetForm();
      toast({ title: 'Membro criado com sucesso!' });
    },
    onError: () => {
      toast({ title: 'Erro ao criar membro', variant: 'destructive' });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: typeof formData }) => {
      const { error } = await supabase
        .from('federation_members')
        .update(data)
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['federation-members'] });
      setIsDialogOpen(false);
      resetForm();
      toast({ title: 'Membro atualizado com sucesso!' });
    },
    onError: () => {
      toast({ title: 'Erro ao atualizar membro', variant: 'destructive' });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('federation_members')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['federation-members'] });
      toast({ title: 'Membro eliminado com sucesso!' });
    },
    onError: () => {
      toast({ title: 'Erro ao eliminar membro', variant: 'destructive' });
    }
  });

  const resetForm = () => {
    setFormData({
      full_name: '',
      position: '',
      department: '',
      bio: '',
      photo_url: '',
      email: '',
      phone: '',
      active: true,
      status: 'publicado',
      order_priority: 0
    });
    setEditingMember(null);
  };

  const handleEdit = (member: FederationMember) => {
    setEditingMember(member);
    setFormData({
      full_name: member.full_name,
      position: member.position,
      department: member.department || '',
      bio: member.bio || '',
      photo_url: member.photo_url || '',
      email: member.email || '',
      phone: member.phone || '',
      active: member.active,
      status: member.status,
      order_priority: member.order_priority
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMember) {
      updateMutation.mutate({ id: editingMember.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">Carregando membros...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Gestão de Membros da Federação</h2>
          <p className="text-gray-600">Gerir membros da direção e estrutura da FCBB</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Novo Membro
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>
                {editingMember ? 'Editar Membro' : 'Novo Membro'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="full_name">Nome Completo</Label>
                  <Input
                    id="full_name"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="position">Cargo</Label>
                  <Select value={formData.position} onValueChange={(value) => setFormData({ ...formData, position: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar cargo" />
                    </SelectTrigger>
                    <SelectContent>
                      {positions.map((position) => (
                        <SelectItem key={position} value={position}>{position}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="department">Departamento</Label>
                  <Select value={formData.department} onValueChange={(value) => setFormData({ ...formData, department: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar departamento" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((department) => (
                        <SelectItem key={department} value={department}>{department}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="order_priority">Prioridade de Ordem</Label>
                  <Input
                    id="order_priority"
                    type="number"
                    value={formData.order_priority}
                    onChange={(e) => setFormData({ ...formData, order_priority: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="bio">Biografia</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="photo_url">URL da Fotografia</Label>
                <Input
                  id="photo_url"
                  type="url"
                  value={formData.photo_url}
                  onChange={(e) => setFormData({ ...formData, photo_url: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="status">Estado</Label>
                  <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="publicado">Publicado</SelectItem>
                      <SelectItem value="rascunho">Rascunho</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2 pt-8">
                  <Checkbox
                    id="active"
                    checked={formData.active}
                    onCheckedChange={(checked) => setFormData({ ...formData, active: checked as boolean })}
                  />
                  <Label htmlFor="active">Membro ativo</Label>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                  {editingMember ? 'Atualizar' : 'Criar'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="w-5 h-5" />
            Lista de Membros da Federação
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Membro</TableHead>
                <TableHead>Cargo</TableHead>
                <TableHead>Departamento</th>
                <TableHead>Estado</TableHead>
                <TableHead>Contacto</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      {member.photo_url && (
                        <img src={member.photo_url} alt={member.full_name} className="w-10 h-10 rounded-full" />
                      )}
                      <div>
                        <div className="font-medium">{member.full_name}</div>
                        <div className="text-sm text-gray-500">Prioridade: {member.order_priority}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{member.position}</Badge>
                  </TableCell>
                  <TableCell>{member.department}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <Badge variant={member.active ? 'default' : 'secondary'}>
                        {member.active ? 'Ativo' : 'Inativo'}
                      </Badge>
                      <Badge variant={member.status === 'publicado' ? 'default' : 'secondary'}>
                        {member.status === 'publicado' ? 'Publicado' : 'Rascunho'}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm space-y-1">
                      {member.email && (
                        <div className="flex items-center gap-1">
                          <Mail className="w-3 h-3 text-gray-400" />
                          {member.email}
                        </div>
                      )}
                      {member.phone && (
                        <div className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-gray-400" />
                          {member.phone}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(member)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteMutation.mutate(member.id)}
                        disabled={deleteMutation.isPending}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default FederationMembersManager;
