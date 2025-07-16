/*
  Warnings:

  - Added the required column `comment` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerId` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "comment" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "customerId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
