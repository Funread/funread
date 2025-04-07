# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Authorlist(models.Model):
    authorlistid = models.AutoField(db_column='AuthorListId', primary_key=True)  # Field name made lowercase.
    bookid = models.ForeignKey('Book', models.DO_NOTHING, db_column='BookID', blank=True, null=True)  # Field name made lowercase.
    userid = models.ForeignKey('User', models.DO_NOTHING, db_column='UserID', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        
        db_table = 'authorlist'


class Book(models.Model):
    bookid = models.AutoField(db_column='BookID', primary_key=True)  # Field name made lowercase.
    title = models.CharField(db_column='Title', max_length=200)  # Field name made lowercase.
    category = models.IntegerField(db_column='Category', blank=True, null=True)  # Field name made lowercase.
    portrait = models.CharField(db_column='Portrait', max_length=200, blank=True, null=True)  # Field name made lowercase.
    createdby = models.ForeignKey('User', models.DO_NOTHING, db_column='CreatedBy', blank=True, null=True)  # Field name made lowercase.
    createdat = models.DateTimeField(db_column='CreatedAt', blank=True, null=True)  # Field name made lowercase.
    lastupdateby = models.ForeignKey('User', models.DO_NOTHING, db_column='LastUpdateBy', blank=True, null=True)  # Field name made lowercase.
    lastupdateat = models.DateTimeField(db_column='LastUpdateAt', blank=True, null=True)  # Field name made lowercase.
    state = models.IntegerField(db_column='State')  # Field name made lowercase.
    sharedbook = models.IntegerField(db_column='SharedBook', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        
        db_table = 'book'


class Booksperclasses(models.Model):
    booksperclasses = models.AutoField(db_column='BooksPerClasses', primary_key=True)  # Field name made lowercase.
    booksid = models.ForeignKey(Book, models.DO_NOTHING, db_column='BooksId', blank=True, null=True)  # Field name made lowercase.
    classesid = models.ForeignKey('Classes', models.DO_NOTHING, db_column='ClassesId', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        
        db_table = 'booksperclasses'


class Classes(models.Model):
    classesid = models.AutoField(db_column='ClassesId', primary_key=True)  # Field name made lowercase.
    name = models.CharField(db_column='Name', max_length=200)  # Field name made lowercase.
    grade = models.IntegerField(db_column='Grade', blank=True, null=True)  # Field name made lowercase.
    teacherassigned = models.ForeignKey('User', models.DO_NOTHING, db_column='TeacherAssigned', blank=True, null=True)  # Field name made lowercase.
    createdat = models.DateTimeField(db_column='CreatedAt', blank=True, null=True)  # Field name made lowercase.
    lastupdateat = models.DateTimeField(db_column='LastUpdateAt', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        
        db_table = 'classes'


class Classeslog(models.Model):
    classeslogid = models.AutoField(db_column='ClassesLogId', primary_key=True)  # Field name made lowercase.
    classesid = models.ForeignKey(Classes, models.DO_NOTHING, db_column='ClassesID')  # Field name made lowercase.
    userid = models.ForeignKey('User', models.DO_NOTHING, db_column='UserID')  # Field name made lowercase.
    createdat = models.DateTimeField(db_column='CreatedAt', blank=True, null=True)  # Field name made lowercase.
    description = models.CharField(db_column='Description', max_length=100, db_collation='utf8mb3_general_ci', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        
        db_table = 'classeslog'


class File(models.Model):
    fileid = models.AutoField(db_column='FileId', primary_key=True)  # Field name made lowercase.
    filelocation = models.CharField(db_column='FileLocation', max_length=200)  # Field name made lowercase.
    foldersid = models.ForeignKey('Folders', models.DO_NOTHING, db_column='FoldersId')  # Field name made lowercase.
    uploadby = models.IntegerField(db_column='UploadBy')  # Field name made lowercase.
    idtags = models.IntegerField(db_column='IdTags')  # Field name made lowercase.

    class Meta:
        
        db_table = 'file'


class Folders(models.Model):
    foldersid = models.AutoField(db_column='FoldersId', primary_key=True)  # Field name made lowercase.
    namefolders = models.CharField(db_column='NameFolders', max_length=200)  # Field name made lowercase.
    createdby = models.IntegerField(db_column='CreatedBy')  # Field name made lowercase.

    class Meta:
        
        db_table = 'folders'


class Grades(models.Model):
    gradesid = models.AutoField(db_column='GradesID', primary_key=True)  # Field name made lowercase.
    booksid = models.CharField(db_column='BooksId', max_length=200)  # Field name made lowercase.
    progress = models.IntegerField(db_column='Progress', blank=True, null=True)  # Field name made lowercase.
    grade = models.FloatField(db_column='Grade', blank=True, null=True)  # Field name made lowercase.
    userid = models.ForeignKey('User', models.DO_NOTHING, db_column='UserId')  # Field name made lowercase.

    class Meta:
        
        db_table = 'grades'


class Groupsperclasses(models.Model):
    groupsperclassesid = models.AutoField(db_column='GroupsPerClassesId', primary_key=True)  # Field name made lowercase.
    groupsid = models.ForeignKey('Studentgroups', models.DO_NOTHING, db_column='GroupsId', blank=True, null=True)  # Field name made lowercase.
    classesid = models.ForeignKey(Classes, models.DO_NOTHING, db_column='ClassesId', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        
        db_table = 'groupsperclasses'


class Institute(models.Model):
    instituteid = models.AutoField(db_column='InstituteId', primary_key=True)  # Field name made lowercase.
    name = models.CharField(db_column='Name', max_length=200)  # Field name made lowercase.

    class Meta:
        
        db_table = 'institute'


class Institutemembers(models.Model):
    institutemembersid = models.AutoField(db_column='InstituteMembersID', primary_key=True)  # Field name made lowercase.
    instituteid = models.ForeignKey(Institute, models.DO_NOTHING, db_column='InstituteID')  # Field name made lowercase.
    userid = models.ForeignKey('User', models.DO_NOTHING, db_column='UserId')  # Field name made lowercase.

    class Meta:
        
        db_table = 'institutemembers'


class Mail(models.Model):
    emailid = models.AutoField(db_column='emailId', primary_key=True)  # Field name made lowercase.
    emailto = models.CharField(db_column='emailTo', max_length=200)  # Field name made lowercase.
    emailfrom = models.CharField(db_column='emailFrom', max_length=200)  # Field name made lowercase.
    emailsubject = models.CharField(db_column='emailSubject', max_length=50, blank=True, null=True)  # Field name made lowercase.
    bodymessage = models.TextField(db_column='bodyMessage')  # Field name made lowercase.

    class Meta:
        
        db_table = 'mail'


class Mailcontrol(models.Model):
    mailcontrolid = models.AutoField(db_column='mailControlId', primary_key=True)  # Field name made lowercase.
    date = models.DateTimeField(blank=True, null=True)
    category = models.IntegerField()
    status = models.CharField(max_length=5)
    idcontrol = models.ForeignKey(Mail, models.DO_NOTHING, db_column='idControl', blank=True, null=True)  # Field name made lowercase.
    emailfrom = models.ForeignKey('User', models.DO_NOTHING, db_column='emailFrom')  # Field name made lowercase.

    class Meta:
        
        db_table = 'mailcontrol'


class Pages(models.Model):
    pageid = models.AutoField(db_column='PageId', primary_key=True)  # Field name made lowercase.
    bookid = models.ForeignKey(Book, models.DO_NOTHING, db_column='BookId', blank=True, null=True)  # Field name made lowercase.
    type = models.IntegerField(db_column='Type')  # Field name made lowercase.
    template = models.IntegerField(db_column='Template')  # Field name made lowercase.
    elementorder = models.IntegerField(db_column='ElementOrder')  # Field name made lowercase.

    class Meta:
        
        db_table = 'pages'


class Roles(models.Model):
    rolesid = models.AutoField(db_column='RolesId', primary_key=True)  # Field name made lowercase.
    role = models.CharField(db_column='Role', max_length=200)  # Field name made lowercase.

    class Meta:
        
        db_table = 'roles'


class Sharedbooks(models.Model):
    sharedbooksid = models.AutoField(db_column='SharedBooksId', primary_key=True)  # Field name made lowercase.
    bookid = models.ForeignKey(Book, models.DO_NOTHING, db_column='BookID', blank=True, null=True)  # Field name made lowercase.
    userid = models.ForeignKey('User', models.DO_NOTHING, db_column='UserID', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        
        db_table = 'sharedbooks'


class Studentgroups(models.Model):
    groupsid = models.AutoField(db_column='GroupsId', primary_key=True)  # Field name made lowercase.
    userid = models.ForeignKey('User', models.DO_NOTHING, db_column='UserId')  # Field name made lowercase.
    isteacher = models.IntegerField(db_column='isTeacher', blank=True, null=True)  # Field name made lowercase.
    createdby = models.ForeignKey('User', models.DO_NOTHING, db_column='CreatedBy')  # Field name made lowercase.
    createdat = models.DateTimeField(db_column='CreatedAt', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        
        db_table = 'studentgroups'


class Tags(models.Model):
    tagsid = models.AutoField(db_column='TagsId', primary_key=True)  # Field name made lowercase.
    description = models.CharField(db_column='Description', max_length=50, db_collation='utf8mb3_general_ci')  # Field name made lowercase.

    class Meta:
        
        db_table = 'tags'


class Tagsperbook(models.Model):
    tagsperbookid = models.AutoField(db_column='TagsPerBookId', primary_key=True)  # Field name made lowercase.
    bookid = models.ForeignKey(Book, models.DO_NOTHING, db_column='BookId', blank=True, null=True)  # Field name made lowercase.
    tagsid = models.ForeignKey(Tags, models.DO_NOTHING, db_column='TagsID', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        
        db_table = 'tagsperbook'


class Tagsperpage(models.Model):
    tagsperpageid = models.AutoField(db_column='TagsPerPageId', primary_key=True)  # Field name made lowercase.
    pageid = models.ForeignKey(Pages, models.DO_NOTHING, db_column='PageID', blank=True, null=True)  # Field name made lowercase.
    tagsid = models.ForeignKey(Tags, models.DO_NOTHING, db_column='TagsID', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        
        db_table = 'tagsperpage'


class User(models.Model):
    userid = models.AutoField(db_column='UserId', primary_key=True)  # Field name made lowercase.
    email = models.CharField(db_column='Email', unique=True, max_length=200)  # Field name made lowercase.
    name = models.CharField(db_column='Name', max_length=200, blank=True, null=True)  # Field name made lowercase.
    lastname = models.CharField(db_column='LastName', max_length=200, blank=True, null=True)  # Field name made lowercase.
    password = models.CharField(max_length=256, db_collation='utf8mb3_general_ci', blank=True, null=True)
    createdat = models.DateTimeField(db_column='CreatedAt', blank=True, null=True)  # Field name made lowercase.
    actived = models.IntegerField(db_column='Actived', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        
        db_table = 'user'


class Userroles(models.Model):
    userrolesid = models.AutoField(db_column='UserRolesId', primary_key=True)  # Field name made lowercase.
    iduser = models.ForeignKey(User, models.DO_NOTHING, db_column='IdUser')  # Field name made lowercase.
    idrole = models.ForeignKey(Roles, models.DO_NOTHING, db_column='IdRole')  # Field name made lowercase.

    class Meta:
        
        db_table = 'userroles'


class Widget(models.Model):
    widgetid = models.AutoField(db_column='WidgetId', primary_key=True)  # Field name made lowercase.
    type = models.IntegerField(db_column='Type', blank=True, null=True)  # Field name made lowercase.
    name = models.CharField(db_column='Name', max_length=200, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        
        db_table = 'widget'


class Widgetitem(models.Model):
    widgetitemid = models.AutoField(db_column='WidgetItemId', primary_key=True)  # Field name made lowercase.
    pageid = models.ForeignKey(Pages, models.DO_NOTHING, db_column='PageId', blank=True, null=True)  # Field name made lowercase.
    widgetid = models.ForeignKey(Widget, models.DO_NOTHING, db_column='WidgetId', blank=True, null=True)  # Field name made lowercase.
    value = models.IntegerField(db_column='Value')  # Field name made lowercase.
    type = models.IntegerField(db_column='Type')  # Field name made lowercase.

    class Meta:
        
        db_table = 'widgetitem'

class UserBookProgress(models.Model):
    id = models.AutoField(db_column='Id', primary_key=True)
    book = models.ForeignKey(Book, on_delete=models.CASCADE, db_column='BookId')
    user = models.ForeignKey(User, on_delete=models.CASCADE, db_column='UserId')
    status = models.IntegerField(db_column='Status', default=0)
    calificacion = models.FloatField(
        db_column='Calificacion',
        null=True,
        blank=True,
        default=None
    )

    class Meta:
        db_table = 'userbookprogress'
        unique_together = (('book', 'user'),)
