"""
Sistema de Asignación Automática de Badges basado en Libros Leídos
FunRead - Badge Assignment Module
"""
from django.db import transaction
from .models import Badge
from UserBadge.models import UserBadge
from userbookprogress.models import UserBookProgress
from UserPoints.models import UserPoints
from UserPointsLog.models import UserPointsLog
from datetime import datetime


def count_completed_books(user_id):
    """
    Cuenta la cantidad de libros completados por un usuario.
    
    Args:
        user_id (int): ID del usuario
        
    Returns:
        int: Cantidad de libros con status = 1 (Completado)
    """
    try:
        count = UserBookProgress.objects.filter(
            user_id=user_id,
            status=1  # 1 = Completado
        ).count()
        
        return count
    except Exception as e:
        print(f"Error contando libros completados para user {user_id}: {e}")
        return 0


def assign_badge_to_user(user_id, badge_id, books_read):
    """
    Asigna un badge a un usuario y otorga los puntos correspondientes.
    
    Args:
        user_id (int): ID del usuario
        badge_id (int): ID del badge
        books_read (int): Cantidad de libros leídos (para calcular progreso)
        
    Returns:
        dict: Información del badge asignado
    """
    try:
        badge = Badge.objects.get(id=badge_id)
        
        # Verificar si el usuario ya tiene este badge
        if UserBadge.objects.filter(user_id=user_id, badge_id=badge_id).exists():
            return None
        
        # Crear el registro de UserBadge
        user_badge = UserBadge.objects.create(
            user_id=user_id,
            badge_id=badge_id,
            date=datetime.now(),  # Corregido: el campo se llama 'date', no 'date_earned'
            achieved=True,  # Marcar como logrado
            progress=100  # 100% porque ya lo obtuvo
        )
        
        # Otorgar puntos al usuario
        add_points_to_user(user_id, badge.points, f"Badge obtenido: {badge.title}")
        
        return {
            'id': badge.id,
            'title': badge.title,
            'description': badge.description,
            'points': badge.points,
            'goal_points': badge.goal_points,
            'books_read': books_read
        }
        
    except Badge.DoesNotExist:
        print(f"Badge {badge_id} no existe")
        return None
    except Exception as e:
        print(f"Error asignando badge {badge_id} a user {user_id}: {e}")
        return None


def add_points_to_user(user_id, points, description):
    """
    Añade puntos al usuario y registra en el log.
    
    Args:
        user_id (int): ID del usuario
        points (int): Cantidad de puntos a añadir
        description (str): Descripción del motivo
    """
    try:
        # Obtener o crear el registro de UserPoints
        user_points, created = UserPoints.objects.get_or_create(
            user_id=user_id,
            defaults={'total_points': 0}
        )
        
        # Actualizar puntos
        user_points.total_points += points
        user_points.save()
        
        # Registrar en el log
        UserPointsLog.objects.create(
            user_id=user_id,
            points=points,
            description=description,
            created_at=datetime.now()
        )
        
        print(f"Añadidos {points} puntos a user {user_id}: {description}")
        
    except Exception as e:
        print(f"Error añadiendo puntos a user {user_id}: {e}")


@transaction.atomic
def check_and_assign_badges(user_id):
    """
    Verifica qué badges puede obtener un usuario basado en libros completados
    y los asigna automáticamente.
    
    Args:
        user_id (int): ID del usuario
        
    Returns:
        list: Lista de badges recién asignados
    """
    try:
        # 1. Contar libros completados del usuario
        books_read = count_completed_books(user_id)
        
        # 2. Obtener todos los badges con goal_points habilitado
        badges = Badge.objects.filter(
            show_progress=True,
            goal_points__isnull=False
        ).order_by('goal_points')
        
        newly_assigned = []
        
        # 3. Para cada badge, verificar si el usuario cumple la meta
        for badge in badges:
            # Si el usuario ha leído suficientes libros para este badge
            if books_read >= badge.goal_points:
                # Y no lo tiene ya asignado
                if not UserBadge.objects.filter(user_id=user_id, badge_id=badge.id).exists():
                    # Asignar el badge
                    assigned = assign_badge_to_user(user_id, badge.id, books_read)
                    
                    if assigned:
                        newly_assigned.append(assigned)
        
        return newly_assigned
        
    except Exception as e:
        print(f"Error en check_and_assign_badges para user {user_id}: {e}")
        return []


def update_badge_progress(user_id):
    """
    Actualiza el progreso de badges en proceso para un usuario.
    
    Args:
        user_id (int): ID del usuario
        
    Returns:
        list: Lista de badges con progreso actualizado
    """
    try:
        books_read = count_completed_books(user_id)
        
        # Obtener badges que el usuario NO tiene aún
        assigned_badge_ids = UserBadge.objects.filter(
            user_id=user_id
        ).values_list('badge_id', flat=True)
        
        pending_badges = Badge.objects.filter(
            show_progress=True,
            goal_points__isnull=False
        ).exclude(
            id__in=assigned_badge_ids
        ).order_by('goal_points')
        
        progress_list = []
        
        for badge in pending_badges:
            # Calcular progreso
            progress_percentage = min((books_read / badge.goal_points) * 100, 100)
            books_needed = max(badge.goal_points - books_read, 0)
            
            progress_list.append({
                'id': badge.id,
                'title': badge.title,
                'description': badge.description,
                'goal_points': badge.goal_points,
                'books_read': books_read,
                'progress': round(progress_percentage, 2),
                'books_needed': books_needed,
                'achieved': False
            })
        
        return progress_list
        
    except Exception as e:
        print(f"Error actualizando progreso de badges para user {user_id}: {e}")
        return []


def get_user_badges_with_progress(user_id):
    """
    Obtiene todos los badges del usuario con información de progreso.
    
    Args:
        user_id (int): ID del usuario
        
    Returns:
        dict: {
            'user_id': int,
            'books_read': int,
            'achieved_badges': list,  # Badges ya obtenidos
            'next_badges': list       # Próximos badges a obtener (con progreso)
        }
    """
    try:
        books_read = count_completed_books(user_id)
        
        # Badges ya obtenidos
        user_badges = UserBadge.objects.filter(user_id=user_id).select_related('badge')
        
        achieved_badges = []
        for ub in user_badges:
            achieved_badges.append({
                'badgeid': ub.badge.id,
                'id': ub.badge.id,
                'title': ub.badge.title,
                'description': ub.badge.description,
                'points': ub.badge.points,
                'icon': ub.badge.icon,
                'goal_points': ub.badge.goal_points,
                'date_achieved': ub.date.isoformat() if ub.date else None,  # Corregido: el campo se llama 'date'
                'achieved': True,
                'progress': 100.0
            })
        
        # Próximos badges (todos los que NO tiene el usuario)
        assigned_badge_ids = UserBadge.objects.filter(
            user_id=user_id
        ).values_list('badge_id', flat=True)
        
        # Obtener TODOS los badges que el usuario no tiene aún
        pending_badges = Badge.objects.exclude(
            id__in=assigned_badge_ids
        ).order_by('goal_points', 'points')
        
        next_badges = []
        
        for badge in pending_badges:
            # Si el badge tiene progreso automático (show_progress=True)
            if badge.show_progress and badge.goal_points:
                progress_percentage = min((books_read / badge.goal_points) * 100, 100)
                books_needed = max(badge.goal_points - books_read, 0)
                
                next_badges.append({
                    'badgeid': badge.id,
                    'id': badge.id,
                    'title': badge.title,
                    'description': badge.description,
                    'points': badge.points,
                    'icon': badge.icon,
                    'goal_points': badge.goal_points,
                    'books_required': badge.goal_points,
                    'progress': books_read,
                    'books_needed': books_needed,
                    'achieved': False
                })
            else:
                # Badges sin progreso automático (manuales o especiales)
                next_badges.append({
                    'badgeid': badge.id,
                    'id': badge.id,
                    'title': badge.title,
                    'description': badge.description,
                    'points': badge.points,
                    'icon': badge.icon,
                    'goal_points': None,
                    'books_required': None,
                    'progress': 0,
                    'books_needed': None,
                    'achieved': False
                })
        
        return {
            'user_id': user_id,
            'books_read': books_read,
            'achieved_badges': achieved_badges,
            'next_badges': next_badges  # Todos los badges pendientes
        }
        
    except Exception as e:
        print(f"Error obteniendo badges con progreso para user {user_id}: {e}")
        import traceback
        traceback.print_exc()
        return {
            'user_id': user_id,
            'books_read': 0,
            'achieved_badges': [],
            'next_badges': []
        }


@transaction.atomic
def assign_badges_to_all_users():
    """
    Asigna badges a todos los usuarios basándose en sus libros completados.
    Útil para mantenimiento o asignación masiva.
    
    Returns:
        dict: Estadísticas de la asignación masiva
    """
    try:
        # Obtener todos los usuarios únicos con libros completados
        users_with_books = UserBookProgress.objects.filter(
            status=1
        ).values_list('user_id', flat=True).distinct()
        
        total_users = len(users_with_books)
        total_badges_assigned = 0
        details = []
        
        for user_id in users_with_books:
            newly_assigned = check_and_assign_badges(user_id)
            
            if newly_assigned:
                total_badges_assigned += len(newly_assigned)
                details.append({
                    'user_id': user_id,
                    'badges_assigned': len(newly_assigned),
                    'badges': [b['title'] for b in newly_assigned]
                })
        
        return {
            'success': True,
            'total_users_processed': total_users,
            'total_badges_assigned': total_badges_assigned,
            'details': details
        }
        
    except Exception as e:
        print(f"Error en asignación masiva de badges: {e}")
        return {
            'success': False,
            'error': str(e),
            'total_users_processed': 0,
            'total_badges_assigned': 0,
            'details': []
        }
