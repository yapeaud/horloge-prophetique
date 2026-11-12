import 'dotenv/config'
import bcrypt from 'bcryptjs'
import prisma from '../src/lib/prisma.js'

async function main() {
  const existing = await prisma.user.findUnique({ where: { email: 'horlogeprophetique@gmail.com' } })
  if (existing) {
    console.log('Admin déjà existant.')
    return
  }

  const hashed = await bcrypt.hash('Admin@HP2024!', 12)
  const admin = await prisma.user.create({
    data: {
      nom: 'Administrateur',
      email: 'horlogeprophetique@gmail.com',
      password: hashed,
      role: 'ADMIN',
    },
  })
  console.log(`Admin créé : ${admin.email}`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
