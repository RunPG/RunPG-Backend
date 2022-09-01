FROM node:16.14.2

WORKDIR /api

# Not secure but not a priority
ENV DATABASE_URL="postgresql://api:password@runpg_db:5432/runpg?schema=public"
ENV PORT=5000
ENV DEV=PRODUCTION

COPY package*.json ./

RUN npm ci

COPY . .

RUN npx prisma generate

RUN npm run build

CMD npx prisma migrate deploy && npm run prisma:seed && npm run start
