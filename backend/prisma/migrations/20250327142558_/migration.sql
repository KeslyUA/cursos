-- CreateTable
CREATE TABLE `participante` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idUsuario` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `participante` ADD CONSTRAINT `participante_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
