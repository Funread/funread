from  GroupsCreate import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('new_group/', views.new_group),
    path('listed_groups/', views.listedGroups),
    path('delete_groups/', views.deletegroup)
]

urlpatterns = format_suffix_patterns(urlpatterns)