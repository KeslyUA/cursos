/*
  Warnings:

  - Made the column `cursoLibre` on table `cursos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `evaluacion` on table `cursos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `obligatorio` on table `cursos` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `cursos` MODIFY `cursoLibre` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `evaluacion` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `obligatorio` BOOLEAN NOT NULL DEFAULT false;
