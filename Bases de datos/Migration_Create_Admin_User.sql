-- ============================================
-- Migración: Crear Usuario Administrador
-- Proyecto: FunRead
-- Fecha: 2025-11-20
-- Descripción: Inserta el usuario administrador por defecto
--              con rol asignado
-- ============================================

USE FUNREAD;

-- ============================================
-- CREAR USUARIO ADMINISTRADOR
-- ============================================

INSERT INTO user (Name, LastName, UserName, Email, password, Actived, CreatedAt, Level)
VALUES (
    'Admin',
    'FunRead',
    'admin',
    'admin@funread.com',
    '3eb3fe66b31e3b4d10fa70b5cad49c7112294af6ae4e476a1c405155d45aa121',
    1,  -- Usuario activo
    NOW(),
    1   -- Nivel inicial
)
ON DUPLICATE KEY UPDATE
    Name = VALUES(Name),
    LastName = VALUES(LastName),
    UserName = VALUES(UserName),
    Actived = 1,
    Level = 1;

-- ============================================
-- ASIGNAR ROL DE ADMINISTRADOR
-- ============================================

-- Obtener el ID del usuario administrador
SET @admin_user_id = (SELECT UserId FROM user WHERE Email = 'admin@funread.com');

-- Verificar que existe el rol 'administrativo'
-- Si no existe, crearlo
INSERT IGNORE INTO roles (Role)
VALUES ('administrativo');

-- Obtener el ID del rol administrativo
SET @admin_role_id = (SELECT RolesId FROM roles WHERE Role = 'administrativo');

-- Eliminar cualquier rol existente para este usuario (prevenir duplicados)
DELETE FROM userroles WHERE IdUser = @admin_user_id;

-- Asignar el rol administrativo al usuario
INSERT INTO userroles (IdUser, IdRole)
VALUES (@admin_user_id, @admin_role_id);

