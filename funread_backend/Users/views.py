from django.http.response import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from .models import User
import hashlib
import json

# Create your views here.


class UsersView(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, id=0):
        if (id > 0):
            listUser = list(User.objects.filter(userid=id).values())
            if len(listUser) > 0:
                user = listUser[0]
                datos = {'message': "Success", 'company': user}
            else:
                datos = {'message': "User not found..."}
            return JsonResponse(datos)
        else:
            listUser = list(User.objects.values())
            if len(listUser) > 0:
                datos = {'message': "Success", 'companies': listUser}
            else:
                datos = {'message': "User not found..."}
            return JsonResponse(datos)    
            
    def post(self, request):
        jd = json.loads(request.body)
        User.objects.create(userid=jd['userid'],email=jd['email'], name=jd['name'], lastname=jd['lastname'], password = hashlib.sha256(jd['password'].encode('utf-8')).hexdigest(), createdat=jd['createdat'], actived=jd['actived'])
        datos = {'message': "Success"}
        return JsonResponse(datos)

class UserPutInfo(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)
    
    def put(self, request, userid):
        jd = json.loads(request.body)
        try:
            user = User.objects.get(userid=userid)
            user.email=jd['email']
            user.name=jd['name']
            user.lastname=jd['lastname']
            user.password = hashlib.sha256(jd['password'].encode('utf-8')).hexdigest()
            user.save()
            msg = {'message': "Success"}
        except:
            msg = {'message': "Company not found..."}
        return JsonResponse(msg)

class UserPutPassword(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)
        
    def put(self, request, userid):
        jd = json.loads(request.body)
        try:
            user = User.objects.get(userid=userid)
            user.password = hashlib.sha256(jd['password'].encode('utf-8')).hexdigest()
            user.save()
            msg = {'message': "Success"}
        except:
            msg = {'message': "Company not found..."}
        return JsonResponse(msg)