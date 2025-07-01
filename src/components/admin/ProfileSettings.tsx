
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Shield,
  Camera,
  Save,
  Key
} from 'lucide-react';

const ProfileSettings = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: 'Administrador FCBB',
    email: 'admin@fcbb.cv',
    phone: '+238 123 456 789',
    address: 'Praia, Santiago, Cabo Verde',
    bio: 'Administrador do sistema FCBB',
    role: 'admin'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Sucesso",
        description: "Perfil atualizado com sucesso!",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao atualizar perfil",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-cv-blue mb-2">Configurações do Perfil</h2>
        <p className="text-gray-600">Gerir informações da conta administrativa</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Perfil
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src="/lovable-uploads/39194785-9ce8-4849-82cb-ad92f0086855.png" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="text-center">
                <h3 className="font-semibold text-lg">{formData.fullName}</h3>
                <p className="text-gray-500">{formData.email}</p>
                <Badge variant="default" className="mt-2">
                  <Shield className="w-3 h-3 mr-1" />
                  Administrador
                </Badge>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{formData.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{formData.address}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Membro desde Jan 2024</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Informações Pessoais</CardTitle>
            <CardDescription>
              Atualize as suas informações pessoais
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Nome Completo</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="role">Função</Label>
                <Input
                  id="role"
                  value={formData.role}
                  disabled
                  className="bg-gray-50"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address">Endereço</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="bio">Biografia</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                placeholder="Conte-nos um pouco sobre si..."
                rows={4}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline">Cancelar</Button>
              <Button onClick={handleSave} disabled={isLoading}>
                <Save className="w-4 h-4 mr-2" />
                {isLoading ? 'A guardar...' : 'Guardar Alterações'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="w-5 h-5" />
            Configurações de Segurança
          </CardTitle>
          <CardDescription>
            Gerir palavra-passe e configurações de segurança
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="currentPassword">Palavra-passe Atual</Label>
              <Input
                id="currentPassword"
                type="password"
                placeholder="Digite a palavra-passe atual"
              />
            </div>
            <div>
              <Label htmlFor="newPassword">Nova Palavra-passe</Label>
              <Input
                id="newPassword"
                type="password"
                placeholder="Digite a nova palavra-passe"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="confirmPassword">Confirmar Nova Palavra-passe</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirme a nova palavra-passe"
            />
          </div>

          <div className="flex justify-end">
            <Button variant="outline">
              Alterar Palavra-passe
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSettings;
