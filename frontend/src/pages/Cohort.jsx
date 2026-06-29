import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Award, Zap, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { cohort } from '../mockData';

const Cohort = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center">
        <div className="absolute inset-0">
          <img
            src={cohort.image}
            alt="Cohorte AYCM"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#006838]/90 to-[#006838]/70"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <Badge className="bg-[#FDB913] text-[#003D21] mb-4">REJOIGNEZ-NOUS</Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              COHORTE AYCM
            </h1>
            <div className="w-20 h-1 bg-[#FDB913] mb-6"></div>
            <p className="text-xl text-white mb-8">
              {cohort.description}
            </p>
            <Button className="bg-[#FDB913] hover:bg-yellow-400 text-[#003D21] px-8 py-6 text-lg">
              Postuler maintenant
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cohort.stats.map((stat, index) => (
              <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="text-5xl font-bold text-[#006838] mb-2">{stat.value}</div>
                  <p className="text-gray-600">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What is Cohort */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">QU'EST-CE QUE LA COHORTE AYCM ?</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              La Cohorte AYCM est un programme d'excellence qui regroupe des jeunes leaders africains passionnés par le changement social. C'est une communauté dynamique où vous développez vos compétences, élargissez votre réseau et accédez à des opportunités uniques pour transformer votre vision en réalité.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#006838] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Réseau Panafricain</h3>
                <p className="text-gray-700">
                  Connectez-vous avec des leaders de plus de 35 pays africains et créez des partenariats stratégiques.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#FDB913] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-[#003D21]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Formation Continue</h3>
                <p className="text-gray-700">
                  Bénéficiez de formations mensuelles, ateliers et masterclasses animés par des experts.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#006838] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Opportunités Exclusives</h3>
                <p className="text-gray-700">
                  Accédez en priorité à des bourses, financements et opportunités de développement.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">AVANTAGES DE LA COHORTE</h2>
            <div className="space-y-4">
              {cohort.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-[#006838] rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <p className="text-lg text-gray-700 pt-1">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-16 bg-gradient-to-r from-[#006838] to-[#005030] text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">PROCESSUS DE CANDIDATURE</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                step: '01',
                title: 'Postulez en ligne',
                description: 'Remplissez le formulaire de candidature avec vos informations'
              },
              {
                step: '02',
                title: 'Évaluation',
                description: 'Notre équipe examine votre profil et votre motivation'
              },
              {
                step: '03',
                title: 'Entretien',
                description: 'Entretien avec notre comité de sélection'
              },
              {
                step: '04',
                title: 'Intégration',
                description: 'Bienvenue dans la cohorte AYCM !'
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-6xl font-bold text-[#FDB913] mb-4 opacity-50">{item.step}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-200">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">ÉLIGIBILITÉ</h2>
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Qui peut postuler ?</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#006838] mt-1 flex-shrink-0" />
                        <span className="text-gray-700">Jeunes africains âgés de 18 à 35 ans</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#006838] mt-1 flex-shrink-0" />
                        <span className="text-gray-700">Passion pour le développement et l'innovation sociale</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#006838] mt-1 flex-shrink-0" />
                        <span className="text-gray-700">Engagement à participer activement aux activités de la cohorte</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#006838] mt-1 flex-shrink-0" />
                        <span className="text-gray-700">Projet ou initiative en cours ou envisagé</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#006838] mt-1 flex-shrink-0" />
                        <span className="text-gray-700">Maîtrise du français ou de l'anglais</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-6 border-t">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Documents requis</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• CV à jour</li>
                      <li>• Lettre de motivation</li>
                      <li>• Description de votre projet/initiative</li>
                      <li>• Lettre de recommandation (optionnelle)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">PRÊT À REJOINDRE LA COHORTE ?</h2>
            <p className="text-xl text-gray-700 mb-8">
              Ne manquez pas cette opportunité de faire partie d'une communauté qui transforme l'Afrique.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-[#006838] hover:bg-[#005030] text-white px-8 py-6 text-lg">
                Soumettre ma candidature
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Link to="/contact">
                <Button variant="outline" className="border-[#006838] text-[#006838] hover:bg-[#006838] hover:text-white px-8 py-6 text-lg">
                  Poser une question
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cohort;
