from django.shortcuts import render
from rest_framework.decorators import api_view
import json
from .models import Mail
from .models import MailControl
from .serializers import MailControlStatusSerializer, MailSerializer, MailControlSerializer
from rest_framework.response import Response
from rest_framework import status
import sys
sys.path.append('funread_backend')
import verifyJwt

import smtplib
from email.mime.text import MIMEText
# Create your views here.


@api_view(['POST'])
def insertEmail(request):

    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    data = {
        'emailTo': request.data.get('emailTo'),
        'emailFrom': request.data.get('emailFrom'),
        'emailSubject': request.data.get('emailSubject'),
        'bodyMessage': request.data.get('bodyMessage')
    }

    serializer = MailSerializer(data=data)
    print(serializer)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def listAllEmail(request):

    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    mail = Mail.objects.all()
    serializer = MailSerializer(mail, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def listByEmail(request):

    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    try:
        dataRequest = {
            'emailFrom': request.data.get('emailFrom'),
        }
        print(request.data)
        emailSe = dataRequest.get('emailFrom')
        mail = Mail.objects.filter(emailFrom=emailSe)
        print(mail)
        serializer = MailSerializer(mail, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Mail.DoesNotExist:
        return Response(serializer.data, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def listByMailControl(request):

    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    try:
        dataRequest = {
            'emailFrom': request.data.get('emailFrom'),
        }
        print(request.data)
        emailSe = dataRequest.get('emailFrom')
        mailcontrol = MailControl.objects.filter(emailFrom=emailSe)
        print(mailcontrol)
        serializer = MailControlSerializer(mailcontrol, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except MailControl.DoesNotExist:
        return Response(serializer.data, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def createMailControl(request):

    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    data = {
        'idControl': request.data.get('idControl'),
        'date': request.data.get('date'),
        'category': request.data.get('category'),
        'status': request.data.get('status'),
    }

    serializer = MailControlSerializer(data=data)
    print(serializer)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def listAllMailControl(request):

    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    mailcontrol = MailControl.objects.all()
    serializer = MailControlSerializer(mailcontrol, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['PUT'])
def updateMailControl(request):

    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    try:
        dataRequest = {
            'idControl': request.data.get('idControl'),
        }
        emailSe = dataRequest.get('idControl')
        print(emailSe)
        mailControl = MailControl.objects.filter(
            idControl=emailSe).update(status="dlt")
    except MailControl.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    return Response({"Se han eliminado los datos con exito"},status=status.HTTP_200_OK)

@api_view(['POST'])
def sendEmail(request):
    # Configuración
    smtp_server = 'smtp.example.com'
    smtp_port = 587  # Puerto SMTP
    smtp_username = 'tu_email@example.com'
    smtp_password = 'tu_contraseña'

    # Crear el mensaje
    message = MIMEText('Este es el contenido del correo electrónico.')
    message['Subject'] = 'Asunto del correo'
    message['From'] = 'tu_email@example.com'
    message['To'] = 'destinatario@example.com'

    # Conectar al servidor SMTP
    server = smtplib.SMTP(smtp_server, smtp_port)
    server.starttls()  # Iniciar cifrado TLS
    server.login(smtp_username, smtp_password)

    # Enviar el correo
    server.sendmail(smtp_username, 'destinatario@example.com', message.as_string())

    # Cerrar la conexión
    server.quit()

    return Response({"Se han eliminado los datos con exito"},status=status.HTTP_200_OK)