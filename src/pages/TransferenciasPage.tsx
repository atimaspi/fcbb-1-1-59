
import PageLayout from './PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, TrendingUp, TrendingDown, ArrowRightLeft, Calendar, User } from 'lucide-react';

const TransferenciasPage = () => {
  const recentTransfers = [
    {
      id: 1,
      player: "João Santos",
      position: "Base",
      fromClub: "CD Travadores",
      toClub: "Sporting CV",
      date: "2025-06-05",
      type: "Transferência",
      season: "2024/25",
      status: "Confirmada"
    },
    {
      id: 2,
      player: "Maria Silva",
      position: "Poste",
      fromClub: "CS Mindelense",
      toClub: "ABC Basket",
      date: "2025-06-02",
      type: "Empréstimo",
      season: "2024/25",
      status: "Pendente"
    },
    {
      id: 3,
      player: "Carlos Tavares",
      position: "Extremo",
      fromClub: "Barreirense",
      toClub: "Unitec Assomada",
      date: "2025-05-28",
      type: "Transferência",
      season: "2024/25",
      status: "Confirmada"
    },
    {
      id: 4,
      player: "Ana Rodrigues",
      position: "Base",
      fromClub: "Five Stars",
      toClub: "Praia BC",
      date: "2025-05-25",
      type: "Transferência Livre",
      season: "2024/25",
      status: "Confirmada"
    },
    {
      id: 5,
      player: "Pedro Lima",
      position: "Ala-Poste",
      fromClub: "Sal Rei BC",
      toClub: "GDRC Oliveirense",
      date: "2025-05-20",
      type: "Empréstimo",
      season: "2024/25",
      status: "Confirmada"
    }
  ];

  const transferStats = [
    { label: "Transferências Confirmadas", value: "47", trend: "up", change: "+12%" },
    { label: "Empréstimos Ativos", value: "23", trend: "up", change: "+8%" },
    { label: "Transferências Pendentes", value: "5", trend: "down", change: "-3%" },
    { label: "Jogadores Livres", value: "18", trend: "up", change: "+5%" }
  ];

  const topClubs = [
    { club: "Sporting CV", incoming: 8, outgoing: 4, net: "+4" },
    { club: "CD Travadores", incoming: 5, outgoing: 7, net: "-2" },
    { club: "ABC Basket", incoming: 6, outgoing: 3, net: "+3" },
    { club: "CS Mindelense", incoming: 4, outgoing: 6, net: "-2" },
    { club: "Unitec Assomada", incoming: 7, outgoing: 5, net: "+2" }
  ];

  const transferPeriods = [
    {
      name: "Período de Verão",
      start: "15 de Junho",
      end: "31 de Agosto",
      status: "Ativo",
      description: "Principal janela de transferências"
    },
    {
      name: "Período de Inverno",
      start: "1 de Janeiro",
      end: "31 de Janeiro",
      status: "Fechado",
      description: "Janela de transferências de meio de temporada"
    },
    {
      name: "Período Extraordinário",
      start: "1 de Setembro",
      end: "15 de Setembro",
      status: "Fechado",
      description: "Para situações excecionais aprovadas pela FCBB"
    }
  ];

  return (
    <PageLayout title="Transferências">
      <div className="space-y-6">
        {/* Transfer Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {transferStats.map((stat, index) => (
            <Card key={index} className="text-center border-t-4 border-cv-blue">
              <CardContent className="p-4">
                <div className="flex items-center justify-center mb-2">
                  {stat.trend === 'up' ? (
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-red-600" />
                  )}
                </div>
                <div className="text-2xl font-bold text-cv-blue">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
                <div className={`text-xs ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="recent" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="recent">Transferências Recentes</TabsTrigger>
            <TabsTrigger value="clubs">Por Clube</TabsTrigger>
            <TabsTrigger value="periods">Períodos</TabsTrigger>
            <TabsTrigger value="search">Pesquisar</TabsTrigger>
          </TabsList>

          {/* Recent Transfers */}
          <TabsContent value="recent" className="space-y-4">
            <div className="space-y-3">
              {recentTransfers.map((transfer) => (
                <Card key={transfer.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                      <div className="flex items-center space-x-3">
                        <User className="w-8 h-8 text-cv-blue" />
                        <div>
                          <h3 className="font-medium">{transfer.player}</h3>
                          <p className="text-sm text-gray-600">{transfer.position}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-sm font-medium">{transfer.fromClub}</span>
                        <ArrowRightLeft className="w-4 h-4 text-cv-blue" />
                        <span className="text-sm font-medium">{transfer.toClub}</span>
                      </div>
                      
                      <div className="text-center">
                        <Badge variant={
                          transfer.type === 'Transferência' ? 'default' :
                          transfer.type === 'Empréstimo' ? 'secondary' : 'outline'
                        }>
                          {transfer.type}
                        </Badge>
                        <div className="text-xs text-gray-500 mt-1">{transfer.date}</div>
                      </div>
                      
                      <div className="text-center">
                        <Badge variant={
                          transfer.status === 'Confirmada' ? 'default' :
                          transfer.status === 'Pendente' ? 'destructive' : 'secondary'
                        }>
                          {transfer.status}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Clubs Analysis */}
          <TabsContent value="clubs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-cv-blue">Movimento de Transferências por Clube</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topClubs.map((club, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{club.club}</h3>
                      </div>
                      <div className="flex items-center space-x-6 text-sm">
                        <div className="text-center">
                          <div className="text-green-600 font-bold">{club.incoming}</div>
                          <div className="text-xs text-gray-500">Entradas</div>
                        </div>
                        <div className="text-center">
                          <div className="text-red-600 font-bold">{club.outgoing}</div>
                          <div className="text-xs text-gray-500">Saídas</div>
                        </div>
                        <div className="text-center">
                          <div className={`font-bold ${club.net.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                            {club.net}
                          </div>
                          <div className="text-xs text-gray-500">Saldo</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Transfer Periods */}
          <TabsContent value="periods" className="space-y-4">
            <div className="space-y-4">
              {transferPeriods.map((period, index) => (
                <Card key={index} className={`border-l-4 ${
                  period.status === 'Ativo' ? 'border-green-500' : 'border-gray-400'
                }`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-cv-blue">{period.name}</h3>
                        <p className="text-gray-600 text-sm">{period.description}</p>
                        <div className="flex items-center space-x-2 mt-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span>{period.start} - {period.end}</span>
                        </div>
                      </div>
                      <Badge variant={period.status === 'Ativo' ? 'default' : 'secondary'}>
                        {period.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Card className="border-l-4 border-cv-yellow">
              <CardContent className="p-4">
                <h3 className="font-semibold text-cv-blue mb-2">Regulamento de Transferências</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Todas as transferências devem ser registadas na FCBB</li>
                  <li>• Prazo máximo de 15 dias para submeter documentação</li>
                  <li>• Taxa de transferência aplicável conforme regulamento</li>
                  <li>• Jogadores com dívidas não podem ser transferidos</li>
                  <li>• Limite máximo de transferências por clube por época</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Search */}
          <TabsContent value="search" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-cv-blue">Pesquisar Transferências</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <Input 
                      placeholder="Nome do jogador..." 
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Clube" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos os clubes</SelectItem>
                        <SelectItem value="sporting">Sporting CV</SelectItem>
                        <SelectItem value="travadores">CD Travadores</SelectItem>
                        <SelectItem value="abc">ABC Basket</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos os tipos</SelectItem>
                        <SelectItem value="transfer">Transferência</SelectItem>
                        <SelectItem value="loan">Empréstimo</SelectItem>
                        <SelectItem value="free">Transferência Livre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button className="flex-1">
                    <Search className="w-4 h-4 mr-2" />
                    Pesquisar
                  </Button>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtros Avançados
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8 text-center">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Utilize os filtros acima para pesquisar transferências</p>
                <p className="text-sm text-gray-500 mt-2">
                  Pode pesquisar por jogador, clube, tipo de transferência e período
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default TransferenciasPage;
