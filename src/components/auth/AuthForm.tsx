
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import CreateAdminUser from './CreateAdminUser';

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  const { signIn, signUp, isAdmin } = useAuth();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const { error } = await signIn(email, password);
    
    if (error) {
      setError(error.message === 'Invalid login credentials' 
        ? 'Email ou palavra-passe incorretos' 
        : error.message);
    }
    
    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    
    const { error } = await signUp(email, password, fullName);
    
    if (error) {
      if (error.message.includes('already registered')) {
        setError('Este email já está registado');
      } else if (error.message.includes('Apenas administradores')) {
        setError('Apenas administradores podem registrar novos usuários');
      } else {
        setError(error.message);
      }
    } else {
      setMessage('Usuário registado com sucesso');
      setEmail('');
      setPassword('');
      setFullName('');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <img 
              src="/lovable-uploads/8c0e50b0-b06a-42cf-b3fc-9a08063308b3.png" 
              alt="FCBB Logo" 
              className="h-16 w-auto"
            />
          </div>
          <CardTitle className="text-center text-2xl font-bold text-cv-blue">
            Área Reservada FCBB
          </CardTitle>
          <CardDescription className="text-center">
            Acesso para administradores e membros da federação
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="signin">Entrar</TabsTrigger>
              <TabsTrigger value="signup" disabled={!isAdmin}>
                Registar {!isAdmin && '(Admin)'}
              </TabsTrigger>
              <TabsTrigger value="createadmin">Criar Admin</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="admin@fcbb.cv"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Palavra-passe</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Spokers@1"
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
                  {loading ? <LoadingSpinner size="sm" /> : 'Entrar'}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              {!isAdmin ? (
                <Alert>
                  <AlertDescription>
                    Apenas administradores podem registar novos usuários. 
                    Faça login como administrador para aceder a esta funcionalidade.
                  </AlertDescription>
                </Alert>
              ) : (
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Nome Completo</Label>
                    <Input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      placeholder="Nome completo do usuário"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signupEmail">Email</Label>
                    <Input
                      id="signupEmail"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="email@exemplo.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signupPassword">Palavra-passe</Label>
                    <Input
                      id="signupPassword"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                      minLength={6}
                    />
                  </div>
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  {message && (
                    <Alert>
                      <AlertDescription>{message}</AlertDescription>
                    </Alert>
                  )}
                  <Button 
                    type="submit" 
                    className="w-full bg-cv-blue hover:bg-cv-blue/90"
                    disabled={loading}
                  >
                    {loading ? <LoadingSpinner size="sm" /> : 'Registar Usuário'}
                  </Button>
                </form>
              )}
            </TabsContent>

            <TabsContent value="createadmin">
              <CreateAdminUser />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthForm;
