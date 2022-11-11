from asyncio.windows_events import NULL
from aenum  import MultiValueEnum
import Widget.serializers
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework import status
class Template(str, MultiValueEnum):
    IMAGES = "image", "https://previews.123rf.com/images/koblizeek/koblizeek2001/koblizeek200100006/137486703-ningún-símbolo-de-vector-de-imagen-falta-el-icono-disponible-no-hay-galería-para-este-momento-.jpg",1
    TEXT =  "text","Insert Text Here",2

    @classmethod    
    def getTemplate(self, name):  
        my_json = {}
        for template in Template:
            if template.name == name:
                my_json = {name : template.values}
        widget = { }
        enumitemposition = 0
        for key in my_json:
            for value in my_json[key]:
                if enumitemposition == 0:
                    widget['name'] =value
                elif enumitemposition == 2:
                    widget['type'] =value
                enumitemposition = enumitemposition + 1
        serializer = Widget.serializers.WidgetSerializer(data=widget)
        if serializer.is_valid():
            if 'name' in widget:
                serializer.save()
            return my_json
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
