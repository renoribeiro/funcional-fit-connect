
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2, MapPin, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';

interface ManageLocationsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Location {
  id: number;
  name: string;
  address: string;
  operatingHours: string;
  status: 'Ativo' | 'Inativo';
  createdAt: string;
}

interface LocationForm {
  name: string;
  address: string;
  operatingHours: string;
}

export const ManageLocationsDialog: React.FC<ManageLocationsDialogProps> = ({
  open,
  onOpenChange
}) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<LocationForm>();

  const [locations, setLocations] = useState<Location[]>([
    {
      id: 1,
      name: 'Academia Central',
      address: 'Rua das Flores, 123 - Centro, São Paulo - SP, 01234-567',
      operatingHours: 'Segunda a Sexta: 06:00 às 22:00 | Sábado: 08:00 às 18:00 | Domingo: 08:00 às 16:00',
      status: 'Ativo',
      createdAt: '2024-01-01'
    },
    {
      id: 2,
      name: 'Filial Zona Norte',
      address: 'Av. Paulista, 456 - Bela Vista, São Paulo - SP, 04567-890',
      operatingHours: 'Segunda a Sexta: 05:30 às 23:00 | Sábado e Domingo: 07:00 às 20:00',
      status: 'Ativo',
      createdAt: '2024-01-15'
    }
  ]);

  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onSubmit = (data: LocationForm) => {
    if (editingLocation) {
      // Editar local existente
      setLocations(prev => prev.map(location => 
        location.id === editingLocation.id 
          ? { ...location, ...data }
          : location
      ));
      toast({
        title: "Local atualizado",
        description: `Local ${data.name} foi atualizado com sucesso.`,
      });
      setEditingLocation(null);
    } else {
      // Adicionar novo local
      const newLocation: Location = {
        id: locations.length + 1,
        ...data,
        status: 'Ativo',
        createdAt: new Date().toISOString().split('T')[0]
      };
      setLocations([...locations, newLocation]);
      toast({
        title: "Local criado",
        description: `Local ${data.name} foi criado com sucesso.`,
      });
    }
    
    reset();
    setShowAddForm(false);
  };

  const handleEdit = (location: Location) => {
    setEditingLocation(location);
    setValue('name', location.name);
    setValue('address', location.address);
    setValue('operatingHours', location.operatingHours);
    setShowAddForm(true);
  };

  const handleDelete = (locationId: number) => {
    setLocations(prev => prev.filter(location => location.id !== locationId));
    toast({
      title: "Local excluído",
      description: "Local foi removido com sucesso.",
      variant: "destructive",
    });
  };

  const toggleLocationStatus = (locationId: number) => {
    setLocations(prev => prev.map(location => 
      location.id === locationId 
        ? { ...location, status: location.status === 'Ativo' ? 'Inativo' : 'Ativo' }
        : location
    ));
  };

  const cancelForm = () => {
    setShowAddForm(false);
    setEditingLocation(null);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[1000px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Gerenciar Locais de Treinamento
          </DialogTitle>
          <DialogDescription>
            Configure os locais onde as aulas são realizadas
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {!showAddForm ? (
            <>
              <div className="flex justify-between items-center gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar locais..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button onClick={() => setShowAddForm(true)} className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Local
                </Button>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Endereço</TableHead>
                      <TableHead>Horário de Funcionamento</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLocations.map((location) => (
                      <TableRow key={location.id}>
                        <TableCell className="font-medium">{location.name}</TableCell>
                        <TableCell className="max-w-xs">
                          <div className="flex items-start gap-1">
                            <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                            <span className="text-sm">{location.address}</span>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-xs">
                          <div className="flex items-start gap-1">
                            <Clock className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                            <span className="text-sm">{location.operatingHours}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={location.status === 'Ativo' ? 'default' : 'secondary'}
                            className="cursor-pointer"
                            onClick={() => toggleLocationStatus(location.id)}
                          >
                            {location.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(location)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(location.id)}
                              className="hover:bg-red-50"
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
            </>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do Local</Label>
                  <Input
                    id="name"
                    {...register('name', { required: 'Nome é obrigatório' })}
                    placeholder="Ex: Academia Central"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Endereço Completo</Label>
                  <Textarea
                    id="address"
                    {...register('address', { required: 'Endereço é obrigatório' })}
                    placeholder="Rua, número, bairro, cidade, estado, CEP"
                    rows={3}
                  />
                  {errors.address && (
                    <p className="text-sm text-red-600">{errors.address.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="operatingHours">Horário de Funcionamento</Label>
                  <Textarea
                    id="operatingHours"
                    {...register('operatingHours', { required: 'Horário é obrigatório' })}
                    placeholder="Ex: Segunda a Sexta: 06:00 às 22:00 | Sábado: 08:00 às 18:00"
                    rows={2}
                  />
                  {errors.operatingHours && (
                    <p className="text-sm text-red-600">{errors.operatingHours.message}</p>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={cancelForm}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {editingLocation ? 'Salvar Alterações' : 'Criar Local'}
                </Button>
              </div>
            </form>
          )}

          <div className="text-sm text-gray-600 flex justify-between items-center">
            <span>Total de locais: {locations.length}</span>
            <div className="flex gap-4 text-xs">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded"></div>
                Ativos: {locations.filter(l => l.status === 'Ativo').length}
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-gray-500 rounded"></div>
                Inativos: {locations.filter(l => l.status === 'Inativo').length}
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
