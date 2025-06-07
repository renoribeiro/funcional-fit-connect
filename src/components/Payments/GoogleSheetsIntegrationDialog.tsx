
import React, { useState } from 'react';
import { Sheet, Settings, RefreshCw, ExternalLink, Check, AlertCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface GoogleSheetsIntegrationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const GoogleSheetsIntegrationDialog: React.FC<GoogleSheetsIntegrationDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const { toast } = useToast();
  const [sheetUrl, setSheetUrl] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lastSync, setLastSync] = useState<string | null>(null);

  // Dados simulados da planilha
  const sheetData = [
    { id: 1, student: 'Maria Santos', amount: 150, status: 'Pago', dueDate: '2024-01-15', email: 'maria@email.com' },
    { id: 2, student: 'João Silva', amount: 120, status: 'Pendente', dueDate: '2024-01-20', email: 'joao@email.com' },
    { id: 3, student: 'Ana Costa', amount: 180, status: 'Atrasado', dueDate: '2024-01-10', email: 'ana@email.com' },
  ];

  const handleConnect = async () => {
    if (!sheetUrl) {
      toast({
        title: "URL Obrigatória",
        description: "Por favor, insira a URL da planilha Google Sheets",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simular conexão
    setTimeout(() => {
      setIsConnected(true);
      setLastSync(new Date().toLocaleString('pt-BR'));
      setIsLoading(false);
      toast({
        title: "Integração Conectada",
        description: "A planilha foi conectada com sucesso!",
      });
    }, 2000);
  };

  const handleSync = async () => {
    setIsLoading(true);
    
    // Simular sincronização
    setTimeout(() => {
      setLastSync(new Date().toLocaleString('pt-BR'));
      setIsLoading(false);
      toast({
        title: "Sincronização Concluída",
        description: "Os dados foram atualizados com sucesso!",
      });
    }, 1500);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setSheetUrl('');
    setLastSync(null);
    toast({
      title: "Integração Desconectada",
      description: "A planilha foi desconectada com sucesso.",
    });
  };

  const handleEditInSheet = () => {
    if (sheetUrl) {
      window.open(sheetUrl, '_blank');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sheet className="h-5 w-5 text-green-600" />
            Integração Google Sheets
          </DialogTitle>
          <DialogDescription>
            Conecte uma planilha do Google Sheets para gerenciar pagamentos externamente
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="config" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="config">Configuração</TabsTrigger>
            <TabsTrigger value="data">Dados da Planilha</TabsTrigger>
            <TabsTrigger value="help">Instruções</TabsTrigger>
          </TabsList>

          <TabsContent value="config" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Status da Conexão
                  {isConnected ? (
                    <Badge className="bg-green-100 text-green-800">
                      <Check className="h-3 w-3 mr-1" />
                      Conectado
                    </Badge>
                  ) : (
                    <Badge variant="secondary">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Desconectado
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription>
                  {isConnected 
                    ? "Sua planilha está conectada e sincronizada"
                    : "Configure a URL da planilha para começar"
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="sheet-url">URL da Planilha Google Sheets</Label>
                  <Input
                    id="sheet-url"
                    placeholder="https://docs.google.com/spreadsheets/d/..."
                    value={sheetUrl}
                    onChange={(e) => setSheetUrl(e.target.value)}
                    disabled={isConnected}
                  />
                </div>

                {isConnected && lastSync && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-700">
                      <strong>Última sincronização:</strong> {lastSync}
                    </p>
                  </div>
                )}

                <div className="flex gap-2">
                  {!isConnected ? (
                    <Button onClick={handleConnect} disabled={isLoading}>
                      {isLoading ? (
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Sheet className="h-4 w-4 mr-2" />
                      )}
                      Conectar Planilha
                    </Button>
                  ) : (
                    <>
                      <Button onClick={handleSync} disabled={isLoading}>
                        {isLoading ? (
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <RefreshCw className="h-4 w-4 mr-2" />
                        )}
                        Sincronizar
                      </Button>
                      <Button variant="outline" onClick={handleEditInSheet}>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Editar na Planilha
                      </Button>
                      <Button variant="destructive" onClick={handleDisconnect}>
                        Desconectar
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Dados Importados da Planilha</CardTitle>
                <CardDescription>
                  Visualização dos dados sincronizados da planilha Google Sheets
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isConnected ? (
                  <div className="space-y-3">
                    {sheetData.map((payment) => (
                      <div key={payment.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{payment.student}</h4>
                          <p className="text-sm text-gray-600">
                            {payment.email} | R$ {payment.amount} | Vence: {payment.dueDate}
                          </p>
                        </div>
                        <Badge 
                          variant={
                            payment.status === 'Pago' ? 'default' : 
                            payment.status === 'Pendente' ? 'secondary' : 'destructive'
                          }
                        >
                          {payment.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Sheet className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>Conecte uma planilha para visualizar os dados</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="help" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Como Configurar a Integração</CardTitle>
                <CardDescription>
                  Siga os passos abaixo para conectar sua planilha Google Sheets
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium">Prepare sua planilha</h4>
                      <p className="text-sm text-gray-600">
                        Certifique-se de que sua planilha tenha as colunas: Nome, Email, Valor, Status, Data de Vencimento
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium">Compartilhe a planilha</h4>
                      <p className="text-sm text-gray-600">
                        Torne a planilha "Visível para qualquer pessoa com o link" nas configurações de compartilhamento
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium">Copie a URL</h4>
                      <p className="text-sm text-gray-600">
                        Cole a URL completa da planilha no campo de configuração acima
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      4
                    </div>
                    <div>
                      <h4 className="font-medium">Conecte e sincronize</h4>
                      <p className="text-sm text-gray-600">
                        Clique em "Conectar Planilha" e aguarde a sincronização dos dados
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Formato da Planilha Recomendado:</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p><strong>Coluna A:</strong> Nome do Aluno</p>
                    <p><strong>Coluna B:</strong> Email</p>
                    <p><strong>Coluna C:</strong> Valor (R$)</p>
                    <p><strong>Coluna D:</strong> Status (Pago/Pendente/Atrasado)</p>
                    <p><strong>Coluna E:</strong> Data de Vencimento (DD/MM/AAAA)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
