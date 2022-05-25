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
  await prisma.friend.createMany({
    data: [
      {
        userId: 1,
        friendId:2
      },
      {
        userId: 1,
        friendId:3
      }
      ,
      {
        userId: 2,
        friendId:1
      },
      {
        userId: 2,
        friendId:3
      },
      {
        userId: 3,
        friendId:1
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
