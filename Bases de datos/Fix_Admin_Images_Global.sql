-- Script de verificación de imágenes en el sistema
-- Este script muestra todas las imágenes del sistema con información del usuario que las subió
-- YA NO es necesario modificar user_id, el sistema ahora muestra TODAS las imágenes

-- Verificar todas las imágenes del sistema con información del usuario
SELECT 
    m.id,
    m.name,
    m.galleryType,
    CASE 
        WHEN m.galleryType = 2 THEN 'Background'
        WHEN m.galleryType = 3 THEN 'Shapes'
        WHEN m.galleryType = 4 THEN 'Characters'
        WHEN m.galleryType = 5 THEN 'Objects'
        ELSE 'Others'
    END as gallery_type_name,
    m.user_id,
    u.name as uploaded_by_name,
    u.email as uploaded_by_email,
    CASE 
        WHEN m.user_id IS NULL THEN 'GLOBAL (System)'
        ELSE CONCAT('User: ', COALESCE(u.name, u.username, u.email))
    END as visibility
FROM media m
LEFT JOIN user u ON m.user_id = u.UserId
WHERE m.galleryType IN (2, 3, 4, 5)
ORDER BY m.galleryType, m.id;
