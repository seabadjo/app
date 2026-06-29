import React from 'react';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useOpportunities } from '../hooks/useAycmData';

const Opportunities = () => {
  const [selectedType, setSelectedType] = React.useState('Tous');
  const types = ['Tous', 'Bourse', 'Programme', 'Fellowship', 'Stage', 'Emploi'];
  const { data: opportunities = [] } = useOpportunities();

  const filteredOpportunities = selectedType === 'Tous'
    ? opportunities
    : opportunities.filter(opp => opp.type === selectedType);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1473649085228-583485e6e4d7?w=1920&h=400&fit=crop"
            alt="Opportunités"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#006838]/90 to-[#006838]/70"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <Badge className="bg-[#FDB913] text-[#003D21] mb-4">VOTRE AVENIR COMMENCE ICI</Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              OPPORTUNITÉS
            </h1>
            <div className="w-20 h-1 bg-[#FDB913] mb-6"></div>
            <p className="text-xl text-white">
              Découvrez des opportunités de bourses, formations, et programmes pour développer vos compétences.
            </p>
          </div>
        </div>
      </section>

      {/* Opportunities Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* Filters */}
          <div className="mb-8">
            <Tabs defaultValue="Tous" className="w-full">
              <TabsList className="bg-gray-100 p-1 rounded-lg inline-flex gap-2">
                {types.map((type) => (
                  <TabsTrigger
                    key={type}
                    value={type}
                    onClick={() => setSelectedType(type)}
                    className="data-[state=active]:bg-[#006838] data-[state=active]:text-white"
                  >
                    {type}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Opportunities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredOpportunities.map((opp) => (
              <Card key={opp.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={opp.image}
                    alt={opp.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 left-4 bg-[#FDB913] text-[#003D21]">
                    {opp.type}
                  </Badge>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#006838]" />
                    <span className="text-sm font-medium text-gray-900">Date limite: {opp.deadline}</span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#006838] transition-colors">
                    {opp.title}
                  </h3>
                  <p className="text-gray-700 mb-4">{opp.description}</p>

                  <div className="space-y-3 mb-6">
                    <div>
                      <p className="text-sm font-semibold text-gray-900 mb-1">Éligibilité :</p>
                      <p className="text-sm text-gray-600">{opp.eligibility}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 mb-1">Avantages :</p>
                      <p className="text-sm text-gray-600">{opp.benefits}</p>
                    </div>
                  </div>

                  <Button className="w-full bg-[#006838] hover:bg-[#005030] text-white">
                    Postuler maintenant
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Alert */}
      <section className="py-16 bg-gradient-to-r from-[#006838] to-[#005030] text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">NE MANQUEZ AUCUNE OPPORTUNITÉ</h3>
            <p className="text-xl mb-8">
              Recevez les dernières opportunités directement dans votre boîte mail chaque semaine.
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

export default Opportunities;
