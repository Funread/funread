from django.shortcuts import render
from rest_framework.decorators import api_view
import json

from .models import Mail
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

@api_view(['GET'])
def listed_all_mail(request):
    mail = Mail.objects.all()
    serializer = MailSerializer(mail, many=True)
    return Response(serializer.data,status =status.HTTP_200_OK )

@api_view(['GET'])
def inboxMail(request):
    try:
        dataRequest = {
            'emailFrom': request.data.get('emailFrom'),
        }
        print(request.data)
        emailSe = dataRequest.get('emailFrom')
        mail = Mail.objects.filter(emailFrom=emailSe)
        print(mail)
        serializer = MailSerializer(mail,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    except Mail.DoesNotExist:
        return Response(serializer.data,status=status.HTTP_404_NOT_FOUND)

# 'Crear un view para listar correo por destino, 
# insertar data en el mailcontrol, 
# listar la data del mailcontrol, 
# buscar por id la data de mailcontrol