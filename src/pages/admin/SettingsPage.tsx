
import React, { useState } from 'react';
import { Settings, Users, Key, Shield, Database, Mail, MessageSquare, MapPin, GraduationCap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ManageUsersDialog } from '@/components/Settings/ManageUsersDialog';
import { ManageInstructorsDialog } from '@/components/Settings/ManageInstructorsDialog';
import { ManageLocationsDialog } from '@/components/Settings/ManageLocationsDialog';
import { WhatsAppConfigDialog } from '@/components/Settings/WhatsAppConfigDialog';
import { SMTPConfigDialog } from '@/components/Settings/SMTPConfigDialog';
import { PaymentConfigDialog } from '@/components/Settings/PaymentConfigDialog';
import { useToast } from '@/hooks/use-toast';

export const SettingsPage: React.FC = () => {
  const { toast } = useToast();
  const [manageUsersOpen, setManageUsersOpen] = useState(false);
  const [manageInstructorsOpen, setManageInstructorsOpen] = useState(false);
  const [manageLocationsOpen, setManageLocationsOpen] = useState(false);
  const [whatsAppConfigOpen, setWhatsAppConfigOpen] = useState(false);
  const [smtpConfigOpen, setSmtpConfigOpen] = useState(false);
  const [paymentConfigOpen, setPaymentConfigOpen] = useState(false);

  const handleBackupData = () => {
    toast({
      title: "Backup Iniciado",
      description: "O backup dos dados foi iniciado com sucesso.",
    });
  };

  const handleExportData = () => {
    toast({
      title: "Exportação Iniciada",
      description: "Os dados estão sendo exportados em formato CSV.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Configurações do Sistema</h1>
        <p className="text-muted-foreground mt-2">Gerencie configurações e usuários da plataforma</p>
      </div>

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="users">Usuários</TabsTrigger>
          <TabsTrigger value="instructors">Instrutores</TabsTrigger>
          <TabsTrigger value="locations">Locais</TabsTrigger>
          <TabsTrigger value="permissions">Permissões</TabsTrigger>
          <TabsTrigger value="system">Sistema</TabsTrigger>
          <TabsTrigger value="integrations">Integrações</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-card-foreground">
                <Users className="h-5 w-5 text-primary" />
                Gerenciamento de Usuários
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Gerencie usuários, professores e administradores do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                  <h4 className="font-medium text-primary">Total de Usuários</h4>
                  <p className="text-2xl font-bold text-primary">156</p>
                  <p className="text-sm text-muted-foreground">+12 este mês</p>
                </div>
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <h4 className="font-medium text-green-600">Usuários Ativos</h4>
                  <p className="text-2xl font-bold text-green-600">142</p>
                  <p className="text-sm text-muted-foreground">91% de atividade</p>
                </div>
                <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                  <h4 className="font-medium text-purple-600">Administradores</h4>
                  <p className="text-2xl font-bold text-purple-600">3</p>
                  <p className="text-sm text-muted-foreground">2 professores</p>
                </div>
              </div>
              <Button onClick={() => setManageUsersOpen(true)} className="w-full md:w-auto">
                <Users className="h-4 w-4 mr-2" />
                Gerenciar Usuários
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="instructors" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-card-foreground">
                <GraduationCap className="h-5 w-5 text-blue-600" />
                Gerenciamento de Instrutores
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Gerencie instrutores e professores do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <h4 className="font-medium text-blue-600">Total de Instrutores</h4>
                  <p className="text-2xl font-bold text-blue-600">3</p>
                  <p className="text-sm text-muted-foreground">Usuários com função Professor</p>
                </div>
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <h4 className="font-medium text-green-600">Instrutores Ativos</h4>
                  <p className="text-2xl font-bold text-green-600">2</p>
                  <p className="text-sm text-muted-foreground">67% de atividade</p>
                </div>
                <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                  <h4 className="font-medium text-purple-600">Especialidades</h4>
                  <p className="text-2xl font-bold text-purple-600">6</p>
                  <p className="text-sm text-muted-foreground">Áreas de atuação</p>
                </div>
              </div>
              <Button onClick={() => setManageInstructorsOpen(true)} className="w-full md:w-auto">
                <GraduationCap className="h-4 w-4 mr-2" />
                Gerenciar Instrutores
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="locations" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-card-foreground">
                <MapPin className="h-5 w-5 text-orange-600" />
                Locais de Treinamento
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Configure e gerencie os locais onde as aulas são realizadas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                  <h4 className="font-medium text-orange-600">Total de Locais</h4>
                  <p className="text-2xl font-bold text-orange-600">2</p>
                  <p className="text-sm text-muted-foreground">Locais cadastrados</p>
                </div>
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <h4 className="font-medium text-green-600">Locais Ativos</h4>
                  <p className="text-2xl font-bold text-green-600">2</p>
                  <p className="text-sm text-muted-foreground">100% operacionais</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="p-3 border border-border rounded-lg bg-card">
                  <h4 className="font-medium text-card-foreground">Academia Central</h4>
                  <p className="text-sm text-muted-foreground">Rua das Flores, 123 - Centro, São Paulo</p>
                  <p className="text-xs text-muted-foreground">Seg-Sex: 06:00-22:00</p>
                </div>
                <div className="p-3 border border-border rounded-lg bg-card">
                  <h4 className="font-medium text-card-foreground">Filial Zona Norte</h4>
                  <p className="text-sm text-muted-foreground">Av. Paulista, 456 - Bela Vista, São Paulo</p>
                  <p className="text-xs text-muted-foreground">Seg-Sex: 05:30-23:00</p>
                </div>
              </div>
              <Button onClick={() => setManageLocationsOpen(true)} className="w-full md:w-auto">
                <MapPin className="h-4 w-4 mr-2" />
                Gerenciar Locais
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-card-foreground">
                <Shield className="h-5 w-5 text-green-600" />
                Controle de Permissões
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Configure permissões e níveis de acesso
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-border rounded-lg bg-card">
                  <div>
                    <h4 className="font-medium text-card-foreground">Gerenciar Alunos</h4>
                    <p className="text-sm text-muted-foreground">Criar, editar e excluir alunos</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">Admin</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">Professor</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border border-border rounded-lg bg-card">
                  <div>
                    <h4 className="font-medium text-card-foreground">Configurações do Sistema</h4>
                    <p className="text-sm text-muted-foreground">Acesso às configurações gerais</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">Admin</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border border-border rounded-lg bg-card">
                  <div>
                    <h4 className="font-medium text-card-foreground">Visualizar Relatórios</h4>
                    <p className="text-sm text-muted-foreground">Acessar relatórios e estatísticas</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">Admin</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">Professor</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-card-foreground">
                <Database className="h-5 w-5 text-purple-600" />
                Configurações do Sistema
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Backup, exportação e manutenção do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" onClick={handleBackupData} className="h-20 flex-col border-border hover:bg-accent">
                  <Database className="h-6 w-6 mb-2" />
                  Fazer Backup
                </Button>
                <Button variant="outline" onClick={handleExportData} className="h-20 flex-col border-border hover:bg-accent">
                  <Key className="h-6 w-6 mb-2" />
                  Exportar Dados
                </Button>
              </div>
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <h4 className="font-medium text-yellow-600">Último Backup</h4>
                <p className="text-sm text-muted-foreground">25/01/2024 às 03:00</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-card-foreground">
                <Mail className="h-5 w-5 text-orange-600" />
                Integrações
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Configure integrações com serviços externos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-border rounded-lg bg-card">
                  <div>
                    <h4 className="font-medium text-card-foreground">WhatsApp - Evolution API v2</h4>
                    <p className="text-sm text-muted-foreground">Envio de lembretes e notificações via WhatsApp</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setWhatsAppConfigOpen(true)} className="border-border hover:bg-accent">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Configurar
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border border-border rounded-lg bg-card">
                  <div>
                    <h4 className="font-medium text-card-foreground">Email (SMTP)</h4>
                    <p className="text-sm text-muted-foreground">Configurações de envio de email</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setSmtpConfigOpen(true)} className="border-border hover:bg-accent">
                      Configurar
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border border-border rounded-lg bg-card">
                  <div>
                    <h4 className="font-medium text-card-foreground">Pagamentos</h4>
                    <p className="text-sm text-muted-foreground">Gateway de pagamento</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setPaymentConfigOpen(true)} className="border-border hover:bg-accent">
                      Configurar
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <ManageUsersDialog
        open={manageUsersOpen}
        onOpenChange={setManageUsersOpen}
      />

      <ManageInstructorsDialog
        open={manageInstructorsOpen}
        onOpenChange={setManageInstructorsOpen}
      />

      <ManageLocationsDialog
        open={manageLocationsOpen}
        onOpenChange={setManageLocationsOpen}
      />

      <WhatsAppConfigDialog
        open={whatsAppConfigOpen}
        onOpenChange={setWhatsAppConfigOpen}
      />

      <SMTPConfigDialog
        open={smtpConfigOpen}
        onOpenChange={setSmtpConfigOpen}
      />

      <PaymentConfigDialog
        open={paymentConfigOpen}
        onOpenChange={setPaymentConfigOpen}
      />
    </div>
  );
};
