from rest_framework import routers
from TagsPersBook import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [

    path('TagsPersBook/CreateTagsPerBook', views.createtagsperbook),
    path('TagsPersBook/ListedTagsPersBook', views.listedtagsperbook),
    path('TagsPersBook/ChangeTagsPersBook', views.tagsperbookChange),
    path('TagsPersBook/DeleteTagsPersBook', views.deletetagsperbook)
    
]
