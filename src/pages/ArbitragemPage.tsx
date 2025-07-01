
import PageLayout from './PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from 'lucide-react';
import ArbitrageStats from '@/components/arbitragem/ArbitrageStats';
import RefereeCard from '@/components/arbitragem/RefereeCard';
import CourseCard from '@/components/arbitragem/CourseCard';
import DocumentCard from '@/components/arbitragem/DocumentCard';
import RefereeLevels from '@/components/arbitragem/RefereeLevels';
import ArbitrageCalendar from '@/components/arbitragem/ArbitrageCalendar';
import { referees, courses, regulations } from '@/components/arbitragem/data/arbitrageData';

const ArbitragemPage = () => {
  return (
    <PageLayout 
      title="Arbitragem"
      description="Centro de formação e informação para árbitros de basquetebol em Cabo Verde"
    >
      <div className="space-y-8">
        <ArbitrageStats />

        <Tabs defaultValue="referees" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="referees">Árbitros</TabsTrigger>
            <TabsTrigger value="courses">Formação</TabsTrigger>
            <TabsTrigger value="rules">Regulamentos</TabsTrigger>
            <TabsTrigger value="calendar">Calendário</TabsTrigger>
          </TabsList>

          <TabsContent value="referees" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Árbitros em Destaque</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {referees.map((referee, index) => (
                    <RefereeCard key={index} referee={referee} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course, index) => (
                <CourseCard key={index} course={course} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rules" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Documentos e Regulamentos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {regulations.map((doc, index) => (
                    <DocumentCard key={index} document={doc} />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Níveis de Arbitragem</CardTitle>
              </CardHeader>
              <CardContent>
                <RefereeLevels />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-cv-blue" />
                  Próximos Eventos de Arbitragem
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ArbitrageCalendar />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default ArbitragemPage;
