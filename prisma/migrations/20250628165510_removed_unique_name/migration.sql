/*
  Warnings:

  - Made the column `name` on table `Employee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `Employee` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Employee_name_key";

-- AlterTable
ALTER TABLE "Employee" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL;
