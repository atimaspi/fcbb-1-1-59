
import { Badge } from "@/components/ui/badge";

interface RefereeCardProps {
  referee: {
    name: string;
    level: string;
    experience: string;
    games: number;
    speciality: string;
    photo: string;
  };
}

const RefereeCard = ({ referee }: RefereeCardProps) => {
  return (
    <div className="text-center p-6 bg-gray-50 rounded-lg">
      <img 
        src={referee.photo} 
        alt={referee.name}
        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
      />
      <h3 className="font-bold text-lg mb-2">{referee.name}</h3>
      <Badge className="mb-3 bg-cv-blue">{referee.level}</Badge>
      <div className="space-y-2 text-sm text-gray-600">
        <div>{referee.experience} de experiência</div>
        <div>{referee.games} jogos arbitrados</div>
        <div className="font-medium text-cv-blue">{referee.speciality}</div>
      </div>
    </div>
  );
};

export default RefereeCard;
