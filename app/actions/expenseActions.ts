'use server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function addExpense(expenseType: string, amount: number) {
  const activeBatch = await prisma.batch.findFirst({
    where: { isActive: true },
  })

  if (!activeBatch) {
    throw new Error('No active batch found')
  }

  return await prisma.expense.create({
    data: {
      expenseType,
      amount,
      batchId: activeBatch.id,
    },
  })
}

export async function getExpenses() {
  const activeBatch = await prisma.batch.findFirst({
    where: { isActive: true },
  })

  if (!activeBatch) {
    return []
  }

  return await prisma.expense.findMany({
    where: { batchId: activeBatch.id },
    orderBy: { date: 'desc' },
  })
}

