from django.shortcuts import render
from rest_framework.decorators import api_view
import json
from .models import Mail
from .models import MailControl
from .serializers import MailControlStatusSerializer, MailSerializer, MailControlSerializer
from rest_framework.response import Response
from rest_framework import status
# Create your views here.



@api_view(['POST'])
def insertEmail(request):

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
    mail = Mail.objects.all()
    serializer = MailSerializer(mail, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def listByEmail(request):
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
def insertMailControl(request):

    data = {
        'idControl': request.data.get('idControl'),
        'emailFrom': request.data.get('emailFrom'),
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
    mailcontrol = MailControl.objects.all()
    serializer = MailControlSerializer(mailcontrol, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['PUT'])
def updateMailControl(request):

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
