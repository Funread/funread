import datetime
import json
from sre_parse import State
from turtle import title
from wsgiref import headers

from BooksDilemma.models import BookCategory, BookDilemma, BookDimension, DilemmaPerBook
from BooksDilemma.serializers import BookCategorySerializer, BookDilemmaSerializer, BookDimensionSerializer, DilemmaPerBookSerializer
from Pages.models import Pages
from Pages.serializers import PageSerializer
from Widget.models import WidgetItem
from Widget.serializers import WidgetItemSerializer
from .models import Book
from BooksDilemma.models import BookCategory, BookDilemma, BookDimension, DilemmaPerBook
from .serializers import BookSerializer, BookUpdatedBySerializer, bookStateSerializer
from BooksDilemma.serializers import BookCategorySerializer, BookDimensionSerializer, BookDilemmaSerializer, DilemmaPerBookSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import hashlib
from django.db.models import Prefetch
import sys
sys.path.append('funread_backend')
import verifyJwt
from django.db import OperationalError
from funread_backend.jwt_service import JwtService  # Importa la nueva clase JwtService


@api_view(['POST'])
def new_book(request):
    # Verificación del token
    try:
        authorization_header = request.headers.get('Authorization')
        
        # Usar JwtService para manejar el token
        jwt_service = JwtService(authorization_header)
        
        # Obtener el user_id del token
        user_id = jwt_service.get_user_id()

        # Si el token no es válido, responde con un error
        if user_id is None:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        # Resto del código para crear el libro
        data = {
            'title': request.data.get('title'),
            'category': request.data.get('category'),
            'portrait': request.data.get('portrait'),
            'createdby': user_id,  # Usar el user_id obtenido del token
            'createdat': datetime.datetime.now(),
            'updatedby': request.data.get('updatedby'),
            'lastupdateat': datetime.datetime.now(),
            'state': request.data.get('state'),
            'sharedbook': request.data.get('sharedbook'),
            'lastupdateby': request.data.get('lastupdateby'),
            'description': request.data.get('description')
        }
        serializer = BookSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    except OperationalError:
        return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def bookSearch(request, title):
    # Verificación del token
    try:
        authorization_header = request.headers.get('Authorization')
        # Usar JwtService para manejar el token
        jwt_service = JwtService(authorization_header)
        
        # Obtener el user_id del token
        user_id = jwt_service.get_user_id()

        # Si el token no es válido, responde con un error
        if user_id is None:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        # Buscar el libro por título y creado por el usuario
        try:
            book = Book.objects.get(title=title, createdby=user_id)
        except Book.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        except OperationalError:
            return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        serializer = BookSerializer(book)
        return Response(serializer.data, status=status.HTTP_200_OK)
   

@api_view(['PUT'])
def bookChange(request):

    # Verificación del token
    try:
        authorization_header = request.headers.get('Authorization')

        # Usar JwtService para manejar el token
        jwt_service = JwtService(authorization_header)

        # Obtener el user_id del token
        user_id = jwt_service.get_user_id()

        # Si el token no es válido, responde con un error
        if user_id is None:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        # Buscar el libro por título y creado por el usuario
        titleSe = request.data.get('title')
        book = Book.objects.get(title=titleSe, createdby=user_id)

        # Actualizar los datos del libro
        data = {
            'title': request.data.get('new_title'),
            'portrait': request.data.get('portrait'),
            'category': request.data.get('category'),
            'createdby': user_id,
            'updatedby': request.data.get('updatedby'),
            'lastupdateat': datetime.datetime.now(),
            'state': request.data.get('state'),
            'description': request.data.get('description')
        }
        serializer = BookSerializer(book, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except Book.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except OperationalError:
        return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@ api_view(['GET'])
def listed(request):

    #token verification
    try:
        authorization_header = request.headers.get('Authorization')
        
        jwt_service = JwtService(authorization_header)
        user_id = jwt_service.get_user_id()
        if user_id is None:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        # Filtra los libros por el usuario
        book = Book.objects.filter(createdby=user_id)
        serializer = BookSerializer(book, many=True)
        return Response(serializer.data)
    except OperationalError:
        return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
         
@ api_view(['GET'])
def listedDetails(request):

           #token verification
    try:
        authorization_header = request.headers.get('Authorization')
        
        jwt_service = JwtService(authorization_header)
        user_id = jwt_service.get_user_id()
        if user_id is None:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        # Filtra los libros por el usuario
        books = Book.objects.filter(createdby=user_id)
        book_serializer = BookSerializer(books, many=True)
    except OperationalError:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    response_data = []

    for book in book_serializer.data:
        dilemmasperbook = DilemmaPerBook.objects.filter(bookid=book['bookid'])
        dilemmasperbook_serializer = DilemmaPerBookSerializer(dilemmasperbook, many=True)

        dilemmas_ids = [dilemmasperbook['bookdilemmaid'] for dilemmasperbook in dilemmasperbook_serializer.data]
        dilemmas = BookDilemma.objects.filter(pk__in=dilemmas_ids)
        dilemmas_serializer = BookDilemmaSerializer(dilemmas, many=True)

        dimension_ids = [dilemma['bookdimensionid'] for dilemma in dilemmas_serializer.data]
        dimensions = BookDimension.objects.filter(pk__in=dimension_ids)
        dimensions_serializer = BookDimensionSerializer(dimensions, many=True)

        category_ids = [dimension['bookcategoryid'] for dimension in dimensions_serializer.data]
        categories = BookCategory.objects.filter(pk__in=category_ids)
        categories_serializer = BookCategorySerializer(categories, many=True)

        book_data = {
            'book_details': book,
            'book_context': {
                'dilemmas': dilemmas_serializer.data,
                'dimensions': dimensions_serializer.data,
                'categories': categories_serializer.data
            }
        }

        response_data.append(book_data)

    return Response(response_data, status=status.HTTP_200_OK)


@ api_view(['GET'])
def listed_PublishedBooks(request):

    #token verification
    try:
        authorization_header = request.headers.get('Authorization')
        
        jwt_service = JwtService(authorization_header)
        user_id = jwt_service.get_user_id()
        if user_id is None:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        # Filtra los libros publicados por el usuario
        book = Book.objects.filter(sharedbook=1, createdby=user_id)
        serializer = BookSerializer(book, many=True)
        return Response(serializer.data)
    except OperationalError:
        return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@ api_view(['GET'])
def listed_NotPublishedBooks(request):

    #token verification
    try:
        authorization_header = request.headers.get('Authorization')
        
        jwt_service = JwtService(authorization_header)
        user_id = jwt_service.get_user_id()
        if user_id is None:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        # Filtra los libros no publicados por el usuario
        book = Book.objects.filter(sharedbook=2, createdby=user_id)
        serializer = BookSerializer(book, many=True)
        return Response(serializer.data)
    except OperationalError:
        return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
         

@api_view(['GET'])
def listed_PrivateBooks(request):
    # Verificación del token
    try:
        # Obtener el token del encabezado de autorización
        authorization_header = request.headers.get('Authorization')
        
        # Usar JwtService para manejar el token
        jwt_service = JwtService(authorization_header)
        
        # Obtener el user_id del token
        user_id = jwt_service.get_user_id()

        # Si el token no es válido, responde con un error
        if user_id is None:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        # Filtrar los libros privados por el 'user_id' del usuario que hace la solicitud
        books = Book.objects.filter(sharedbook=0, createdby=user_id)
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data)
    
    except OperationalError:
        return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['PUT'])
def modifyStateToPrivate(request):
    # Verificación del token
    try:
        authorization_header = request.headers.get('Authorization')
        
        # Usar JwtService para manejar el token
        jwt_service = JwtService(authorization_header)
        
        # Obtener el user_id del token
        user_id = jwt_service.get_user_id()

        # Si el token no es válido, responde con un error
        if user_id is None:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        # Buscar el libro por título y creado por el usuario
        titleSe = request.data.get('title')
        try:
            book = Book.objects.get(title=titleSe, createdby=user_id)
        except Book.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        except OperationalError:
            return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        # Cambiar el estado del libro a privado
        try:
            data = {'sharedbook': 0}
            serializer = bookStateSerializer(book, data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except OperationalError:
            return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['PUT'])
def modifyStateToPublish(request):
    # Verificación del token
    try:
        authorization_header = request.headers.get('Authorization')
        
        # Usar JwtService para manejar el token
        jwt_service = JwtService(authorization_header)
        
        # Obtener el user_id del token
        user_id = jwt_service.get_user_id()

        # Si el token no es válido, responde con un error
        if user_id is None:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        # Buscar el libro por título y creado por el usuario
        titleSe = request.data.get('title')
        try:
            book = Book.objects.get(title=titleSe, createdby=user_id)
        except Book.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        except OperationalError:
            return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        # Cambiar el estado del libro a publicado
        try:
            data = {'sharedbook': 1}
            serializer = bookStateSerializer(book, data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except OperationalError:
            return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def get_all_book_relations(request, bookid):
    # Verificación del token
    try:
        authorization_header = request.headers.get('Authorization')
        # Usar JwtService para manejar el token
        jwt_service = JwtService(authorization_header)
        
        # Obtener el user_id del token
        user_id = jwt_service.get_user_id()

        # Si el token no es válido, responde con un error
        if user_id is None:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        # Buscar el libro por ID y creado por el usuario
        try:
            book = Book.objects.get(bookid=bookid, createdby=user_id)
        except Book.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        except OperationalError:
            return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        # (Resto del código que obtiene las relaciones del libro...)
  

@api_view(['GET'])
def search_by_title(request):
    #token verification
    try:
        authorization_header = request.headers.get('Authorization')
        
        jwt_service = JwtService(authorization_header)
        user_id = jwt_service.get_user_id()
        if user_id is None:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        # Filtra los libros por título y creados por el usuario
        title = request.query_params.get('title')
        book = Book.objects.filter(title__icontains=title, createdby=user_id)
        serializer = BookSerializer(book, many=True)
        return Response(serializer.data)
    except OperationalError:
        return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

