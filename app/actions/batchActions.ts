'use server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getActiveBatch() {
  return await prisma.batch.findFirst({
    where: { isActive: true },
  })
}

