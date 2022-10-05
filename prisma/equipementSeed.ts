import { EquipementBase } from '@prisma/client'

/**
 * Common
 */

const commonEquipementBases: EquipementBase[] = [
  {
    id: 1,
    name: 'Casque en cuir',
    description: 'Un casque que tu as trouvé sur le bord de la route, tu n\'es même pas sûr que ce soit un casque, mais il est unique à tes yeux.',
    heroClass: 'PALADIN',
    equipementType: 'HELMET',
    rarity: 'COMMON'
  },
  {
    id: 2,
    name: 'T-shirt',
    description: 'Un t-shirt fait par ta maman chérie pour son poussin.',
    heroClass: 'PALADIN',
    equipementType: 'CHESTPLATE',
    rarity: 'COMMON'
  },
  {
    id: 3,
    name: 'Gants de cuisine',
    description: 'Une paire de gants que tu as pris de chez toi dans la panique. Tu regrettes peut-être ton choix maintenant.',
    heroClass: 'PALADIN',
    equipementType: 'GLOVES',
    rarity: 'COMMON'
  },
  {
    id: 4,
    name: 'Pantalon troué',
    description: 'Il n\'est même pas à ta taille, mais tu continues à le porter. Pourquoi ?',
    heroClass: 'PALADIN',
    equipementType: 'LEGGINGS',
    rarity: 'COMMON'
  },
  {
    id: 5,
    name: 'Hache en pierre',
    description: 'Coupe difficilement du bois, reste relativement efficace contre les agresseurs.',
    heroClass: 'PALADIN',
    equipementType: 'WEAPON',
    rarity: 'COMMON'
  },
  {
    id: 36,
    name: 'Petit baton en bois',
    description: 'J\'ai trouvé ce bâton dans mon jardin, il avait une forme d\'arme donc je l\'ai gardé',
    heroClass: 'MAGE',
    equipementType: 'WEAPON',
    rarity: 'COMMON'
  }
]

/**
 * Paladin
 */

const rarePaladinEquipementBase: EquipementBase[] = [
  {
    id: 6,
    name: 'Casque en acier',
    description: 'C\'est lourd, mais ça fait moins mal quand un géant essaie de t\'aplatir avec son gourdin.',
    rarity: 'RARE',
    heroClass: 'PALADIN',
    equipementType: 'HELMET'
  },
  {
    id: 7,
    name: 'Plastron en acier',
    description: 'Avec ça, si tu tank pas, je ne sais plus quoi faire de toi.',
    rarity: 'RARE',
    heroClass: 'PALADIN',
    equipementType: 'CHESTPLATE'
  },
  {
    id: 8,
    name: 'Jambières en acier',
    description: 'Parfait pour faire du cardio.',
    rarity: 'RARE',
    heroClass: 'PALADIN',
    equipementType: 'LEGGINGS'
  },
  {
    id: 9,
    name: 'Gants en acier',
    description: 'Iron man c\'est toi ?!',
    rarity: 'RARE',
    heroClass: 'PALADIN',
    equipementType: 'GLOVES'
  },
  {
    id: 10,
    name: 'Épée & bouclier en acier',
    description: 'Des fois dans la vie, faut y aller avec son bouclier et son couteau !',
    rarity: 'RARE',
    heroClass: 'PALADIN',
    equipementType: 'WEAPON'
  }
]

const epicPaladinEquipementBase: EquipementBase[] = [
  {
    id: 11,
    name: 'Casque en mythril rafiné',
    description: 'Un coup de tête avec ce casque ? Deux morts, trois blessés.',
    rarity: 'EPIC',
    heroClass: 'PALADIN',
    equipementType: 'HELMET'
  },
  {
    id: 12,
    name: 'Plastron en mythril raffiné',
    description: 'Supporte les chocs frontaux, et tes kilos en trop.',
    rarity: 'EPIC',
    heroClass: 'PALADIN',
    equipementType: 'CHESTPLATE'
  },
  {
    id: 13,
    name: 'Jambières en mythril raffiné',
    description: 'Permet de faire des glissades sur place.',
    rarity: 'EPIC',
    heroClass: 'PALADIN',
    equipementType: 'LEGGINGS'
  },
  {
    id: 14,
    name: 'Gants en mythril raffiné',
    description: 'Le raffinage les rends plus résistant. Et toi ? Irrésistible <3',
    rarity: 'EPIC',
    heroClass: 'PALADIN',
    equipementType: 'GLOVES'
  },
  {
    id: 15,
    name: 'Épée & bouclier en mythril raffiné',
    description: 'Tu feras mieux de vendre ça avant de te blesser avec.',
    rarity: 'EPIC',
    heroClass: 'PALADIN',
    equipementType: 'WEAPON'
  }
]

const legendaryPaladinEquipementBase: EquipementBase[] = [
  {
    id: 16,
    name: 'Casque en diamant',
    description: 'Ce casque est plus brillant que ton avenir.',
    rarity: 'LEGENDARY',
    heroClass: 'PALADIN',
    equipementType: 'HELMET'
  },
  {
    id: 17,
    name: 'Plastron en diamant',
    description: 'Forgé par les plus grands, il est maintenant à toi. Dommage.',
    rarity: 'LEGENDARY',
    heroClass: 'PALADIN',
    equipementType: 'CHESTPLATE'
  },
  {
    id: 18,
    name: 'Jambières en diamant',
    description: 'Essaie de courir avec ça pour voir.',
    rarity: 'LEGENDARY',
    heroClass: 'PALADIN',
    equipementType: 'LEGGINGS'
  },
  {
    id: 19,
    name: 'Gants en diamant',
    description: 'Un peu mieux que tes vieux gants de cuisine.',
    rarity: 'LEGENDARY',
    heroClass: 'PALADIN',
    equipementType: 'GLOVES'
  },
  {
    id: 20,
    name: 'Tic & Tac',
    description: 'Le duo qui te rend AGILE.',
    rarity: 'LEGENDARY',
    heroClass: 'PALADIN',
    equipementType: 'WEAPON'
  }
]

/**
 * Mage
 */

const rareMageEquipementBase: EquipementBase[] = [
  {
    id: 21,
    name: 'Chapeau magique',
    description: 'Avec ce répugnant chapeau, vous êtes sûr d\'être un puissant mage noir !',
    rarity: 'RARE',
    heroClass: 'MAGE',
    equipementType: 'HELMET'
  },
  {
    id: 22,
    name: 'Robe magique',
    description: 'Oui, la reine du bal, c\'est bien vous.',
    rarity: 'RARE',
    heroClass: 'MAGE',
    equipementType: 'CHESTPLATE'
  },
  {
    id: 23,
    name: 'Bottes magiques',
    description: 'Encore mieux qu\'être en Lacoste TN.',
    rarity: 'RARE',
    heroClass: 'MAGE',
    equipementType: 'LEGGINGS'
  },
  {
    id: 24,
    name: 'Gants magiques',
    description: 'Idéal pour les batailles de boules de neige.',
    rarity: 'RARE',
    heroClass: 'MAGE',
    equipementType: 'GLOVES'
  },
  {
    id: 25,
    name: 'Bâton incendiaire',
    description: 'De quoi tenir la chandelle un peu plus longtemps.',
    rarity: 'RARE',
    heroClass: 'MAGE',
    equipementType: 'WEAPON'
  }
]

const epicMageEquipementBase: EquipementBase[] = [
  {
    id: 26,
    name: 'Chapeau d\'archimage',
    description: 'Non non, je te jure ce chapeau est magique, no noob no arnak !',
    rarity: 'EPIC',
    heroClass: 'MAGE',
    equipementType: 'HELMET'
  },
  {
    id: 27,
    name: 'Robe d\'archimage',
    description: 'Avec son slip assorti Petit Bâteau.',
    rarity: 'EPIC',
    heroClass: 'MAGE',
    equipementType: 'CHESTPLATE'
  },
  {
    id: 28,
    name: 'Bottes d\'archimage',
    description: 'Les chaussettes de l\'archimage sont-elles sèches ? Archi-sèches ?',
    rarity: 'EPIC',
    heroClass: 'MAGE',
    equipementType: 'LEGGINGS'
  },
  {
    id: 29,
    name: 'Gants d\'archimage',
    description: 'Conçus pour tenir bien au chaud vos petites patoches !',
    rarity: 'EPIC',
    heroClass: 'MAGE',
    equipementType: 'GLOVES'
  },
  {
    id: 30,
    name: 'Sceptre de pyromancie',
    description: 'Tu es pyromane ? Arrête.',
    rarity: 'EPIC',
    heroClass: 'MAGE',
    equipementType: 'WEAPON'
  }
]

const legendaryMageEquipementBase: EquipementBase[] = [
  {
    id: 31,
    name: 'Capuche antique',
    description: 'Te rend sombre et mystérieux.',
    rarity: 'LEGENDARY',
    heroClass: 'MAGE',
    equipementType: 'HELMET'
  },
  {
    id: 32,
    name: 'Robe antique',
    description: 'La température interne est réglée à 24,3 °C de base, avec un petit thermostat dans la poche gauche.',
    rarity: 'LEGENDARY',
    heroClass: 'MAGE',
    equipementType: 'CHESTPLATE'
  },
  {
    id: 33,
    name: 'Bottes antiques',
    description: 'Vraiment très confortable. C\'est le top du top. Résistantes, stylées, le must des bottes de mage. Je recommande !',
    rarity: 'LEGENDARY',
    heroClass: 'MAGE',
    equipementType: 'LEGGINGS'
  },
  {
    id: 34,
    name: 'Gants antiques',
    description: 'Vous les utiliserez pour combattre le mal, d\'autres les utilisent pour faire des ombres chinoises.',
    rarity: 'LEGENDARY',
    heroClass: 'MAGE',
    equipementType: 'GLOVES'
  },
  {
    id: 35,
    name: 'L\'observateur',
    description: 'Avez-vous bien fait votre veille magique ?',
    rarity: 'LEGENDARY',
    heroClass: 'MAGE',
    equipementType: 'WEAPON'
  }
]

export const equipementBases: EquipementBase[] = [
  ...commonEquipementBases,
  ...rarePaladinEquipementBase,
  ...epicPaladinEquipementBase,
  ...legendaryPaladinEquipementBase,
  ...rareMageEquipementBase,
  ...epicMageEquipementBase,
  ...legendaryMageEquipementBase
]
