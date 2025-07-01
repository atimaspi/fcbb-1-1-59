
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ContentManager from './ContentManager';
import ContentMetrics from './ContentMetrics';
import NotificationCenter from './NotificationCenter';
import { BarChart3, Bell, FileText, Settings } from 'lucide-react';

const CMSDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-cv-blue mb-2">
            Sistema de Gestão de Conteúdo FCBB
          </h1>
          <p className="text-gray-600 text-lg">
            Plataforma completa para gestão de conteúdo da Federação Cabo-verdiana de Basquetebol
          </p>
        </div>

        <Tabs defaultValue="content" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="content" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Gestão de Conteúdo
            </TabsTrigger>
            <TabsTrigger value="metrics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Métricas
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Notificações
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Configurações
            </TabsTrigger>
          </TabsList>

          <TabsContent value="content">
            <ContentManager />
          </TabsContent>

          <TabsContent value="metrics">
            <ContentMetrics />
          </TabsContent>

          <TabsContent value="notifications">
            <NotificationCenter />
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-6">
              <div className="text-center py-12">
                <Settings className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Configurações do Sistema
                </h3>
                <p className="text-gray-500">
                  Configurações avançadas do sistema de gestão de conteúdo
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CMSDashboard;
