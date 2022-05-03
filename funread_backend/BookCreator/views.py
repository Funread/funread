from django.views.decorators.csrf import csrf_exempt


# Create your views here.
from BookCreator.models import BookCreator
from BookCreator.serializers import BookCreatorSerializer
from rest_framework import generics


class BookCreatorList(generics.ListCreateAPIView):
    authentication_classes = ()
    queryset = BookCreator.objects.all()
    serializer_class = BookCreatorSerializer


class BookCreatorDetail(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = ()
    queryset = BookCreator.objects.all()
    serializer_class = BookCreatorSerializer
    
class BookCreatorCreate(generics.CreateAPIView):
    authentication_classes = ()
    queryset = BookCreator.objects.all()
    serializer_class = BookCreatorSerializer
