/*
  Warnings:

  - Added the required column `idUsuario` to the `pregunta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pregunta` ADD COLUMN `idUsuario` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `pregunta` ADD CONSTRAINT `pregunta_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
