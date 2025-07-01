
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CourseCardProps {
  course: {
    title: string;
    duration: string;
    date: string;
    level: string;
    price: string;
    status: string;
  };
}

const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <h3 className="font-bold text-lg mb-3">{course.title}</h3>
        <div className="space-y-2 text-sm mb-4">
          <div className="flex justify-between">
            <span>Duração:</span>
            <span className="font-medium">{course.duration}</span>
          </div>
          <div className="flex justify-between">
            <span>Data:</span>
            <span className="font-medium">{course.date}</span>
          </div>
          <div className="flex justify-between">
            <span>Nível:</span>
            <Badge variant="outline">{course.level}</Badge>
          </div>
          <div className="flex justify-between">
            <span>Preço:</span>
            <span className="font-bold text-cv-blue">{course.price}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Badge 
            variant={course.status === "Inscrições Abertas" ? "default" : "secondary"}
            className={course.status === "Inscrições Abertas" ? "bg-green-500" : ""}
          >
            {course.status}
          </Badge>
          <Button 
            size="sm" 
            className="bg-cv-blue hover:bg-blue-700"
            disabled={course.status !== "Inscrições Abertas"}
          >
            {course.status === "Inscrições Abertas" ? "Inscrever" : "Ver Detalhes"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
