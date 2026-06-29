import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Users, Target } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { actions } from '../mockData';

const Actions = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1584365098838-50ccef838f4a?w=1920&h=400&fit=crop"
            alt="Nos actions"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#006838]/90 to-[#006838]/70"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <Badge className="bg-[#FDB913] text-[#003D21] mb-4">CE QUE NOUS FAISONS</Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              NOS ACTIONS
            </h1>
            <div className="w-20 h-1 bg-[#FDB913] mb-6"></div>
            <p className="text-xl text-white">
              Des programmes concrets pour transformer la jeunesse africaine et créer un impact durable.
            </p>
          </div>
        </div>
      </section>

      {/* Actions Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="space-y-12">
            {actions.map((action, index) => (
              <Card key={action.id} className={`overflow-hidden shadow-lg hover:shadow-xl transition-shadow ${index % 2 === 0 ? '' : 'bg-gray-50'}`}>
                <CardContent className="p-0">
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 ${index % 2 === 0 ? '' : 'lg:grid-flow-dense'}`}>
                    {/* Image */}
                    <div className={`relative h-80 lg:h-auto ${index % 2 === 0 ? '' : 'lg:col-start-2'}`}>
                      <img
                        src={action.image}
                        alt={action.title}
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-6 left-6 bg-[#FDB913] text-[#003D21] text-sm">
                        {action.category}
                      </Badge>
                    </div>

                    {/* Content */}
                    <div className={`p-8 lg:p-12 flex flex-col justify-center ${index % 2 === 0 ? '' : 'lg:col-start-1 lg:row-start-1'}`}>
                      <h3 className="text-3xl font-bold text-gray-900 mb-4">{action.title}</h3>
                      <p className="text-gray-700 leading-relaxed mb-6">{action.description}</p>

                      {/* Stats */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-[#006838] rounded-full flex items-center justify-center flex-shrink-0">
                            <Target className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Impact</p>
                            <p className="font-semibold text-gray-900">{action.impact}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-[#FDB913] rounded-full flex items-center justify-center flex-shrink-0">
                            <Clock className="w-5 h-5 text-[#003D21]" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Durée</p>
                            <p className="font-semibold text-gray-900">{action.duration}</p>
                          </div>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3">Points clés :</h4>
                        <ul className="space-y-2">
                          {action.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-[#006838] rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-gray-700">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-wrap gap-4">
                        <Link to="/cohorte">
                          <Button className="bg-[#006838] hover:bg-[#005030] text-white">
                            Participer
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                        </Link>
                        <Link to="/contact">
                          <Button variant="outline" className="border-[#006838] text-[#006838] hover:bg-[#006838] hover:text-white">
                            En savoir plus
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#006838] to-[#005030] text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">PRÊT À PASSER À L'ACTION ?</h3>
            <p className="text-xl mb-8">
              Rejoignez nos programmes et commencez votre parcours de transformation dès aujourd'hui.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/cohorte">
                <Button className="bg-[#FDB913] hover:bg-yellow-400 text-[#003D21] px-8 py-6 text-lg">
                  <Users className="mr-2 w-5 h-5" />
                  Rejoindre la cohorte
                </Button>
              </Link>
              <Link to="/opportunites">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#006838] px-8 py-6 text-lg">
                  Voir les opportunités
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Actions;
