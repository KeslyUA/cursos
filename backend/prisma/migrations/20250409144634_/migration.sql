/*
  Warnings:

  - Made the column `certificado` on table `cursos` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `cursos` MODIFY `certificado` BOOLEAN NOT NULL DEFAULT false;
