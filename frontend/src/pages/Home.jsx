import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Users, BookOpen, Heart, Lightbulb, Handshake, FolderCheck, Globe, Building2, UserPlus, UserCheck, Share2, Briefcase, Trophy, Languages, Leaf } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { cohort, ctaCards } from '../mockData';
import { usePresidentMessage, usePillars, useImpact, useNews, useOpportunities } from '../hooks/useAycmData';

const Home = () => {
  const { data: presidentMessage } = usePresidentMessage();
  const { data: pillars } = usePillars();
  const { data: impact } = useImpact();
  const { data: news } = useNews();
  const { data: opportunities } = useOpportunities();

  const getIcon = (iconName) => {
    const icons = {
      Users, BookOpen, Heart, Lightbulb, Handshake, FolderCheck,
      Globe, Building2, UserPlus, UserCheck, Share2,
      Briefcase, Trophy, Languages, Leaf,
    };
    const Icon = icons[iconName];
    return Icon ? <Icon className="w-8 h-8" /> : null;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1655720348590-c739c860beed?w=1920&h=600&fit=crop"
            alt="Jeunes africains unis"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              ENSEMBLE,<br />
              NOUS FAÇONNONS<br />
              <span className="text-[#FDB913]">L'AFRIQUE DE DEMAIN</span>
            </h1>
            <div className="w-20 h-1 bg-[#FDB913] mb-6"></div>
            <p className="text-xl text-white mb-8">
              AYCM mobilise, forme et connecte les jeunes leaders pour des communautés durables et un continent uni.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/nos-actions">
                <Button className="bg-[#006838] hover:bg-[#005030] text-white px-8 py-6 text-lg">
                  Découvrir nos actions
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/cohorte">
                <Button className="bg-[#FDB913] hover:bg-yellow-400 text-[#003D21] px-8 py-6 text-lg">
                  <Users className="mr-2 w-5 h-5" />
                  Rejoindre le mouvement
                </Button>
              </Link>
            </div>
          </div>
        </div>
        {/* Video Button */}
        <button className="absolute bottom-8 right-8 bg-white/20 backdrop-blur-md rounded-full p-6 hover:bg-white/30 transition-all group">
          <Play className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
          <span className="absolute -bottom-8 right-0 text-white text-sm">Regarder<br />notre vidéo</span>
        </button>
      </section>

      {/* President Message & Pillars & Impact Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* President Message */}
            <Card className="border-l-4 border-[#006838] shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <Badge className="bg-gray-200 text-gray-800 mb-4">MOT DU PRÉSIDENT</Badge>
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={presidentMessage.image}
                    alt={presidentMessage.name}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div>
                    <p className="text-3xl font-serif text-[#006838] mb-2">“</p>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {presidentMessage.message}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="font-semibold text-gray-900">{presidentMessage.name}</p>
                  <p className="text-sm text-gray-600">{presidentMessage.title}</p>
                </div>
                <Link to="/a-propos">
                  <Button variant="outline" className="mt-4 w-full border-[#006838] text-[#006838] hover:bg-[#006838] hover:text-white">
                    Lire le mot complet
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Pillars */}
            <Card className="lg:col-span-2 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">NOS PILIERS</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {pillars.map((pillar) => (
                    <div
                      key={pillar.id}
                      className="flex flex-col items-center text-center p-4 rounded-lg hover:bg-gray-50 transition-colors group cursor-pointer"
                    >
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"
                        style={{ backgroundColor: pillar.color }}
                      >
                        <div className="text-white">
                          {getIcon(pillar.icon)}
                        </div>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">{pillar.title}</h4>
                      <p className="text-xs text-gray-600">{pillar.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-[#006838] to-[#005030] text-white shadow-xl">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-8 text-center">NOTRE IMPACT</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {impact.map((item) => (
                  <div key={item.id} className="text-center group cursor-pointer">
                    <div className="flex justify-center mb-3">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-[#FDB913] transition-colors">
                        <div className="text-white group-hover:text-[#003D21]">
                          {getIcon(item.icon)}
                        </div>
                      </div>
                    </div>
                    <p className="text-4xl font-bold mb-2">{item.value}</p>
                    <p className="text-sm text-gray-200">{item.label}</p>
                  </div>
                ))}
              </div>
              <div className="text-center mt-8">
                <Link to="/a-propos">
                  <Button className="bg-[#FDB913] hover:bg-yellow-400 text-[#003D21]">
                    Voir notre impact
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* News & Cohort & Opportunities */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* News */}
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">ACTUALITÉS</h3>
                <Link to="/actualites" className="text-[#006838] hover:text-[#005030] flex items-center gap-1">
                  Voir toutes
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.map((item) => (
                  <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <Badge className="absolute top-4 left-4 bg-[#FDB913] text-[#003D21]">
                        {item.category}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <p className="text-xs text-gray-500 mb-2">{item.date}</p>
                      <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#006838] transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-600 line-clamp-2">{item.excerpt}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Cohort & Opportunities */}
            <div className="space-y-6">
              {/* Cohort Card */}
              <Card className="bg-gradient-to-br from-[#006838] to-[#005030] text-white overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">COHORTE AYCM</h3>
                    <p className="text-sm text-gray-200 mb-4">{cohort.description}</p>
                  </div>
                  <div className="relative h-48">
                    <img
                      src={cohort.image}
                      alt="Cohorte AYCM"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <Link to="/cohorte">
                      <Button className="w-full bg-[#FDB913] hover:bg-yellow-400 text-[#003D21]">
                        Découvrir la cohorte
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Opportunities */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900">OPPORTUNITÉS</h3>
                    <Link to="/opportunites" className="text-[#006838] hover:text-[#005030] flex items-center gap-1 text-sm">
                      Voir toutes
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                  <div className="space-y-4">
                    {opportunities.slice(0, 3).map((opp) => (
                      <div key={opp.id} className="border-l-4 border-[#FDB913] pl-4 hover:bg-gray-50 p-2 transition-colors cursor-pointer">
                        <Badge className="bg-[#006838] text-white mb-2">{opp.type}</Badge>
                        <h4 className="font-semibold text-gray-900 mb-1">{opp.title}</h4>
                        <p className="text-xs text-gray-600 mb-2">Date limite: {opp.deadline}</p>
                      </div>
                    ))}
                  </div>
                  <Link to="/opportunites">
                    <Button variant="outline" className="w-full mt-4 border-[#006838] text-[#006838] hover:bg-[#006838] hover:text-white">
                      Toutes les opportunités
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Cards */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {ctaCards.map((card) => (
              <Card key={card.id} className="hover:shadow-lg transition-shadow group">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-[#006838] rounded-full flex items-center justify-center group-hover:bg-[#FDB913] transition-colors">
                      <div className="text-white group-hover:text-[#003D21]">
                        {getIcon(card.icon)}
                      </div>
                    </div>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2 text-sm">{card.title}</h4>
                  <p className="text-xs text-gray-600 mb-4">{card.description}</p>
                  <Link to={card.link}>
                    <Button className="w-full bg-[#FDB913] hover:bg-yellow-400 text-[#003D21] text-sm">
                      {card.buttonText}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
