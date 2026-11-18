export const deskImage = { src: "/images/atelier-v3.webp", width: 1672, height: 941, initialX: 0.54366 };
export const projects = ["Lin&Lock", "Dieuzy", "Dynam8 Services", "MochiAuto"];

// Mesures réalisées sur le bureau v3 (1672 × 941), puis converties en pourcentages.
// Les zones tactiles sont indépendantes de la taille visuelle des points.
export const objects = [
  {
    "id": "projets",
    "object": "Écran principal",
    "type": "professional",
    "x": 54.366,
    "y": 37.5133,
    "label": "Mes réalisations",
    "title": "Mes réalisations",
    "action": "projets"
  },
  {
    "id": "competences",
    "object": "Ordinateur portable",
    "type": "professional",
    "x": 29.1268,
    "y": 57.2795,
    "label": "Mes compétences",
    "title": "Mes compétences",
    "action": "competences"
  },
  {
    "id": "podcast",
    "object": "Microphone",
    "type": "professional",
    "x": 11.244,
    "y": 60.5739,
    "label": "Podcast & audiovisuel",
    "title": "Podcast & audiovisuel",
    "action": "podcast"
  },
  {
    "id": "creation",
    "object": "Casque audio",
    "type": "professional",
    "x": 93.5407,
    "y": 69.7131,
    "label": "Création vidéo",
    "title": "Création vidéo",
    "action": "creation"
  },
  {
    "id": "strategie",
    "object": "Carnet",
    "type": "professional",
    "x": 73.6842,
    "y": 74.1764,
    "label": "Stratégie & gestion de projet",
    "title": "Stratégie & gestion de projet",
    "action": "strategie"
  },
  {
    "id": "inspirations",
    "object": "Pile de livres",
    "type": "professional",
    "x": 76.555,
    "y": 55.5792,
    "label": "Mes inspirations",
    "title": "Mes inspirations",
    "action": "inspirations"
  },
  {
    "id": "youtube",
    "object": "Feuille YouTube",
    "type": "professional",
    "x": 73.3254,
    "y": 16.0468,
    "label": "Stratégie YouTube",
    "title": "Stratégie YouTube",
    "action": "youtube"
  },
  {
    "id": "contact",
    "object": "Carte de contact",
    "type": "professional",
    "x": 86.6029,
    "y": 73.4325,
    "label": "Me contacter",
    "title": "Contact",
    "action": "contact"
  },
  {
    "id": "cafe",
    "object": "Tasse de café",
    "type": "secret",
    "x": 48.6244,
    "y": 73.0074,
    "label": "La pause café",
    "title": "La pause café",
    "action": "cafe"
  },
  {
    "id": "ragnarok",
    "object": "Jeu PS5",
    "type": "secret",
    "x": 87.3804,
    "y": 49.9469,
    "label": "God of War Ragnarök",
    "title": "God of War Ragnarök",
    "action": "ragnarok"
  },
  {
    "id": "maroc",
    "object": "Carte postale Maroc",
    "type": "secret",
    "x": 81.9378,
    "y": 17.1095,
    "label": "Le Maroc",
    "title": "Le Maroc",
    "action": "maroc"
  },
  {
    "id": "basket",
    "object": "Ballon de basket",
    "type": "secret",
    "x": 84.988,
    "y": 61.7428,
    "label": "Le basket",
    "title": "Le basket",
    "action": "basket"
  }
];

export const personalNotes = {
  cafe: "Je suis un grand fan de café.",
  ragnarok: "Mon jeu préféré : God of War Ragnarök.",
  maroc: "Le Maroc.",
  basket: "Le basket, c'est depuis mes 8 ans. J'ai arrêté à la saison 2025-2026… Ligaments croisés, tu connais."
};

export const skills = [
  ["strategie", "Stratégie & développement"],
  ["gestion", "Gestion de projet"],
  ["web", "Création web et e-commerce"],
  ["creation", "Communication et création de contenus"],
  ["automatisation", "Intelligence artificielle et automatisation"],
  ["youtube", "Stratégie YouTube"]
];

export const practices = {
  gestion: {
    intro: "Faire avancer un projet en gardant visibles les décisions, les étapes et les responsabilités.",
    steps: [["Prioriser", "Distinguer ce qui conditionne la livraison de ce qui peut attendre."],
      ["Coordonner", "Relier chaque livrable à une personne, une échéance et un critère de validation."]]
  },
  web: {
    intro: "Concevoir un parcours clair, de la première visite à la prise de contact ou à la commande.",
    steps: [["Structurer", "Organiser les contenus et les pages autour du besoin du visiteur."],
      ["Vérifier", "Parcourir les étapes sur téléphone et ordinateur pour repérer les points de friction."]]
  },
  automatisation: {
    intro: "Identifier les tâches répétitives qui méritent d’être simplifiées.",
    steps: [["Observer", "Décrire le geste manuel, ses entrées et le résultat attendu."],
      ["Contrôler", "Prévoir une validation humaine lorsque le résultat demande du jugement."]]
  },
  podcast: {
    intro: "Une approche complète de la production de podcasts, de l’idée à la diffusion.",
    steps: [["Préparer", "Définir un angle, préparer les échanges et construire une trame d’épisode."],
      ["Enregistrer", "Organiser la prise de son et, pour un format filmé, la captation audiovisuelle."],
      ["Monter", "Sélectionner les passages, travailler le rythme et soigner le rendu sonore."],
      ["Diffuser", "Préparer les exports, la présentation de l’épisode et les extraits adaptés aux supports de diffusion."]]
  },
  creation: {
    intro: "Donner forme à un message, de la préparation au montage final.",
    steps: [["Production vidéo", "Préparer le propos, le déroulé et les éléments nécessaires à la captation."],
      ["Montage & création de contenus", "Assembler les images, la voix, la musique et les sous-titres pour servir le message."],
      ["Formats courts", "Adapter l’accroche, le rythme et le cadrage aux formats courts."],
      ["Création assistée par IA", "Intégrer des outils d’IA dans la préparation ou la réalisation, avec une sélection et une validation humaines."]]
  },
  strategie: {
    intro: "Relier la vision, l’organisation et les actions concrètes d’un projet.",
    steps: [["Stratégie", "Clarifier le besoin, le public et les priorités."],
      ["Pilotage de projets", "Découper le travail en étapes, suivre les livrables et ajuster les priorités."],
      ["Management & coordination", "Organiser les rôles, les échanges et les décisions au sein d’un projet."],
      ["Développement commercial", "Structurer une proposition et réfléchir à sa pertinence pour les besoins du client."],
      ["Optimisation des processus", "Repérer les tâches répétitives et simplifier les méthodes de travail."]]
  },
  youtube: {
    intro: "YouTube m’intéresse comme un média à construire : une promesse, une ligne éditoriale et une relation durable avec son audience.",
    steps: [["Vision & concepts", "Définir le public, la proposition de la chaîne et des concepts de formats cohérents."],
      ["Stratégie éditoriale", "Organiser les sujets, les séries et le rythme de publication autour d’une ligne claire."],
      ["Titres & miniatures", "Travailler une promesse lisible et fidèle au contenu de la vidéo."],
      ["Analyse des données", "Lire ensemble le CTR, la rétention et la durée de visionnage pour comprendre les réactions du public."],
      ["Audience & fidélisation", "Observer les retours et la continuité entre les vidéos pour faire évoluer les formats et donner envie de revenir."]]
  }
};

export const readings = [
  ["Harry Potter", "Roman"], ["L’Art de la guerre", "Stratégie"],
  ["Esprit Smart Brevity", "Communication"], ["One Piece · Tome 1", "Manga"]
];
