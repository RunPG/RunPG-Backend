import { PrismaClient } from '@prisma/client';
import express from 'express';

const app = express();
const prisma = new PrismaClient();
const PORT = 5000;

app.get('/', async (_, res) => {
  const userCount = await prisma.user.count();
  res.send(`${userCount.valueOf()} users are in the database`)
});

app.listen(PORT, () => {
  return console.log(`Server is listening on ${PORT}`);
});
