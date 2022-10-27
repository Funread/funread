from django.shortcuts import render
from rest_framework.decorators import api_view
import json
from .models import Mail
from .models import MailControl
from .serializers import MailSerializer, MailControlSerializer
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
    return Response(serializer.data,status =status.HTTP_200_OK)

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



@api_view(['GET'])
def listed_sender(request):
    try:
        dataRequest = {
            'idControl': request.data.get('idControl'),
        }
        print(request.data)
        emailSe = dataRequest.get('idControl')
        mailcontrol = MailControl.objects.filter(idControl=emailSe)
        print(mailcontrol)
        serializer = MailControlSerializer(mailcontrol, many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    except MailControl.DoesNotExist:
        return Response(serializer.data,status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def new_mailcontrol(request):
    
    data = {
        'date': request.data.get('date'),
        'category':request.data.get('category'),
        'status':request.data.get('status'),
    }
    
    serializer = MailControlSerializer(data=data)
    print(serializer)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status = status.HTTP_201_CREATED)
    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def listed_all_mailcontrol(request):
    mailcontrol = MailControl.objects.all()
    serializer = MailControlSerializer(mailcontrol, many=True)
    return Response(serializer.data,status =status.HTTP_200_OK)


# Crear un view para listar correo por destino, (crear un serializador)
# insertar data en el mailcontrol, 
# listar la data del mailcontrol, 
# buscar por id la data de mailcontrol