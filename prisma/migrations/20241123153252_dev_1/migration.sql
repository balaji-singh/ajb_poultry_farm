/*
  Warnings:

  - The primary key for the `Batch` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Batch` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Expense` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `expenseType` on the `Expense` table. All the data in the column will be lost.
  - The `id` column on the `Expense` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Income` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `incomeType` on the `Income` table. All the data in the column will be lost.
  - The `id` column on the `Income` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `numberOfBirds` to the `Batch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `batchId` on the `Expense` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `description` to the `Income` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `batchId` on the `Income` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `batchId` on the `Mortality` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_batchId_fkey";

-- DropForeignKey
ALTER TABLE "Income" DROP CONSTRAINT "Income_batchId_fkey";

-- DropForeignKey
ALTER TABLE "Mortality" DROP CONSTRAINT "Mortality_batchId_fkey";

-- AlterTable
ALTER TABLE "Batch" DROP CONSTRAINT "Batch_pkey",
ADD COLUMN     "numberOfBirds" INTEGER NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Batch_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_pkey",
DROP COLUMN "expenseType",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "quantity" INTEGER,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "date" DROP DEFAULT,
DROP COLUMN "batchId",
ADD COLUMN     "batchId" INTEGER NOT NULL,
ADD CONSTRAINT "Expense_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Income" DROP CONSTRAINT "Income_pkey",
DROP COLUMN "incomeType",
ADD COLUMN     "description" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "date" DROP DEFAULT,
DROP COLUMN "batchId",
ADD COLUMN     "batchId" INTEGER NOT NULL,
ADD CONSTRAINT "Income_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Mortality" ALTER COLUMN "date" DROP DEFAULT,
DROP COLUMN "batchId",
ADD COLUMN     "batchId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Income" ADD CONSTRAINT "Income_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mortality" ADD CONSTRAINT "Mortality_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
