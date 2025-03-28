/*
  Warnings:

  - Added the required column `idCurso` to the `participante` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idCurso` to the `pregunta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `participante` ADD COLUMN `idCurso` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `pregunta` ADD COLUMN `idCurso` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `pregunta` ADD CONSTRAINT `pregunta_idCurso_fkey` FOREIGN KEY (`idCurso`) REFERENCES `cursos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `participante` ADD CONSTRAINT `participante_idCurso_fkey` FOREIGN KEY (`idCurso`) REFERENCES `cursos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
