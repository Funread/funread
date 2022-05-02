from django.shortcuts import render
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from BookCreator.models import BookCreator
from django.views.decorators.csrf import csrf_exempt
from BookCreator.serializers import BookCreatorSerializer

# Create your views here.
@csrf_exempt
def book_creator(request):
  if request.method == 'GET':
    books = BookCreator.objects.all()
    serializer = BookCreatorSerializer(books, many=True)
    return JsonResponse(serializer.data, safe=False)
  elif request.method == 'POST':
    bookData = JSONParser().parse(request)
    serializer = BookCreatorSerializer(data=bookData)
    if serializer.is_valid(): 
      serializer.save()
      return JsonResponse("Added book successfully", safe=False)
    return JsonResponse(serializer._errors, safe=False)
  elif request.method == 'DELETE':
    books = BookCreator.objects.all()
    books.delete()
    return JsonResponse("Deleted all records", safe=False)


    


