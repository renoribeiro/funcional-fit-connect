
import React, { useState } from 'react';
import { Users, Search, Plus, Eye, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { EditStudentDialog } from '@/components/Students/EditStudentDialog';
import { ViewStudentDialog } from '@/components/Students/ViewStudentDialog';
import { AddStudentDialog } from '@/components/Students/AddStudentDialog';
import { Student } from '@/types/student';
import { usePaymentReminders } from '@/hooks/usePaymentReminders';

export const StudentsPage: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [editStudentOpen, setEditStudentOpen] = useState(false);
  const [viewStudentOpen, setViewStudentOpen] = useState(false);
  const [addStudentOpen, setAddStudentOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [deletedStudent, setDeletedStudent] = useState<Student | null>(null);
  const [students, setStudents] = useState<Student[]>([
    { 
      id: 1, 
      name: 'Maria Santos', 
      email: 'maria@email.com', 
      phone: '(11) 99999-1111',
      plan: 'Premium', 
      status: 'Ativo', 
      lastWorkout: '2024-01-22',
      paymentMethod: 'Site',
      dueDate: '2024-02-15'
    },
    { 
      id: 2, 
      name: 'João Silva', 
      email: 'joao@email.com', 
      phone: '(11) 99999-2222',
      plan: 'Básico', 
      status: 'Ativo', 
      lastWorkout: '2024-01-21',
      paymentMethod: 'App'
    },
    { 
      id: 3, 
      name: 'Ana Costa', 
      email: 'ana@email.com', 
      phone: '(11) 99999-3333',
      plan: 'Premium', 
      status: 'Pendente', 
      lastWorkout: '2024-01-20',
      paymentMethod: 'Direto',
      dueDate: '2024-02-10'
    },
    { 
      id: 4, 
      name: 'Carlos Oliveira', 
      email: 'carlos@email.com', 
      phone: '(11) 99999-4444',
      plan: 'Intermediário', 
      status: 'Ativo', 
      lastWorkout: '2024-01-19',
      paymentMethod: 'Site',
      dueDate: '2024-02-20'
    },
  ]);

  // Integrar hook de lembretes de pagamento
  usePaymentReminders(students);

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddStudent = () => {
    setAddStudentOpen(true);
  };

  const handleSaveNewStudent = (studentData: Omit<Student, 'id'>) => {
    const newId = Math.max(...students.map(s => s.id), 0) + 1;
    const newStudent: Student = {
      ...studentData,
      id: newId,
    };
    setStudents(prev => [...prev, newStudent]);
  };

  const handleViewStudent = (student: Student) => {
    setSelectedStudent(student);
    setViewStudentOpen(true);
  };

  const handleEditStudent = (student: Student) => {
    setSelectedStudent(student);
    setEditStudentOpen(true);
  };

  const handleSaveStudent = (updatedStudent: Student) => {
    setStudents(prev => prev.map(student => 
      student.id === updatedStudent.id ? updatedStudent : student
    ));
  };

  const handleDeleteStudent = (studentId: number) => {
    const studentToDelete = students.find(student => student.id === studentId);
    if (studentToDelete) {
      setDeletedStudent(studentToDelete);
      setStudents(prev => prev.filter(student => student.id !== studentId));
      
      toast({
        title: "Aluno Excluído",
        description: `${studentToDelete.name} foi removido com sucesso`,
        variant: "destructive",
        action: (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleUndoDelete}
            className="bg-white text-black border-gray-300 hover:bg-gray-100"
          >
            Desfazer
          </Button>
        ),
      });

      // Limpar o aluno deletado após 10 segundos se não for desfeito
      setTimeout(() => {
        setDeletedStudent(null);
      }, 10000);
    }
  };

  const handleUndoDelete = () => {
    if (deletedStudent) {
      setStudents(prev => [...prev, deletedStudent].sort((a, b) => a.id - b.id));
      setDeletedStudent(null);
      
      toast({
        title: "Exclusão Desfeita",
        description: `${deletedStudent.name} foi restaurado com sucesso`,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Gerenciar Alunos</h1>
        <p className="text-muted-foreground mt-2">Visualize e gerencie todos os alunos cadastrados</p>
      </div>

      <div className="flex justify-between items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar alunos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-background border-border text-foreground placeholder:text-muted-foreground"
          />
        </div>
        <Button onClick={handleAddStudent} className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus className="h-4 w-4 mr-2" />
          Novo Aluno
        </Button>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-card-foreground">
            <Users className="h-5 w-5 text-primary" />
            Lista de Alunos
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Total de {filteredStudents.length} alunos encontrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredStudents.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-4 border border-border rounded-lg bg-card hover:bg-accent/50 transition-colors">
                <div className="flex-1">
                  <h3 className="font-medium text-card-foreground">{student.name}</h3>
                  <p className="text-sm text-muted-foreground">{student.email}</p>
                  <p className="text-sm text-muted-foreground">{student.phone}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant={student.status === 'Ativo' ? 'default' : 'secondary'}>
                      {student.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">Plano: {student.plan}</span>
                    <span className="text-xs text-muted-foreground">Pagamento: {student.paymentMethod}</span>
                    {student.dueDate && (
                      <span className="text-xs text-muted-foreground">Vence: {student.dueDate}</span>
                    )}
                    <span className="text-xs text-muted-foreground">Último treino: {student.lastWorkout}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleViewStudent(student)} className="border-border hover:bg-accent">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleEditStudent(student)} className="border-border hover:bg-accent">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDeleteStudent(student.id)} className="border-border hover:bg-accent">
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <AddStudentDialog
        open={addStudentOpen}
        onOpenChange={setAddStudentOpen}
        onSave={handleSaveNewStudent}
      />

      <EditStudentDialog
        open={editStudentOpen}
        onOpenChange={setEditStudentOpen}
        student={selectedStudent}
        onSave={handleSaveStudent}
      />

      <ViewStudentDialog
        open={viewStudentOpen}
        onOpenChange={setViewStudentOpen}
        student={selectedStudent}
      />
    </div>
  );
};
