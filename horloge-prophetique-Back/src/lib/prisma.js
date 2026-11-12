import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

// Prisma 7 utilise un système d'adaptateurs : on passe l'adaptateur PostgreSQL
// directement au client au lieu de définir l'URL dans schema.prisma.
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

// Instance unique partagée dans toute l'application (singleton)
export default prisma
