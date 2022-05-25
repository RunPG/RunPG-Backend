import { PrismaClient, Spell } from '@prisma/client'

const prisma = new PrismaClient()

export async function getAllSpells(): Promise<Spell[] | null> {
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
