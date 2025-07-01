
import PageLayout from '../PageLayout';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, Clock, MapPin, Trophy, Filter, Download, Share2, Bell } from 'lucide-react';
import { format, addDays, startOfMonth, endOfMonth, isSameDay, isValid } from 'date-fns';
import { pt } from 'date-fns/locale';

const CalendarioPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedMonth, setSelectedMonth] = useState('maio');
  const [selectedCompetition, setSelectedCompetition] = useState('todos');
  const [viewMode, setViewMode] = useState('lista');
  const [notifications, setNotifications] = useState(false);

  const jogosCalendario = [
    {
      id: 1,
      data: new Date(2025, 4, 25),
      hora: '18:00',
      competicao: 'Liga Nacional Masculina',
      jornada: 'Jornada 15',
      equipaCasa: 'ABC Basquete',
      equipaFora: 'Sporting CP',
      pavilhao: 'Pavilhão Municipal',
      cidade: 'Praia',
      status: 'agendado',
      fibaLiveStats: true,
      livestream: 'https://youtube.com/watch?v=abc123'
    },
    {
      id: 2,
      data: new Date(2025, 4, 26),
      hora: '20:00',
      competicao: 'Liga Nacional Feminina',
      jornada: 'Jornada 12',
      equipaCasa: 'Five Stars Feminino',
      equipaFora: 'Unidos Feminino',
      pavilhao: 'Pavilhão Vavá Duarte',
      cidade: 'Praia',
      status: 'agendado',
      fibaLiveStats: true,
      livestream: null
    },
    {
      id: 3,
      data: new Date(2025, 4, 27),
      hora: '19:30',
      competicao: 'Taça de Cabo Verde',
      jornada: 'Quartos de Final',
      equipaCasa: 'Benfica',
      equipaFora: 'FC Porto',
      pavilhao: 'Pavilhão Central',
      cidade: 'Mindelo',
      status: 'ao vivo',
      fibaLiveStats: true,
      livestream: 'https://youtube.com/watch?v=xyz789'
    },
    {
      id: 4,
      data: new Date(2025, 4, 28),
      hora: '17:00',
      competicao: 'Liga Nacional Masculina',
      jornada: 'Jornada 15',
      equipaCasa: 'CD Travadores',
      equipaFora: 'Académica',
      pavilhao: 'Pavilhão Desportivo',
      cidade: 'Santa Catarina',
      status: 'finalizado',
      resultado: '85-72',
      fibaLiveStats: true,
      livestream: null
    }
  ];

  const competicoes = [
    'Liga Nacional Masculina',
    'Liga Nacional Feminina', 
    'Taça de Cabo Verde',
    'Campeonatos Regionais'
  ];

  const meses = [
    'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
  ];

  const filteredJogos = selectedCompetition === 'todos' 
    ? jogosCalendario 
    : jogosCalendario.filter(jogo => jogo.competicao === selectedCompetition);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ao vivo': return 'bg-red-500 text-white animate-pulse';
      case 'finalizado': return 'bg-green-100 text-green-800';
      case 'agendado': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const exportCalendar = () => {
    const calendarData = filteredJogos.map(jogo => ({
      title: `${jogo.equipaCasa} vs ${jogo.equipaFora}`,
      date: isValid(jogo.data) ? format(jogo.data, 'yyyy-MM-dd') : '',
      time: jogo.hora,
      location: `${jogo.pavilhao}, ${jogo.cidade}`,
      competition: jogo.competicao
    }));
    
    const dataStr = JSON.stringify(calendarData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'calendario-fcbb.json';
    link.click();
  };

  const shareGame = (jogo: any) => {
    const formattedDate = isValid(jogo.data) ? format(jogo.data, 'dd/MM/yyyy') : 'Data inválida';
    
    if (navigator.share) {
      navigator.share({
        title: `${jogo.equipaCasa} vs ${jogo.equipaFora}`,
        text: `${jogo.competicao} - ${formattedDate} às ${jogo.hora}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(
        `${jogo.equipaCasa} vs ${jogo.equipaFora} - ${formattedDate} às ${jogo.hora}`
      );
      alert('Link copiado para a área de transferência!');
    }
  };

  const getDaysWithGames = () => {
    return jogosCalendario
      .map(jogo => jogo.data)
      .filter(date => isValid(date));
  };

  const safeFormat = (date: Date, formatString: string) => {
    if (!isValid(date)) {
      console.warn('Invalid date passed to format function:', date);
      return 'Data inválida';
    }
    return format(date, formatString, { locale: pt });
  };

  return (
    <PageLayout title="Calendário de Competições">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-cv-blue">
              <div className="flex items-center">
                <Filter className="mr-2 h-5 w-5" />
                Filtros e Controlos
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setNotifications(!notifications)}
                  className={notifications ? 'bg-cv-blue text-white' : ''}
                >
                  <Bell className="h-4 w-4 mr-1" />
                  Notificações
                </Button>
                <Button variant="outline" size="sm" onClick={exportCalendar}>
                  <Download className="h-4 w-4 mr-1" />
                  Exportar
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Competição</label>
                <select 
                  value={selectedCompetition}
                  onChange={(e) => setSelectedCompetition(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="todos">Todas as Competições</option>
                  {competicoes.map(comp => (
                    <option key={comp} value={comp}>{comp}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Mês</label>
                <select 
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  {meses.map(mes => (
                    <option key={mes} value={mes}>
                      {mes.charAt(0).toUpperCase() + mes.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Vista</label>
                <select 
                  value={viewMode}
                  onChange={(e) => setViewMode(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="lista">Lista</option>
                  <option value="calendario">Calendário</option>
                  <option value="agenda">Agenda</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={viewMode} onValueChange={setViewMode} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="lista">Lista de Jogos</TabsTrigger>
            <TabsTrigger value="calendario">Vista Calendário</TabsTrigger>
            <TabsTrigger value="agenda">Agenda Semanal</TabsTrigger>
          </TabsList>
          
          <TabsContent value="lista" className="space-y-4">
            {filteredJogos.map((jogo) => (
              <Card key={jogo.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-cv-blue text-white">{jogo.competicao}</Badge>
                        <Badge variant="outline">{jogo.jornada}</Badge>
                        <Badge className={getStatusColor(jogo.status)}>
                          {jogo.status.charAt(0).toUpperCase() + jogo.status.slice(1)}
                        </Badge>
                        {jogo.fibaLiveStats && (
                          <Badge className="bg-orange-500 text-white">FIBA LiveStats</Badge>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-3 items-center gap-4 mb-3">
                        <div className="text-right">
                          <p className="font-bold text-lg">{jogo.equipaCasa}</p>
                        </div>
                        <div className="text-center">
                          {jogo.status === 'finalizado' && jogo.resultado ? (
                            <span className="text-2xl font-bold text-cv-blue">{jogo.resultado}</span>
                          ) : (
                            <span className="text-2xl font-bold text-gray-400">VS</span>
                          )}
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-lg">{jogo.equipaFora}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <CalendarIcon className="w-4 h-4 mr-1" />
                          {safeFormat(jogo.data, 'dd/MM/yyyy')}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {jogo.hora}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {jogo.pavilhao}, {jogo.cidade}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex gap-2">
                        {jogo.fibaLiveStats && (
                          <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                            FIBA LiveStats
                          </Button>
                        )}
                        {jogo.livestream && (
                          <Button size="sm" className="bg-red-500 hover:bg-red-600">
                            Live Stream
                          </Button>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => shareGame(jogo)}
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          Ver Detalhes
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="calendario">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => date && setSelectedDate(date)}
                      modifiers={{
                        hasGame: getDaysWithGames()
                      }}
                      modifiersStyles={{
                        hasGame: { 
                          backgroundColor: '#1e40af', 
                          color: 'white',
                          fontWeight: 'bold'
                        }
                      }}
                      className="rounded-md border"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Jogos em {safeFormat(selectedDate, 'dd/MM/yyyy')}
                    </h3>
                    <div className="space-y-3">
                      {filteredJogos
                        .filter(jogo => isValid(jogo.data) && isSameDay(jogo.data, selectedDate))
                        .map(jogo => (
                          <Card key={jogo.id} className="p-4">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">{jogo.equipaCasa} vs {jogo.equipaFora}</p>
                                <p className="text-sm text-gray-600">{jogo.hora} - {jogo.pavilhao}</p>
                              </div>
                              <Badge className={getStatusColor(jogo.status)}>
                                {jogo.status}
                              </Badge>
                            </div>
                          </Card>
                        ))}
                      {filteredJogos.filter(jogo => isValid(jogo.data) && isSameDay(jogo.data, selectedDate)).length === 0 && (
                        <p className="text-gray-500">Nenhum jogo agendado para esta data.</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="agenda">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {Array.from({ length: 7 }, (_, i) => {
                    const currentDate = addDays(selectedDate, i);
                    const dayGames = filteredJogos.filter(jogo => isValid(jogo.data) && isSameDay(jogo.data, currentDate));
                    
                    return (
                      <div key={i} className="border-l-4 border-cv-blue pl-4">
                        <h4 className="font-semibold text-lg">
                          {safeFormat(currentDate, 'EEEE, dd/MM')}
                        </h4>
                        {dayGames.length > 0 ? (
                          <div className="space-y-2 mt-2">
                            {dayGames.map(jogo => (
                              <div key={jogo.id} className="bg-gray-50 p-3 rounded">
                                <div className="flex justify-between items-center">
                                  <div>
                                    <p className="font-medium">{jogo.equipaCasa} vs {jogo.equipaFora}</p>
                                    <p className="text-sm text-gray-600">
                                      {jogo.hora} - {jogo.pavilhao}, {jogo.cidade}
                                    </p>
                                  </div>
                                  <div className="flex gap-2">
                                    <Badge className={getStatusColor(jogo.status)}>
                                      {jogo.status}
                                    </Badge>
                                    {jogo.fibaLiveStats && (
                                      <Badge className="bg-orange-500 text-white">FIBA</Badge>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500 mt-2">Nenhum jogo agendado</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-cv-blue">
              <Trophy className="mr-2 h-5 w-5" />
              Próximos Destaques
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-r from-cv-blue to-cv-red text-white p-4 rounded-lg">
                <h4 className="font-bold">Final da Taça</h4>
                <p className="text-sm">30 de Junho • Pavilhão Nacional</p>
                <Button size="sm" variant="secondary" className="mt-2">
                  FIBA LiveStats
                </Button>
              </div>
              <div className="bg-gradient-to-r from-cv-red to-cv-yellow text-white p-4 rounded-lg">
                <h4 className="font-bold">Playoffs Liga Masculina</h4>
                <p className="text-sm">Início em 15 de Junho</p>
                <Button size="sm" variant="secondary" className="mt-2">
                  Ver Calendário
                </Button>
              </div>
              <div className="bg-gradient-to-r from-cv-yellow to-cv-blue text-white p-4 rounded-lg">
                <h4 className="font-bold">Liga Feminina</h4>
                <p className="text-sm">Final prevista para 20 de Junho</p>
                <Button size="sm" variant="secondary" className="mt-2">
                  Acompanhar Live
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default CalendarioPage;
