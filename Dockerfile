FROM node:16.14.2

WORKDIR /api

# Not secure but not a priority
ENV DATABASE_URL="postgresql://api:password@runpg_db:5432/runpg?schema=public"
ENV PORT=5000

COPY package*.json ./

RUN npm ci

COPY . .

CMD npx prisma migrate dev && npm run prisma:seed && npm run build && npm run start
