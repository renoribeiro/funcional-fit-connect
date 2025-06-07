
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Users, Phone, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ManageInstructorsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Instructor {
  id: string;
  name: string;
  email: string;
  phone?: string;
  specialties: string[];
  status: 'Ativo' | 'Inativo';
  createdAt: string;
}

export const ManageInstructorsDialog: React.FC<ManageInstructorsDialogProps> = ({
  open,
  onOpenChange
}) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [instructors, setInstructors] = useState<Instructor[]>([]);

  useEffect(() => {
    // Simular busca de usuários com função "professor"
    const mockInstructors: Instructor[] = [
      {
        id: '2',
        name: 'Carlos Silva',
        email: 'professor@fitapp.com',
        phone: '+55 11 88888-8888',
        specialties: ['Musculação', 'CrossFit'],
        status: 'Ativo',
        createdAt: '2024-01-02'
      },
      {
        id: '4',
        name: 'Ana Costa',
        email: 'ana.prof@fitapp.com',
        phone: '+55 11 77777-7777',
        specialties: ['Pilates', 'Yoga'],
        status: 'Ativo',
        createdAt: '2024-01-15'
      },
      {
        id: '5',
        name: 'João Santos',
        email: 'joao.prof@fitapp.com',
        phone: '+55 11 66666-6666',
        specialties: ['Natação', 'Hidroginástica'],
        status: 'Inativo',
        createdAt: '2024-01-20'
      }
    ];
    setInstructors(mockInstructors);
  }, []);

  const filteredInstructors = instructors.filter(instructor =>
    instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    instructor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    instructor.specialties.some(specialty => 
      specialty.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const toggleInstructorStatus = (instructorId: string) => {
    setInstructors(prev => prev.map(instructor => 
      instructor.id === instructorId 
        ? { ...instructor, status: instructor.status === 'Ativo' ? 'Inativo' : 'Ativo' }
        : instructor
    ));
    
    const instructor = instructors.find(i => i.id === instructorId);
    const newStatus = instructor?.status === 'Ativo' ? 'Inativo' : 'Ativo';
    
    toast({
      title: "Status atualizado",
      description: `Instrutor ${newStatus === 'Ativo' ? 'ativado' : 'desativado'} com sucesso.`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Gerenciar Instrutores
          </DialogTitle>
          <DialogDescription>
            Visualize e gerencie todos os instrutores (usuários com função Professor)
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex justify-between items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar instrutores..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Contato</TableHead>
                  <TableHead>Especialidades</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Cadastrado em</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInstructors.map((instructor) => (
                  <TableRow key={instructor.id}>
                    <TableCell className="font-medium">{instructor.name}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Mail className="h-3 w-3" />
                          {instructor.email}
                        </div>
                        {instructor.phone && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            {instructor.phone}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {instructor.specialties.map((specialty, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={instructor.status === 'Ativo' ? 'default' : 'secondary'}>
                        {instructor.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{instructor.createdAt}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleInstructorStatus(instructor.id)}
                      >
                        {instructor.status === 'Ativo' ? 'Desativar' : 'Ativar'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="text-sm text-gray-600 flex justify-between items-center">
            <span>Mostrando {filteredInstructors.length} de {instructors.length} instrutores</span>
            <div className="flex gap-4 text-xs">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded"></div>
                Ativos: {instructors.filter(i => i.status === 'Ativo').length}
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-gray-500 rounded"></div>
                Inativos: {instructors.filter(i => i.status === 'Inativo').length}
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
