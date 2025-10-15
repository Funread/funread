-- Script para crear una imagen por defecto para grupos
-- Esta imagen se usará cuando se cree un grupo sin especificar una imagen

USE funread;

-- Insertar imagen por defecto para grupos si no existe
-- Usamos INSERT IGNORE para evitar errores si ya existe un registro con id=1
INSERT IGNORE INTO media (id, name, extension, file, type, galleryType) 
VALUES (1, 'default_group', 'png', 'media/Logo.png', 1, 2);

-- Si prefieres usar un ID diferente (por ejemplo 100) para no conflictuar con otras imágenes:
-- INSERT INTO media (name, extension, file, type, galleryType) 
-- VALUES ('default_group', 'png', 'media/Logo.png', 1, 2);
-- 
-- Nota: Si usas un ID diferente, debes actualizar el código del frontend
-- para usar ese ID específico en lugar de 1

-- Verificar que la imagen se insertó correctamente
SELECT * FROM media WHERE id = 1;
