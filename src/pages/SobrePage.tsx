
import React from 'react';
import PageLayout from './PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Target, Calendar, Trophy, MapPin, Phone, Mail } from 'lucide-react';

const SobrePage = () => {
  return (
    <PageLayout 
      title="Sobre a FCBB"
      description="Conheça a história, missão e estrutura da Federação Cabo-verdiana de Basquetebol"
    >
      <div className="space-y-12">
        {/* História */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-6 h-6 text-cv-blue" />
                História da FCBB
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                A Federação Cabo-verdiana de Basquetebol (FCBB) foi fundada com o objetivo de promover, 
                desenvolver e regulamentar a prática do basquetebol em todo o arquipélago de Cabo Verde.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Desde a sua criação, a FCBB tem trabalhado incansavelmente para elevar o nível do 
                basquetebol cabo-verdiano, organizando competições nacionais e regionais, formando 
                atletas e técnicos, e representando Cabo Verde em competições internacionais.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Missão e Visão */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-6 h-6 text-cv-blue" />
                Missão e Visão
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-3 text-cv-blue">Missão</h3>
                <p className="text-gray-700 leading-relaxed">
                  Promover, desenvolver e regulamentar a prática do basquetebol em Cabo Verde, 
                  fomentando valores de fair-play, disciplina e excelência desportiva.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-3 text-cv-blue">Visão</h3>
                <p className="text-gray-700 leading-relaxed">
                  Ser reconhecida como uma federação de referência no desenvolvimento do 
                  basquetebol, contribuindo para o crescimento desportivo e social de Cabo Verde.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Direção */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-6 h-6 text-cv-blue" />
                Direção da FCBB
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-24 h-24 bg-cv-blue rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg">Presidente</h3>
                  <p className="text-gray-600">João Silva</p>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 bg-cv-red rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg">Vice-Presidente</h3>
                  <p className="text-gray-600">Maria Santos</p>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 bg-cv-yellow rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg">Secretário-Geral</h3>
                  <p className="text-gray-600">António Costa</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Contactos */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-6 h-6 text-cv-blue" />
                Contactos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-cv-blue" />
                <span>Sede da FCBB, Praia, Santiago, Cabo Verde</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-cv-blue" />
                <span>+238 123 456 789</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-cv-blue" />
                <span>geral@fcbb.cv</span>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </PageLayout>
  );
};

export default SobrePage;
