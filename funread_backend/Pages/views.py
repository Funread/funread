import datetime
import json
from sre_parse import State
from turtle import title
from wsgiref import headers
from .models import Pages
from .serializers import PageSerializer, getTemplate
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import hashlib
from django.http import JsonResponse

@api_view(['POST'])
def new_page(request):
    print(request.data)
    data = {
        'book': request.data.get('book'),
        'elementorder': request.data.get('elementorder'),
        'type': request.data.get('type'),
        'template': request.data.get('template')
    }
    serializer = PageSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def pageSearch(request, pageid):
    try:
        page = Pages.objects.get(pageid=pageid)
        print(page)
    except Pages.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = PageSerializer(page)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['PUT'])
def pageChange(request):
    try:
        dataRequest = {
            'pageid': request.data.get('pageid'),
        }
        pageidSe = dataRequest.get('pageid')
        page = Pages.objects.get(pageid=pageidSe)
    except Pages.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


    data = {
        'elementorder': request.data.get('elementorder'),
        'type': request.data.get('type'),
        'template': request.data.get('template'),
    }
    serializer = PageSerializer(page, data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@ api_view(['GET'])
def listed(request):
    page = Pages.objects.all()
    serializer = PageSerializer(page, many=True)
    return Response(serializer.data)

@ api_view(['GET'])
def Template(request, templateerquest):
    template = getTemplate()
    serializer = template.gettemplate(templateerquest)
    return Response(serializer)