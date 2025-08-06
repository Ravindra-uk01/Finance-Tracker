#!/usr/bin/env bash
# Exit on error
set -o errexit

# Install dependencies
npm install --include=dev

# Generate Prisma Client for Render's environment
npx prisma generate
