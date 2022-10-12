/*------------------ area del usuario-----------------------------*/


create table Roles(
	RolesId int primary key not null auto_increment,
    Role varchar(200) not null
);


create table User(
	UserId int primary key not null auto_increment,
	Email varchar(200) not null,
	Name varchar(200),
	LastName varchar(200),
	Password nvarchar(256),
	CreatedAt datetime default(sysdate()) ,
	Actived boolean
);

create table UserRoles(
	UserRolesId int primary key not null auto_increment,
    IdUser int not null,
    IdRole int not null,
    FOREIGN KEY(IdRole) REFERENCES Roles (RolesId),
    FOREIGN KEY(IdUser) REFERENCES User (UserId)
);
/*-------------------- area del instituto-------------------------- */


create table Institute(
	InstituteId int not null primary key auto_increment,
	Name varchar(200) not null
);


create table InstituteMembers(
	InstituteMembersID int not null primary key auto_increment,
	InstituteID int not null,
	UserId int not null,
	FOREIGN KEY(InstituteID) REFERENCES Institute (InstituteId),
	FOREIGN KEY(UserId) REFERENCES User (UserId)
);

/*------------------ area de los grados----------------------------*/

create table Grades(
	GradesID int primary key not null auto_increment,
	BooksId varchar(200) not null,
	Progress int,
	Grade float,
	UserId int not null,
	FOREIGN KEY(UserId) REFERENCES User (UserId)
);

/*------------------ area de los Books----------------------------*/
create table Book(
	BookID int  not null primary key auto_increment,
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
	TagsId int not null primary key auto_increment,
	Description nvarchar(50) Not null
);

create table TagsPerBook(
	TagsPerBookId int not null primary key auto_increment,
	BookId int,
	TagsID  int,
	FOREIGN KEY(BookId) REFERENCES Book (BookID),
	FOREIGN KEY(TagsID) REFERENCES Tags (TagsId)
);

create table Pages(
PageId int not null primary key auto_increment,
BookId int,
ElemetOrder int not null,
Type int not null,
Template int not null,
FOREIGN KEY(BookId) REFERENCES Book (BookID)
);

create table TagsPerPage(
TagsPerPageId int not null primary key auto_increment,
PageID int,
TagsID int,
FOREIGN KEY(PageID) REFERENCES Pages (PageId),
FOREIGN KEY(TagsID) REFERENCES Tags (TagsId)
);

create table Widget(
WidgetId int not null primary key auto_increment,
Name varchar(200),
Type int
);

create table WidgetItem(
WidgetItemId int not null primary key auto_increment,
PageId int,
WidgetId int,
Value int,
Type int not null,
FOREIGN KEY(PageId) REFERENCES Pages (PageId),
FOREIGN KEY(WidgetId) REFERENCES Widget (WidgetId)
);

/*------------------ area de los Classes & Groups----------------------------*/

create table StudentGroups(
StudentGroupsId int primary key not null auto_increment,
UserId int not null,
isTeacher Boolean default False,
CreatedBy int not null,
CreatedAt DateTime default(sysdate()),
FOREIGN KEY(UserId) REFERENCES User (UserId),
FOREIGN KEY(CreatedBy) REFERENCES User (UserId)
);


create table Classes(
ClassesId int not null primary key auto_increment,
Name varchar(200) not null,
Grade int,
TeacherAssigned int,
CreatedAt DateTime default(sysdate()),
LastUpdateAt datetime default(sysdate()),
FOREIGN KEY(TeacherAssigned) REFERENCES User (UserId)
);

create table ClassesLog(
 ClassesLogId int not null primary key auto_increment,
 ClassesID int not null,
 UserID int not null,
 CreatedAt DateTime default(sysdate()),
 Description nvarchar(100),
FOREIGN KEY(UserID) REFERENCES User (UserId),
FOREIGN KEY(ClassesID) REFERENCES Classes (ClassesId)
);

create table BooksPerClasses(
BooksPerClasses int not null primary key auto_increment,
BooksId int ,
ClassesId int,
FOREIGN KEY(ClassesId) REFERENCES Classes (ClassesId),
FOREIGN KEY(BooksId) REFERENCES Book (BookID)
);

create table GroupsPerClasses(
GroupsPerClassesId int not null primary key auto_increment,
StudentGroupsId int,
ClassesId int,
FOREIGN KEY(ClassesId) REFERENCES Classes (ClassesId),
FOREIGN KEY(StudentGroupsId) REFERENCES StudentGroups (StudentGroupsId)
);

/*------------------area de ShareBooks-------------------------*/
create table AuthorList(
AuthorListId int not null primary key auto_increment,
BookID int,
UserID int,
FOREIGN KEY(UserID) REFERENCES User (UserId),
FOREIGN KEY(BookID) REFERENCES Book (BookID)
);

create table SharedBooks(
SharedBooksId int not null primary key auto_increment,
BookID int,
UserID int,
FOREIGN KEY(UserID) REFERENCES User (UserId),
FOREIGN KEY(BookID) REFERENCES Book (BookId)
); 