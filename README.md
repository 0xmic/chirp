# Chirp

Chirp is a lightweight Twitter clone that allows users to share their thoughts using emojis. Built with a modern tech stack, Chirp aims to provide a simple and intuitive user experience.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org)
- **Language**: [TypeScript](https://www.typescriptlang.org)
- **UI Components**: [Tailwind CSS](https://tailwindcss.com)
- **Authentication**: [Clerk](https://clerk.dev)
- **API**: [tRPC](https://trpc.io)
- **Database**: [Prisma](https://www.prisma.io) with [PlanetScale](https://planetscale.com/)
- **Rate Limiting**: [Upstash](https://upstash.com/) with [Ratelimit](http://www.npmjs.com/package/@upstash/ratelimit)
- **Deployment**: [Vercel](https://vercel.com)

## Getting Started

1. Clone the repository:

```
> git clone https://github.com/0xmic/chirp.git
```

2. Install the dependencies:

```
> cd chirp
> npm install
```

3. Set up environment variables by referring to the provided `.env.example` file. Replace placeholders with your own values.

4. Set up the database (refer to the [Database Setup](#database-setup) section).

5. Run the development server:

```
> npm run dev
```

Now you can navigate to [http://localhost:3000](http://localhost:3000) in your browser to see the app running.

## Database Setup

Chirp uses [Prisma](https://www.prisma.io) as its ORM. Make sure you have a database set up and the `DATABASE_URL` environment variable properly configured.

- Run the following command to create the necessary tables in your database:

```
> npx prisma db push
```

Once you've set up your environment variables and database, you can follow the instructions in the [Getting Started](#getting-started) section to run the project locally.
