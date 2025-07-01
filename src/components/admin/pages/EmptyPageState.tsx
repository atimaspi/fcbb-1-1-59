
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { FileText } from 'lucide-react';

const EmptyPageState = () => {
  return (
    <Card>
      <CardContent className="p-8 text-center">
        <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
        <h3 className="text-xl font-semibold mb-2">Selecione uma página para editar</h3>
        <p className="text-gray-600">Escolha uma página da lista à esquerda ou crie uma nova página.</p>
      </CardContent>
    </Card>
  );
};

export default EmptyPageState;
