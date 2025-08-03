const { PrismaClient } = require('@prisma/client');

console.log("Prisma Client is being initialized...");
const prisma = new PrismaClient();

console.log("Prisma Client initialized successfully.");
module.exports = prisma;