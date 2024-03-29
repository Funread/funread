import datetime
import json
from sre_parse import State
from turtle import title
from wsgiref import headers
from .models import Widget,WidgetItem
from .serializers import WidgetSerializer,WidgetItemSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import hashlib
import sys
sys.path.append('funread_backend')
import verifyJwt
from django.db import OperationalError

@api_view(['POST'])
def new_widget(request):

    #token verification
    try:
     authorization_header = request.headers.get('Authorization')
     verify = verifyJwt.JWTValidator(authorization_header)
     es_valido = verify.validar_token()
     if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
     print(request.data)
     data = {
        'type': request.data.get('type'),
        'name': request.data.get('name')
     }
     serializer = WidgetSerializer(data=data)
     if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except OperationalError:
         return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
     
     
@api_view(['GET'])
def widgetSearch(request, widgetid):

    #token verification
    try:
     authorization_header = request.headers.get('Authorization')
     verify = verifyJwt.JWTValidator(authorization_header)
     es_valido = verify.validar_token()
     if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    
     widget = Widget.objects.get(widgetid=widgetid)
     print(widget)
    except Widget.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except OperationalError:
         return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    serializer = WidgetSerializer(widget)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['PUT'])
def widgetChange(request):

    #token verification
    try:
     authorization_header = request.headers.get('Authorization')
     verify = verifyJwt.JWTValidator(authorization_header)
     es_valido = verify.validar_token()
     if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    
     dataRequest = {
            'widgetid': request.data.get('widgetid'),
     }
     widgetidSe = dataRequest.get('widgetid')
     widget = Widget.objects.get(widgetid=widgetidSe)
    except Widget.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except OperationalError:
         return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    try:
     data = {
        'type': request.data.get('type'),
        'name': request.data.get('name')
     }
     serializer = WidgetSerializer(widget, data=data)
     if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except OperationalError:
         return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@ api_view(['GET'])
def listedWidget(request):

    #token verification
    try:
     authorization_header = request.headers.get('Authorization')
     verify = verifyJwt.JWTValidator(authorization_header)
     es_valido = verify.validar_token()
     if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
     widget = Widget.objects.all()
     serializer = WidgetSerializer(widget, many=True)
     return Response(serializer.data)
    except OperationalError:
         return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def new_widgetItem(request):

    #token verification
    try:
     authorization_header = request.headers.get('Authorization')
     verify = verifyJwt.JWTValidator(authorization_header)
     es_valido = verify.validar_token()
     if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
     print(request.data)
     data = {
        'pageid': request.data.get('pageid'),
        'widgetid': request.data.get('widgetid'),
        'type': request.data.get('type'),
        'value': request.data.get('value'),
        'elementorder': request.data.get('elementorder')
     }
     serializer = WidgetItemSerializer(data=data)
     if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except OperationalError:
         return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
     
     
@api_view(['GET'])
def widgetItemSearch(request, widgetitemid):

    #token verification
    
    try:
     authorization_header = request.headers.get('Authorization')
     verify = verifyJwt.JWTValidator(authorization_header)
     es_valido = verify.validar_token()
     if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    
     widgetitem = WidgetItem.objects.get(widgetitemid=widgetitemid)
     print(widgetitem)
    except WidgetItem.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except OperationalError:
         return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    serializer = WidgetItemSerializer(widgetitem)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['PUT'])
def widgetItemChange(request):

    #token verification
    try:
     authorization_header = request.headers.get('Authorization')
     verify = verifyJwt.JWTValidator(authorization_header)
     es_valido = verify.validar_token()
     if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    
     dataRequest = {
            'widgetitemid': request.data.get('widgetitemid'),
     }
     widgetitemidSe = dataRequest.get('widgetitemid')
     widgetitem = WidgetItem.objects.get(widgetitemid=widgetitemidSe)
    except WidgetItem.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except OperationalError:
         return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    try:
     data = {
        'pageid': request.data.get('pageid'),
        'widgetid': request.data.get('widgetid'),
        'type': request.data.get('type'),
        'value': request.data.get('value'),
        'elementorder': request.data.get('elementorder')
     }
     serializer = WidgetItemSerializer(widgetitem, data=data)
     if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except OperationalError:
         return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@ api_view(['GET'])
def listedWidgetItems(request):
    
    #token verification
    try:
     authorization_header = request.headers.get('Authorization')
     verify = verifyJwt.JWTValidator(authorization_header)
     es_valido = verify.validar_token()
     if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
     widgetitem = WidgetItem.objects.all()
     serializer = WidgetItemSerializer(widgetitem, many=True)
     return Response(serializer.data)
    except OperationalError:
         return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

