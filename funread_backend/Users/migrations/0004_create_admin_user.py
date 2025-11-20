# Generated migration for creating default admin user
from django.db import migrations
from datetime import datetime


def create_admin_user(apps, schema_editor):
    """
    Crea el usuario administrador por defecto con su rol asignado.
    """
    User = apps.get_model('Users', 'User')
    Roles = apps.get_model('Roles', 'Roles')
    Userroles = apps.get_model('Userroles', 'Userroles')
    
    # Crear o actualizar el usuario administrador
    admin_user, created = User.objects.update_or_create(
        email='admin@funread.com',
        defaults={
            'name': 'Admin',
            'lastname': 'FunRead',
            'username': 'admin',
            'password': '3eb3fe66b31e3b4d10fa70b5cad49c7112294af6ae4e476a1c405155d45aa121',
            'actived': 1,
            'createdat': datetime.now(),
            'level': 1
        }
    )
    
    # Obtener el rol administrativo
    try:
        admin_role = Roles.objects.get(role='administrativo')
        
        # Eliminar roles previos del usuario (prevenir duplicados)
        Userroles.objects.filter(iduser=admin_user).delete()
        
        # Asignar el rol administrativo
        Userroles.objects.create(
            iduser=admin_user,
            idrole=admin_role
        )
        
        if created:
            print(f"✓ Usuario administrador creado: {admin_user.email}")
        else:
            print(f"✓ Usuario administrador actualizado: {admin_user.email}")
            
    except Roles.DoesNotExist:
        print("⚠ Advertencia: El rol 'administrativo' no existe. Ejecute las migraciones de Roles primero.")


def remove_admin_user(apps, schema_editor):
    """
    Revierte la creación del usuario administrador.
    """
    User = apps.get_model('Users', 'User')
    Userroles = apps.get_model('Userroles', 'Userroles')
    
    try:
        admin_user = User.objects.get(email='admin@funread.com')
        # Eliminar relaciones de roles
        Userroles.objects.filter(iduser=admin_user).delete()
        # Eliminar usuario
        admin_user.delete()
        print("✓ Usuario administrador eliminado")
    except User.DoesNotExist:
        print("⚠ El usuario administrador no existe")


class Migration(migrations.Migration):

    dependencies = [
        ('Users', '0003_alter_user_level'),
        ('Roles', '0001_initial'),
        ('Userroles', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_admin_user, remove_admin_user),
    ]
