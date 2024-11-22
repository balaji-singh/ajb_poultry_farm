'use server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function addMortality(count: number) {
  const activeBatch = await prisma.batch.findFirst({
    where: { isActive: true },
  })

  if (!activeBatch) {
    throw new Error('No active batch found')
  }

  return await prisma.mortality.create({
    data: {
      count,
      batchId: activeBatch.id,
    },
  })
}

export async function getMortalities() {
  const activeBatch = await prisma.batch.findFirst({
    where: { isActive: true },
  })

  if (!activeBatch) {
    return []
  }

  return await prisma.mortality.findMany({
    where: { batchId: activeBatch.id },
    orderBy: { date: 'desc' },
  })
}

