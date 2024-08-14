/*
  Warnings:

  - Made the column `userId` on table `Exercise` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `WorkoutTemplate` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_userId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutTemplate" DROP CONSTRAINT "WorkoutTemplate_userId_fkey";

-- AlterTable
ALTER TABLE "Exercise" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "WorkoutTemplate" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutTemplate" ADD CONSTRAINT "WorkoutTemplate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
