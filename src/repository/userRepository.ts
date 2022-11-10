import { User, Friend, Character, Statistics, PrismaPromise } from '@prisma/client'
import prisma from './client'
import { AlreadyInAGuildError } from '../exception/AlreadyInAGuildError'
export async function getAllUsers(): Promise<User[]> {
  return await prisma.user.findMany()
}

export function getByName(name: string): PrismaPromise<User | null> {
  return prisma.user.findUnique({
    where: {
      name
    }
  })
}

export function getById(id: number): PrismaPromise<User | null> {
  return prisma.user.findUnique({
    where: {
      id
    }
  })
}

export function getByMail(mail: string): PrismaPromise<User | null> {
  return prisma.user.findUnique({
    where: {
      mail
    }
  })
}

export function create(name: string, uid: string, characterId: number, mail: string, refreshToken: string | null): PrismaPromise<User> {
  return prisma.user.create({
    data: {
      name,
      uid,
      characterId,
      mail,
      refreshToken
    }
  })
}

export function getFriend(userId: number, friendId: number): PrismaPromise<Friend | null> {
  return prisma.friend.findFirst({
    where: {
      userId,
      friendId
    }
  })
}

export function getAllFriends(userId: number): PrismaPromise<Friend[]> {
  return prisma.friend.findMany({
    where: {
      userId
    }
  })
}

export function addFriend(userId: number, friendId: number): PrismaPromise<Friend | null> {
  return prisma.friend.create({
    data: {
      userId,
      friendId
    }
  })
}

export function incrementExperience(id: number, xp: number): PrismaPromise<User> {
  return prisma.user.update({
    where: {
      id
    },
    data: {
      character: {
        update: {
          experience: {
            increment: xp
          }
        }
      },
      lastCaloriesUpdate: new Date()
    }
  })
}

export async function joinGuild(id: number, guildId: number, isGuildOwner = false): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: {
      id
    }
  })
  if (user == null) {
    return null
  }
  if (user.guildId != null) {
    throw new AlreadyInAGuildError()
  }
  return await prisma.user.update({
    where: {
      id
    },
    data: {
      guildId,
      isGuildOwner
    }
  })
}

export function getByUid(uid: string): PrismaPromise<User | null> {
  return prisma.user.findUnique({
    where: {
      uid
    }
  })
}

export function deleteById(id: number): PrismaPromise<User | null> {
  return prisma.user.delete({
    where: {
      id
    }
  })
}

export function incrementExperienceWithoutDateUpdate(id: number, xp: number): PrismaPromise<User> {
  return prisma.user.update({
    where: {
      id
    },
    data: {
      character: {
        update: {
          experience: {
            increment: xp
          }
        }
      }
    }
  })
}

export function leaveGuild(id: number): PrismaPromise<User> {
  return prisma.user.update({
    where: {
      id
    },
    data: {
      guildId: null,
      isGuildOwner: false
    }
  })
}

export function setGuildOwner(id: number): PrismaPromise<User> {
  return prisma.user.update({
    where: {
      id
    },
    data: {
      isGuildOwner: true
    }
  })
}

export async function getMembersOfGuild(guildId: number): Promise<(User & { character: (Character & { statistics: Statistics; }) | null; })[]> {
  return prisma.user.findMany({
    where: {
      guildId
    },
    include: {
      character: {
        include: {
          statistics: true
        }
      }
    }
  })
}

export function updateGold(userId: number, newGoldValue: number): PrismaPromise<User> {
  return prisma.user.update({
    where: {
      id: userId
    },
    data: {
      character: {
        update: {
          gold: newGoldValue
        }
      }
    }
  })
}
