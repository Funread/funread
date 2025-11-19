-- Script para marcar imágenes de administradores como públicas (isfunreadMedia = TRUE)
-- Este script actualiza todas las imágenes que fueron subidas por usuarios con rol 'Administrativo'
-- para que sean públicas y visibles para todos los usuarios

UPDATE media m
INNER JOIN userroles ur ON m.user_id = ur.IdUser
INNER JOIN roles r ON ur.IdRole = r.RolesId
SET m.isfunreadMedia = TRUE
WHERE LOWER(r.Role) = 'administrativo' 
  AND m.galleryType IN (2, 3, 4, 5); -- Background, Shapes, Characters, Objects

-- Verificar los cambios realizados
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
    m.isfunreadMedia,
    CASE 
        WHEN m.isfunreadMedia = TRUE THEN 'PUBLIC (FunRead Media)'
        ELSE CONCAT('PRIVATE (User: ', COALESCE(u.name, u.username, u.email), ')')
    END as visibility
FROM media m
LEFT JOIN user u ON m.user_id = u.UserId
WHERE m.galleryType IN (2, 3, 4, 5)
ORDER BY m.galleryType, m.id;
