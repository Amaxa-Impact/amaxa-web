## What tech do we use

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org) ( This will most likely change to clerk)
- [Drizzle](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [Stack we use](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

# Project Setup Guide

note: this will not work on school issued devices

note 2: don't be afraid to ask tools like ChatGPT for help

## Repo Setup

First please clone the repo, if you have done this previously please run `git pull` before continuing.

## Prerequisites

### Node.js

Ensure [Node.js](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs#how-to-install-nodejs) is installed on your system.

### Pnpm

Install pnpm globally using npm:
```
npm install -g pnpm
```

## Environment Variables

### Overview

Environment variables allow you to manage project settings and secrets without hardcoding them into your application. They are essential for configuring the app's external services like databases and authentication providers.

1. **Initialization**: Copy the `.env.example` file to `.env` to set up your environment variables.

### Google Authentication

Refer to the [NextAuth.js Google provider documentation](https://next-auth.js.org/providers/google) to obtain your Google OAuth credentials. Update the `.env` file with these credentials.

1. Create your own oAuth credential with personal email.
2. Configure oAuth consent screen
3. Scope?
4. Create Credential --> OAUTH CLient ID

### Database Setup

1. **Supabase Project**: Create a project on [Supabase](https://supabase.com/). Remember to note your project password.
2. **Connection String**: Navigate to `Settings > Database` in your Supabase project to find the connection string. Replace `DATABASE_URL` in your `.env` file with this string, including your project password.

Neon - Create accoutn - Create database

## Installing Dependencies

With the environment configured, install all project dependencies by running:
```
pnpm i
```

## Update the database

```
pnpm db:push
```

## Running the Project

Start the development server with:
```
pnpm run dev
```

You're all set! 🥳 

