import datetime
import json
from sre_parse import State
from turtle import title
from wsgiref import headers
from .models import Pages
from .serializers import PageSerializer, PageStatusSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import hashlib
from django.http import JsonResponse
import sys
sys.path.append('funread_backend')
import verifyJwt
from django.db import OperationalError

@api_view(['POST'])
def new_page(request):

    #token verification
   try: 
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    print(request.data)
    data = {
        'bookid': request.data.get('bookid'),
        'elementorder': request.data.get('elementorder'),
        'type': request.data.get('type'),
        'template': request.data.get('template'),
        'gridDirection': request.data.get('gridDirection'),
        'gridNumRows': request.data.get('gridNumRows'),
        'actived' : 1
    }
    serializer = PageSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   except OperationalError:
         return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def pageSearch(request, pageid):

    #token verification
    try: 
     authorization_header = request.headers.get('Authorization')
     verify = verifyJwt.JWTValidator(authorization_header)
     es_valido = verify.validar_token()
     if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    except OperationalError:
         return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    try:
        page = Pages.objects.get(pageid=pageid)
        print(page)


    except Pages.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except OperationalError:
         return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    serializer = PageSerializer(page)


    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['PUT'])
def pageChange(request):

    #token verification
    try:
     authorization_header = request.headers.get('Authorization')
     verify = verifyJwt.JWTValidator(authorization_header)
     es_valido = verify.validar_token()
     if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    except OperationalError:
         return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    try:
     dataRequest = {
            'pageid': request.data.get('pageid'),
     }
     pageidSe = dataRequest.get('pageid')
     page = Pages.objects.get(pageid=pageidSe)
    except Pages.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except OperationalError:
         return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    try:
      data = {
        'bookid': request.data.get('bookid'),
        'elementorder': request.data.get('elementorder'),
        'type': request.data.get('type'),
        'template': request.data.get('template'),
        'gridDirection': request.data.get('gridDirection'),
        'gridNumRows': request.data.get('gridNumRows'),
        'actived' : 1
    }
      serializer = PageSerializer(page, data=data)
      if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except OperationalError:
         return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@ api_view(['GET'])
def listed (request):

    #token verification
    try:
     authorization_header = request.headers.get('Authorization')
     verify = verifyJwt.JWTValidator(authorization_header)
     es_valido = verify.validar_token()
     if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
     page = Pages.objects.filter(actived=1)
     serializer = PageSerializer(page, many=True)
     return Response(serializer.data)
    except OperationalError:
         return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['PUT'])
def delete_page(request):
    try:
        authorization_header = request.headers.get('Authorization')
        verify = verifyJwt.JWTValidator(authorization_header)
        es_valido = verify.validar_token()
        if es_valido==False:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        page_id = request.data.get('pageid')
        try:
            page = Pages.objects.get(pageid=page_id)
        except Pages.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        except OperationalError:
            return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        data = {'actived': 0}
        serializer = PageStatusSerializer(page, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)