
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import { CreateUserDialog } from './CreateUserDialog';
import { EditUserDialog } from './EditUserDialog';
import { DeleteUserDialog } from './DeleteUserDialog';
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
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [deleteUserOpen, setDeleteUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'Administrador', email: 'admin@fitapp.com', role: 'admin', status: 'Ativo', createdAt: '2024-01-01' },
    { id: 2, name: 'Carlos Silva', email: 'professor@fitapp.com', role: 'professor', status: 'Ativo', createdAt: '2024-01-02' },
    { id: 3, name: 'Maria Santos', email: 'aluno@fitapp.com', role: 'aluno', status: 'Ativo', createdAt: '2024-01-03' },
    { id: 4, name: 'João Silva', email: 'joao@email.com', role: 'aluno', status: 'Ativo', createdAt: '2024-01-10' },
    { id: 5, name: 'Ana Costa', email: 'ana@email.com', role: 'aluno', status: 'Inativo', createdAt: '2024-01-15' },
  ]);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateUser = (userData: any) => {
    const newUser: User = {
      id: users.length + 1,
      ...userData,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setUsers([...users, newUser]);
    toast({
      title: "Usuário criado",
      description: `Usuário ${userData.name} foi criado com sucesso.`,
    });
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setEditUserOpen(true);
  };

  const handleSaveUser = (updatedUser: User) => {
    setUsers(prev => prev.map(user => 
      user.id === updatedUser.id ? updatedUser : user
    ));
  };

  const handleDeleteUser = (user: User) => {
    if (user.role === 'admin') {
      toast({
        title: "Erro",
        description: "Não é possível excluir o usuário administrador.",
        variant: "destructive",
      });
      return;
    }
    setSelectedUser(user);
    setDeleteUserOpen(true);
  };

  const confirmDeleteUser = (userId: number) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
    toast({
      title: "Usuário excluído",
      description: "Usuário foi removido do sistema com sucesso.",
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
        <DialogContent className="sm:max-w-[900px] max-h-[85vh] overflow-y-auto">
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
                            onClick={() => handleEditUser(user)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteUser(user)}
                            disabled={user.role === 'admin'}
                            className={user.role === 'admin' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-50'}
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

            <div className="text-sm text-gray-600 flex justify-between items-center">
              <span>Mostrando {filteredUsers.length} de {users.length} usuários</span>
              <div className="flex gap-4 text-xs">
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-red-500 rounded"></div>
                  Administradores: {users.filter(u => u.role === 'admin').length}
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-blue-500 rounded"></div>
                  Professores: {users.filter(u => u.role === 'professor').length}
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-gray-500 rounded"></div>
                  Alunos: {users.filter(u => u.role === 'aluno').length}
                </span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <CreateUserDialog
        open={createUserOpen}
        onOpenChange={setCreateUserOpen}
        onSave={handleCreateUser}
      />

      <EditUserDialog
        open={editUserOpen}
        onOpenChange={setEditUserOpen}
        user={selectedUser}
        onSave={handleSaveUser}
      />

      <DeleteUserDialog
        open={deleteUserOpen}
        onOpenChange={setDeleteUserOpen}
        user={selectedUser}
        onConfirm={confirmDeleteUser}
      />
    </>
  );
};
