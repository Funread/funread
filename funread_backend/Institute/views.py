from django.http import Http404
from django.shortcuts import render
import json
from wsgiref import headers
from .models import Institute,InstituteMembers
from .serializers import InstituteSerializer, InstituteMembersSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import hashlib
import sys
sys.path.append('funread_backend')
import verifyJwt
from django.db import OperationalError
# -----------------Institute----------------------------

@api_view(['POST'])
def createInstitute(request):

    #token verification
    try:
     authorization_header = request.headers.get('Authorization')
     verify = verifyJwt.JWTValidator(authorization_header)
     es_valido = verify.validar_token()
     if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
     data = {
        
        'name': request.data.get('name').lower(),
        
         }
     serializer = InstituteSerializer(data=data)
     print(serializer)
     if serializer.is_valid():
        serializer.save()
        return Response({"msg":"Almacenado con exito","data":serializer.data}, status = status.HTTP_201_CREATED)
     return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    except OperationalError:
         return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def listedInstitute(request):

    #token verification
    try:
     authorization_header = request.headers.get('Authorization')
     verify = verifyJwt.JWTValidator(authorization_header)
     es_valido = verify.validar_token()
     if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
     institute=Institute.objects.all()
     serializer = InstituteSerializer(institute, many=True)
     return Response(serializer.data)
    except OperationalError:
         return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)









@api_view(['PUT'])
def instituteChange(request):

    #token verification
    try:
     authorization_header = request.headers.get('Authorization')
     verify = verifyJwt.JWTValidator(authorization_header)
     es_valido = verify.validar_token()
     if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
     institute = Institute.objects.get(name=request.data.get("name"))
     data={
        "name":request.data.get("change"),
        
        
     }
     serializer = InstituteSerializer(institute, data=data)
     if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except OperationalError:
         return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)





@api_view(['DELETE'])
def deleteInstitute(request):

    #token verification
   try:
      authorization_header = request.headers.get('Authorization')
      verify = verifyJwt.JWTValidator(authorization_header)
      es_valido = verify.validar_token()
      if es_valido==False:
         return Response(status=status.HTTP_401_UNAUTHORIZED)
    
      institute = Institute.objects.get(instituteid=request.data.get("instituteId"))
      institute.delete()
      return Response({"msj":"successfully delete"},status=status.HTTP_200_OK)
   except OperationalError:
      return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)





#-----------------InstituteMembers----------------------------
#'InstituteID', 'UserId'

@api_view(['POST'])
def createMembers(request):

    #token verification
    try:
     authorization_header = request.headers.get('Authorization')
     verify = verifyJwt.JWTValidator(authorization_header)
     es_valido = verify.validar_token()
     if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
     data = {
        
        'user_id': request.data.get('userIid'),
        'institute_id': request.data.get('instituteId'),
        
         }
     serializer = InstituteMembersSerializer(data=data)
     print(serializer)
     if serializer.is_valid():
        serializer.save()
        return Response({"msg":"successfully stored","data":serializer.data}, status = status.HTTP_201_CREATED)
     return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    except OperationalError:
         return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def listedMembers(request):

    #token verification
    try:
     authorization_header = request.headers.get('Authorization')
     verify = verifyJwt.JWTValidator(authorization_header)
     es_valido = verify.validar_token()
     if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
     instituteMembers=InstituteMembers.objects.all()
     serializer = InstituteMembersSerializer(instituteMembers, many=True)
     return Response(serializer.data)
    except OperationalError:
         return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



@api_view(['PUT'])
def memberChange(request):

    #token verification
    try:
      authorization_header = request.headers.get('Authorization')
      verify = verifyJwt.JWTValidator(authorization_header)
      es_valido = verify.validar_token()
      if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
      try:
        institute_member = InstituteMembers.objects.get(institutemembersid=request.data.get("institutemembersid"))
      except InstituteMembers.DoesNotExist:
        raise Http404("InstituteMembers not found")

      data = {
        "user_id": request.data.get("userchange"),
        "institute_id": request.data.get("institutechange"),
        # Añade otros campos según sea necesario
      }

      serializer = InstituteMembersSerializer(institute_member, data=data)

      if serializer.is_valid():
         serializer.save()
         return Response({"message": "InstituteMember updated successfully","data":serializer.data}, status=status.HTTP_200_OK)

      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except OperationalError:
         return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['DELETE'])
def deleteMembers(request):

    #token verification
    try:
     authorization_header = request.headers.get('Authorization')
     verify = verifyJwt.JWTValidator(authorization_header)
     es_valido = verify.validar_token()
     if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
     instituteMembers = InstituteMembers.objects.get(institutemembersid=request.data.get("institutemembersid"))
     instituteMembers.delete()

     return Response({"msj":"successfully delete"},status=status.HTTP_200_OK)
    except OperationalError:
         return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)