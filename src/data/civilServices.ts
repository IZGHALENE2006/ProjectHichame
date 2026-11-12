export const structureSlides = [
  { src: '/images_Statique/img1.png', title: 'Modélisation d’une structure en béton armé', alt: 'Modèle de calcul d’un bâtiment courbe en béton armé' },
  { src: '/images_Statique/img2.png', title: 'Planchers, voiles et éléments porteurs', alt: 'Modèle tridimensionnel de planchers et de voiles porteurs' },
  { src: '/images_Statique/img3.png', title: 'Ossature et charpente métallique', alt: 'Modèle de calcul d’une ossature métallique avec ses poutres et poteaux' },
  { src: '/images_Statique/img4.png', title: 'Analyse d’une structure métallique', alt: 'Modélisation d’une structure métallique à plusieurs niveaux' },
  { src: '/images_Statique/img5.png', title: 'Conception d’une charpente industrielle', alt: 'Modèle de charpente métallique avec contreventements et fondations' },
  { src: '/images_Statique/img6.jpg', title: 'Suivi d’exécution sur chantier', alt: 'Montage des poteaux et de la charpente métallique sur un chantier' },
  { src: '/images_Statique/img7.gif', title: 'Conception et assemblages métalliques', alt: 'Présentation des éléments et assemblages d’une construction métallique' },
  { src: '/images_Statique/img8.gif', title: 'Modélisation d’une structure industrielle', alt: 'Modèle de calcul d’un bâtiment industriel de grande longueur' },
]

export type CivilService = {
  id: 'structures' | 'thermique' | 'acoustique'
  number: string
  navTitle: string
  subtitle: string
  icon: 'building' | 'thermometer' | 'sound'
  title: string
  introduction: string[]
  prestations: { title: string; description: string }[]
  image?: { src: string; alt: string; caption: string }
  commitment: { title: string; paragraphs: string[]; ambition?: string }
}

export const civilServices: CivilService[] = [
  {
    id: 'structures', number: '01', navTitle: 'Structures', subtitle: 'Stabilité & durabilité', icon: 'building',
    title: 'Statique et génie des structures',
    introduction: [
      'Nous accompagnons nos clients à chaque étape de leurs projets de construction et de transformation, en proposant des études structurelles complètes, des calculs de dimensionnement et des solutions techniques adaptées aux exigences de chaque ouvrage.',
      'Notre expertise couvre les structures en béton armé, en acier et en bois, avec une attention particulière portée à la sécurité, à la stabilité, à la durabilité et à l’optimisation des solutions constructives.',
    ],
    prestations: [
      { title: 'Études et calculs de structures', description: 'Analyse statique, dimensionnement et vérification de la stabilité des ouvrages.' },
      { title: 'Plans d’exécution', description: 'Élaboration des plans de coffrage, de ferraillage et de détails constructifs en béton armé, ainsi que des plans de structures métalliques et en bois.' },
      { title: 'Dynamique des structures', description: 'Études du comportement dynamique des ouvrages et vérifications de leur résistance aux sollicitations sismiques.' },
      { title: 'Réhabilitation et transformation', description: 'Études structurelles pour les rénovations, extensions, surélévations et aménagements de combles.' },
      { title: 'Conseil et expertise technique', description: 'Accompagnement dans le choix des systèmes porteurs, des matériaux et des solutions constructives.' },
      { title: 'Études de faisabilité', description: 'Évaluation de la faisabilité structurelle des projets et analyse des contraintes techniques.' },
      { title: 'Suivi et supervision des travaux', description: 'Contrôle de la conformité de l’exécution aux études et aux plans techniques.' },
      { title: 'Coordination santé et sécurité', description: 'Contribution à la prévention des risques et à la sécurité sur les chantiers.' },
    ],
    commitment: {
      title: 'Notre engagement',
      paragraphs: [
        'Nous mettons notre savoir-faire en ingénierie structurelle au service de la sécurité, de la fiabilité et de la pérennité des constructions.',
        'Chaque projet fait l’objet d’une approche rigoureuse, associant précision des calculs, maîtrise des techniques constructives et optimisation des ressources.',
      ],
      ambition: 'Concevoir des structures sûres, stables et durables, en conciliant performance technique, efficacité économique et qualité architecturale.',
    },
  },
  {
    id: 'thermique', number: '02', navTitle: 'Thermique', subtitle: 'Confort & énergie', icon: 'thermometer',
    title: 'Isolation thermique, conseil et efficacité énergétique',
    introduction: [
      'Nous accompagnons nos clients dans l’amélioration de la performance énergétique de leurs bâtiments à travers des études thermiques, des conseils techniques et des solutions d’isolation adaptées aux conditions climatiques locales et aux spécificités architecturales de chaque bâtiment.',
      'Notre objectif est de concevoir des bâtiments économes en énergie, confortables en toute saison et respectueux de l’environnement.',
    ],
    prestations: [
      { title: 'Études thermiques et énergétiques', description: 'Analyse du comportement thermique des bâtiments et évaluation de leurs performances énergétiques.' },
      { title: 'Isolation thermique', description: 'Conception et dimensionnement des solutions d’isolation des murs, toitures, planchers et façades afin de limiter les transferts de chaleur.' },
      { title: 'Conseil en efficacité énergétique', description: 'Accompagnement dans le choix des matériaux, équipements et solutions techniques permettant d’optimiser la consommation énergétique.' },
      { title: 'Protection contre l’humidité', description: 'Analyse des risques de condensation, étude de la diffusion de la vapeur d’eau et prévention des désordres liés à l’humidité.' },
      { title: 'Optimisation du confort thermique', description: 'Amélioration du confort intérieur en été comme en hiver, avec une réduction des besoins en chauffage et en climatisation.' },
      { title: 'Performance énergétique des bâtiments', description: 'Recommandations techniques visant à réduire les consommations énergétiques et à améliorer la qualité environnementale des constructions.' },
    ],
    image: {
      src: '/images_Isolation%20thermique/img1.jpg',
      alt: 'Façade d’une maison avec une extension contemporaine et de grandes ouvertures vitrées',
      caption: 'Une enveloppe pensée pour le confort, en toute saison.',
    },
    commitment: {
      title: 'Notre engagement',
      paragraphs: [
        'Nous nous engageons à proposer des solutions énergétiques innovantes, performantes et durables, en tenant compte des caractéristiques architecturales, techniques et climatiques de chaque projet.',
        'Notre démarche repose sur une conception responsable visant à optimiser la performance énergétique des bâtiments, réduire leur consommation, améliorer le confort thermique des occupants et préserver l’environnement.',
      ],
      ambition: 'Concevoir des bâtiments durables, économes en énergie et agréables à vivre, en conciliant performance technique, efficacité énergétique et respect de l’environnement.',
    },
  },
  {
    id: 'acoustique', number: '03', navTitle: 'Acoustique', subtitle: 'Sérénité & bien-être', icon: 'sound',
    title: 'Isolation phonique et acoustique',
    introduction: [
      'Nous proposons des solutions techniques adaptées pour améliorer le confort acoustique des bâtiments, réduire les nuisances sonores et garantir un environnement intérieur agréable, conformément aux exigences réglementaires et aux normes applicables au Maroc.',
    ],
    prestations: [
      { title: 'Études acoustiques', description: 'Analyse et évaluation des performances acoustiques des bâtiments et identification des sources de nuisances sonores.' },
      { title: 'Isolation phonique', description: 'Conception de solutions d’isolation contre les bruits aériens et les bruits d’impact pour les murs, les planchers, les plafonds et les cloisons.' },
      { title: 'Correction acoustique', description: 'Optimisation du confort sonore dans les espaces résidentiels, professionnels, commerciaux et industriels.' },
      { title: 'Protection contre les nuisances sonores', description: 'Réduction de la transmission du bruit provenant de l’extérieur, des équipements techniques et des locaux voisins.' },
      { title: 'Conseil et expertise', description: 'Accompagnement dans le choix des matériaux et des systèmes acoustiques adaptés à chaque projet.' },
      { title: 'Conformité technique', description: 'Recommandations visant à répondre aux exigences acoustiques et aux bonnes pratiques de construction.' },
    ],
    image: {
      src: '/images_Isolation%20phonique%20et%20acoustique/img1.jpg',
      alt: 'Panneaux absorbants et isolation d’une cloison pour le traitement acoustique d’une pièce',
      caption: 'Des solutions pour un environnement sonore maîtrisé.',
    },
    commitment: {
      title: 'Notre objectif',
      paragraphs: [
        'Améliorer la qualité de vie et le confort des occupants grâce à des solutions acoustiques performantes, durables et adaptées aux spécificités climatiques, architecturales et constructives des projets au Maroc.',
      ],
    },
  },
]
