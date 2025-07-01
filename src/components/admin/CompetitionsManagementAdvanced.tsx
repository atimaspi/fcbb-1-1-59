
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useBackendData } from '@/hooks/useBackendData';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Trophy, CalendarIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const CompetitionsManagementAdvanced = () => {
  const { competitions, isLoading, operations } = useBackendData();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCompetition, setEditingCompetition] = useState(null);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    season: '',
    status: 'ativo',
    description: '',
    regulations_url: ''
  });

  const competitionTypes = [
    { value: 'liga', label: 'Liga' },
    { value: 'taca', label: 'Taça' },
    { value: 'regional', label: 'Regional' },
    { value: 'juventude', label: 'Juventude' },
    { value: 'feminino', label: 'Feminino' },
    { value: 'veteranos', label: 'Veteranos' }
  ];

  const statusOptions = [
    { value: 'ativo', label: 'Ativo' },
    { value: 'programado', label: 'Programado' },
    { value: 'concluido', label: 'Concluído' },
    { value: 'suspenso', label: 'Suspenso' },
    { value: 'cancelado', label: 'Cancelado' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const competitionData = {
        ...formData,
        start_date: startDate?.toISOString().split('T')[0] || null,
        end_date: endDate?.toISOString().split('T')[0] || null
      };

      if (editingCompetition) {
        await operations.competitions.update.mutateAsync({ 
          id: editingCompetition.id, 
          data: competitionData 
        });
        toast({
          title: "Sucesso",
          description: "Competição atualizada com sucesso!"
        });
      } else {
        await operations.competitions.create.mutateAsync(competitionData);
        toast({
          title: "Sucesso", 
          description: "Competição criada com sucesso!"
        });
      }
      
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao salvar competição",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (competition: any) => {
    setEditingCompetition(competition);
    setFormData({
      name: competition.name || '',
      type: competition.type || '',
      season: competition.season || '',
      status: competition.status || 'ativo',
      description: competition.description || '',
      regulations_url: competition.regulations_url || ''
    });
    if (competition.start_date) {
      setStartDate(new Date(competition.start_date));
    }
    if (competition.end_date) {
      setEndDate(new Date(competition.end_date));
    }
    setIsDialogOpen(true);
  };

  const handleDelete = async (competitionId: string) => {
    if (confirm('Tem certeza que deseja eliminar esta competição?')) {
      try {
        await operations.competitions.delete.mutateAsync(competitionId);
        toast({
          title: "Sucesso",
          description: "Competição eliminada com sucesso!"
        });
      } catch (error) {
        toast({
          title: "Erro",
          description: "Erro ao eliminar competição",
          variant: "destructive"
        });
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      type: '',
      season: '',
      status: 'ativo',
      description: '',
      regulations_url: ''
    });
    setStartDate(undefined);
    setEndDate(undefined);
    setEditingCompetition(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-cv-blue flex items-center gap-2">
            <Trophy className="h-6 w-6" />
            Gestão de Competições
          </h2>
          <p className="text-gray-600">Gerir campeonatos, ligas e torneios</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Nova Competição
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingCompetition ? 'Editar Competição' : 'Nova Competição'}
              </DialogTitle>
              <DialogDescription>
                Preencha as informações da competição
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Nome da Competição *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                  placeholder="Ex: Liga Nacional Masculina 2024/25"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Tipo *</Label>
                  <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {competitionTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="season">Época *</Label>
                  <Input
                    id="season"
                    value={formData.season}
                    onChange={(e) => handleInputChange('season', e.target.value)}
                    required
                    placeholder="Ex: 2024/2025"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Data de Início</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "dd/MM/yyyy") : <span>Selecionar data</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label>Data de Fim</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "dd/MM/yyyy") : <span>Selecionar data</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((status) => (
                      <SelectItem key={status.value} value={status.value}>{status.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Descrição da competição..."
                />
              </div>

              <div>
                <Label htmlFor="regulations_url">URL do Regulamento</Label>
                <Input
                  id="regulations_url"
                  type="url"
                  value={formData.regulations_url}
                  onChange={(e) => handleInputChange('regulations_url', e.target.value)}
                  placeholder="https://..."
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1">
                  {editingCompetition ? 'Atualizar' : 'Criar'} Competição
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Competições Ativas ({competitions.length})</CardTitle>
          <CardDescription>
            Lista de todas as competições no sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Época</TableHead>
                <TableHead>Período</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {competitions.map((competition: any) => (
                <TableRow key={competition.id}>
                  <TableCell className="font-medium">{competition.name}</TableCell>
                  <TableCell className="capitalize">{competition.type}</TableCell>
                  <TableCell>{competition.season}</TableCell>
                  <TableCell>
                    {competition.start_date && competition.end_date ? (
                      `${format(new Date(competition.start_date), 'dd/MM/yyyy')} - ${format(new Date(competition.end_date), 'dd/MM/yyyy')}`
                    ) : (
                      'Não definido'
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={competition.status === 'ativo' ? 'default' : 'secondary'}>
                      {competition.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEdit(competition)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDelete(competition.id)}
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

export default CompetitionsManagementAdvanced;
