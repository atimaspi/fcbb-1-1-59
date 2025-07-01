
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

const SecuritySettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações de Segurança</CardTitle>
        <CardDescription>Definições globais de segurança</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label>Autenticação de Dois Fatores</Label>
            <p className="text-sm text-gray-600">Obrigar 2FA para administradores</p>
          </div>
          <Switch />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <Label>Expiração de Sessão</Label>
            <p className="text-sm text-gray-600">Sessões expiram em 24 horas</p>
          </div>
          <Switch defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <Label>Bloqueio por Tentativas</Label>
            <p className="text-sm text-gray-600">Bloquear após 5 tentativas falhadas</p>
          </div>
          <Switch defaultChecked />
        </div>
      </CardContent>
    </Card>
  );
};

export default SecuritySettings;
