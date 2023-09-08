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
sys.path.append('Se debe poner la ruta de la carpeta funread_backend/funread_backend')
import verifyJwt

@api_view(['POST'])
def new_widget(request):

    #token verification
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

@api_view(['GET'])
def widgetSearch(request, widgetid):

    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    try:
        widget = Widget.objects.get(widgetid=widgetid)
        print(widget)
    except Widget.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = WidgetSerializer(widget)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['PUT'])
def widgetChange(request):

    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    try:
        dataRequest = {
            'widgetid': request.data.get('widgetid'),
        }
        widgetidSe = dataRequest.get('widgetid')
        widget = Widget.objects.get(widgetid=widgetidSe)
    except Widget.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


    data = {
        'type': request.data.get('type'),
        'name': request.data.get('name')
    }
    serializer = WidgetSerializer(widget, data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@ api_view(['GET'])
def listedWidget(request):

    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    widget = Widget.objects.all()
    serializer = WidgetSerializer(widget, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def new_widgetItem(request):

    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    print(request.data)
    data = {
        'page': request.data.get('page'),
        'widget': request.data.get('widget'),
        'type': request.data.get('type'),
        'value': request.data.get('value')
    }
    serializer = WidgetItemSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def widgetItemSearch(request, widgetitemid):

    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    try:
        widgetitem = WidgetItem.objects.get(widgetitemid=widgetitemid)
        print(widgetitem)
    except WidgetItem.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = WidgetItemSerializer(widgetitem)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['PUT'])
def widgetItemChange(request):

    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    try:
        dataRequest = {
            'widgetitemid': request.data.get('widgetitemid'),
        }
        widgetitemidSe = dataRequest.get('widgetitemid')
        widgetitem = WidgetItem.objects.get(widgetitemid=widgetitemidSe)
    except WidgetItem.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


    data = {
        'page': request.data.get('page'),
        'widget': request.data.get('widget'),
        'type': request.data.get('type'),
        'value': request.data.get('value')
    }
    serializer = WidgetItemSerializer(widgetitem, data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@ api_view(['GET'])
def listedWidgetItems(request):
    
    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    widgetitem = WidgetItem.objects.all()
    serializer = WidgetItemSerializer(widgetitem, many=True)
    return Response(serializer.data)

