import { Character, Equipement, EquipementBase, Guild, Spell, Statistics } from '@prisma/client'
import { Friend, User } from '@prisma/client'

/**
 * Users
 */
export const user1: User = {
  id: 1,
  name: 'User1',
  characterId: null,
  guildId: 1,
  lastCaloriesUpdate: new Date(2020, 0, 1),
  isGuildOwner: true
}

export const user2: User = {
  id: 2,
  name: 'User2',
  characterId: null,
  guildId: null,
  lastCaloriesUpdate: new Date(2000, 7, 12),
  isGuildOwner: false
}

export const user3: User = {
  id: 3,
  name: 'User3',
  characterId: 1,
  guildId: 2,
  lastCaloriesUpdate: new Date(2022, 1, 4),
  isGuildOwner: true
}

export const users = [
  user1,
  user2,
  user3
]

/**
 * Friends
 */

export const friend1: Friend = {
  userId: 1,
  friendId: 2
}

export const friends = [
  friend1
]

/**
 * Spells
 */

export const spell1: Spell = {
  id: 1,
  name: 'Basic Attack',
  cooldown: 10,
  manaCost: 20,
  description: 'Swing your weapon and maybe you will kill something.',
  class: 'BERSERKER'
}

export const spell2: Spell = {
  id: 2,
  name: 'Heal',
  cooldown: 5,
  manaCost: 15,
  description: 'Do sparkles with your fingers to sparkle up someone\'s health',
  class: 'BERSERKER'
}

export const spell3: Spell = {
  id: 3,
  name: 'Smash',
  cooldown: 1,
  manaCost: 2,
  description: 'Combine the power of your two fists into one swing.',
  class: 'BERSERKER'
}

export const spell4: Spell = {
  id: 4,
  name: 'Sleep',
  cooldown: 50,
  manaCost: 0,
  description: 'Close your eyes. That\' it.',
  class: 'BERSERKER'
}

export const spell5: Spell = {
  id: 5,
  name: 'Flash heal',
  cooldown: 5,
  manaCost: 15,
  description: 'Do sparkles with your fingers to sparkle up someone\'s health',
  class: 'PRIEST'
}

export const spells = [
  spell1,
  spell2,
  spell3,
  spell4,
  spell5
]

/**
 * Characters
 */

export const character1: Character = {
  id: 1,
  class: 'BERSERKER',
  experience: 1337,
  firstSpellId: 1,
  secondSpellId: 2,
  thirdSpellId: 3,
  fourthSpellId: 4,
  weaponId: 5,
  statisticsId: 6,
  helmetId: 1,
  chestplateId: 2,
  glovesId: 3,
  leggingsId: 4
}

export const characters = [
  character1
]

/**
 * Equipement base
 */

export const equipementBase1: EquipementBase = {
  id: 1,
  name: 'Helmet',
  description: 'A helmet you found on the side of the road, you are not even sure this is a helmet. It\' unique in its own way !',
  rarity: 'RELIC',
  heroClass: 'BERSERKER',
  equipementType: 'HELMET'
}

export const equipementBase2: EquipementBase = {
  id: 2,
  name: 'Shirt',
  description: 'A shirt that your mom made you.',
  rarity: 'RELIC',
  heroClass: 'BERSERKER',
  equipementType: 'CHESTPLATE'
}

export const equipementBase3: EquipementBase = {
  id: 3,
  name: 'Cooking gloves',
  description: 'Gloves you took from your house in a hurry.',
  equipementType: 'GLOVES',
  heroClass: 'BERSERKER',
  rarity: 'COMMON'
}
export const equipementBase4: EquipementBase = {
  id: 4,
  name: 'Leggings',
  description: 'They are not your size, but you still carry them. Why ?',
  rarity: 'COMMON',
  heroClass: 'BERSERKER',
  equipementType: 'LEGGINGS'
}

export const equipementBase5: EquipementBase = {
  id: 5,
  name: 'Wood axe',
  description: 'Used to cut wood, seems efficient to also cut enemies',
  equipementType: 'WEAPON',
  heroClass: 'BERSERKER',
  rarity: 'COMMON'
}

export const equipementBases = [
  equipementBase1,
  equipementBase2,
  equipementBase3,
  equipementBase4,
  equipementBase5
]

/**
 * Equipement
 */

export const equipement1: Equipement = {
  id: 1,
  equipementBaseId: 1,
  statisticsId: 1
}

export const equipement2: Equipement = {
  id: 2,
  equipementBaseId: 2,
  statisticsId: 2
}

export const equipement3: Equipement = {
  id: 3,
  equipementBaseId: 3,
  statisticsId: 3
}

export const equipement4: Equipement = {
  id: 4,
  equipementBaseId: 4,
  statisticsId: 4
}

export const equipement5: Equipement = {
  id: 5,
  equipementBaseId: 5,
  statisticsId: 5
}

export const equipements = [
  equipement1,
  equipement2,
  equipement3,
  equipement4,
  equipement5
]

/**
 * Statistics
 */

export const statistics1: Statistics = {
  id: 1,
  agility: 1,
  defense: 1,
  endurance: 1,
  level: 1,
  power: 1,
  precision: 1,
  resistance: 1,
  strength: 1,
  vitality: 1
}

export const statistics2: Statistics = {
  id: 2,
  agility: 1,
  defense: 1,
  endurance: 1,
  level: 1,
  power: 1,
  precision: 1,
  resistance: 1,
  strength: 1,
  vitality: 1
}

export const statistics3: Statistics = {
  id: 3,
  agility: 1,
  defense: 1,
  endurance: 1,
  level: 1,
  power: 1,
  precision: 1,
  resistance: 1,
  strength: 1,
  vitality: 1
}

export const statistics4: Statistics = {
  id: 4,
  agility: 1,
  defense: 1,
  endurance: 1,
  level: 1,
  power: 1,
  precision: 1,
  resistance: 1,
  strength: 1,
  vitality: 1
}

export const statistics5: Statistics = {
  id: 5,
  agility: 1,
  defense: 1,
  endurance: 1,
  level: 1,
  power: 1,
  precision: 1,
  resistance: 1,
  strength: 1,
  vitality: 1
}

export const statistics6: Statistics = {
  id: 6,
  agility: 1,
  defense: 1,
  endurance: 1,
  level: 1,
  power: 1,
  precision: 1,
  resistance: 1,
  strength: 1,
  vitality: 1
}

export const statistics = [
  statistics1,
  statistics2,
  statistics3,
  statistics4,
  statistics5,
  statistics6
]

/**
 * Guilds
 */

export const guild1: Guild = {
  id: 1,
  name: 'guild1',
  description: 'description guild1'
}

export const guild2: Guild = {
  id: 2,
  name: 'guild2',
  description: 'description guild2'
}

export const guilds = [
  guild1,
  guild2
]
