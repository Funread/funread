from django.db import models
from Classes.models import Classes
from StudentsGroups.models import StudentsGroups

class GroupsPerClasses(models.Model):
    groupsperclassesid = models.AutoField(db_column='GroupsPerClassesId', primary_key=True)  # Field name made lowercase.
    studentsgroups_id = models.ForeignKey(StudentsGroups, db_column='StudentsGroupsId', blank=True, null=True, on_delete=models.CASCADE, to_field='studentsgroupsid')  # Field name made lowercase.
    classes_id = models.ForeignKey(Classes, db_column='ClassesId', blank=True, null=True, on_delete=models.CASCADE, to_field='classesid')  # Field name made lowercase.

    class Meta:
        
        db_table = 'groupsperclasses'