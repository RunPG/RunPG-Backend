# RunPG-Backend

## Dev env prerequisites

- Node v16.14.2 (LTS)
- npm 8.6.0
- Docker and docker-compose
  - if you have permission issues on linux, follow [these steps](https://docs.docker.com/engine/install/linux-postinstall/).
- Visual Studio Code with optional (but recommended) plugins
  - ESLint
  - Prisma
- [dotenv-cli](https://www.npmjs.com/package/dotenv-cli)

## Start dev env

**0a. Install project, if not already installed**

```
npm ci
```

**0b. Create a .env file, if not created yet**

```
DATABASE_URL="postgresql://api:password@localhost:5432/runpg?schema=public"
PORT=5000
ENV=DEVELOPMENT
GOOGLE_CLIENT_ID= {Your Google API app client ID}
GOOGLE_CLIENT_SECRET= {Your Google API app client secret}
```

Creates a .env file containing a URL used for database connection, the API port and your Google Web App id.

**0c. Create a .env.test file, if not created yet**

```
DATABASE_URL="postgresql://api:password@localhost:5433/runpg?schema=public"
PORT=500
ENV=TEST
```

Creates a .env file containing a URL used for database connection and the API port.

**1. Start databases**

```
npm run dev:setup
```

This will start two detached seeded PostgreSQL docker containers.

**2. Start dev server**

```
npm run dev
```

Starts server in dev mode, file updates will automatically apply.

## Run tests

**1. Make sure you started databases running**

See "1. Start database:" in "Start dev env" section.

**3. Run tests**

```
npm run test
```

Run all Jest tests (unit and integration).

To run unit tests only: `npm run test:unit`

To run integration tests only: `npm run test:integration`

## Misc

**Access database GUI editor**

```
npx prisma studio
```

**Stop Databases**

```
npm run dev:down
```
