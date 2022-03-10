from django.urls import re_path, path
from rest_framework.urlpatterns import format_suffix_patterns
from TeacherApp import views

urlpatterns=[

    path('', views.teacher_list),
    path('<int:pk>/', views.teacher_detail),
]

urlpatterns = format_suffix_patterns(urlpatterns)