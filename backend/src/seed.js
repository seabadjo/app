/**
 * Seeder AYCM — peuple la base avec les vraies données institutionnelles
 * (5 piliers fondamentaux + 8 codes d'éthique + statistiques d'impact + mot du président).
 *
 * Lancement :  npm run seed
 */
require('dotenv').config();
const { connectDB } = require('./config/db');
const { Pillar, EthicsCode, Impact, PresidentMessage, News, Opportunity, Media } = require('./models');

const PILLARS = [
  {
    name: "Lutte pour l'employabilité des jeunes",
    shortName: 'Employabilité',
    description: "Préparer les jeunes africains à intégrer durablement le marché du travail.",
    objectives: [
      "Développement de formations professionnelles adaptées aux réalités du marché de l'emploi",
      "Promotion de l'entrepreneuriat jeune et de l'auto-emploi durable",
      "Renforcement des partenariats entre écoles, universités et entreprises",
      "Accompagnement à l'insertion professionnelle par le mentorat et le coaching",
      "Valorisation des compétences locales et des métiers d'avenir",
    ],
    icon: 'briefcase', color: 'green', order: 1,
  },
  {
    name: 'Promotion de la gent féminine',
    shortName: 'Gent féminine',
    description: "Défendre l'égalité et soutenir le leadership des femmes africaines.",
    objectives: [
      "Défense de l'égalité des chances entre les femmes et les hommes",
      "Soutien à l'autonomisation économique et sociale des femmes",
      "Encouragement du leadership féminin dans les sphères décisionnelles",
      "Lutte contre toutes les formes de discrimination et de violence faites aux femmes",
      "Promotion de l'éducation des filles comme levier de développement durable",
    ],
    icon: 'female', color: 'yellow', order: 2,
  },
  {
    name: "Promotion de l'excellence",
    shortName: 'Excellence',
    description: "Cultiver le mérite, la rigueur et la qualité dans tous les domaines.",
    objectives: [
      "Valorisation du mérite, de l'effort et du travail bien fait",
      "Encouragement de la rigueur, de la discipline et de l'innovation",
      "Mise en lumière des talents et des modèles inspirants",
      "Soutien à la recherche, à la créativité et à l'esprit de performance",
      "Construction d'une culture de qualité dans tous les domaines de la vie nationale",
    ],
    icon: 'trophy', color: 'green', order: 3,
  },
  {
    name: 'Promotion de la diversité linguistique',
    shortName: 'Diversité linguistique',
    description: "Valoriser les langues locales et le multilinguisme comme richesse culturelle.",
    objectives: [
      "Valorisation des langues locales comme patrimoine culturel",
      "Promotion du multilinguisme comme outil d'unité et d'ouverture",
      "Intégration des langues locales dans l'éducation et la communication",
      "Protection et transmission des langues menacées de disparition",
      "Renforcement du dialogue interculturel par la langue",
    ],
    icon: 'language', color: 'yellow', order: 4,
  },
  {
    name: 'Lutte contre le changement climatique',
    shortName: 'Climat',
    description: "Engager la jeunesse africaine pour la protection de l'environnement.",
    objectives: [
      "Sensibilisation des populations aux enjeux environnementaux",
      "Promotion des comportements écoresponsables au quotidien",
      "Protection des ressources naturelles et de la biodiversité",
      "Soutien aux initiatives vertes et aux énergies renouvelables",
      "Engagement de la jeunesse dans l'action climatique durable",
    ],
    icon: 'leaf', color: 'green', order: 5,
  },
];

const ETHICS = [
  { name: 'PROFESSIONNALISME', description: "Respecter les codes d'éthique de AYCM est la première marque de professionnalisme. C'est le point de départ d'une mission rigoureuse et bien faite, alignée sur les objectifs de l'association.", order: 1 },
  { name: 'DÉTERMINATION', description: "Dans un esprit de fermeté, AYCM fait de la détermination le carburant nécessaire pour le militantisme associatif.", order: 2 },
  { name: 'ENGAGEMENT', description: "L'engagement révèle le caractère sans détour d'un militant en mission — parfois périlleuse — qui canalise toute son attention au service de la cause.", order: 3 },
  { name: 'ÉCOUTE', description: "À AYCM, écouter va au-delà de tendre l'oreille : c'est être corps et esprit impliqué lors des formations, séances informatives et activités. Le militant n'est satisfait que si son interlocuteur se sent réellement écouté.", order: 4 },
  {
    name: 'FIDÉLITÉ',
    description: "La fidélité chez AYCM s'articule autour de plusieurs principes clairs.",
    principles: [
      "Engagement à être fidèle à AYCM",
      "Respect de sa parole donnée",
      "Communiquer sur ses prises de décisions concernant AYCM avant application",
      "Respect des objectifs communs fixés ensemble",
    ],
    order: 5,
  },
  { name: 'ÉGALITÉ', description: "Tous les membres de AYCM ont les mêmes droits et devoirs, quels que soient le genre, la position sociale, économique et le bagage intellectuel. Respecter l'autre malgré la différence et lui donner la place qu'il mérite est essentiel à un AYCM plus fort.", order: 6 },
  { name: 'RESPECT', description: "Pour AYCM, le respect prend tout son sens lorsqu'il reflète un sentiment de considération accru envers l'autre — peu importe notre intelligence, notre savoir, notre position sociale ou nos relations.", order: 7 },
  { name: 'PROACTIVITÉ', description: "AYCM apprécie la proactivité comme la capacité à prendre des initiatives pour le bien de tous et de l'association. L'avenir se construit avec des militants d'action positive, qualitative et quantitative.", order: 8 },
];

const IMPACT_STATS = [
  { label: 'Jeunes impactés',     value: 2500, suffix: '+', icon: 'users',     order: 1 },
  { label: 'Projets réalisés',    value: 150,  suffix: '+', icon: 'projects',  order: 2 },
  { label: 'Pays africains',      value: 25,   suffix: '',  icon: 'globe',     order: 3 },
  { label: 'Partenaires engagés', value: 100,  suffix: '+', icon: 'handshake', order: 4 },
];

const PRESIDENT_MESSAGE = {
  presidentName: 'M. KRA Yao Israël',
  title: 'Président de African Youth Change Makers (AYCM)',
  shortQuote: '« I am a leader, not a driver! »',
  excerpt: "Notre force réside dans notre engagement collectif à créer un impact positif et durable. Chaque jeune a le pouvoir de changer sa communauté et le monde.",
  fullMessage:
    "Bienvenue sur le site officiel de l'African Youth Change Makers (AYCM). Notre association est née d'une conviction forte : la jeunesse est la plus grande richesse de notre continent lorsqu'elle est guidée par le savoir, le leadership et l'innovation. À AYCM, nous nous engageons à révéler le potentiel des jeunes, à développer leurs compétences et à les préparer à devenir des acteurs responsables du changement, capables d'influencer positivement leurs communautés et le monde.\n\n" +
    "Notre vision s'appuie sur l'excellence, l'apprentissage continu et une ouverture résolue à l'international. Nous croyons que les grands défis de notre époque exigent des solutions fondées sur la coopération, le partage des connaissances et le dialogue entre les peuples. C'est pourquoi AYCM construit des partenariats avec des institutions, des universités, des organisations et des leaders de différents horizons afin d'offrir à la jeunesse africaine des opportunités de formation, d'innovation et de rayonnement mondial.\n\n" +
    "Je vous invite à faire partie de cette aventure collective. Ensemble, transformons les idées en actions, les défis en opportunités et les ambitions en réalisations durables. Rejoindre AYCM, c'est choisir de servir avec intégrité, d'apprendre avec humilité, d'innover avec audace et de diriger avec vision pour bâtir une Afrique forte, prospère et pleinement connectée au monde.\n\n" +
    "« I am a leader, not a driver! »",
  isActive: true,
};

const NEWS = [
  {
    title: "Forum Africain de la Jeunesse 2024 : Un succès inspirant",
    slug: "forum-africain-jeunesse-2024",
    category: "EVENEMENT",
    excerpt: "Plus de 500 jeunes leaders se sont réunis pour échanger sur l'avenir de l'Afrique.",
    content: "Le Forum Africain de la Jeunesse 2024 a été un moment fort de partage et d'inspiration. Pendant trois jours, plus de 500 jeunes leaders venus de 25 pays africains ont échangé sur les défis et opportunités du continent.",
    coverImage: "https://images.unsplash.com/photo-1655720348590-c739c860beed?w=600&h=400&fit=crop",
    publishedAt: new Date('2024-05-25'),
  },
  {
    title: "Lancement du projet Green Youth Initiative au Sénégal",
    slug: "green-youth-initiative-senegal",
    category: "PROJET",
    excerpt: "Un programme environnemental impliquant 200 jeunes dans la reforestation.",
    content: "L'AYCM lance le projet Green Youth Initiative au Sénégal, mobilisant 200 jeunes dans un programme ambitieux de reforestation et de sensibilisation environnementale.",
    coverImage: "https://images.unsplash.com/photo-1584365098838-50ccef838f4a?w=600&h=400&fit=crop",
    publishedAt: new Date('2024-05-15'),
  },
  {
    title: "AYCM parmi les 10 meilleures ONG jeunesse en Afrique",
    slug: "aycm-top-10-ong-jeunesse",
    category: "ANNONCE",
    excerpt: "Reconnaissance internationale de notre engagement pour la jeunesse africaine.",
    content: "L'AYCM a été classée parmi les 10 meilleures organisations de jeunesse en Afrique par Africa Youth Awards 2024, reconnaissant notre impact et notre innovation.",
    coverImage: "https://images.unsplash.com/photo-1543689604-6fe8dbcd1f59?w=600&h=400&fit=crop",
    publishedAt: new Date('2024-05-05'),
  },
];

const OPPORTUNITIES = [
  {
    title: "Bourse Changemaker 2025",
    slug: "bourse-changemaker-2025",
    type: "Bourse",
    description: "Programme de bourses pour jeunes leaders africains innovants avec projet d'impact social. Éligibilité : 18-30 ans. Bénéfices : financement, mentorat et réseau de partenaires.",
    country: "Panafricain",
    deadline: new Date('2025-06-30'),
    applyUrl: "https://example.com/apply/changemaker",
    coverImage: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop",
  },
  {
    title: "Programme YALI 2024",
    slug: "programme-yali-2024",
    type: "Programme",
    description: "Formation intensive en leadership et entrepreneuriat social pour étudiants et jeunes professionnels africains. Certification, networking et accompagnement.",
    country: "USA",
    deadline: new Date('2024-07-15'),
    applyUrl: "https://yali.state.gov",
    coverImage: "https://images.unsplash.com/photo-1473649085228-583485e6e4d7?w=400&h=300&fit=crop",
  },
  {
    title: "Fellowship AYCM 2024",
    slug: "fellowship-aycm-2024",
    type: "Fellowship",
    description: "Programme d'accompagnement pour porteurs de projets communautaires à impact mesurable. Financement jusqu'à 5000€ et mentorat personnalisé.",
    country: "Multi-pays",
    deadline: new Date('2024-08-31'),
    applyUrl: "https://aycm.org/fellowship",
    coverImage: "https://images.unsplash.com/photo-1536337005238-94b997371b40?w=400&h=300&fit=crop",
  },
];

const MEDIA = [
  { title: "Forum Africain de la Jeunesse 2024", type: "photo", url: "https://images.unsplash.com/photo-1655720348590-c739c860beed?w=800&h=600&fit=crop", category: "Forum 2024", takenAt: new Date('2024-05-15') },
  { title: "Projet Green Youth Initiative", type: "photo", url: "https://images.unsplash.com/photo-1584365098838-50ccef838f4a?w=800&h=600&fit=crop", category: "Projets", takenAt: new Date('2024-05-10') },
  { title: "Formation Leadership Abidjan", type: "photo", url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop", category: "Formations", takenAt: new Date('2024-04-20') },
  { title: "Cohorte AYCM 2024", type: "photo", url: "https://images.unsplash.com/photo-1542315099045-93937d70c67a?w=800&h=600&fit=crop", category: "Cohorte", takenAt: new Date('2024-03-15') },
  { title: "Atelier Innovation Tech", type: "photo", url: "https://images.unsplash.com/photo-1527525443983-6e60c75fff46?w=800&h=600&fit=crop", category: "Innovation", takenAt: new Date('2024-03-05') },
  { title: "Communauté AYCM", type: "photo", url: "https://images.unsplash.com/photo-1543689604-6fe8dbcd1f59?w=800&h=600&fit=crop", category: "Communauté", takenAt: new Date('2024-02-20') },
];

(async () => {
  try {
    await connectDB();

    console.log('[Seed] Suppression des données existantes...');
    await Promise.all([
      Pillar.destroy({ where: {} }),
      EthicsCode.destroy({ where: {} }),
      Impact.destroy({ where: {} }),
      PresidentMessage.destroy({ where: {} }),
      News.destroy({ where: {} }),
      Opportunity.destroy({ where: {} }),
      Media.destroy({ where: {} }),
    ]);

    console.log('[Seed] Insertion des 5 piliers...');
    await Pillar.bulkCreate(PILLARS);

    console.log("[Seed] Insertion des 8 codes d'éthique...");
    await EthicsCode.bulkCreate(ETHICS);

    console.log("[Seed] Insertion des statistiques d'impact...");
    await Impact.bulkCreate(IMPACT_STATS);

    console.log('[Seed] Insertion du mot du Président...');
    await PresidentMessage.create(PRESIDENT_MESSAGE);

    console.log('[Seed] Insertion des actualités...');
    await News.bulkCreate(NEWS);

    console.log('[Seed] Insertion des opportunités...');
    await Opportunity.bulkCreate(OPPORTUNITIES);

    console.log('[Seed] Insertion des médias...');
    await Media.bulkCreate(MEDIA);

    console.log('[Seed] ✅ Terminé avec succès.');
    process.exit(0);
  } catch (err) {
    console.error('[Seed] ❌ Erreur :', err);
    process.exit(1);
  }
})();
