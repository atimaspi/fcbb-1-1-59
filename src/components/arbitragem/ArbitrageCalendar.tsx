
import { Badge } from "@/components/ui/badge";
import { Calendar } from 'lucide-react';

const ArbitrageCalendar = () => {
  const events = [
    {
      day: "15",
      month: "MAR",
      title: "Curso Básico de Arbitragem",
      location: "Pavilhão Municipal da Praia",
      type: "Formação",
      bgColor: "bg-blue-50",
      badgeColor: "bg-cv-blue"
    },
    {
      day: "22",
      month: "MAR",
      title: "Reunião Técnica de Árbitros",
      location: "Sede da FCBB",
      type: "Reunião",
      bgColor: "bg-green-50",
      badgeColor: "bg-green-500"
    },
    {
      day: "10",
      month: "ABR",
      title: "Exame de Progressão - Nível Nacional A",
      location: "Centro de Formação",
      type: "Avaliação",
      bgColor: "bg-orange-50",
      badgeColor: "bg-orange-500"
    }
  ];

  return (
    <div className="space-y-4">
      {events.map((event, index) => (
        <div key={index} className={`flex items-start space-x-4 p-4 ${event.bgColor} rounded-lg`}>
          <div className="text-center">
            <div className={`${event.badgeColor} text-white px-3 py-1 rounded-lg text-sm font-bold`}>
              {event.day}
            </div>
            <div className="text-xs text-gray-600">{event.month}</div>
          </div>
          <div className="flex-1">
            <h4 className="font-semibold">{event.title}</h4>
            <p className="text-sm text-gray-600">{event.location}</p>
            <Badge variant="outline" className="mt-2">{event.type}</Badge>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArbitrageCalendar;
