-- AlterTable
ALTER TABLE `cursos` ADD COLUMN `idUsuario` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `cursos` ADD CONSTRAINT `cursos_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
