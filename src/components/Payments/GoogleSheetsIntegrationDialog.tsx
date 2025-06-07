
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

interface SheetData {
  id: number;
  student: string;
  amount: number;
  status: string;
  dueDate: string;
  email: string;
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
  const [sheetData, setSheetData] = useState<SheetData[]>([]);

  const parseGoogleSheetsCsv = async (url: string): Promise<SheetData[]> => {
    try {
      // Converter URL normal do Google Sheets para CSV
      const csvUrl = url.replace('/edit#gid=', '/export?format=csv&gid=')
                       .replace('/edit?usp=sharing', '/export?format=csv')
                       .replace('/edit', '/export?format=csv');
      
      console.log('Tentando acessar URL CSV:', csvUrl);
      
      const response = await fetch(csvUrl);
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      
      const csvText = await response.text();
      console.log('Dados CSV recebidos:', csvText.substring(0, 200) + '...');
      
      const lines = csvText.split('\n').filter(line => line.trim());
      const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
      
      console.log('Headers encontrados:', headers);
      
      const data: SheetData[] = [];
      
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
        
        if (values.length >= 5) {
          data.push({
            id: i,
            student: values[0] || 'Nome não informado',
            email: values[1] || 'email@exemplo.com',
            amount: parseFloat(values[2]) || 0,
            status: values[3] || 'Pendente',
            dueDate: values[4] || new Date().toLocaleDateString('pt-BR')
          });
        }
      }
      
      console.log('Dados processados:', data);
      return data;
    } catch (error) {
      console.error('Erro ao processar planilha:', error);
      throw error;
    }
  };

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
    
    try {
      console.log('Iniciando conexão com a planilha...');
      const data = await parseGoogleSheetsCsv(sheetUrl);
      
      setSheetData(data);
      setIsConnected(true);
      setLastSync(new Date().toLocaleString('pt-BR'));
      
      toast({
        title: "Integração Conectada",
        description: `Planilha conectada com sucesso! ${data.length} registros importados.`,
      });
    } catch (error) {
      console.error('Erro na conexão:', error);
      toast({
        title: "Erro na Conexão",
        description: "Não foi possível conectar à planilha. Verifique se a URL está correta e a planilha está pública.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSync = async () => {
    if (!sheetUrl) return;
    
    setIsLoading(true);
    
    try {
      console.log('Sincronizando dados da planilha...');
      const data = await parseGoogleSheetsCsv(sheetUrl);
      
      setSheetData(data);
      setLastSync(new Date().toLocaleString('pt-BR'));
      
      toast({
        title: "Sincronização Concluída",
        description: `${data.length} registros atualizados com sucesso!`,
      });
    } catch (error) {
      console.error('Erro na sincronização:', error);
      toast({
        title: "Erro na Sincronização",
        description: "Não foi possível sincronizar os dados da planilha.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setSheetUrl('');
    setLastSync(null);
    setSheetData([]);
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
                    ? `Sua planilha está conectada e sincronizada - ${sheetData.length} registros`
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
                {isConnected && sheetData.length > 0 ? (
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
                    <p>{isConnected ? 'Nenhum dado encontrado na planilha' : 'Conecte uma planilha para visualizar os dados'}</p>
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
                        Certifique-se de que sua planilha tenha as colunas: Nome, Email, Valor, Status, Data de Vencimento (nesta ordem)
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium">Torne a planilha pública</h4>
                      <p className="text-sm text-gray-600">
                        No Google Sheets, clique em "Compartilhar" → "Alterar para qualquer pessoa com o link" → "Visualizador"
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
                    <p><strong>Coluna C:</strong> Valor (apenas números, ex: 150)</p>
                    <p><strong>Coluna D:</strong> Status (Pago/Pendente/Atrasado)</p>
                    <p><strong>Coluna E:</strong> Data de Vencimento (DD/MM/AAAA)</p>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-medium text-yellow-800 mb-2">⚠️ Importante:</h4>
                  <p className="text-sm text-yellow-700">
                    A planilha deve estar configurada como "Qualquer pessoa com o link pode visualizar" para que a integração funcione corretamente.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
