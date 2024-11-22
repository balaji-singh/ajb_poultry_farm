'use server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function addIncome(incomeType: string, amount: number) {
  const activeBatch = await prisma.batch.findFirst({
    where: { isActive: true },
  })

  if (!activeBatch) {
    throw new Error('No active batch found')
  }

  return await prisma.income.create({
    data: {
      incomeType,
      amount,
      batchId: activeBatch.id,
    },
  })
}

export async function getIncomes() {
  const activeBatch = await prisma.batch.findFirst({
    where: { isActive: true },
  })

  if (!activeBatch) {
    return []
  }

  return await prisma.income.findMany({
    where: { batchId: activeBatch.id },
    orderBy: { date: 'desc' },
  })
}

