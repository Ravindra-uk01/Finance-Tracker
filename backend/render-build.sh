#!/usr/bin/env bash
set -o errexit

# Install all dependencies
npm install

# Ensure prisma CLI has execute permission
chmod +x ./node_modules/.bin/prisma

# Generate Prisma client
npx prisma generate
