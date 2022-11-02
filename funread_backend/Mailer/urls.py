from rest_framework import routers
from .api import MailViewSet
from Mailer import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns


urlpatterns = [
    path('mailer/createEmail',views.createEmail), 
    path('mailer/listAll', views.listAll),
    path('mailer/listByEmail', views.listByEmail),
    path('controlMailer/listByEmail', views.listByEmail),
    path('controlMailer/insertMailControl', views.createMailControl),
    path('controlMailer/listAll', views.listAll),
    path('controlMailer/updateMailControl',views.updateMailControl)
]
