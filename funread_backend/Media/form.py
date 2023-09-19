from django import forms
from form import ModelFormWithFileField

class UploadFileForm(ModelFormWithFileField.ModelFormWithFileField):
    #title = forms.CharField(max_length=50)
    #file = forms.FileField()
    Id = forms.AutoField(primary_key=True)
    #Name = forms.CharField(max_length=200, unique=True)
    Url = forms.URLField(max_length=300)
    Extension = forms.CharField(max_length=10)
    image = forms.ImageField()