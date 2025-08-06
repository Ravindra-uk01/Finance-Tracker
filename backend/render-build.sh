#!/usr/bin/env bash
set -o errexit

npm install
npx prisma generate
