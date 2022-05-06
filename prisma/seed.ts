import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() : Promise<void> {
  await prisma.user.createMany({
    data: [
      {
        name: 'Gabriel'
      },
      {
        name: 'Eliott'
      },
      {
        name: 'Hugo'
      },
      {
        name: 'Kieran'
      }
    ],
    skipDuplicates: true
  })
}

main()
  .then(() => {
    console.log('Migration done')
  })
  .catch(err => {
    console.error(err)
  })
