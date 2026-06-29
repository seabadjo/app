import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, Eye, Heart, Users } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { aboutInfo } from '../mockData';
import { usePresidentMessage, useImpact } from '../hooks/useAycmData';

const About = () => {
  const { data: presidentMessage } = usePresidentMessage();
  const { data: impact = [] } = useImpact();
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1527525443983-6e60c75fff46?w=1920&h=400&fit=crop"
            alt="À propos AYCM"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#006838]/90 to-[#006838]/70"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <Badge className="bg-[#FDB913] text-[#003D21] mb-4">QUI SOMMES-NOUS</Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              À PROPOS D'AYCM
            </h1>
            <div className="w-20 h-1 bg-[#FDB913] mb-6"></div>
            <p className="text-xl text-white">
              Une organisation panafricaine au service de la jeunesse et du développement durable.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <Card className="border-t-4 border-[#006838] shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#006838] rounded-full flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">NOTRE MISSION</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {aboutInfo.mission}
                </p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-[#FDB913] shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#FDB913] rounded-full flex items-center justify-center">
                    <Eye className="w-6 h-6 text-[#003D21]" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">NOTRE VISION</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {aboutInfo.vision}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* President Full Message */}
          <Card className="bg-gradient-to-r from-gray-50 to-white border-l-4 border-[#006838] shadow-lg mb-16" id="president">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                  <img
                    src={presidentMessage.image}
                    alt={presidentMessage.name}
                    className="w-full h-64 object-cover rounded-lg shadow-md"
                  />
                  <div className="mt-4 text-center">
                    <p className="font-bold text-xl text-gray-900">{presidentMessage.name}</p>
                    <p className="text-gray-600">{presidentMessage.title}</p>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">MOT DU PRÉSIDENT</h3>
                  <p className="text-5xl font-serif text-[#006838] mb-4">“</p>
                  <p className="text-gray-700 leading-relaxed text-lg mb-6">
                    {presidentMessage.fullMessage}
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Notre engagement collectif, notre passion et notre détermination sont les piliers qui nous permettront de façonner l'Afrique de demain. Ensemble, nous ne sommes pas seulement des rêveurs, nous sommes des acteurs du changement.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Impact Stats */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">NOTRE IMPACT EN CHIFFRES</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {impact.map((item) => (
                <Card key={item.id} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="text-4xl font-bold text-[#006838] mb-2">{item.value}</div>
                    <p className="text-gray-600">{item.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50" id="valeurs">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">NOS VALEURS</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Les principes qui guident notre action quotidienne et nos décisions stratégiques.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {aboutInfo.values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow group">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#006838] to-[#005030] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">{value.title}</h4>
                  <p className="text-sm text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-16 bg-white" id="histoire">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">NOTRE HISTOIRE</h3>
              <div className="w-20 h-1 bg-[#FDB913] mx-auto mb-6"></div>
            </div>
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <p className="text-gray-700 leading-relaxed text-lg mb-6">
                  {aboutInfo.history}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Aujourd'hui, l'AYCM est reconnue comme une organisation de référence dans le domaine du leadership jeunesse en Afrique. Nous continuons à innover et à développer des programmes qui répondent aux besoins réels des jeunes africains, tout en restant fidèles à notre vision d'une Afrique prospère et unie.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-gray-50" id="equipe">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">NOTRE ÉQUIPE</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Une équipe passionnée et expérimentée au service de la jeunesse africaine.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {aboutInfo.team.map((member, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h4 className="font-bold text-lg">{member.name}</h4>
                    <p className="text-sm text-gray-200">{member.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#006838] to-[#005030] text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">REJOIGNEZ-NOUS</h3>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Faites partie du mouvement qui transforme l'Afrique. Ensemble, nous pouvons créer un avenir meilleur.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/cohorte">
              <Button className="bg-[#FDB913] hover:bg-yellow-400 text-[#003D21] px-8 py-6 text-lg">
                <Users className="mr-2 w-5 h-5" />
                Rejoindre la cohorte
              </Button>
            </Link>
            <Link to="/don">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#006838] px-8 py-6 text-lg">
                Faire un don
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
