import { seedPrismaClient } from './seed'

export async function seedEquipementBases(): Promise<void> {
  await seedPrismaClient.equipementBase.createMany({
    data: [
      /**
       * Common
       */
      {
        name: 'Casque en cuir',
        description: 'Un casque que tu as trouvé sur le bord de la route, tu n\'es même pas sûr que ce soit un casque, mais il est unique à tes yeux.',
        heroClass: 'PALADIN',
        equipementType: 'HELMET',
        rarity: 'COMMON'
      },
      {
        name: 'T-shirt',
        description: 'Un t-shirt fait par ta maman chérie pour son poussin.',
        heroClass: 'PALADIN',
        equipementType: 'CHESTPLATE',
        rarity: 'COMMON'
      },
      {
        name: 'Gants de cuisine',
        description: 'Une paire de gants que tu as pris de chez toi dans la panique. Tu regrettes peut-être ton choix maintenant.',
        heroClass: 'PALADIN',
        equipementType: 'GLOVES',
        rarity: 'COMMON'
      },
      {
        name: 'Pantalon troué',
        description: 'Il n\'est même pas à ta taille, mais tu continues à le porter. Pourquoi ?',
        heroClass: 'PALADIN',
        equipementType: 'LEGGINGS',
        rarity: 'COMMON'
      },
      {
        name: 'Hache en pierre',
        description: 'Coupe difficilement du bois, reste relativement efficace contre les agresseurs.',
        heroClass: 'PALADIN',
        equipementType: 'WEAPON',
        rarity: 'COMMON'
      },
      {
        name: 'Petit baton en bois',
        description: 'J\'ai trouvé ce bâton dans mon jardin, il avait une forme d\'arme donc je l\'ai gardé',
        heroClass: 'MAGE',
        equipementType: 'WEAPON',
        rarity: 'COMMON'
      },

      /**
       * Paladin
       */
      {
        name: 'Casque en acier',
        description: 'C\'est lourd, mais ça fait moins mal quand un géant essaie de t\'aplatir avec son gourdin.',
        rarity: 'RARE',
        heroClass: 'PALADIN',
        equipementType: 'HELMET'
      },
      {
        name: 'Plastron en acier',
        description: 'Avec ça, si tu tank pas, je ne sais plus quoi faire de toi.',
        rarity: 'RARE',
        heroClass: 'PALADIN',
        equipementType: 'CHESTPLATE'
      },
      {
        name: 'Jambières en acier',
        description: 'Parfait pour faire du cardio.',
        rarity: 'RARE',
        heroClass: 'PALADIN',
        equipementType: 'LEGGINGS'
      },
      {
        name: 'Gants en acier',
        description: 'Iron man c\'est toi ?!',
        rarity: 'RARE',
        heroClass: 'PALADIN',
        equipementType: 'GLOVES'
      },
      {
        name: 'Épée & bouclier en acier',
        description: 'Des fois dans la vie, faut y aller avec son bouclier et son couteau !',
        rarity: 'RARE',
        heroClass: 'PALADIN',
        equipementType: 'WEAPON'
      },
      {
        name: 'Casque en mythril rafiné',
        description: 'Un coup de tête avec ce casque ? Deux morts, trois blessés.',
        rarity: 'EPIC',
        heroClass: 'PALADIN',
        equipementType: 'HELMET'
      },
      {
        name: 'Plastron en mythril raffiné',
        description: 'Supporte les chocs frontaux, et tes kilos en trop.',
        rarity: 'EPIC',
        heroClass: 'PALADIN',
        equipementType: 'CHESTPLATE'
      },
      {
        name: 'Jambières en mythril raffiné',
        description: 'Permet de faire des glissades sur place.',
        rarity: 'EPIC',
        heroClass: 'PALADIN',
        equipementType: 'LEGGINGS'
      },
      {
        name: 'Gants en mythril raffiné',
        description: 'Le raffinage les rends plus résistant. Et toi ? Irrésistible <3',
        rarity: 'EPIC',
        heroClass: 'PALADIN',
        equipementType: 'GLOVES'
      },
      {
        name: 'Épée & bouclier en mythril raffiné',
        description: 'Tu feras mieux de vendre ça avant de te blesser avec.',
        rarity: 'EPIC',
        heroClass: 'PALADIN',
        equipementType: 'WEAPON'
      },
      {
        name: 'Casque en diamant',
        description: 'Ce casque est plus brillant que ton avenir.',
        rarity: 'LEGENDARY',
        heroClass: 'PALADIN',
        equipementType: 'HELMET'
      },
      {
        name: 'Plastron en diamant',
        description: 'Forgé par les plus grands, il est maintenant à toi. Dommage.',
        rarity: 'LEGENDARY',
        heroClass: 'PALADIN',
        equipementType: 'CHESTPLATE'
      },
      {
        name: 'Jambières en diamant',
        description: 'Essaie de courir avec ça pour voir.',
        rarity: 'LEGENDARY',
        heroClass: 'PALADIN',
        equipementType: 'LEGGINGS'
      },
      {
        name: 'Gants en diamant',
        description: 'Un peu mieux que tes vieux gants de cuisine.',
        rarity: 'LEGENDARY',
        heroClass: 'PALADIN',
        equipementType: 'GLOVES'
      },
      {
        name: 'Tic & Tac',
        description: 'Le duo qui te rend AGILE.',
        rarity: 'LEGENDARY',
        heroClass: 'PALADIN',
        equipementType: 'WEAPON'
      },

      /**
       * Mage
       */
      {
        name: 'Chapeau magique',
        description: 'Avec ce répugnant chapeau, vous êtes sûr d\'être un puissant mage noir !',
        rarity: 'RARE',
        heroClass: 'MAGE',
        equipementType: 'HELMET'
      },
      {
        name: 'Robe magique',
        description: 'Oui, la reine du bal, c\'est bien vous.',
        rarity: 'RARE',
        heroClass: 'MAGE',
        equipementType: 'CHESTPLATE'
      },
      {
        name: 'Bottes magiques',
        description: 'Encore mieux qu\'être en Lacoste TN.',
        rarity: 'RARE',
        heroClass: 'MAGE',
        equipementType: 'LEGGINGS'
      },
      {
        name: 'Gants magiques',
        description: 'Idéal pour les batailles de boules de neige.',
        rarity: 'RARE',
        heroClass: 'MAGE',
        equipementType: 'GLOVES'
      },
      {
        name: 'Bâton incendiaire',
        description: 'De quoi tenir la chandelle un peu plus longtemps.',
        rarity: 'RARE',
        heroClass: 'MAGE',
        equipementType: 'WEAPON'
      },
      {
        name: 'Chapeau d\'archimage',
        description: 'Non non, je te jure ce chapeau est magique, no noob no arnak !',
        rarity: 'EPIC',
        heroClass: 'MAGE',
        equipementType: 'HELMET'
      },
      {
        name: 'Robe d\'archimage',
        description: 'Avec son slip assorti Petit Bâteau.',
        rarity: 'EPIC',
        heroClass: 'MAGE',
        equipementType: 'CHESTPLATE'
      },
      {
        name: 'Bottes d\'archimage',
        description: 'Les chaussettes de l\'archimage sont-elles sèches ? Archi-sèches ?',
        rarity: 'EPIC',
        heroClass: 'MAGE',
        equipementType: 'LEGGINGS'
      },
      {
        name: 'Gants d\'archimage',
        description: 'Conçus pour tenir bien au chaud vos petites patoches !',
        rarity: 'EPIC',
        heroClass: 'MAGE',
        equipementType: 'GLOVES'
      },
      {
        name: 'Sceptre de pyromancie',
        description: 'Tu es pyromane ? Arrête.',
        rarity: 'EPIC',
        heroClass: 'MAGE',
        equipementType: 'WEAPON'
      },
      {
        name: 'Capuche antique',
        description: 'Te rend sombre et mystérieux.',
        rarity: 'LEGENDARY',
        heroClass: 'MAGE',
        equipementType: 'HELMET'
      },
      {
        name: 'Robe antique',
        description: 'La température interne est réglée à 24,3 °C de base, avec un petit thermostat dans la poche gauche.',
        rarity: 'LEGENDARY',
        heroClass: 'MAGE',
        equipementType: 'CHESTPLATE'
      },
      {
        name: 'Bottes antiques',
        description: 'Vraiment très confortable. C\'est le top du top. Résistantes, stylées, le must des bottes de mage. Je recommande !',
        rarity: 'LEGENDARY',
        heroClass: 'MAGE',
        equipementType: 'LEGGINGS'
      },
      {
        name: 'Gants antiques',
        description: 'Vous les utiliserez pour combattre le mal, d\'autres les utilisent pour faire des ombres chinoises.',
        rarity: 'LEGENDARY',
        heroClass: 'MAGE',
        equipementType: 'GLOVES'
      },
      {
        name: 'L\'observateur',
        description: 'Avez-vous bien fait votre veille magique ?',
        rarity: 'LEGENDARY',
        heroClass: 'MAGE',
        equipementType: 'WEAPON'
      }
    ],
    skipDuplicates: true
  })
}
