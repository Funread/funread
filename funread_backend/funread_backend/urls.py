"""funread_backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

# Configuración de Swagger
schema_view = get_schema_view(
    openapi.Info(
        title="FunRead API",
        default_version='v1',
        description="API Documentation for FunRead Platform - Sistema de lectura educativa con badges y gamificación",
        terms_of_service="https://www.funread.com/terms/",
        contact=openapi.Contact(email="contact@funread.com"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    # Swagger URLs
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    
    # Admin
    path('admin/', admin.site.urls),
    
    # API Endpoints
    #path('accounts/', include('AuthApp.urls')),
    path('api/users/', include('Users.urls')),
    path('api/books/', include('Books.urls')),
    path('api/pages/', include('Pages.urls')),
    path('api/widget/', include('Widget.urls')),
    path('api/file/', include('Files.urls')),
    path('api/folder/', include('folder.urls')),
    path('api/Tags/', include('Tags.urls')),
    path('api/email/', include('Mailer.urls')),
    path('api/roles/', include('Roles.urls')),
    path('api/userroles/', include('Userroles.urls')),
    path('api/author/', include('Author.urls')),
    path('api/sharedbooks/', include('Sharedbooks.urls')),
    path('api/grades/', include('Grades.urls')),
    path('api/institute/', include('Institute.urls')),
    path('api/studentsgroups/', include('StudentsGroups.urls')),
    path('api/tagsperpage/', include('TagsPerPage.urls')),
    path('api/classes/', include('Classes.urls')),
    path('api/classeslog/', include('ClassesLog.urls')),
    path('api/booksPerClasses/', include('BooksPerClasses.urls')),
    path('api/groupsPerClasses/', include('GroupsPerClasses.urls')),
    path('api/Media/', include('Media.urls')),
    path('api/join/', include('Joins.urls')),
    path('api/GroupsCreate/', include('GroupsCreate.urls')),
    path('api/Options/', include('Options.urls')),
    path('api/bookdilemma/', include('BooksDilemma.urls')),
    path('api/translate/', include('TranslateApp.urls')),
    path('api/Subtitled/', include('Subtitled.urls')),
    path('api/UserPointsLog/', include('UserPointsLog.urls')),
    path('api/UserPoints/', include('UserPoints.urls')),
    path('api/Badges/', include('Badges.urls')),
    path('api/UserBadge/', include('UserBadge.urls')),
    path('api/AvatarCreator/', include('AvatarCreator.urls')),
    path('api/BookCover/', include('BookCover.urls')),
    path('api/userbookprogress/', include('userbookprogress.urls')),
    path('api/bookbadge/', include('bookbadge.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)