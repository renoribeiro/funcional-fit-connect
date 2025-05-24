
import React, { useState } from 'react';
import { Video, Play, Clock, Star, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

export const VideosPage: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  const videoCategories = [
    'Todos', 'Funcional', 'HIIT', 'Cardio', 'Força', 'Flexibilidade', 'Iniciante'
  ];

  const videos = [
    {
      id: 1,
      title: 'Treino Funcional em Casa - 20min',
      description: 'Exercícios funcionais para fazer em casa sem equipamentos',
      duration: '20:15',
      category: 'Funcional',
      level: 'Intermediário',
      rating: 4.8,
      thumbnail: '/placeholder.svg',
      instructor: 'Carlos Silva'
    },
    {
      id: 2,
      title: 'HIIT Cardio Intenso',
      description: 'Treino intervalado de alta intensidade para queimar gordura',
      duration: '15:30',
      category: 'HIIT',
      level: 'Avançado',
      rating: 4.9,
      thumbnail: '/placeholder.svg',
      instructor: 'Ana Costa'
    },
    {
      id: 3,
      title: 'Alongamento e Flexibilidade',
      description: 'Sequência de alongamentos para relaxar e ganhar flexibilidade',
      duration: '12:45',
      category: 'Flexibilidade',
      level: 'Iniciante',
      rating: 4.7,
      thumbnail: '/placeholder.svg',
      instructor: 'Maria Santos'
    },
    {
      id: 4,
      title: 'Fortalecimento Core',
      description: 'Exercícios específicos para fortalecer o core e melhorar a postura',
      duration: '18:20',
      category: 'Força',
      level: 'Intermediário',
      rating: 4.6,
      thumbnail: '/placeholder.svg',
      instructor: 'João Oliveira'
    },
  ];

  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    video.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePlayVideo = (videoId: number) => {
    toast({
      title: "Reproduzindo Vídeo",
      description: "Iniciando reprodução do vídeo selecionado...",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Área de Vídeos</h1>
        <p className="text-gray-600 mt-2">Treine em casa com nossos vídeos exclusivos</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar vídeos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {videoCategories.map((category) => (
            <Button
              key={category}
              variant="outline"
              size="sm"
              className="whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img 
                src={video.thumbnail} 
                alt={video.title}
                className="w-full h-48 object-cover bg-gray-200"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <Button 
                  size="lg" 
                  className="bg-white text-black hover:bg-gray-100"
                  onClick={() => handlePlayVideo(video.id)}
                >
                  <Play className="h-6 w-6 mr-2" />
                  Assistir
                </Button>
              </div>
              <Badge className="absolute top-2 right-2 bg-black bg-opacity-70 text-white">
                <Clock className="h-3 w-3 mr-1" />
                {video.duration}
              </Badge>
            </div>
            <CardHeader>
              <CardTitle className="text-lg">{video.title}</CardTitle>
              <CardDescription>{video.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{video.category}</Badge>
                  <Badge variant="outline">{video.level}</Badge>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-gray-600">{video.rating}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600">Professor: {video.instructor}</p>
              <Button 
                className="w-full mt-3 bg-green-600 hover:bg-green-700"
                onClick={() => handlePlayVideo(video.id)}
              >
                <Video className="h-4 w-4 mr-2" />
                Assistir Agora
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
