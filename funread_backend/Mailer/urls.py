from rest_framework import routers
from .api import MailViewSet
from Mailer import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns


urlpatterns = [
    path('mailer/insertEmail',views.insertEmail), 
    path('mailer/listAllEmail', views.listAllEmail),
    path('mailer/listByEmail', views.listByEmail),
    
    path('controlMailer/listByMailControl', views.listByMailControl),
    path('controlMailer/insertMailControl', views.createMailControl),
    path('controlMailer/listAllMailControl', views.listAllMailControl),
    path('controlMailer/updateMailControl',views.updateMailControl)
]
