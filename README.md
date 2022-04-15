# RunPG-Backend

## Dev env prerequisites
- Node v16.14.2 (LTS)
- npm 8.6.0
- Docker and docker-compose
- Visual Studio Code with optional (but recommended) plugins
  - ESLint
  - Prisma

## Start dev env
**0a. Install project, if not already installed:**
```
npm ci
```

**0b. Create a .env file, if not created yet:**
```
echo 'DATABASE_URL="postgresql://api:password@localhost:5432/runpg?schema=public"' > .env
```
Creates a .env file containing a URL used for database connection.

**1. Start database:**
```
sudo docker-compose up -d
```
This will start a detached PostgreSQL docker container.

**2. Initialize local database:**
```
npx prisma migrate dev
```
This will create all the necessary tables in the newly created database.

**3. Start dev server**
```
npm run dev
```
Starts server in dev mode, file updates will automatically apply.
