import datetime
import json
from sre_parse import State
from turtle import title
from wsgiref import headers
from .models import BookCategory,BookDimension,BookDilemma,DilemmaPerBook 
from .serializers import BookCategorySerializer,BookDimensionSerializer,BookDilemmaSerializer,DilemmaPerBookSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import hashlib
import sys
sys.path.append('funread_backend')
import verifyJwt

# Create your views here.
# @api_view(['GET'])
# def bookSearch(request, title):

#     #token verification
#     authorization_header = request.headers.get('Authorization')
#     verify = verifyJwt.JWTValidator(authorization_header)
#     es_valido = verify.validar_token()
#     if es_valido==False:
#         return Response(status=status.HTTP_401_UNAUTHORIZED)
    
#     try:
#         print(title)
#         book = Book.objects.get(title=title)
#     except Book.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)
#     serializer = BookSerializer(book)
#     return Response(serializer.data, status=status.HTTP_200_OK)


#  Metodos de Category ------------------------------------------------------------------------------------
@api_view(['GET'])
def search_category(request, bookcategoryid):
    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    try:
        bookcategory = BookCategory.objects.get(bookcategoryid=bookcategoryid)
    except BookCategory.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = BookCategorySerializer(bookcategory)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def list_category(request):
    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    bookcategory = BookCategory.objects.all()
    serializer = BookCategorySerializer(bookcategory, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def new_category(request):
    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    data = {
        'name': request.data.get('name'),
        'description': request.data.get('description')
    }
    serializer = BookCategorySerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def change_category(request):
    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    try:
        bookcategoryid = request.data.get('bookcategoryid')
        bookcategory = BookCategory.objects.get(bookcategoryid=bookcategoryid)
    except BookCategory.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    data = {
        'name': request.data.get('name'),
        'description': request.data.get('description')
    }
    serializer = BookCategorySerializer(bookcategory, data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#  Metodos de Dimension ------------------------------------------------------------------------------------
@api_view(['GET'])
def search_dimesion(request, bookcategoryid):
    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    try:
        bookdimension = BookDimension.objects.filter(bookcategoryid=bookcategoryid)
    except BookDimension.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = BookDimensionSerializer(bookdimension, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def list_dimesion(request):
    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    bookdimension = BookDimension.objects.all()
    serializer = BookDimensionSerializer(bookdimension, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def new_dimesion(request):
    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    data = {
        'name': request.data.get('name'),
        'description': request.data.get('description'),
        'bookcategoryid': request.data.get('bookcategoryid')
    }
    serializer = BookDimensionSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def change_dimesion(request):
    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    try:
        bookdimensionid = request.data.get('bookdimensionid')
        bookdimension = BookDimension.objects.get(bookdimensionid=bookdimensionid)
    except BookCategory.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    data = {
        'name': request.data.get('name'),
        'description': request.data.get('description'),
        'bookcategoryid': request.data.get('bookcategoryid')
    }
    serializer = BookDimensionSerializer(bookdimension, data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#  Metodos de Dilemma ------------------------------------------------------------------------------------
@api_view(['GET'])
def search_dilemma(request,bookdimensionid):
    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    try:
        bookdilemma = BookDilemma.objects.filter(bookdimensionid=bookdimensionid)
    except BookDilemma.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = BookDilemmaSerializer(bookdilemma, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def list_dilemma(request):
    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    bookdilemma = BookDilemma.objects.all()
    serializer = BookDilemmaSerializer(bookdilemma, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def new_dilemma(request):
    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    data = {
        'dilemma': request.data.get('dilemma'),
        'description': request.data.get('description'),
        'bookdimensionid': request.data.get('bookdimensionid')
    }
    serializer = BookDilemmaSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def change_dilemma(request):
    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    try:
        bookdilemmaid = request.data.get('bookdilemmaid')
        bookdilemma = BookDilemma.objects.get(bookdilemmaid=bookdilemmaid)
    except BookDilemma.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    data = {
        'dilemma': request.data.get('dilemma'),
        'description': request.data.get('description'),
        'bookdimensionid': request.data.get('bookdimensionid')
    }
    serializer = BookDilemmaSerializer(bookdilemma, data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#  Metodos de DilemmaPerBook ------------------------------------------------------------------------------------
@api_view(['GET'])
def search_dilemmaperbook(request,bookid):
    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    try:
        dilemmasperbook = DilemmaPerBook.objects.filter(bookid=bookid)
    except DilemmaPerBook.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = DilemmaPerBookSerializer(dilemmasperbook, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def list_dilemmaperbook(request):
    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    dilemmaperbook = DilemmaPerBook.objects.all()
    serializer = DilemmaPerBookSerializer(dilemmaperbook, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def new_dilemmaperbook(request):
    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    data = {
        'bookdilemmaid': request.data.get('bookdilemmaid'),
        'bookid': request.data.get('bookid')
    }
    serializer = DilemmaPerBookSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def change_dilemmaperbook(request):
    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    try:
        dilemmaperbookid = request.data.get('dilemmaperbookid')
        dilemmaperbook = DilemmaPerBook.objects.get(dilemmaperbookid=dilemmaperbookid)
    except DilemmaPerBook.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    data = {
        'bookdilemmaid': request.data.get('bookdilemmaid'),
        'bookid': request.data.get('bookid')
    }
    serializer = DilemmaPerBookSerializer(dilemmaperbook, data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#  Metodos extras -----------------------------------------------------------------------------------
@api_view(['GET'])
def get_category_per_book(request,bookid):
    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
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

    response_data = {
        'bookid': bookid,
        'dilemmas': dilemmas_serializer.data,
        'dimensions': dimensions_serializer.data,
        'categories': categories_serializer.data
    }

    return Response(response_data,status=status.HTTP_200_OK)

