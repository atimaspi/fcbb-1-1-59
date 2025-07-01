
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Shield } from 'lucide-react';

const CreateAdminUser = () => {
  const [email, setEmail] = useState('admin@fcbb.cv');
  const [password, setPassword] = useState('Spokers@1');
  const [fullName, setFullName] = useState('Administrador FCBB');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const { createAdminUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    
    const { error } = await createAdminUser(email, password, fullName);
    
    if (error) {
      if (error.message && error.message.includes('already registered')) {
        setError('Este email já está registado. Tente fazer login.');
      } else if (error.message && error.message.includes('User already registered')) {
        setError('Este email já está registado. Tente fazer login.');
      } else {
        setError(error.message || 'Erro ao criar usuário');
      }
    } else {
      setSuccess(true);
    }
    
    setLoading(false);
  };

  if (success) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-600">
            <Shield className="h-5 w-5" />
            Admin Criado com Sucesso!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertDescription>
              O usuário admin foi criado com sucesso. Pode agora fazer login com:
              <br />
              <strong>Email:</strong> {email}
              <br />
              <strong>Password:</strong> {password}
            </AlertDescription>
          </Alert>
          <Button 
            onClick={() => window.location.reload()} 
            className="w-full mt-4 bg-cv-blue hover:bg-cv-blue/90"
          >
            Fazer Login Agora
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-cv-blue" />
          Criar Usuário Admin Inicial
        </CardTitle>
        <CardDescription>
          Crie o primeiro administrador do sistema. Se não consegue criar conta, use esta opção.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="adminFullName">Nome Completo</Label>
            <Input
              id="adminFullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="adminEmail">Email</Label>
            <Input
              id="adminEmail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="adminPassword">Palavra-passe</Label>
            <Input
              id="adminPassword"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button 
            type="submit" 
            className="w-full bg-cv-blue hover:bg-cv-blue/90"
            disabled={loading}
          >
            {loading ? <LoadingSpinner size="sm" /> : 'Criar Admin'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateAdminUser;
