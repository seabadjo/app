import React, { useState } from 'react';
import { Heart, CreditCard, Building, Smartphone, ArrowRight, Check } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { toast } from '../hooks/use-toast';
import { apiPostDonation } from '../lib/api';

const Donation = () => {
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [donationType, setDonationType] = useState('one-time');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [donorInfo, setDonorInfo] = useState({ donorName: '', email: '', phone: '', country: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const suggestedAmounts = ['10', '25', '50', '100', '250', '500'];

  const handleDonation = async (e) => {
    e.preventDefault();
    const donationAmount = Number(amount || customAmount);
    if (!donationAmount || donationAmount < 1) {
      toast({ title: "Montant invalide", description: "Choisissez ou entrez un montant.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
      await apiPostDonation({
        amount: donationAmount,
        currency: 'EUR',
        donorName: donorInfo.donorName,
        email: donorInfo.email,
        message: `Don ${donationType === 'monthly' ? 'mensuel' : 'ponctuel'} - paiement ${paymentMethod} - ${donorInfo.country}`,
        isAnonymous: false,
      });
      toast({
        title: "Merci pour votre générosité !",
        description: `Votre don de ${donationAmount}€ a été enregistré. Vous allez être redirigé vers le paiement.`,
      });
      // Reset
      setAmount(''); setCustomAmount('');
      setDonorInfo({ donorName: '', email: '', phone: '', country: '' });
    } catch (err) {
      toast({
        title: "Erreur",
        description: err?.response?.data?.message || "Impossible d'enregistrer votre don. Réessayez.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDonorChange = (field) => (e) => setDonorInfo({ ...donorInfo, [field]: e.target.value });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1542315099045-93937d70c67a?w=1920&h=500&fit=crop"
            alt="Faire un don"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#006838]/90 to-[#006838]/70"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <Badge className="bg-[#FDB913] text-[#003D21] mb-4">SOUTENEZ NOTRE MISSION</Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              FAIRE UN DON
            </h1>
            <div className="w-20 h-1 bg-[#FDB913] mb-6"></div>
            <p className="text-xl text-white mb-8">
              Votre soutien permet à l'AYCM de continuer à former et accompagner des milliers de jeunes leaders africains.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">VOTRE DON, LEUR AVENIR</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Chaque euro compte et a un impact réel sur la vie de jeunes africains.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                amount: '25€',
                impact: 'Finance des supports de formation pour 5 jeunes leaders'
              },
              {
                amount: '50€',
                impact: 'Permet à un jeune de participer à un atelier de leadership'
              },
              {
                amount: '100€',
                impact: 'Soutient le lancement d\'un projet communautaire'
              }
            ].map((item, index) => (
              <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="text-4xl font-bold text-[#006838] mb-4">{item.amount}</div>
                  <p className="text-gray-700">{item.impact}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-xl">
              <CardContent className="p-8">
                <form onSubmit={handleDonation}>
                  {/* Donation Type */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Type de don</h3>
                    <Tabs defaultValue="one-time" className="w-full">
                      <TabsList className="grid w-full grid-cols-2 bg-gray-100 p-1 rounded-lg">
                        <TabsTrigger
                          value="one-time"
                          onClick={() => setDonationType('one-time')}
                          className="data-[state=active]:bg-[#006838] data-[state=active]:text-white"
                        >
                          Don ponctuel
                        </TabsTrigger>
                        <TabsTrigger
                          value="monthly"
                          onClick={() => setDonationType('monthly')}
                          className="data-[state=active]:bg-[#006838] data-[state=active]:text-white"
                        >
                          Don mensuel
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>

                  {/* Amount Selection */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Montant du don</h3>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-4">
                      {suggestedAmounts.map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => {
                            setAmount(amt);
                            setCustomAmount('');
                          }}
                          className={`py-4 px-4 rounded-lg border-2 font-semibold transition-all ${
                            amount === amt
                              ? 'border-[#006838] bg-[#006838] text-white'
                              : 'border-gray-300 hover:border-[#006838] hover:bg-gray-50'
                          }`}
                        >
                          {amt}€
                        </button>
                      ))}
                    </div>
                    <div>
                      <Input
                        type="number"
                        placeholder="Montant personnalisé (€)"
                        value={customAmount}
                        onChange={(e) => {
                          setCustomAmount(e.target.value);
                          setAmount('');
                        }}
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Méthode de paiement</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { id: 'card', icon: CreditCard, label: 'Carte bancaire' },
                        { id: 'bank', icon: Building, label: 'Virement bancaire' },
                        { id: 'mobile', icon: Smartphone, label: 'Mobile money' }
                      ].map((method) => (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => setPaymentMethod(method.id)}
                          className={`p-6 rounded-lg border-2 flex flex-col items-center gap-3 transition-all ${
                            paymentMethod === method.id
                              ? 'border-[#006838] bg-[#006838] text-white'
                              : 'border-gray-300 hover:border-[#006838] hover:bg-gray-50'
                          }`}
                        >
                          <method.icon className="w-8 h-8" />
                          <span className="font-semibold">{method.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Personal Information */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Vos informations</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nom complet *
                        </label>
                        <Input type="text" required placeholder="Votre nom" value={donorInfo.donorName} onChange={handleDonorChange('donorName')} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <Input type="email" required placeholder="votre.email@exemple.com" value={donorInfo.email} onChange={handleDonorChange('email')} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Téléphone
                        </label>
                        <Input type="tel" placeholder="+225 XX XX XX XX XX" value={donorInfo.phone} onChange={handleDonorChange('phone')} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Pays *
                        </label>
                        <Input type="text" required placeholder="Votre pays" value={donorInfo.country} onChange={handleDonorChange('country')} />
                      </div>
                    </div>
                  </div>

                  {/* Tax Deduction Info */}
                  <div className="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-start gap-3">
                      <Check className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Déduction fiscale</h4>
                        <p className="text-sm text-gray-700">
                          Votre don est déductible des impôts à hauteur de 66% dans la limite de 20% de votre revenu imposable. Un reçu fiscal vous sera envoyé par email.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#006838] hover:bg-[#005030] text-white py-6 text-lg"
                  >
                    <Heart className="mr-2 w-5 h-5" />
                    {isSubmitting ? 'Traitement en cours...' : `Faire un don de ${amount || customAmount || '...'}€`}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>

                  <p className="text-center text-sm text-gray-600 mt-4">
                    Paiement 100% sécurisé - Vos données sont protégées
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Other Ways to Support */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">AUTRES FAÇONS DE SOUTENIR</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Devenir partenaire',
                description: 'Engagez votre entreprise dans notre mission',
                link: '/contact'
              },
              {
                title: 'Devenir bénévole',
                description: 'Mettez vos compétences au service de l\'AYCM',
                link: '/contact'
              },
              {
                title: 'Parrainer un projet',
                description: 'Soutenez directement un projet spécifique',
                link: '/nos-actions'
              }
            ].map((item, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow group cursor-pointer">
                <CardContent className="p-8 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#006838] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 mb-6">{item.description}</p>
                  <Button variant="outline" className="border-[#006838] text-[#006838] hover:bg-[#006838] hover:text-white">
                    En savoir plus
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Donation;
