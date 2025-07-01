
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { UserPlus } from 'lucide-react';
import RoleSelector, { DetailedRole } from './RoleSelector';
import { supabase } from '@/integrations/supabase/client';

const AdminUserRegistration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [selectedRole, setSelectedRole] = useState<DetailedRole>('user');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  const { isAdmin } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    
    try {
      // Create user with Supabase Auth
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
      });

      if (signUpError) {
        throw signUpError;
      }

      if (data.user) {
        // Create/update profile with selected role
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({
            id: data.user.id,
            full_name: fullName,
            role: selectedRole,
            updated_at: new Date().toISOString()
          }, {
            onConflict: 'id'
          });

        if (profileError) {
          console.error('Profile creation error:', profileError);
          // Don't throw error here, user was created successfully
          setMessage(`Usuário criado com sucesso, mas houve um problema ao definir o perfil. Role: ${selectedRole}`);
        } else {
          setMessage(`Usuário registado com sucesso como ${selectedRole}!`);
        }
      }

      // Clear form
      setEmail('');
      setPassword('');
      setFullName('');
      setSelectedRole('user');

    } catch (error: any) {
      console.error('Registration error:', error);
      if (error.message.includes('already registered')) {
        setError('Este email já está registado');
      } else {
        setError(error.message || 'Erro ao registar usuário');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Registar Novo Usuário
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertDescription>
              Apenas administradores podem registar novos usuários.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="h-5 w-5" />
          Registar Novo Usuário
        </CardTitle>
        <CardDescription>
          Criar nova conta de usuário no sistema com função específica
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
              placeholder="Nome completo do usuário"
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
              placeholder="email@exemplo.com"
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
              placeholder="••••••••"
              minLength={6}
            />
          </div>
          
          <RoleSelector
            value={selectedRole}
            onChange={setSelectedRole}
            showDescription={true}
          />

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
      </CardContent>
    </Card>
  );
};

export default AdminUserRegistration;
