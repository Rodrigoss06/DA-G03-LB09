import { PrismaClient } from '@prisma/client';

// Extender el tipo global para incluir `prisma`
declare global {
  var prisma: PrismaClient | undefined;
}
