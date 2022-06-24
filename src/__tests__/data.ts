import { Spell } from '@prisma/client'
import { Friend, User } from '@prisma/client'

export const user1: User = {
  id: 1,
  name: 'User1',
  characterId: null,
  guildId: null,
  lastCaloriesUpdate: new Date(2020, 0, 1)
}

export const user2: User = {
  id: 2,
  name: 'User2',
  characterId: null,
  guildId: null,
  lastCaloriesUpdate: new Date(2000, 7, 12)
}

export const user3: User = {
  id: 3,
  name: 'User3',
  characterId: 1,
  guildId: null,
  lastCaloriesUpdate: new Date(2022, 1, 4)
}

export const friend: Friend = {
  userId: 1,
  friendId: 2
}

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
  class: 'PRIEST'
}
