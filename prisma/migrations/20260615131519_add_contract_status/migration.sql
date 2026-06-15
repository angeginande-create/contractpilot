-- DropIndex
DROP INDEX "Contract_contractId_key";

-- AlterTable
ALTER TABLE "Contract" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Draft';
