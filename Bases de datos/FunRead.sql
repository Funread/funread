create database FUNREAD;

use FUNREAD;


/*------------------ area del usuario-----------------------------*/

/* Esta tabla se crea para poder tener el 
control de los roles*/
create table Roles(
	RolesId int primary key not null,
    Role varchar(200) not null
);

/* el nombre deberia ser varchar */

/*La tabla usuarios se utiliza con la intencion de saber
que usuario esta usando la aplicacion*/
create table User(
UserId int primary key not null,
Email varchar(200) not null,
Name varchar(200),
LastName varchar(200),
Password nvarchar(50),
CreatedAt datetime default(sysdate()) ,
Actived boolean
);


/*La tabla usuarios roles se utiliza con la intencion de saber
que usuario esta usando la aplicacion y cual es rol perteneciente*/
create table UserRoles(
	UserRolesId int primary key not null,
    IdUser int not null,
    IdRole int not null,
    FOREIGN KEY(IdRole) REFERENCES Roles (RolesId),
    FOREIGN KEY(IdUser) REFERENCES User (UserId)
);
/*-------------------- area del instituto-------------------------- */

/*Esta tabla se hace para tener informacion del instituto*/
create table Institute(
InstituteId int primary key,
Name varchar(200) not null
);

/*esta mal normalizada,cambie el primer atributo por 
intituteMemberId porque desplegaba error de duplicado*/

/*Para tener informacion del miembro de ese instituto*/
create table InstituteMembers(
InstituteMembersID int primary key,
InstituteID int not null,
UserId int not null,
FOREIGN KEY(InstituteID) REFERENCES Institute (InstituteId),
FOREIGN KEY(UserId) REFERENCES User (UserId)
);

/*------------------ area de los grados----------------------------*/
/*Tabla que sirve para tener la informacion de en que grado estan 
el estudiante*/
create table Grades(
GradesID int primary key not null,
BooksId varchar(200) not null,
Progress int,
Grade float,
UserId int not null,
FOREIGN KEY(UserId) REFERENCES User (UserId)
);

/*------------------ area de los Books----------------------------*/
/*Esta tabla va poseeer la informacion de los
libros*/
create table Book(
BookID int primary key,
Title varchar(200) not null,
Category int,
Portrait varchar(200),
CreatedBy int,
CreatedAt DateTime default(sysdate()),
LastUpdateBy int,
LastUpdateAt DateTime default(sysdate()),
State int not null,
SharedBook Boolean default 0,
FOREIGN KEY(CreatedBy) REFERENCES User (UserId),
FOREIGN KEY(LastUpdateBy) REFERENCES User (UserId)
);

create table Tags(
TagsId int primary key,
Description nvarchar(50) Not null
);

create table TagsPerBook(
TagsPerBookId int primary key,
BookId int,
TagsID  int,
FOREIGN KEY(BookId) REFERENCES Book (BookID),
FOREIGN KEY(TagsID) REFERENCES Tags (TagsId)
);

/*Este va tener la información de las paginas de los libros*/
create table Pages(
PageId int primary key,
BookId int,
Type int not null,
Template int not null,
FOREIGN KEY(BookId) REFERENCES Book (BookID)
);

create table TagsPerPage(
TagsPerPageId int primary key,
PageID int,
TagsID int,
FOREIGN KEY(PageID) REFERENCES Pages (PageId),
FOREIGN KEY(TagsID) REFERENCES Tags (TagsId)
);

/*aqui hay dos pageid ,le quito uno por lo duplicado*/
create table Widget(
WidgetId int primary key,
PageId int,
Type int,
FOREIGN KEY(PageID) REFERENCES Pages (PageId)
);

/*aqui hay dos widgetId ,le quito uno por lo duplicado y el arriba
cambio el nombre*/
create table WidgetItem(
WidgetItemId int,
PageId int,
WidgetId int,
Value int,
Type int not null,
primary key(WidgetItemId,Value),
FOREIGN KEY(PageId) REFERENCES Pages (PageId),
FOREIGN KEY(WidgetId) REFERENCES Widget (WidgetId)
);

/*------------------ area de los Classes & Groups----------------------------*/


create table Groups(
GroupsId int primary key not null,
UserId int not null,
isTeacher Boolean default False,
CreatedBy int not null,
CreatedAt DateTime default(sysdate()),
FOREIGN KEY(UserId) REFERENCES User (UserId),
FOREIGN KEY(CreatedBy) REFERENCES User (UserId)
);


create table Classes(
ClassesId int primary key,
Name varchar(200) not null,
Grade int,
TeacherAssigned int,
CreatedAt DateTime default(sysdate()),
LastUpdateAt datetime default(sysdate()),
FOREIGN KEY(TeacherAssigned) REFERENCES User (UserId)
);

/*aqui quite un userId por duplicado*/
create table ClassesLog(
 ClassesLogId int primary key,
 ClassesID int not null,
 UserID int not null,
 CreatedAt DateTime default(sysdate()),
 Description nvarchar(100),
FOREIGN KEY(UserID) REFERENCES User (UserId),
FOREIGN KEY(ClassesID) REFERENCES Classes (ClassesId)
);

create table BooksPerClasses(
BooksPerClasses int primary key,
BooksId int ,
ClassesId int,
FOREIGN KEY(ClassesId) REFERENCES Classes (ClassesId),
FOREIGN KEY(BooksId) REFERENCES Book (BookID)
);

create table GroupsPerClasses(
GroupsPerClassesId int primary key,
GroupsId int,
ClassesId int,
FOREIGN KEY(ClassesId) REFERENCES Classes (ClassesId),
FOREIGN KEY(GroupsId) REFERENCES Groups (GroupsId)
);

/*------------------area de ShareBooks-------------------------*/
create table AuthorList(
AuthorListId int primary key,
BookID int,
UserID int,
FOREIGN KEY(UserID) REFERENCES User (UserId),
FOREIGN KEY(BookID) REFERENCES Book (BookID)
);

create table SharedBooks(
SharedBooksId int primary key,
BookID int,
UserID int,
FOREIGN KEY(UserID) REFERENCES User (UserId),
FOREIGN KEY(BookID) REFERENCES Book (BookId)
);
