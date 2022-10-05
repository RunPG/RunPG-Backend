import { Character, Statistics } from '@prisma/client'
import Resources from '../objects/Resources'
import prisma from './client'

export async function create(character: Character): Promise<Character> {
  return await prisma.character.create({
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

export async function getByUserId(userId: number): Promise<Character | null> {
  return await prisma.character.findFirst({
    where: {
      user: {
        id: userId
      }
    }
  })
}

export async function levelUp(character: Character, statistics: Statistics): Promise<Character> {
  return await prisma.character.update({
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


export async function updateResources(id: number, resources: Resources): Promise<Character> {
  return await prisma.character.update({
    where: {
      id
    },
    data: {
      gold: resources.gold,
      crystal: resources.crystal,
      wood: resources.wood,
      rock: resources.rock,
      cord: resources.cord,
      daarunEye: resources.daarunEye
    }
  })
}

export async function updateEquiped(id: number, helmetId: number, chestplateId: number, glovesId: number, leggingsId: number, weaponId: number): Promise<Character> {
  return await prisma.character.update({
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
