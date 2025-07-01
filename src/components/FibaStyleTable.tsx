
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface TeamStanding {
  position: number;
  team: string;
  logo: string;
  games: number;
  wins: number;
  losses: number;
  pointsFor: number;
  pointsAgainst: number;
  pointsDiff: number;
  percentage: number;
  form: ('W' | 'L')[];
  trend: 'up' | 'down' | 'same';
}

const FibaStyleTable = () => {
  const standings: TeamStanding[] = [
    {
      position: 1,
      team: "CD Travadores",
      logo: "/lovable-uploads/8c0e50b0-b06a-42cf-b3fc-9a08063308b3.png",
      games: 8,
      wins: 8,
      losses: 0,
      pointsFor: 672,
      pointsAgainst: 598,
      pointsDiff: 74,
      percentage: 100,
      form: ['W', 'W', 'W', 'W', 'W'],
      trend: 'same'
    },
    {
      position: 2,
      team: "Sporting CV",
      logo: "/lovable-uploads/8c0e50b0-b06a-42cf-b3fc-9a08063308b3.png",
      games: 8,
      wins: 7,
      losses: 1,
      pointsFor: 645,
      pointsAgainst: 610,
      pointsDiff: 35,
      percentage: 87.5,
      form: ['W', 'W', 'L', 'W', 'W'],
      trend: 'up'
    },
    {
      position: 3,
      team: "Académica Porto Novo",
      logo: "/lovable-uploads/8c0e50b0-b06a-42cf-b3fc-9a08063308b3.png",
      games: 8,
      wins: 6,
      losses: 2,
      pointsFor: 628,
      pointsAgainst: 605,
      pointsDiff: 23,
      percentage: 75,
      form: ['W', 'W', 'W', 'L', 'W'],
      trend: 'down'
    },
    {
      position: 4,
      team: "CS Mindelense",
      logo: "/lovable-uploads/8c0e50b0-b06a-42cf-b3fc-9a08063308b3.png",
      games: 8,
      wins: 5,
      losses: 3,
      pointsFor: 612,
      pointsAgainst: 598,
      pointsDiff: 14,
      percentage: 62.5,
      form: ['L', 'W', 'W', 'W', 'L'],
      trend: 'up'
    },
    {
      position: 5,
      team: "Five Stars",
      logo: "/lovable-uploads/8c0e50b0-b06a-42cf-b3fc-9a08063308b3.png",
      games: 8,
      wins: 4,
      losses: 4,
      pointsFor: 595,
      pointsAgainst: 601,
      pointsDiff: -6,
      percentage: 50,
      form: ['W', 'L', 'L', 'W', 'W'],
      trend: 'up'
    }
  ];

  const getTrendIcon = (trend: 'up' | 'down' | 'same') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  const getPositionStyle = (position: number) => {
    if (position <= 2) return "bg-green-50 border-l-4 border-green-500";
    if (position <= 8) return "bg-blue-50 border-l-4 border-blue-500";
    return "bg-red-50 border-l-4 border-red-500";
  };

  return (
    <Card className="shadow-xl">
      <CardHeader className="bg-gradient-to-r from-cv-blue to-cv-red text-white">
        <CardTitle className="text-2xl font-bold flex items-center">
          <span>Liga Nacional - Classificação</span>
          <Badge className="ml-4 bg-white text-cv-blue">
            8ª Jornada
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="w-12 text-center">#</TableHead>
                <TableHead className="w-8"></TableHead>
                <TableHead className="min-w-[200px]">Equipa</TableHead>
                <TableHead className="text-center w-16">J</TableHead>
                <TableHead className="text-center w-16">V</TableHead>
                <TableHead className="text-center w-16">D</TableHead>
                <TableHead className="text-center w-20">PF</TableHead>
                <TableHead className="text-center w-20">PS</TableHead>
                <TableHead className="text-center w-20">±</TableHead>
                <TableHead className="text-center w-20">%</TableHead>
                <TableHead className="text-center w-32">Forma</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {standings.map((team) => (
                <TableRow 
                  key={team.position} 
                  className={`hover:bg-gray-50 transition-colors ${getPositionStyle(team.position)}`}
                >
                  <TableCell className="text-center font-bold">
                    <div className="flex items-center justify-center space-x-2">
                      <span>{team.position}</span>
                      {getTrendIcon(team.trend)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <img 
                      src={team.logo} 
                      alt={team.team}
                      className="w-8 h-8 object-contain"
                    />
                  </TableCell>
                  <TableCell className="font-semibold">
                    {team.team}
                  </TableCell>
                  <TableCell className="text-center">{team.games}</TableCell>
                  <TableCell className="text-center font-semibold text-green-600">
                    {team.wins}
                  </TableCell>
                  <TableCell className="text-center font-semibold text-red-600">
                    {team.losses}
                  </TableCell>
                  <TableCell className="text-center">{team.pointsFor}</TableCell>
                  <TableCell className="text-center">{team.pointsAgainst}</TableCell>
                  <TableCell className={`text-center font-semibold ${
                    team.pointsDiff > 0 ? 'text-green-600' : team.pointsDiff < 0 ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {team.pointsDiff > 0 ? '+' : ''}{team.pointsDiff}
                  </TableCell>
                  <TableCell className="text-center font-bold">
                    {team.percentage.toFixed(1)}%
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center space-x-1">
                      {team.form.map((result, index) => (
                        <Badge 
                          key={index}
                          variant={result === 'W' ? 'default' : 'destructive'}
                          className={`w-6 h-6 p-0 text-xs ${
                            result === 'W' ? 'bg-green-500' : 'bg-red-500'
                          }`}
                        >
                          {result}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {/* Legend */}
        <div className="p-4 bg-gray-50 border-t">
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span>Top 2 - Playoff Final</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span>3º-8º - Playoffs</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span>Eliminação</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FibaStyleTable;
