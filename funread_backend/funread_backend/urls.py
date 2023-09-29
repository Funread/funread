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
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    #path('accounts/', include('AuthApp.urls')),
    path('users/',include('Users.urls')),
    path('books/',include('Books.urls')),
    path('pages/',include('Pages.urls')),
    path('widget/',include('Widget.urls')),
    path('file/',include('Files.urls')),
    path('folder/',include('folder.urls')),
    path('Tags/',include('Tags.urls')),
    path('email/', include('Mailer.urls')),
    path('roles/', include('Roles.urls')),
    path('author/', include('Author.urls')),
    path('sharedbooks/', include('Sharedbooks.urls')),
    path('grades/', include('Grades.urls')),
    path('institute/', include('Institute.urls')),
    path('studentsgroups/', include('StudentsGroups.urls')),
    path('tagsperpage/', include('TagsPerPage.urls')),
    path('classes/', include('Classes.urls')),
    path('classeslog/', include('ClassesLog.urls')),
    path('booksPerClasses/', include('BooksPerClasses.urls')),
    path('groupsPerClasses/', include('GroupsPerClasses.urls')),
    path('Media/', include('Media.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)