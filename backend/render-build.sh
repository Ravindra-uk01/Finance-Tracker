#!/bin/bash
set -e # Exit on error

# Install dependencies
npm install

# Generate Prisma client for Linux
npx prisma generate --schema=./prisma/schema.prisma

# Apply database migrations
npx prisma migrate deploy