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

@api_view(['GET'])
def bookSearchById(request, bookid):
    # Verificación del token
    try:
        authorization_header = request.headers.get('Authorization')
        verify = verifyJwt.JWTValidator(authorization_header)
        es_valido = verify.validar_token()
        if es_valido == False:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        # Usar JwtService para obtener id del usuario actual
        jwt_service = JwtService(authorization_header)
        user_id = jwt_service.get_user_id()

        book = Book.objects.get(bookid=bookid)
        serializer = BookSerializer(book)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Book.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except OperationalError:
        return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def new_book(request):
    #token verification
    try:
     authorization_header = request.headers.get('Authorization')
     verify = verifyJwt.JWTValidator(authorization_header)
     es_valido = verify.validar_token()
     if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
     jwt_service = JwtService(authorization_header)
     user_id = jwt_service.get_user_id()
     if not user_id:
         return Response({"error": "User not found in token"}, status=status.HTTP_401_UNAUTHORIZED)

     data = {
        'title': request.data.get('title'),
        'category': request.data.get('category'),
        'portrait': request.data.get('portrait'),
        'createdby': user_id,
        'createdat': datetime.datetime.now(),
        'lastupdateby': user_id,
        'lastupdateat': datetime.datetime.now(),
        'state' : request.data.get('state', 1), # Default state to 1 if not provided
        'sharedbook' : request.data.get('sharedbook'),
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

    #token verification
    try:
        authorization_header = request.headers.get('Authorization')
        verify = verifyJwt.JWTValidator(authorization_header)
        es_valido = verify.validar_token()
        if es_valido==False:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        # Usar JwtService para obtener id del usuario actual
        jwt_service = JwtService(authorization_header)
        user_id = jwt_service.get_user_id()
        
        if not user_id:
            return Response({"error": "User ID not found in token"}, status=status.HTTP_401_UNAUTHORIZED)

        book = Book.objects.get(title=title)
        serializer = BookSerializer(book)
        
        # Verificar si el libro fue creado por el usuario o si es compartido (sharedbook = 1) para mostrarlo
        # Comparar el userid del creador con el user_id del token
        if (book.createdby and book.createdby.userid == int(user_id)) or book.sharedbook == 1:
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)
    except Book.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except OperationalError:
         return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
   

@api_view(['PUT'])
def bookChange(request):

    #token verification
    try:
     authorization_header = request.headers.get('Authorization')
     verify = verifyJwt.JWTValidator(authorization_header)
     es_valido = verify.validar_token()
     if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    
     dataRequest = {
            'title': request.data.get('title'),
     }
     titleSe = dataRequest.get('title')
     book = Book.objects.get(title=titleSe)
    except Book.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except OperationalError:
         return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    try:
     data = {
        'title': request.data.get('new_title'),
        'portrait': request.data.get('portrait'),
        'category': request.data.get('category'),
        'createdby': request.data.get('createdby'),
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
    except OperationalError:
         return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@ api_view(['GET'])
def listed(request):

    #token verification
    try:
     authorization_header = request.headers.get('Authorization')
     verify = verifyJwt.JWTValidator(authorization_header)
     es_valido = verify.validar_token()
     if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
     book = Book.objects.all()
     serializer = BookSerializer(book, many=True)
     return Response(serializer.data)
    except OperationalError:
         return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
@ api_view(['GET'])
def listedDetails(request):

           #token verification
    try:
     authorization_header = request.headers.get('Authorization')
     verify = verifyJwt.JWTValidator(authorization_header)
     es_valido = verify.validar_token()
     if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

     # Utilizamos select_related para obtener la información relacionada en una sola consulta
     books = Book.objects.all()
     book_serializer = BookSerializer(books, many=True)
    except OperationalError:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
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
     verify = verifyJwt.JWTValidator(authorization_header)
     es_valido = verify.validar_token()
     if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
     book = Book.objects.filter(sharedbook=1)
     serializer = BookSerializer(book, many=True)
     return Response(serializer.data)
    except OperationalError:
         return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@ api_view(['GET'])
def listed_NotPublishedBooks(request):

    #token verification
    try:
     authorization_header = request.headers.get('Authorization')
     verify = verifyJwt.JWTValidator(authorization_header)
     es_valido = verify.validar_token()
     if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
     book = Book.objects.filter(sharedbook=2)
     serializer = BookSerializer(book, many=True)
     return Response(serializer.data)
    except OperationalError:
         return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@ api_view(['GET'])
def listed_PrivateBooks(request):

    #token verification
    try:
     authorization_header = request.headers.get('Authorization')
     verify = verifyJwt.JWTValidator(authorization_header)
     es_valido = verify.validar_token()
     if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

     # Usar JwtService para manejar el token
     jwt_service = JwtService(authorization_header)
     #Obtener el user_id del token
     user_id = jwt_service.get_user_id()
     # Filtrar por libros privados y creados por el usuario
     book = Book.objects.filter(sharedbook=0, createdby=user_id)   
     serializer = BookSerializer(book, many=True)
     return Response(serializer.data)
    except OperationalError:
         return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['PUT'])
def modifyStateToPrivate(request):

    #token verification
    try:
     authorization_header = request.headers.get('Authorization')
     verify = verifyJwt.JWTValidator(authorization_header)
     es_valido = verify.validar_token()
     if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
     dataRequest = {
            'title': request.data.get('title'),
     }
     titleSe = dataRequest.get('title')
     book = Book.objects.get(title=titleSe)
    except Book.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except OperationalError:
         return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
     
    try: 
     data = {
        'sharedbook': 0,
     }
     serializer = bookStateSerializer(book, data=data)
     if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except OperationalError:
         return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['PUT'])
def modifyStateToPublish(request):

    #token verification
    try:
     authorization_header = request.headers.get('Authorization')
     verify = verifyJwt.JWTValidator(authorization_header)
     es_valido = verify.validar_token()
     if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    
     dataRequest = {
            'title': request.data.get('title'),
     }
     titleSe = dataRequest.get('title')
     book = Book.objects.get(title=titleSe)
    except Book.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except OperationalError:
         return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
     
    try: 
     data = {
        'sharedbook': 1,
     }
     serializer = bookStateSerializer(book, data=data)
     if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except OperationalError:
         return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def get_all_book_relations(request, bookid):
     #token verification
    try:
     authorization_header = request.headers.get('Authorization')
     verify = verifyJwt.JWTValidator(authorization_header)
     es_valido = verify.validar_token()
     if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

     book = Book.objects.get(bookid=bookid)
    except Book.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except OperationalError:
         return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    book_serializer = BookSerializer(book)

     # Obtener los dilemas relacionados con el libro
    try:
        dilemmasperbook = DilemmaPerBook.objects.filter(bookid=bookid)
        dilemmasperbook_serializer = DilemmaPerBookSerializer(dilemmasperbook, many=True)
    except DilemmaPerBook.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    # Obtener las dimensiones de los dilemas
    try:
        dilemmas_ids = [dilemmasperbook['bookdilemmaid'] for dilemmasperbook in dilemmasperbook_serializer.data]
        dilemmas = BookDilemma.objects.filter(pk__in=dilemmas_ids)
        dilemmas_serializer = BookDilemmaSerializer(dilemmas, many=True)
    except BookDilemma.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    # Obtener las dimensiones de los dilemas
    try:
        dimension_ids = [dilemma['bookdimensionid'] for dilemma in dilemmas_serializer.data]
        dimensions = BookDimension.objects.filter(pk__in=dimension_ids)
        dimensions_serializer = BookDimensionSerializer(dimensions, many=True)
    except BookDimension.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    # Obtener las categorías de las dimensiones
    try:
        category_ids = [dimension['bookcategoryid'] for dimension in dimensions_serializer.data]
        categories = BookCategory.objects.filter(pk__in=category_ids)
        categories_serializer = BookCategorySerializer(categories, many=True)
    except BookCategory.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    try:
        pages = Pages.objects.filter(bookid=bookid, actived=1)
    except Pages.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except OperationalError:
        return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    pages_serializer = PageSerializer(pages, many=True)


    try:  
      pages_ids = [page['pageid'] for page in pages_serializer.data]
      widgetitem = WidgetItem.objects.filter(pageid__in=pages_ids)
    except WidgetItem.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except OperationalError:
         return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    widgets_serializer = WidgetItemSerializer(widgetitem, many=True)


    response_data = {
        'book_details':book_serializer.data,
        'book_context':{
          'dilemmas': dilemmas_serializer.data,
          'dimensions': dimensions_serializer.data,
          'categories': categories_serializer.data
        },
        'book_content': [
            {
                'page': page_serializer,
                'widgetitems': [widget for widget in widgets_serializer.data if widget['pageid'] == page_serializer['pageid']]
            }
            for page_serializer in pages_serializer.data
        ]
    }

    return Response(response_data,status=status.HTTP_200_OK)
  

@api_view(['GET'])
def search_by_title(request):
    #token verification
    try:
        authorization_header = request.headers.get('Authorization')
        verify = verifyJwt.JWTValidator(authorization_header)
        es_valido = verify.validar_token()
        if es_valido==False:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        title = request.data.get('title')

        book = Book.objects.filter(title__icontains=title)
        serializer = BookSerializer(book, many=True)
        return Response(serializer.data)
    except OperationalError:
            return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

