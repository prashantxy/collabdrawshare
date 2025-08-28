# Turborepo for collab-share-draw backend

This Turborepo is maintained by the me.

Tech-stack.
Frontend:- Next.js,typescript and canva.
Backend :- Express,Node.
Database:- Postgres(hosted on neon db)
ORM :- Prisma.
Containerized: docker.hub

To run either clone it.
Or use Docker.hub link.

### Apps and Packages

- `draw-front-en`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `@repo/ui`: a stub React component library shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

To install :- pnpm install
To run load env's 
To start pnpm run dev
