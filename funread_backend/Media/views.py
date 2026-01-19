import verifyJwt
import uuid
from django.shortcuts import render
from django.conf import settings
from django.db.models import Q
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from .serializers import MediaSeralizer
from .models import Media
from funread_backend.jwt_service import JwtService
from Users.models import User
from Userroles.models import Userroles
from Roles.models import Roles
from rest_framework import status
from Subtitled.views import save_subtitled
import os
import sys
sys.path.append('funread_backend')
from django.db import OperationalError

GALLERY_TYPE_NAMES = {
    1: 'CustomIMG',
    2: 'Background',
    3: 'Shapes',
    4: 'Characters',
    5: 'Objects',
    6: 'Others',
    7: 'BookCover',
    8: 'BadgeIcons',
}

@ api_view(['POST'])
def save_File(request):
    print("request.user:", request.user)
    print("is_authenticated:", getattr(request.user, 'is_authenticated', None))
    print("user type:", type(request.user))

    # token verification
    try:
        authorization_header = request.headers.get('Authorization')
        verify = verifyJwt.JWTValidator(authorization_header)
        es_valido = verify.validar_token()
        if es_valido == False:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
    except OperationalError:
         return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    # Extraer user_id del JWT y buscar el usuario
    user = None
    is_admin = False
    try:
        authorization_header = request.headers.get('Authorization')
        jwt_service = JwtService(authorization_header)
        user_id = jwt_service.get_user_id()
        print(f"DEBUG - User ID: {user_id}")
        if user_id:
            try:
                user = User.objects.get(userid=user_id)
                print(f"DEBUG - User found: {user.email}")
                # Verificar si el usuario es administrador
                user_role = Userroles.objects.filter(iduser=user).first()
                print(f"DEBUG - User role: {user_role}")
                if user_role:
                    print(f"DEBUG - Role name: {user_role.idrole.role}")
                    if user_role.idrole.role.lower() == 'administrativo':
                        is_admin = True
                        print(f"DEBUG - IS ADMIN: {is_admin}")
            except User.DoesNotExist:
                user = None
         
    except Exception as e:
        user = None
        print(f"DEBUG - Error: {e}")
        
    try:
        if 'file' not in request.data and 'file' not in request.FILES:
            raise Exception("upload file please")
        file_request = request.FILES.get('file')
        if file_request:
            name_file = file_request.name
            extension = name_file.split('.')[-1]
            file_type = get_file_type(extension)
            if (file_type == 0):
                return Response({'message':'Bad file extension: only png, jpg, jpeg, gif, bmp, webp, tiff, mp3, wav, ogg, flac, aac, midi, wma, cd, aif, aifc, aiff, pcm, m4a, mp4, avi, mkv, mov, wmv, flv'}, status=status.HTTP_400_BAD_REQUEST)
            gallery_type = request.data.get('galleryType')
            gallery_type_name = GALLERY_TYPE_NAMES.get(int(gallery_type), 'Others') if gallery_type else 'Others'
            temporary_name = str(uuid.uuid4())
            
            print(f"DEBUG - Before saving: is_admin={is_admin}, user={user}, gallery_type={gallery_type}")
            
            data = {
                'name': temporary_name,
                'extension': extension,
                'file': file_request,
                'type': file_type,
                'galleryType': gallery_type,
                'user': user.pk if user else None,
                'isfunreadMedia': is_admin,  # True si es admin, False si no
            }
            
            print(f"DEBUG - Data to save: {data}")
            
            serializer = MediaSeralizer(data=data)
            if serializer.is_valid():
                file_instance = serializer.save(user=user)
                new_id = file_instance.id
                new_name = str(new_id)
                extension = file_instance.extension
                user_id_folder = str(user.pk) if user else 'global'
                new_filename = f'{new_name}.{extension}'
                dest_folder = os.path.join(settings.MEDIA_ROOT, 'media', gallery_type_name, user_id_folder)
                os.makedirs(dest_folder, exist_ok=True)
                new_path = os.path.join(dest_folder, new_filename)
                original_path = file_instance.file.path
                if os.path.exists(new_path):
                    os.remove(new_path)
                os.rename(original_path, new_path)
                file_instance.name = new_name
                file_instance.file.name = os.path.join('media', gallery_type_name, user_id_folder, new_filename)
                file_instance.save()
                serializer_response = MediaSeralizer(file_instance)
                return Response(serializer_response.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except OperationalError:
        return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@ api_view(['POST'])
def upload(request):

    # token verification
   try: 
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido == False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    if 'name' not in request.data:
        raise Exception("invalid data")
    if request.method == 'POST':
        try:
            filedata = Media.objects.get(id=request.data.get('name'))
        except Media.DoesNotExist:
            message_error1 = {'Error': 'file not found'}
            return JsonResponse(message_error1, status=status.HTTP_404_NOT_FOUND)
        ruta_completa = os.path.join(settings.MEDIA_ROOT, str(filedata.file))
        try:
            with open(ruta_completa, 'rb') as filen:
                mensaje = {'file_route': '/api/media/'+str(filedata.file)}
                return JsonResponse(mensaje)
        except FileNotFoundError:
            message_error2 = {'Error': 'invalid route'}
            return JsonResponse(message_error2, status=status.HTTP_404_NOT_FOUND)
   except OperationalError:
         return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)    


@ api_view(['GET'])
def listed(request):

    # token verification
   try: 
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido == False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    # Extraer user_id del JWT
    authorization_header = request.headers.get('Authorization')
    jwt_service = JwtService(authorization_header)
    user_id = jwt_service.get_user_id()
    if user_id:
        user_images = Media.objects.filter(user_id=user_id)
    else:
        user_images = Media.objects.none()
    serializer = MediaSeralizer(user_images, many=True)
    return Response(serializer.data)
   except OperationalError:
    return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@ api_view(['GET'])
def listed_Images(request):

    # token verification
   try: 
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido == False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    user = Media.objects.filter(type=1)
    serializer = MediaSeralizer(user, many=True)
    return Response(serializer.data)
   except OperationalError:
    return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@ api_view(['GET'])
def listed_Audios(request):

    # token verification
   try: 
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido == False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    user = Media.objects.filter(type=2)
    serializer = MediaSeralizer(user, many=True)
    return Response(serializer.data)
   except OperationalError:
    return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@ api_view(['GET'])
def listed_Videos(request):

    # token verification
   try: 
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido == False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    user = Media.objects.filter(type=3)
    serializer = MediaSeralizer(user, many=True)
    return Response(serializer.data)
   except OperationalError:
    return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['PUT'])
def change_file(request):

    #token verification
   try: 
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    if 'file' not in request.data:
        raise Exception("upload file please")
    file_request = request.FILES.get('file')
    if 'idfile' not in request.data:
        raise Exception("please enter the id")
   except OperationalError:
    return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 


   try:
        old_file = Media.objects.get(id=request.data.get('idfile'))
   except Media.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
   except OperationalError:
     return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
 
   try: 
    if file_request:
        name_file = file_request.name
        extension = name_file.split('.')[-1]
        file_request.name = str(old_file.name)+'.'+extension
        type = get_file_type(extension)
        if (type == 0):
            return Response({'message':'Bad file extension: only png, jpg, jpeg, gif, bmp, webp, tiff, mp3, wav, ogg, flac, aac, midi, wma, cd, aif, aifc, aiff, pcm, m4a, opus'}, status=status.HTTP_400_BAD_REQUEST)
        data = {
            'name': old_file.name,
            'extension': extension,
            'file': file_request,
            'type': type,
            'isfunreadMedia': request.data.get('isfunreadMedia', old_file.isfunreadMedia)
        }
    serializer = MediaSeralizer(old_file, data=data)
    if serializer.is_valid():
        ruta_oldfile = os.path.join(settings.MEDIA_ROOT, str(old_file.file.name))
        print(ruta_oldfile)
        os.remove(ruta_oldfile)
        serializer.save()
        return Response("file updated successfully", status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   except OperationalError:
     return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


def get_file_type(extension):
   try: 
    image_extensions = {'png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp', 'tiff'}
    audio_extensions = {'mp3', 'wav', 'ogg', 'flac', 'aac','midi','wma','cd','aif','aifc','aiff','pcm','m4a','opus'}
    video_extensions = {'mp4', 'avi', 'mkv', 'mov', 'wmv', 'flv'}

    lowercase_extension = extension.lower()  # Convierte la extensión a minúsculas para ser insensible a mayúsculas/minúsculas.

    if lowercase_extension in image_extensions:
        return 1  # Es una imagen
    elif lowercase_extension in audio_extensions:
        return 2  # Es audio
    elif lowercase_extension in video_extensions:
        return 3  # Es video
    else:
        return 0  #
   except OperationalError:
     return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 


# ============================================
# ENDPOINTS DE ADMINISTRADOR PARA MEDIA
# ============================================

@api_view(['GET'])
def get_media_by_type(request, gallery_type):
    """
    Obtener todas las imágenes de un tipo de galería específico
    Endpoint: GET /api/Media/by-type/<gallery_type>/
    """
    try:
        # Token verification
        authorization_header = request.headers.get('Authorization')
        verify = verifyJwt.JWTValidator(authorization_header)
        es_valido = verify.validar_token()
        if not es_valido:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        # Obtener user_id del JWT
        jwt_service = JwtService(authorization_header)
        user_id = jwt_service.get_user_id()

        # Obtener imágenes del galleryType:
        # - Imágenes públicas (isfunreadMedia=True) subidas por admins
        # - O imágenes del usuario actual
        medias = Media.objects.filter(
            galleryType=gallery_type
        ).filter(
            Q(isfunreadMedia=True) | Q(user_id=user_id)
        ).order_by('-id')
        
        # Serializar y retornar
        media_list = []
        for media in medias:
            # Intentar extraer el nombre original del archivo
            original_name = media.name
            if media.file:
                # Si tiene extensión, remover el ID y dejar solo el nombre
                file_name = os.path.basename(str(media.file))
                # Quitar la extensión para obtener solo el nombre
                name_without_ext = os.path.splitext(file_name)[0]
                # Si el nombre es solo un número (ID), usar un nombre genérico
                if name_without_ext.isdigit():
                    gallery_name = GALLERY_TYPE_NAMES.get(media.galleryType, 'Image')
                    original_name = f"{gallery_name} {name_without_ext}"
                else:
                    original_name = file_name
            
            # Obtener información del usuario que subió la imagen
            uploaded_by = None
            if media.user:
                try:
                    user_info = User.objects.get(userid=media.user.userid)
                    uploaded_by = {
                        'id': user_info.userid,
                        'name': user_info.name or user_info.username or user_info.email,
                        'email': user_info.email
                    }
                except User.DoesNotExist:
                    uploaded_by = None
            
            media_list.append({
                'id': media.id,
                'name': original_name,
                'file': f'/api/media/{media.file}' if media.file else None,
                'url': f'/api/media/{media.file}' if media.file else None,
                'type': media.type,
                'galleryType': media.galleryType,
                'extension': media.extension,
                'uploadedBy': uploaded_by,
                'isfunreadMedia': media.isfunreadMedia,
            })
        
        return Response(media_list, status=status.HTTP_200_OK)
        
    except Exception as e:
        print(f"Error getting media by type: {e}")
        return Response(
            {"error": str(e)}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['DELETE'])
def delete_media(request, media_id):
    """
    Eliminar una imagen del sistema
    Endpoint: DELETE /api/Media/delete/<media_id>/
    """
    try:
        # Token verification
        authorization_header = request.headers.get('Authorization')
        verify = verifyJwt.JWTValidator(authorization_header)
        es_valido = verify.validar_token()
        if not es_valido:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        # Buscar el media
        try:
            media = Media.objects.get(id=media_id)
        except Media.DoesNotExist:
            return Response(
                {"error": "Media not found"}, 
                status=status.HTTP_404_NOT_FOUND
            )

        # Eliminar el archivo físico si existe
        if media.file:
            file_path = os.path.join(settings.MEDIA_ROOT, str(media.file))
            if os.path.exists(file_path):
                os.remove(file_path)

        # Eliminar el registro de la base de datos
        media.delete()
        
        return Response(
            {"message": "Media deleted successfully"}, 
            status=status.HTTP_200_OK
        )
        
    except Exception as e:
        print(f"Error deleting media: {e}")
        return Response(
            {"error": str(e)}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['GET'])
def get_all_media(request):
    """
    Obtener todas las imágenes del sistema (admin)
    Endpoint: GET /api/Media/all/
    """
    try:
        # Token verification
        authorization_header = request.headers.get('Authorization')
        verify = verifyJwt.JWTValidator(authorization_header)
        es_valido = verify.validar_token()
        if not es_valido:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        # Obtener todas las medias
        medias = Media.objects.all().order_by('-id')
        
        # Serializar y retornar
        media_list = []
        for media in medias:
            media_list.append({
                'id': media.id,
                'name': media.name,
                'file': f'/api/media/{media.file}' if media.file else None,
                'url': f'/api/media/{media.file}' if media.file else None,
                'type': media.type,
                'galleryType': media.galleryType,
                'extension': media.extension,
                'galleryTypeName': GALLERY_TYPE_NAMES.get(media.galleryType, 'Unknown'),
            })
        
        return Response({
            'count': len(media_list),
            'media': media_list
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        print(f"Error getting all media: {e}")
        return Response(
            {"error": str(e)}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
 



