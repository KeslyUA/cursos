-- CreateTable
CREATE TABLE `puntaje` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idUsuario` INTEGER NOT NULL,
    `idCurso` INTEGER NOT NULL,
    `puntaje` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `puntaje` ADD CONSTRAINT `puntaje_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `puntaje` ADD CONSTRAINT `puntaje_idCurso_fkey` FOREIGN KEY (`idCurso`) REFERENCES `cursos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
