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

export const friend: Friend = {
  userId: 1,
  friendId: 2
}
