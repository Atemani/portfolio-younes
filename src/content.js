export const projects = ["Lin&Lock", "Dieuzy", "Dynam8 Services", "MochiAuto"];

// Positions mesurées sur la photo entière (1671 × 941), en pourcentage.
export const objects = [
  { id: "projets", object: "Grand écran", title: "Mes réalisations", x: 54.5, y: 38.3, w: 31, h: 32 },
  { id: "competences", object: "Ordinateur portable", title: "Compétences et prestations", x: 29.1, y: 58.5, w: 20, h: 26 },
  { id: "podcast", object: "Microphone", title: "Production de podcasts", x: 11.4, y: 61, w: 5.6, h: 21 },
  { id: "creation", object: "Casque audio", title: "Création de contenus et vidéo", x: 95.2, y: 66, w: 8.3, h: 23 },
  { id: "strategie", object: "Carnet", title: "Stratégie et gestion de projet", x: 73.6, y: 74, w: 14.8, h: 13.5 },
  { id: "inspirations", object: "Pile de livres", title: "Mes inspirations", x: 77, y: 55, w: 11.5, h: 12.2 },
  { id: "cafe", object: "Tasse de café", title: "La pause café", x: 48.4, y: 73.6, w: 7.8, h: 12, secret: true },
  { id: "lectures", object: "Tome du bas", title: "Mes lectures préférées", x: 80.5, y: 63.8, w: 4.5, h: 4, secret: true }
];

export const skills = [
  ["strategie", "Stratégie & développement"],
  ["gestion", "Gestion de projet"],
  ["web", "Création web & e-commerce"],
  ["creation", "Communication, contenus & stratégie YouTube"],
  ["automatisation", "Intelligence artificielle & automatisation"],
  ["projets", "Réalisations professionnelles"]
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
    intro: "Un bon épisode commence bien avant d’allumer le micro.",
    steps: [["Préparer", "Trouver l’angle de l’épisode et construire une trame qui laisse de la place à la conversation."],
      ["Enregistrer", "Soigner la prise de voix et le rythme des échanges."],
      ["Monter", "Choisir les passages qui portent le propos et préparer une version prête à écouter."]]
  },
  creation: {
    intro: "Trouver le format qui rend une idée claire, à l’image comme au son.",
    steps: [["Écrire", "Partir du message et du public pour choisir un format et un ton."],
      ["Composer", "Faire dialoguer les images, la voix et les silences."],
      ["Diffuser", "Sur YouTube, travailler ensemble la promesse du titre, la miniature et les premières secondes. Adapter ensuite le montage au support."]]
  },
  strategie: {
    intro: "Avant les outils, il y a un objectif à formuler et des priorités à choisir.",
    steps: [["Cadrer", "Définir le besoin, le public et ce qui permettra de juger le résultat."],
      ["Organiser", "Découper le travail en livrables et suivre les étapes dans un calendrier partagé."],
      ["Ajuster", "Recueillir les retours et déterminer ensemble la prochaine priorité."]]
  }
};

export const readings = [
  ["Harry Potter", "Roman"], ["L’Art de la guerre", "Stratégie"],
  ["Esprit Smart Brevity", "Communication"], ["One Piece · Tome 1", "Manga"]
];
