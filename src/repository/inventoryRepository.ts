import { PrismaClient, inventory } from '@prisma/client'

const prisma = new PrismaClient()

export async function getById(id: number): Promise<inventory | null> {
  const inventory = await prisma.inventory.findUnique({
    where: {
      id: id
    }
  })
  return inventory
}
export async function getByuserId(id_user: number): Promise<inventory | null> {
  const inventory = await prisma.inventory.findFirst({
    where: {
      id_user
    }
  })
  return inventory
}

export async function create(id_user: number): Promise<inventory | null> {
  const inventory = await prisma.inventory.create({
    data: {
      id_user
    }
  })

  return inventory
}
