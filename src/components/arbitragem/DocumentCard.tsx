
import { Button } from "@/components/ui/button";
import { BookOpen } from 'lucide-react';

interface DocumentCardProps {
  document: {
    title: string;
    type: string;
    size: string;
  };
}

const DocumentCard = ({ document }: DocumentCardProps) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div className="flex items-center space-x-4">
        <BookOpen className="w-8 h-8 text-cv-blue" />
        <div>
          <h3 className="font-semibold">{document.title}</h3>
          <p className="text-sm text-gray-600">{document.type} • {document.size}</p>
        </div>
      </div>
      <Button variant="outline" size="sm">
        Download
      </Button>
    </div>
  );
};

export default DocumentCard;
