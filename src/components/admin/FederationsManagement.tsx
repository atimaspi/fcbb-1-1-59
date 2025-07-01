
import React, { useState, useEffect } from 'react';
import { useBackendData } from '@/hooks/useBackendData';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import ErrorDisplayCard from './federations/ErrorDisplayCard';
import FederationsHeader from './federations/FederationsHeader';
import FederationsContent from './federations/FederationsContent';

const FederationsManagement = () => {
  const { 
    federations, 
    federationsLoading, 
    federationsError, 
    operations,
    teamsError,
    clubsError,
    competitionsError,
    gamesError,
    playersError,
    newsError,
    eventsError,
    refereesError,
    regionalAssociationsError
  } = useBackendData();
  
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFederation, setEditingFederation] = useState<any>(null);
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    acronym: '',
    address: '',
    contact_email: '',
    contact_phone: '',
    website: '',
    logo_url: '',
    foundation_date: ''
  });

  // Simplified Supabase connection test
  useEffect(() => {
    const testSupabaseConnection = async () => {
      try {
        console.log('=== TESTING SUPABASE CONNECTION ===');
        
        const { data: directFederations, error: directError } = await supabase
          .from('federations')
          .select('*');
        console.log('Direct federations fetch:', { directFederations, directError });
        
        const { data: userData, error: userError } = await supabase.auth.getUser();
        console.log('Current user:', { userData, userError });
        
        setDebugInfo({
          directFetch: { directFederations, directError },
          currentUser: { userData, userError }
        });
        
        console.log('===========================');
      } catch (error: any) {
        console.error('Connection test error:', error);
        setDebugInfo({ error: error.message });
      }
    };

    testSupabaseConnection();
  }, []);

  // Log all errors
  useEffect(() => {
    console.log('=== ALL SYSTEM ERRORS ===');
    console.log('Teams error:', teamsError);
    console.log('Clubs error:', clubsError);
    console.log('Competitions error:', competitionsError);
    console.log('Games error:', gamesError);
    console.log('Players error:', playersError);
    console.log('News error:', newsError);
    console.log('Events error:', eventsError);
    console.log('Referees error:', refereesError);
    console.log('Federations error:', federationsError);
    console.log('Regional Associations error:', regionalAssociationsError);
    console.log('========================');
  }, [teamsError, clubsError, competitionsError, gamesError, playersError, newsError, eventsError, refereesError, federationsError, regionalAssociationsError]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name) {
      toast({
        title: "Erro",
        description: "Por favor, preencha o nome da federação.",
        variant: "destructive"
      });
      return;
    }

    try {
      console.log('Creating federation with data:', formData);
      
      if (editingFederation) {
        const result = await operations.federations.update.mutateAsync({ 
          id: editingFederation.id, 
          data: formData 
        });
        console.log('Update result:', result);
        toast({
          title: "Sucesso",
          description: "Federação atualizada com sucesso!"
        });
      } else {
        const result = await operations.federations.create.mutateAsync(formData);
        console.log('Create result:', result);
        toast({
          title: "Sucesso", 
          description: "Federação criada com sucesso!"
        });
      }
      
      setIsDialogOpen(false);
      resetForm();
      
    } catch (error: any) {
      console.error('Error saving federation:', error);
      toast({
        title: "Erro",
        description: `Erro ao salvar federação: ${error.message || 'Erro desconhecido'}`,
        variant: "destructive"
      });
    }
  };

  const handleEdit = (federation: any) => {
    setEditingFederation(federation);
    setFormData({
      name: federation.name || '',
      acronym: federation.acronym || '',
      address: federation.address || '',
      contact_email: federation.contact_email || '',
      contact_phone: federation.contact_phone || '',
      website: federation.website || '',
      logo_url: federation.logo_url || '',
      foundation_date: federation.foundation_date || ''
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (federationId: string) => {
    if (confirm('Tem certeza que deseja eliminar esta federação?')) {
      try {
        await operations.federations.delete.mutateAsync(federationId);
        toast({
          title: "Sucesso",
          description: "Federação eliminada com sucesso!"
        });
      } catch (error: any) {
        console.error('Error deleting federation:', error);
        toast({
          title: "Erro",
          description: `Erro ao eliminar federação: ${error.message || 'Erro desconhecido'}`,
          variant: "destructive"
        });
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      acronym: '',
      address: '',
      contact_email: '',
      contact_phone: '',
      website: '',
      logo_url: '',
      foundation_date: ''
    });
    setEditingFederation(null);
  };

  if (federationsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
        <span className="ml-2">Carregando federações...</span>
      </div>
    );
  }

  // Show all errors if any exist
  const allErrors = [
    { name: 'Federações', error: federationsError },
    { name: 'Equipas', error: teamsError },
    { name: 'Clubes', error: clubsError },
    { name: 'Competições', error: competitionsError },
    { name: 'Jogos', error: gamesError },
    { name: 'Jogadores', error: playersError },
    { name: 'Notícias', error: newsError },
    { name: 'Eventos', error: eventsError },
    { name: 'Árbitros', error: refereesError },
    { name: 'Associações Regionais', error: regionalAssociationsError }
  ].filter(item => item.error);

  return (
    <div className="space-y-6">
      <ErrorDisplayCard allErrors={allErrors} />

      <FederationsHeader
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        editingFederation={editingFederation}
        formData={formData}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        resetForm={resetForm}
      />

      <FederationsContent
        federations={federations}
        federationsError={federationsError}
        debugInfo={debugInfo}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreateClick={() => setIsDialogOpen(true)}
      />
    </div>
  );
};

export default FederationsManagement;
