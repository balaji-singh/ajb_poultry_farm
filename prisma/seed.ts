import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10)

  await prisma.user.upsert({
    where: { userId: 'admin001' },
    update: {},
    create: {
      userId: 'admin001',
      name: 'Bala S Singh',
      password: hashedPassword,
      userType: 'admin',
    },
  })

  await prisma.user.upsert({
    where: { userId: 'employee001' },
    update: {},
    create: {
      userId: 'employee001',
      name: 'Khaleem',
      password: hashedPassword,
      userType: 'employee',
    },
  })

  console.log('Seed data inserted successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

