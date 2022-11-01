import { Character, PrismaPromise, Statistics } from '@prisma/client'
import Resources from '../objects/Resources'
import prisma from './client'

export function create(character: Character): PrismaPromise<Character> {
  return prisma.character.create({
    data: {
      experience: character.experience,
      statisticsId: character.statisticsId,
      helmetId: character.helmetId,
      chestplateId: character.chestplateId,
      leggingsId: character.leggingsId,
      glovesId: character.glovesId,
      weaponId: character.weaponId,
      firstSpellId: character.firstSpellId,
      secondSpellId: character.secondSpellId,
      thirdSpellId: character.thirdSpellId,
      fourthSpellId: character.fourthSpellId,
      heroClass: character.heroClass
    }
  })
}

export function getByUserId(userId: number): PrismaPromise<Character | null> {
  return prisma.character.findFirst({
    where: {
      user: {
        id: userId
      }
    }
  })
}

export function levelUp(character: Character, statistics: Statistics): PrismaPromise<Character> {
  return prisma.character.update({
    where: {
      id: character.id
    },
    data: {
      experience: character.experience,
      statistics: {
        update: {
          ...statistics
        }
      }
    }
  })
}


export function updateResources(id: number, resources: Resources): PrismaPromise<Character> {
  return prisma.character.update({
    where: {
      id
    },
    data: {
      gold: resources.gold,
      crystal: resources.crystal
    }
  })
}

export function updateEquiped(id: number, helmetId: number, chestplateId: number, glovesId: number, leggingsId: number, weaponId: number): PrismaPromise<Character> {
  return prisma.character.update({
    where: {
      id
    },
    data: {
      helmetId,
      chestplateId,
      glovesId,
      leggingsId,
      weaponId
    }
  })
}
