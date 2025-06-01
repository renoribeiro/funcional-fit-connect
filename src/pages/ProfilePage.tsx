
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { User, Mail, Phone, Camera } from 'lucide-react';

interface ProfileForm {
  name: string;
  email: string;
  phone: string;
}

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { register, handleSubmit, setValue } = useForm<ProfileForm>();

  React.useEffect(() => {
    if (user) {
      setValue('name', user.name);
      setValue('email', user.email);
      setValue('phone', user.phone || '');
    }
  }, [user, setValue]);

  const getRoleBadge = (role: string) => {
    const colors = {
      admin: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      professor: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      aluno: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    };
    
    const labels = {
      admin: 'Administrador',
      professor: 'Professor',
      aluno: 'Aluno'
    };

    return (
      <Badge className={colors[role as keyof typeof colors]}>
        {labels[role as keyof typeof labels]}
      </Badge>
    );
  };

  const onSubmit = (data: ProfileForm) => {
    // Aqui você implementaria a lógica para salvar os dados do perfil
    console.log('Dados do perfil:', data);
    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram atualizadas com sucesso.",
    });
  };

  const handleAvatarChange = () => {
    // Aqui você implementaria a lógica para alterar o avatar
    toast({
      title: "Alterar Avatar",
      description: "Funcionalidade para alterar avatar será implementada em breve.",
    });
  };

  if (!user) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Meu Perfil</h1>
        <p className="text-muted-foreground mt-2">Gerencie suas informações pessoais</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card do Avatar */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Foto do Perfil</CardTitle>
            <CardDescription className="text-muted-foreground">
              Sua foto de perfil será exibida em todo o sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <Avatar className="h-32 w-32">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <Button variant="outline" onClick={handleAvatarChange} className="w-full">
              <Camera className="h-4 w-4 mr-2" />
              Alterar Foto
            </Button>
          </CardContent>
        </Card>

        {/* Card das Informações */}
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-card-foreground">
              <User className="h-5 w-5" />
              Informações Pessoais
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Atualize suas informações pessoais aqui
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Nome Completo
                  </Label>
                  <Input
                    id="name"
                    {...register('name', { required: true })}
                    placeholder="Seu nome completo"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email', { required: true })}
                    placeholder="seu@email.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Telefone
                </Label>
                <Input
                  id="phone"
                  {...register('phone')}
                  placeholder="(11) 99999-9999"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Cargo:</span>
                {user.role && getRoleBadge(user.role)}
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
                <Button type="submit">
                  Salvar Alterações
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Card de Informações da Conta */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Informações da Conta</CardTitle>
          <CardDescription className="text-muted-foreground">
            Detalhes sobre sua conta no sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <h4 className="font-medium text-foreground">ID do Usuário</h4>
              <p className="text-sm text-muted-foreground">{user.id}</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <h4 className="font-medium text-foreground">Data de Criação</h4>
              <p className="text-sm text-muted-foreground">
                {new Date(user.createdAt).toLocaleDateString('pt-BR')}
              </p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <h4 className="font-medium text-foreground">Status da Conta</h4>
              <p className="text-sm text-muted-foreground">
                {user.isActive ? 'Ativa' : 'Inativa'}
              </p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <h4 className="font-medium text-foreground">Tipo de Usuário</h4>
              <p className="text-sm text-muted-foreground">
                {user.role === 'admin' ? 'Administrador' : 
                 user.role === 'professor' ? 'Professor' : 'Aluno'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
