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
def search_category(request, bookdilemmaid):
    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    return 'a'

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

    return 'a'

@api_view(['PUT'])
def change_category(request):
    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    return 'a'

#  Metodos de Dimension ------------------------------------------------------------------------------------
@api_view(['GET'])
def search_dimesion(request, bookdimensionid):
    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    return 'a'

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

    return 'a'

@api_view(['PUT'])
def change_dimesion(request):
    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    return 'a'

#  Metodos de Dilemma ------------------------------------------------------------------------------------
@api_view(['GET'])
def search_dilemma(request,bookdilemmaid):
    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    return 'a'

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

    return 'a'

@api_view(['PUT'])
def change_dilemma(request):
    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    return 'a'

#  Metodos de DilemmaPerBook ------------------------------------------------------------------------------------
@api_view(['GET'])
def search_dilemmaperbook(request,dilemmaperbookid):
    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    return 'a'

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

    return 'a'

@api_view(['PUT'])
def change_dilemmaperbook(request):
    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    return 'a'

#  Metodos extras ------------------------------------------------------------------------------------
@api_view(['GET'])
def get_dilemmas_per_book(request,getdilemmasperbook):
    return 'a'

@api_view(['GET'])
def get_category_per_book(request,getcategoryperbook):
    return 'a'
