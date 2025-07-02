
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Calendar, MapPin, Users, Clock } from 'lucide-react';

interface Competition {
  id: string;
  name: string;
  type: string;
  status: string;
  season: string;
  start_date: string;
  end_date: string;
  description: string;
  venue: string;
  logo_url?: string;
  created_at: string;
}

interface CompetitionDetailsProps {
  competition: Competition;
}

const CompetitionDetails: React.FC<CompetitionDetailsProps> = ({ competition }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'upcoming': return 'bg-blue-500';
      case 'completed': return 'bg-gray-500';
      default: return 'bg-gray-400';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Ativa';
      case 'upcoming': return 'Próxima';
      case 'completed': return 'Finalizada';
      default: return 'Desconhecido';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'championship': return 'Campeonato';
      case 'cup': return 'Taça';
      case 'tournament': return 'Torneio';
      default: return type;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start space-x-4">
        {competition.logo_url ? (
          <img 
            src={competition.logo_url} 
            alt={competition.name}
            className="w-20 h-20 object-contain rounded-lg border"
          />
        ) : (
          <div className="w-20 h-20 bg-cv-blue rounded-lg flex items-center justify-center">
            <Trophy className="w-10 h-10 text-white" />
          </div>
        )}
        
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{competition.name}</h3>
          <div className="flex items-center space-x-4 mb-2">
            <Badge variant="outline">{getTypeLabel(competition.type)}</Badge>
            <Badge className={`${getStatusColor(competition.status)} text-white`}>
              {getStatusLabel(competition.status)}
            </Badge>
            <span className="text-sm text-gray-500">Época {competition.season}</span>
          </div>
        </div>
      </div>

      {/* Details Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-cv-blue" />
              <span>Datas</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="text-sm font-medium text-gray-500">Data de Início:</span>
              <p className="text-sm">
                {competition.start_date 
                  ? new Date(competition.start_date).toLocaleDateString('pt-PT', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    })
                  : 'Não definida'
                }
              </p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Data de Fim:</span>
              <p className="text-sm">
                {competition.end_date 
                  ? new Date(competition.end_date).toLocaleDateString('pt-PT', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    })
                  : 'Não definida'
                }
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-cv-blue" />
              <span>Local</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              {competition.venue || 'Local não definido'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-cv-blue" />
              <span>Informações Técnicas</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="text-sm font-medium text-gray-500">ID:</span>
              <p className="text-sm font-mono">{competition.id}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Criado em:</span>
              <p className="text-sm">
                {new Date(competition.created_at).toLocaleDateString('pt-PT', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-cv-blue" />
              <span>Estatísticas</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="text-sm font-medium text-gray-500">Equipas Participantes:</span>
              <p className="text-sm">A definir</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Jogos Agendados:</span>
              <p className="text-sm">A definir</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Description */}
      {competition.description && (
        <Card>
          <CardHeader>
            <CardTitle>Descrição</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">
              {competition.description}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CompetitionDetails;
