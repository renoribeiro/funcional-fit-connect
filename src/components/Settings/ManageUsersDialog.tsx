
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2, UserPlus } from 'lucide-react';
import { CreateUserDialog } from './CreateUserDialog';
import { useToast } from '@/hooks/use-toast';

interface ManageUsersDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'professor' | 'aluno';
  status: 'Ativo' | 'Inativo';
  createdAt: string;
}

export const ManageUsersDialog: React.FC<ManageUsersDialogProps> = ({
  open,
  onOpenChange
}) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [createUserOpen, setCreateUserOpen] = useState(false);

  const users: User[] = [
    { id: 1, name: 'Administrador', email: 'admin@fitapp.com', role: 'admin', status: 'Ativo', createdAt: '2024-01-01' },
    { id: 2, name: 'Carlos Silva', email: 'professor@fitapp.com', role: 'professor', status: 'Ativo', createdAt: '2024-01-02' },
    { id: 3, name: 'Maria Santos', email: 'aluno@fitapp.com', role: 'aluno', status: 'Ativo', createdAt: '2024-01-03' },
    { id: 4, name: 'João Silva', email: 'joao@email.com', role: 'aluno', status: 'Ativo', createdAt: '2024-01-10' },
    { id: 5, name: 'Ana Costa', email: 'ana@email.com', role: 'aluno', status: 'Inativo', createdAt: '2024-01-15' },
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateUser = (userData: any) => {
    toast({
      title: "Usuário criado",
      description: `Usuário ${userData.name} foi criado com sucesso.`,
    });
  };

  const handleEditUser = (userId: number) => {
    toast({
      title: "Editar Usuário",
      description: `Editando usuário ID: ${userId}`,
    });
  };

  const handleDeleteUser = (userId: number) => {
    toast({
      title: "Usuário excluído",
      description: `Usuário ID: ${userId} foi removido do sistema.`,
      variant: "destructive",
    });
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'destructive';
      case 'professor': return 'default';
      case 'aluno': return 'secondary';
      default: return 'secondary';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrador';
      case 'professor': return 'Professor';
      case 'aluno': return 'Aluno';
      default: return role;
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[800px] max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Gerenciar Usuários</DialogTitle>
            <DialogDescription>
              Visualize e gerencie todos os usuários do sistema
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex justify-between items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar usuários..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button onClick={() => setCreateUserOpen(true)} className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Novo Usuário
              </Button>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Função</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Criado em</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={getRoleBadgeColor(user.role)}>
                          {getRoleLabel(user.role)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.status === 'Ativo' ? 'default' : 'secondary'}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.createdAt}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditUser(user.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteUser(user.id)}
                            disabled={user.role === 'admin'}
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="text-sm text-gray-600">
              Mostrando {filteredUsers.length} de {users.length} usuários
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <CreateUserDialog
        open={createUserOpen}
        onOpenChange={setCreateUserOpen}
        onSave={handleCreateUser}
      />
    </>
  );
};
