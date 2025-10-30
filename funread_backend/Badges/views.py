from django.forms import CharField
from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Badge
from .serializers import BadgeSerializer
import verifyJwt
from .models import Badge
from UserBadge.models import UserBadge
from django.db.models import OuterRef, Subquery, BooleanField, Case, When, Value, IntegerField, CharField, Count
from django.http import JsonResponse
# Imports para sistema de badges automáticos
from middleware.admin_required import admin_required
# Imports para documentación Swagger
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from .badge_assignment import (
    check_and_assign_badges,
    get_user_badges_with_progress,
    assign_badges_to_all_users,
    count_completed_books
)

# type: ignore - Ignorar warnings de Pylance sobre atributos de modelo Django


#Crear una nueva insignia
@api_view(['POST'])
def create_badge(request):
    try:
        authorization_header = request.headers.get('Authorization')
        verify = verifyJwt.JWTValidator(authorization_header)
        es_valido = verify.validar_token()
        if es_valido==False:
         return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        # Validar los datos de la solicitud usando el serializador
        serializer = BadgeSerializer(data=request.data)
        
        # Verificar si los datos son válidos
        if not serializer.is_valid():
         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()  # Guardar la nueva insignia en la base de datos
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    except Exception as e:
            print(f"Error: {e}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
#listar todas las insignias disponibles

@api_view(['GET'])
def list_badges(request):
    try:
        authorization_header = request.headers.get('Authorization')
        verify = verifyJwt.JWTValidator(authorization_header)
        es_valido = verify.validar_token()
        if es_valido==False:
         return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        # Obtener todas las insignias de la tabla Badge
        badges = Badge.objects.all()
        
        # Serializar las insignias
        serializer = BadgeSerializer(badges, many=True)
        
        # Devolver la lista de insignias
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    except Exception as e:
        print(f"Error: {e}")
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


#Editar una insignia

@api_view(['PUT'])
def update_badge(request, badge_id):
    try:
        authorization_header = request.headers.get('Authorization')
        verify = verifyJwt.JWTValidator(authorization_header)
        es_valido = verify.validar_token()
        if es_valido==False:
         return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        # Obtener la insignia especificada por su ID
        badge = get_object_or_404(Badge, id=badge_id)

        # Validar y actualizar los datos de la insignia usando el serializador
        serializer = BadgeSerializer(badge, data=request.data, partial=True)
        
        # Verificar si los datos son válidos
        if not serializer.is_valid():
         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()  # Guardar la nueva insignia en la base de datos
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    except Exception as e:
        print(f"Error: {e}")
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



#Eliminar una insignia

@api_view(['DELETE'])
def delete_badge(request, badge_id):
    try:
        authorization_header = request.headers.get('Authorization')
        verify = verifyJwt.JWTValidator(authorization_header)
        es_valido = verify.validar_token()
        if es_valido==False:
         return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        # Obtener la insignia especificada por su ID
        badge = get_object_or_404(Badge, id=badge_id)
        
        # Eliminar la insignia
        badge.delete()
        
        # Responder con un mensaje de éxito
        return Response({"message": "Badge deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    
    except Exception as e:
        print(f"Error: {e}")
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



@api_view(['GET'])
def list_user_badges_with_status(request, user_id):
    try:
        # Validar token JWT
        authorization_header = request.headers.get('Authorization')
        verify = verifyJwt.JWTValidator(authorization_header)
        es_valido = verify.validar_token()
        if not es_valido:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        # Subquery para obtener el progreso y si la insignia está lograda
        user_badge_subquery = UserBadge.objects.filter(
            user_id=user_id,
            badge=OuterRef('pk')
        )

        # Anotamos los campos necesarios: logrado, progreso y estado
        badges = Badge.objects.filter(
            id__in=user_badge_subquery.values('badge')
        ).annotate(
            achieved=Case(
                When(id__in=user_badge_subquery.values('badge'), then=Value(True)),
                default=Value(False),
                output_field=BooleanField()
            ),
            progress=Subquery(
                user_badge_subquery.values('progress')[:1],
                output_field=IntegerField()
            ),
            status=Case(
                When(id__in=user_badge_subquery.values('badge'), then=Value("Done")),
                When(progress__gt=0, then=Value("In Progress")),
                default=Value("Not Done"),
                output_field=CharField()
            )
        )

        # Construimos la lista con el formato requerido
        badge_list = [
            {
                "title": badge.title,
                "description": badge.description,
                "points": badge.points,
                "show_progress": getattr(badge, 'show_progress', False),
                "progress_placeholder": getattr(badge, 'progress_placeholder', None) if getattr(badge, 'show_progress', False) else None,
                "achieved": getattr(badge, 'achieved', False),
                "progress": getattr(badge, 'progress', 0),
                "status": getattr(badge, 'status', "Not Done"),
            }
            for badge in badges
        ]

        return JsonResponse({"badges": badge_list}, status=status.HTTP_200_OK)

    except Exception as e:
        print(f"Error: {e}")
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    


# @api_view(['GET'])
# def list_user_badges_Achieved_NOT_Achieved(request, user_id):
#     try:
#         # Validar token JWT
#         authorization_header = request.headers.get('Authorization')
#         verify = verifyJwt.JWTValidator(authorization_header)
#         es_valido = verify.validar_token()
#         if not es_valido:
#             return Response(status=status.HTTP_401_UNAUTHORIZED)

#         # Subquery para obtener el progreso y si la insignia está lograda
#         user_badge_subquery = UserBadge.objects.filter(
#             user_id=user_id,
#             badge=OuterRef('pk')
#         )

#         # Anotamos los campos necesarios: logrado, progreso y estado
#         all_badges = Badge.objects.annotate(
#             achieved=Case(
#                 When(id__in=user_badge_subquery.values('badge'), then=Value(True)),
#                 default=Value(False),
#                 output_field=BooleanField()
#             ),
#             progress=Subquery(
#                 user_badge_subquery.values('progress')[:1],
#                 output_field=IntegerField()
#             ),
#             status=Case(
#                 When(id__in=user_badge_subquery.values('badge'), then=Value("Done")),
#                 When(progress__gt=0, then=Value("In Progress")),
#                 default=Value("Not Done"),
#                 output_field=CharField()
#             )
#         )

#         # Separar las badges logradas y no logradas
#         achieved_badges = all_badges.filter(achieved=True)
#         unachieved_badges = all_badges.filter(achieved=False)

#         # Construir listas para cada categoría
#         achieved_list = [
#             {
#                 "title": badge.title,
#                 "description": badge.description,
#                 "points": badge.points,
#                 "show_progress": badge.show_progress,
#                 "progress_placeholder": badge.progress_placeholder if badge.show_progress else None,
#                 "achieved": badge.achieved,
#                 "progress": 0,  # Las no logradas no tienen progreso
#                 "status": "Not Done",
#             }
#             for badge in unachieved_badges
#         ]

#         # Retornar la respuesta con ambas listas
#         return JsonResponse(
#             {"achieved_badges": achieved_list, "unachieved_badges": unachieved_list},
#             status=status.HTTP_200_OK
#         )

#     except Exception as e:
#         print(f"Error: {e}")
#         return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# ============================================
# ENDPOINTS DE ADMINISTRADOR
# ============================================

@swagger_auto_schema(
    method='post',
    operation_summary="Crear nuevo badge",
    operation_description="""
    Crea un nuevo badge en el sistema. Solo accesible por administradores.
    
    El badge puede configurarse para:
    - Estudiantes o profesores (is_teacher_badge)
    - Mostrar progreso automático (show_progress)
    - Requerir cierta cantidad de libros (goal_points)
    """,
    tags=['Badges Admin'],
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        required=['title', 'description', 'points', 'goal_points'],
        properties={
            'title': openapi.Schema(
                type=openapi.TYPE_STRING,
                description='Título del badge',
                example='Lector Principiante'
            ),
            'description': openapi.Schema(
                type=openapi.TYPE_STRING,
                description='Descripción del logro',
                example='Completa tu primer libro para obtener este badge'
            ),
            'points': openapi.Schema(
                type=openapi.TYPE_INTEGER,
                description='Puntos que otorga el badge',
                example=10,
                minimum=0
            ),
            'goal_points': openapi.Schema(
                type=openapi.TYPE_INTEGER,
                description='Cantidad de libros requeridos',
                example=1,
                minimum=1
            ),
            'icon': openapi.Schema(
                type=openapi.TYPE_STRING,
                description='Nombre del icono (FontAwesome)',
                example='book'
            ),
            'is_teacher_badge': openapi.Schema(
                type=openapi.TYPE_BOOLEAN,
                description='Si es badge exclusivo para profesores',
                default=False
            ),
            'show_progress': openapi.Schema(
                type=openapi.TYPE_BOOLEAN,
                description='Si muestra progreso y se asigna automáticamente',
                default=True
            )
        }
    ),
    responses={
        201: openapi.Response(
            description="Badge creado exitosamente",
            schema=BadgeSerializer,
            examples={
                "application/json": {
                    "id": 1,
                    "title": "Lector Principiante",
                    "description": "Completa tu primer libro",
                    "points": 10,
                    "goal_points": 1,
                    "icon": "book",
                    "is_teacher_badge": False,
                    "show_progress": True
                }
            }
        ),
        400: "Datos inválidos - Revise los campos requeridos",
        401: "No autorizado - Token JWT inválido",
        403: "Prohibido - Solo administradores pueden crear badges"
    }
)
@api_view(['POST'])
@admin_required
def create_badge_admin(request):
    """
    Crear un nuevo badge (solo administradores).
    Endpoint: POST /api/Badges/admin/create/
    """
    try:
        print(f"Datos recibidos para crear badge: {request.data}")
        serializer = BadgeSerializer(data=request.data)
        
        if not serializer.is_valid():
            print(f"Errores de validación: {serializer.errors}")
            return Response({
                'error': 'Datos inválidos',
                'details': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
        
        serializer.save()
        print(f"Badge creado exitosamente: {serializer.data}")
        return Response(serializer.data, status=status.HTTP_201_CREATED)
        
    except Exception as e:
        print(f"Error creando badge: {e}")
        import traceback
        traceback.print_exc()
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@swagger_auto_schema(
    method='put',
    operation_summary="Actualizar badge existente",
    operation_description="""
    Actualiza los datos de un badge existente. Solo accesible por administradores.
    
    Puede actualizar cualquier campo del badge de forma parcial.
    """,
    tags=['Badges Admin'],
    manual_parameters=[
        openapi.Parameter(
            'badge_id',
            openapi.IN_PATH,
            description="ID del badge a actualizar",
            type=openapi.TYPE_INTEGER,
            required=True
        )
    ],
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'title': openapi.Schema(type=openapi.TYPE_STRING, description='Título del badge'),
            'description': openapi.Schema(type=openapi.TYPE_STRING, description='Descripción'),
            'points': openapi.Schema(type=openapi.TYPE_INTEGER, description='Puntos', minimum=0),
            'goal_points': openapi.Schema(type=openapi.TYPE_INTEGER, description='Libros requeridos', minimum=1),
            'icon': openapi.Schema(type=openapi.TYPE_STRING, description='Icono'),
            'is_teacher_badge': openapi.Schema(type=openapi.TYPE_BOOLEAN, description='Badge de profesor'),
            'show_progress': openapi.Schema(type=openapi.TYPE_BOOLEAN, description='Mostrar progreso')
        }
    ),
    responses={
        200: openapi.Response(
            description="Badge actualizado exitosamente",
            schema=BadgeSerializer
        ),
        400: "Datos inválidos",
        401: "No autorizado",
        403: "Prohibido - Solo administradores",
        404: "Badge no encontrado"
    }
)
@api_view(['PUT'])
@admin_required
def update_badge_admin(request, badge_id):
    """
    Actualizar un badge existente (solo administradores).
    Endpoint: PUT /api/Badges/admin/update/<badge_id>/
    """
    try:
        badge = get_object_or_404(Badge, id=badge_id)
        serializer = BadgeSerializer(badge, data=request.data, partial=True)
        
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
        
    except Exception as e:
        print(f"Error actualizando badge: {e}")
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@swagger_auto_schema(
    method='delete',
    operation_summary="Eliminar badge",
    operation_description="""
    Elimina un badge del sistema. Solo accesible por administradores.
    
    ATENCIÓN: Esta acción es permanente y eliminará también las asignaciones 
    de este badge a usuarios.
    """,
    tags=['Badges Admin'],
    manual_parameters=[
        openapi.Parameter(
            'badge_id',
            openapi.IN_PATH,
            description="ID del badge a eliminar",
            type=openapi.TYPE_INTEGER,
            required=True
        )
    ],
    responses={
        200: openapi.Response(
            description="Badge eliminado correctamente",
            examples={
                "application/json": {
                    "message": "Badge eliminado correctamente"
                }
            }
        ),
        401: "No autorizado",
        403: "Prohibido - Solo administradores",
        404: "Badge no encontrado"
    }
)
@api_view(['DELETE'])
@admin_required
def delete_badge_admin(request, badge_id):
    """
    Eliminar un badge (solo administradores).
    Endpoint: DELETE /api/Badges/admin/delete/<badge_id>/
    """
    try:
        badge = get_object_or_404(Badge, id=badge_id)
        badge.delete()
        
        return Response(
            {"message": "Badge eliminado correctamente"}, 
            status=status.HTTP_200_OK
        )
        
    except Exception as e:
        print(f"Error eliminando badge: {e}")
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@swagger_auto_schema(
    method='get',
    operation_summary="Listar todos los badges (Admin)",
    operation_description="""
    Obtiene la lista completa de badges del sistema con información detallada.
    Solo accesible por administradores.
    
    Incluye:
    - Datos básicos del badge
    - Cantidad de usuarios que lo tienen
    - Estadísticas de uso
    """,
    tags=['Badges Admin'],
    responses={
        200: openapi.Response(
            description="Lista de badges obtenida exitosamente",
            schema=openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    'count': openapi.Schema(type=openapi.TYPE_INTEGER, description='Total de badges'),
                    'badges': openapi.Schema(
                        type=openapi.TYPE_ARRAY,
                        items=openapi.Schema(
                            type=openapi.TYPE_OBJECT,
                            properties={
                                'id': openapi.Schema(type=openapi.TYPE_INTEGER),
                                'title': openapi.Schema(type=openapi.TYPE_STRING),
                                'description': openapi.Schema(type=openapi.TYPE_STRING),
                                'points': openapi.Schema(type=openapi.TYPE_INTEGER),
                                'goal_points': openapi.Schema(type=openapi.TYPE_INTEGER),
                                'users_count': openapi.Schema(type=openapi.TYPE_INTEGER, description='Usuarios con este badge')
                            }
                        )
                    )
                }
            ),
            examples={
                "application/json": {
                    "count": 15,
                    "badges": [
                        {
                            "id": 1,
                            "title": "Lector Principiante",
                            "description": "Completa tu primer libro",
                            "points": 10,
                            "goal_points": 1,
                            "is_teacher_badge": False,
                            "users_count": 45
                        }
                    ]
                }
            }
        ),
        401: "No autorizado",
        403: "Prohibido - Solo administradores"
    }
)
@api_view(['GET'])
@admin_required
def list_all_badges_admin(request):
    """
    Listar todos los badges con estadísticas (solo administradores).
    Endpoint: GET /api/Badges/admin/
    
    Parámetros query:
    - search: buscar por título o descripción
    - type: 'teacher' o 'student'
    """
    try:
        from django.db.models import Q
        
        badges = Badge.objects.all()
        
        # Filtros opcionales
        search = request.GET.get('search', '')
        badge_type = request.GET.get('type', '')
        
        if search:
            badges = badges.filter(
                Q(title__icontains=search) | Q(description__icontains=search)
            )
        
        if badge_type == 'teacher':
            badges = badges.filter(is_teacher_badge=True)
        elif badge_type == 'student':
            badges = badges.filter(is_teacher_badge=False)
        
        # Anotar con cantidad de usuarios que tienen cada badge
        badges = badges.annotate(
            users_count=Count('userbadge')
        )
        
        # Serializar
        badge_list = []
        for badge in badges:
            badge_list.append({
                'id': badge.pk,
                'title': badge.title,
                'description': badge.description,
                'points': badge.points,
                'icon': badge.icon,
                'is_teacher_badge': badge.is_teacher_badge,
                'show_progress': badge.show_progress,
                'goal_points': badge.goal_points,
                'users_count': getattr(badge, 'users_count', 0)
            })
        
        return Response({
            'badges': badge_list,
            'total': len(badge_list)
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        print(f"Error listando badges: {e}")
        import traceback
        traceback.print_exc()
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@swagger_auto_schema(
    method='get',
    operation_summary="Obtener detalle de un badge específico",
    operation_description="""
    Obtiene información detallada de un badge específico incluyendo estadísticas de uso.
    Solo accesible por administradores.
    """,
    tags=['Badges Admin'],
    manual_parameters=[
        openapi.Parameter(
            'badge_id',
            openapi.IN_PATH,
            description="ID del badge",
            type=openapi.TYPE_INTEGER,
            required=True
        )
    ],
    responses={
        200: openapi.Response(
            description="Detalle del badge",
            examples={
                "application/json": {
                    "id": 1,
                    "title": "Lector Principiante",
                    "description": "Completa tu primer libro",
                    "points": 10,
                    "icon": "book",
                    "is_teacher_badge": False,
                    "show_progress": True,
                    "goal_points": 1,
                    "users_count": 45
                }
            }
        ),
        401: "No autorizado",
        403: "Prohibido - Solo administradores",
        404: "Badge no encontrado"
    }
)
@api_view(['GET'])
@admin_required
def get_badge_detail_admin(request, badge_id):
    """
    Obtener detalle de un badge (solo administradores).
    Endpoint: GET /api/Badges/admin/detail/<badge_id>/
    """
    try:
        badge = get_object_or_404(Badge, id=badge_id)
        
        # Contar usuarios con este badge
        users_count = UserBadge.objects.filter(badge_id=badge_id).count()
        
        return Response({
            'id': badge.pk,
            'title': badge.title,
            'description': badge.description,
            'points': badge.points,
            'icon': badge.icon,
            'is_teacher_badge': badge.is_teacher_badge,
            'show_progress': badge.show_progress,
            'goal_points': badge.goal_points,
            'users_count': users_count
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        print(f"Error obteniendo detalle de badge: {e}")
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# ============================================
# ENDPOINTS DE ASIGNACIÓN AUTOMÁTICA
# ============================================

@swagger_auto_schema(
    method='post',
    operation_summary="Asignar badges por libros completados",
    operation_description="""
    Verifica los libros completados por un usuario y asigna automáticamente 
    los badges correspondientes según las metas alcanzadas.
    
    Este endpoint se llama automáticamente cuando un estudiante completa un libro.
    """,
    tags=['Badges - Asignación Automática'],
    manual_parameters=[
        openapi.Parameter(
            'user_id',
            openapi.IN_PATH,
            description="ID del usuario",
            type=openapi.TYPE_INTEGER,
            required=True
        )
    ],
    responses={
        200: openapi.Response(
            description="Badges verificados y asignados",
            examples={
                "application/json": {
                    "success": True,
                    "books_read": 5,
                    "newly_assigned": ["Lector Principiante", "Lector Intermedio"],
                    "badges": [
                        {
                            "id": 1,
                            "title": "Lector Principiante",
                            "achieved": True,
                            "progress": 1,
                            "goal_points": 1
                        }
                    ]
                }
            }
        ),
        401: "No autorizado"
    }
)
@api_view(['POST'])
def assign_badges_by_books(request, user_id):
    """
    Verifica y asigna badges a un usuario basándose en libros completados.
    Endpoint: POST /api/Badges/assign/<user_id>/
    
    Se llama automáticamente después de completar un libro.
    """
    try:
        # Validar token
        authorization_header = request.headers.get('Authorization')
        verify = verifyJwt.JWTValidator(authorization_header)
        es_valido = verify.validar_token()
        
        if not es_valido:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        # Verificar y asignar badges
        newly_assigned = check_and_assign_badges(user_id)
        
        # Obtener información completa de badges
        books_read = count_completed_books(user_id)
        all_badges_info = get_user_badges_with_progress(user_id)
        
        return Response({
            'success': True,
            'books_read': books_read,
            'newly_assigned': newly_assigned,
            'badges': all_badges_info['current_badges']
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        print(f"Error asignando badges: {e}")
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@swagger_auto_schema(
    method='get',
    operation_summary="Obtener progreso de badges del usuario",
    operation_description="""
    Obtiene información detallada del progreso de badges de un usuario específico.
    
    Incluye:
    - Badges ya obtenidos
    - Progreso hacia badges pendientes
    - Próximos badges a alcanzar
    - Total de libros leídos
    """,
    tags=['Badges - Progreso Usuario'],
    manual_parameters=[
        openapi.Parameter(
            'user_id',
            openapi.IN_PATH,
            description="ID del usuario",
            type=openapi.TYPE_INTEGER,
            required=True
        )
    ],
    responses={
        200: openapi.Response(
            description="Progreso de badges del usuario",
            examples={
                "application/json": {
                    "books_read": 3,
                    "current_badges": [
                        {
                            "id": 1,
                            "title": "Lector Principiante",
                            "description": "Completa tu primer libro",
                            "points": 10,
                            "achieved": True,
                            "progress": 1,
                            "goal_points": 1,
                            "percentage": 100
                        },
                        {
                            "id": 2,
                            "title": "Lector Intermedio",
                            "description": "Completa 5 libros",
                            "points": 25,
                            "achieved": False,
                            "progress": 3,
                            "goal_points": 5,
                            "percentage": 60
                        }
                    ],
                    "next_badges": [
                        {
                            "id": 3,
                            "title": "Maestro Lector",
                            "books_needed": 7
                        }
                    ]
                }
            }
        ),
        401: "No autorizado",
        404: "Usuario no encontrado"
    }
)
@api_view(['GET'])
def get_user_progress_badges(request, user_id):
    """
    Obtiene el progreso de badges de un usuario.
    Endpoint: GET /api/Badges/progress/<user_id>/
    
    Retorna badges obtenidos y próximos badges.
    """
    try:
        # Validar token
        authorization_header = request.headers.get('Authorization')
        verify = verifyJwt.JWTValidator(authorization_header)
        es_valido = verify.validar_token()
        
        if not es_valido:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        # Obtener información de progreso
        progress_info = get_user_badges_with_progress(user_id)
        
        return Response(progress_info, status=status.HTTP_200_OK)
        
    except Exception as e:
        print(f"Error obteniendo progreso: {e}")
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@swagger_auto_schema(
    method='post',
    operation_summary="Asignar badges a todos los usuarios (Mantenimiento)",
    operation_description="""
    Ejecuta el proceso de asignación automática de badges para TODOS los usuarios 
    del sistema basándose en sus libros completados.
    
    Solo accesible por administradores.
    
    ATENCIÓN: Este proceso puede tardar varios segundos dependiendo 
    de la cantidad de usuarios.
    
    Casos de uso:
    - Primera configuración del sistema de badges
    - Actualización masiva después de cambios en badges
    - Corrección de asignaciones
    """,
    tags=['Badges Admin'],
    responses={
        200: openapi.Response(
            description="Asignación masiva completada",
            examples={
                "application/json": {
                    "success": True,
                    "total_users": 150,
                    "total_badges_assigned": 450,
                    "message": "Badges asignados a todos los usuarios correctamente"
                }
            }
        ),
        401: "No autorizado",
        403: "Prohibido - Solo administradores"
    }
)
@api_view(['POST'])
@admin_required
def trigger_badge_assignment_all(request):
    """
    Asigna badges a todos los usuarios (solo administradores).
    Endpoint: POST /api/Badges/admin/assign-all/
    
    Útil para mantenimiento o asignación masiva inicial.
    """
    try:
        result = assign_badges_to_all_users()
        
        return Response(result, status=status.HTTP_200_OK)
        
    except Exception as e:
        print(f"Error en asignación masiva: {e}")
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)