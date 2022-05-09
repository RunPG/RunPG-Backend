import { PrismaClient, spell } from '@prisma/client'

const prisma = new PrismaClient()

export async function getById(id: number): Promise<spell | null> {
  const spell = await prisma.spell.findUnique({
    where: {
      id: id
    }
  })
  return spell
}

export async function getByName(name: string): Promise<spell | null> {
  const spell = await prisma.spell.findUnique({
    where: {
      name: name
    }
  })
  return spell
}

export async function create(name: string, id_class:number): Promise<spell | null>{
  const spell = await prisma.spell.create({
    data: {
      id_class,
      name
    }
  })

  return spell
}
