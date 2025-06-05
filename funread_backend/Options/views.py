from django.shortcuts import render
from rest_framework.decorators import api_view
import os
import sys
sys.path.append('funread_backend')
import verifyJwt
from rest_framework.response import Response
from .serializers import OptionsSerializer
from .models import Options
from rest_framework import status
import datetime
from django.db import OperationalError
# Create your views here.

@api_view(['POST'])
def new_option(request):
    
    #token verification
   try: 
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    image = 0
    if request.data.get('image') is not None:
        image = int(os.path.splitext(request.data.get('new_image').split('/')[-1])[0])
    else:
        image = 1
    data = {
        'answer': request.data.get('answer'),
        'points': request.data.get('points'),
        'iscorrect': request.data.get('iscorrect'),
        'idimage': image,
        'idwidgetitem': request.data.get('idwidgetitem'),
        'isactive' : 1,
        'createdby': request.data.get('createdby'),
        'createdat': datetime.datetime.now()
    }
    serializer = OptionsSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   except OperationalError:
     return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@ api_view(['GET'])
def listed_options(request):
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
        options = Options.objects.filter(idwidgetitem= request.data.get('idwidgetitem')).exclude(isactive=0)
   except Options.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
   except OperationalError:
        return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
   serializer = OptionsSerializer(options, many=True)
   return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def list_options_by_idwidgetitem(request, idwidgetitem):
    try:
        options = Options.objects.filter(idwidgetitem= idwidgetitem).exclude(isactive=0)
        serializer = OptionsSerializer(options, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Options.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except OperationalError as e:
        print(f"Error de base de datos: {str(e)}")  # Para ver el error en los logs
        return Response(
            {"error": f"Error en la base de datos: {str(e)}"}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
    except Exception as e:
        print(f"Error inesperado: {str(e)}")  # Para ver el error en los logs
        return Response(
            {"error": f"Error inesperado: {str(e)}"}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['PUT'])
def update_option(request):

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
            'idoption': request.data.get('idoption'),
     }
     idoption = dataRequest.get('idoption')
     option = Options.objects.get(idoption=idoption)
    except Options.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except OperationalError:
     return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    try:
     new_image = 0
     if request.data.get('new_image') is not None:
        new_image = int(os.path.splitext(request.data.get('new_image').split('/')[-1])[0])
     else:
        new_image = 1
     data = {
        'answer': request.data.get('new_answer'),
        'points': request.data.get('new_points'),
        'iscorrect': request.data.get('new_iscorrect'),
        'idimage': new_image,
        'createdby': option.createdby.pk
    }
     serializer = OptionsSerializer(option, data=data)
     if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except OperationalError:
         return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@ api_view(['POST'])
def delete_option(request):

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
        option = Options.objects.get(idoption= request.data.get('idoption'))
    except Options.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except OperationalError:
     return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    option.isactive = 0
    option.save()
    return Response("Option successfully deleted", status=status.HTTP_200_OK)

@api_view(['POST'])
def create_multiple_options(request):
    try:
        authorization_header = request.headers.get('Authorization')
        verify = verifyJwt.JWTValidator(authorization_header)
        if not verify.validar_token():
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        options_list = request.data.get('options', [])
        idwidgetitem = request.data.get('idwidgetitem')
        createdby = request.data.get('createdby')

        if not isinstance(options_list, list):
            return Response({"error": "Se esperaba un array de opciones."}, status=status.HTTP_400_BAD_REQUEST)

        created_options = []

        for option in options_list:
            option_data = {
                'answer': option.get('answer'),
                'points': option.get('points', 0),
                'iscorrect': 1 if option.get('isCorrect') else 0,
                'idimage': 1,  # o lógica personalizada si hay imágenes
                'idwidgetitem': idwidgetitem,
                'isactive': 1,
                'createdby': createdby,
                'createdat': datetime.datetime.now()
            }

            serializer = OptionsSerializer(data=option_data)
            if serializer.is_valid():
                serializer.save()
                created_options.append(serializer.data)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response({"created": created_options}, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response({"error": f"Error inesperado: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
