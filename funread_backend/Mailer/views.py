from django.shortcuts import render
from rest_framework.decorators import api_view
import json
from .serializers import MailSerializer
from rest_framework.response import Response
from rest_framework import status
# Create your views here.

@api_view(['POST'])
def new_email(request):
    
    data = {
        'emailTo': request.data.get('emailTo'),
        'emailFrom':request.data.get('emailFrom'),
        'emailSubject':request.data.get('emailSubject'),
        'bodyMessage':request.data.get('bodyMessage')
    }
    serializer = MailSerializer(data=data)
    print(serializer)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status = status.HTTP_201_CREATED)
    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

# 'Crear un view para listar todos los correos y otro para mostrar un email expecifico