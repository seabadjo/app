import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Tag, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useNews } from '../hooks/useAycmData';

const News = () => {
  const categories = ['Tous', 'Événement', 'Projet', 'Annonce', 'Actualité'];
  const [selectedCategory, setSelectedCategory] = React.useState('Tous');
  const { data: news = [] } = useNews();

  const filteredNews = selectedCategory === 'Tous'
    ? news
    : news.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1543689604-6fe8dbcd1f59?w=1920&h=400&fit=crop"
            alt="Actualités AYCM"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#006838]/90 to-[#006838]/70"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <Badge className="bg-[#FDB913] text-[#003D21] mb-4">RESTEZ INFORMÉ</Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              ACTUALITÉS
            </h1>
            <div className="w-20 h-1 bg-[#FDB913] mb-6"></div>
            <p className="text-xl text-white">
              Découvrez les dernières nouvelles, événements et réalisations de l'AYCM.
            </p>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* Filters */}
          <div className="mb-8">
            <Tabs defaultValue="Tous" className="w-full">
              <TabsList className="bg-gray-100 p-1 rounded-lg inline-flex gap-2">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    onClick={() => setSelectedCategory(category)}
                    className="data-[state=active]:bg-[#006838] data-[state=active]:text-white"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Featured Article */}
          {filteredNews.length > 0 && (
            <Card className="mb-12 overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="relative h-96 lg:h-auto overflow-hidden">
                    <img
                      src={filteredNews[0].image}
                      alt={filteredNews[0].title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <Badge className="absolute top-6 left-6 bg-[#FDB913] text-[#003D21]">
                      {filteredNews[0].category}
                    </Badge>
                  </div>
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-2 text-gray-600 mb-4">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{filteredNews[0].date}</span>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-[#006838] transition-colors">
                      {filteredNews[0].title}
                    </h2>
                    <p className="text-gray-700 leading-relaxed mb-6">{filteredNews[0].content}</p>
                    <Button className="bg-[#006838] hover:bg-[#005030] text-white w-fit">
                      Lire la suite
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.slice(1).map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 left-4 bg-[#FDB913] text-[#003D21]">
                    {item.category}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-gray-600 mb-3">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{item.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#006838] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 mb-4 line-clamp-3">{item.excerpt}</p>
                  <Button variant="ghost" className="text-[#006838] hover:text-[#005030] p-0">
                    Lire plus
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" className="border-[#006838] text-[#006838] hover:bg-[#006838] hover:text-white px-8">
              Charger plus d'articles
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-gradient-to-r from-[#006838] to-[#005030] text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">NE MANQUEZ RIEN</h3>
            <p className="text-xl mb-8">
              Inscrivez-vous à notre newsletter pour recevoir les dernières actualités et opportunités directement dans votre boîte mail.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="px-6 py-3 rounded-lg text-gray-900 w-full sm:w-96"
              />
              <Button className="bg-[#FDB913] hover:bg-yellow-400 text-[#003D21] px-8 py-3">
                S'abonner
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default News;
