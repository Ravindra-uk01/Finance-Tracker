#!/bin/bash
set -e # Exit on error

# Install dependencies
npm install

# Fix Prisma permissions
chmod +x node_modules/prisma/build/index.js

# Generate Prisma client
npx prisma generate

# Apply database migrations
npx prisma migrate deploy

# Start the application
node index.js