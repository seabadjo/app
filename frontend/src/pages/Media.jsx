import React, { useState } from 'react';
import { Image, Video, FileText, Download, Calendar } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useMediaGallery } from '../hooks/useAycmData';

const Media = () => {
  const [activeTab, setActiveTab] = useState('photos');
  const { data: mediaGallery = [] } = useMediaGallery();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1536337005238-94b997371b40?w=1920&h=400&fit=crop"
            alt="Médias AYCM"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#006838]/90 to-[#006838]/70"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <Badge className="bg-[#FDB913] text-[#003D21] mb-4">GALERIE & RESSOURCES</Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              MÉDIAS
            </h1>
            <div className="w-20 h-1 bg-[#FDB913] mb-6"></div>
            <p className="text-xl text-white">
              Découvrez nos moments forts en images, vidéos et documents.
            </p>
          </div>
        </div>
      </section>

      {/* Media Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="photos" className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="bg-gray-100 p-2 rounded-lg inline-flex gap-2">
                <TabsTrigger
                  value="photos"
                  onClick={() => setActiveTab('photos')}
                  className="data-[state=active]:bg-[#006838] data-[state=active]:text-white flex items-center gap-2"
                >
                  <Image className="w-4 h-4" />
                  Photos
                </TabsTrigger>
                <TabsTrigger
                  value="videos"
                  onClick={() => setActiveTab('videos')}
                  className="data-[state=active]:bg-[#006838] data-[state=active]:text-white flex items-center gap-2"
                >
                  <Video className="w-4 h-4" />
                  Vidéos
                </TabsTrigger>
                <TabsTrigger
                  value="documents"
                  onClick={() => setActiveTab('documents')}
                  className="data-[state=active]:bg-[#006838] data-[state=active]:text-white flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  Documents
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="photos">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mediaGallery.map((item) => (
                  <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                          <p className="font-semibold">{item.title}</p>
                          <p className="text-sm text-gray-200">{item.date}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="videos">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    id: 1,
                    title: 'Forum Africain de la Jeunesse 2024 - Highlights',
                    thumbnail: 'https://images.unsplash.com/photo-1655720348590-c739c860beed?w=600&h=400&fit=crop',
                    duration: '5:30',
                    date: 'Mai 2024'
                  },
                  {
                    id: 2,
                    title: 'Témoignages de jeunes leaders AYCM',
                    thumbnail: 'https://images.unsplash.com/photo-1584365098838-50ccef838f4a?w=600&h=400&fit=crop',
                    duration: '3:45',
                    date: 'Avril 2024'
                  },
                  {
                    id: 3,
                    title: 'Lancement du projet Green Youth Initiative',
                    thumbnail: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop',
                    duration: '8:20',
                    date: 'Mars 2024'
                  }
                ].map((video) => (
                  <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
                    <div className="relative h-64">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Video className="w-8 h-8 text-[#006838]" />
                        </div>
                      </div>
                      <Badge className="absolute top-4 right-4 bg-black/70 text-white">
                        {video.duration}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-1">{video.title}</h3>
                      <p className="text-sm text-gray-600">{video.date}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="documents">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    id: 1,
                    title: 'Rapport Annuel AYCM 2023',
                    type: 'PDF',
                    size: '2.5 MB',
                    date: 'Janvier 2024'
                  },
                  {
                    id: 2,
                    title: 'Guide du membre AYCM',
                    type: 'PDF',
                    size: '1.8 MB',
                    date: 'Décembre 2023'
                  },
                  {
                    id: 3,
                    title: 'Présentation des programmes 2024',
                    type: 'PDF',
                    size: '3.2 MB',
                    date: 'Décembre 2023'
                  },
                  {
                    id: 4,
                    title: 'Étude d\'impact - Projets communautaires',
                    type: 'PDF',
                    size: '4.1 MB',
                    date: 'Novembre 2023'
                  },
                  {
                    id: 5,
                    title: 'Brochure AYCM 2024',
                    type: 'PDF',
                    size: '5.3 MB',
                    date: 'Janvier 2024'
                  },
                  {
                    id: 6,
                    title: 'Plan stratégique 2024-2027',
                    type: 'PDF',
                    size: '2.9 MB',
                    date: 'Décembre 2023'
                  }
                ].map((doc) => (
                  <Card key={doc.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-[#006838] rounded-lg flex items-center justify-center flex-shrink-0">
                          <FileText className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{doc.title}</h3>
                          <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                            <span>{doc.type}</span>
                            <span>•</span>
                            <span>{doc.size}</span>
                            <span>•</span>
                            <span>{doc.date}</span>
                          </div>
                          <Button variant="outline" size="sm" className="border-[#006838] text-[#006838] hover:bg-[#006838] hover:text-white">
                            <Download className="w-4 h-4 mr-2" />
                            Télécharger
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Press Kit CTA */}
      <section className="py-16 bg-gradient-to-r from-[#006838] to-[#005030] text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">KIT PRESSE</h3>
            <p className="text-xl mb-8">
              Vous êtes journaliste ou créateur de contenu ? Téléchargez notre kit presse complet avec logos, photos et informations.
            </p>
            <Button className="bg-[#FDB913] hover:bg-yellow-400 text-[#003D21] px-8 py-4 text-lg">
              <Download className="mr-2 w-5 h-5" />
              Télécharger le kit presse
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Media;
