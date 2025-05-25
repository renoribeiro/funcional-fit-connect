
import React, { useState } from 'react';
import { Users, Search, Plus, Eye, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { EditStudentDialog } from '@/components/Students/EditStudentDialog';
import { ViewStudentDialog } from '@/components/Students/ViewStudentDialog';

interface Student {
  id: number;
  name: string;
  email: string;
  plan: string;
  status: string;
  lastWorkout: string;
}

export const StudentsPage: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [editStudentOpen, setEditStudentOpen] = useState(false);
  const [viewStudentOpen, setViewStudentOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: 'Maria Santos', email: 'maria@email.com', plan: 'Premium', status: 'Ativo', lastWorkout: '2024-01-22' },
    { id: 2, name: 'João Silva', email: 'joao@email.com', plan: 'Básico', status: 'Ativo', lastWorkout: '2024-01-21' },
    { id: 3, name: 'Ana Costa', email: 'ana@email.com', plan: 'Premium', status: 'Pendente', lastWorkout: '2024-01-20' },
    { id: 4, name: 'Carlos Oliveira', email: 'carlos@email.com', plan: 'Intermediário', status: 'Ativo', lastWorkout: '2024-01-19' },
  ]);

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddStudent = () => {
    toast({
      title: "Novo Aluno",
      description: "Formulário de cadastro será aberto...",
    });
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
    setStudents(prev => prev.filter(student => student.id !== studentId));
    toast({
      title: "Aluno Excluído",
      description: `Aluno removido com sucesso`,
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Gerenciar Alunos</h1>
        <p className="text-gray-600 mt-2">Visualize e gerencie todos os alunos cadastrados</p>
      </div>

      <div className="flex justify-between items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar alunos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={handleAddStudent} className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Novo Aluno
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-green-600" />
            Lista de Alunos
          </CardTitle>
          <CardDescription>
            Total de {filteredStudents.length} alunos encontrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredStudents.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg bg-white hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{student.name}</h3>
                  <p className="text-sm text-gray-600">{student.email}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant={student.status === 'Ativo' ? 'default' : 'secondary'}>
                      {student.status}
                    </Badge>
                    <span className="text-xs text-gray-500">Plano: {student.plan}</span>
                    <span className="text-xs text-gray-500">Último treino: {student.lastWorkout}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleViewStudent(student)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleEditStudent(student)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDeleteStudent(student.id)}>
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

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
