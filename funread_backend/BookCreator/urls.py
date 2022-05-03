from django.urls import re_path, path
from BookCreator import views

urlpatterns=[
    path('', views.BookCreatorList.as_view()),
    path('/<int:pk>/', views.BookCreatorDetail.as_view()),
    path('/create/', views.BookCreatorCreate.as_view())
]
