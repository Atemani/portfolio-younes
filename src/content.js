export const projects = ["Lin&Lock", "Dieuzy", "Dynam8", "MochiAuto"];

export const objects = [
  { id: "projets", object: "Grand écran", title: "Réalisations", x: 54, y: 36, w: 31, h: 29, label: true },
  { id: "competences", object: "Portable", title: "Compétences", x: 29, y: 55, w: 19, h: 23, label: true },
  { id: "podcast", object: "Microphone", title: "Podcast", x: 11, y: 60, w: 7, h: 20 },
  { id: "creation", object: "Casque audio", title: "Audiovisuel", x: 95, y: 68, w: 9, h: 18 },
  { id: "strategie", object: "Carnet", title: "Stratégie", x: 73, y: 75, w: 15, h: 12 },
  { id: "lectures", object: "Livres", title: "Lectures", x: 78, y: 56, w: 10, h: 16 },
  { id: "cafe", object: "Tasse", title: "La pause café", x: 49, y: 73, w: 8, h: 13, secret: true },
  { id: "billet", object: "Petit coffre", title: "Un billet pour le Maroc", x: 68, y: 61, w: 5, h: 6, secret: true }
];

export const practices = {
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
      ["Adapter", "Décliner le contenu selon le support de diffusion."]]
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
