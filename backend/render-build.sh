#!/usr/bin/env bash
# Exit on error
set -o errexit

# Install dependencies
npm install

# Generate Prisma Client for Render's environment
npx prisma generate
