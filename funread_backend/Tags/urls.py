from rest_framework import routers
from .api import TagsViewSet
from  Tags import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('list/' , views.listed),
    path('newtags/', views.new_tags),
    #path('delete/<str:description>', views.deletetags), 
    path('search/<str:description>', views.tagsSearch),
    #path('change/<str:description>',views.tagsChange), 
]

urlpatterns = format_suffix_patterns(urlpatterns)