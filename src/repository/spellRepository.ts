import { Spell } from '@prisma/client'
import prisma from './client'

export async function getAllSpells(): Promise<Spell[]> {
  return await prisma.spell.findMany()
}

export async function getById(id: number): Promise<Spell | null> {
  return await prisma.spell.findUnique({
    where: {
      id
    }
  })
}

export async function getByName(name: string): Promise<Spell | null> {
  return await prisma.spell.findUnique({
    where: {
      name
    }
  })
}
/*
export async function create(name: string, _class: HeroClass): Promise<Spell | null> {
  return await prisma.spell.create({
    data: {
      class:_class,
      name
    }
  })
}*/
