/*
  Warnings:

  - Added the required column `favorite` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `muscleGroup` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `WorkoutTemplate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastUse` to the `WorkoutTemplate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "favorite" BOOLEAN NOT NULL,
ADD COLUMN     "muscleGroup" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "WorkoutTemplate" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "lastUse" TIMESTAMP(3) NOT NULL;
