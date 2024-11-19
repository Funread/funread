use funread;

/*  cambio de José Manuel AM */
alter table widgetItem drop primary key;
/*--------------------Cambiar el password de user a 256------------------*/
alter table user modify column password nvarchar(256);

/*--------------------Agregar de la elementorder en pages y name en widget------------------*/
Alter table pages Add ElementOrder int not null;
Alter table widget Add Name varchar(200);


/*--------------------Cambio de nombre de la tabla grouos------------------*/
alter table groups rename StudentGroups;

/*------------------Borramiento de llaves foraneas------------------------*/
ALTER TABLE booksperclasses  drop foreign key booksperclasses_ibfk_1;
ALTER TABLE booksperclasses  drop foreign key `booksperclasses_ibfk_2`;
Alter Table classeslog DROP foreign key classeslog_ibfk_1;
ALTER TABLE classeslog DROP foreign key classeslog_ibfk_2;
Alter Table groupsperclasses DROP foreign key groupsperclasses_ibfk_1;
ALTER TABLE groupsperclasses DROP foreign key groupsperclasses_ibfk_2;
Alter table widgetitem drop foreign key widgetitem_ibfk_2;
Alter table tagsperpage drop foreign key tagsperpage_ibfk_1;
Alter table widget drop foreign key widget_ibfk_1;
Alter table widgetitem drop foreign key widgetitem_ibfk_1;
Alter table file drop foreign key file_ibfk_3;
Alter table tagsperbook drop foreign key tagsperbook_ibfk_2;
Alter table tagsperpage drop foreign key tagsperpage_ibfk_2;
Alter table authorlist drop foreign key authorlist_ibfk_2;
Alter table pages drop foreign key pages_ibfk_1;
Alter table sharedbooks drop foreign key sharedbooks_ibfk_2;
Alter table tagsperbook drop foreign key tagsperbook_ibfk_1;
Alter table institutemembers drop foreign key institutemembers_ibfk_1;
Alter table book drop foreign key book_ibfk_1;
Alter table book drop foreign key book_ibfk_2;
Alter table classes drop foreign key classes_ibfk_1;
Alter table file drop foreign key file_ibfk_2;
Alter table folders drop foreign key folders_ibfk_1;
Alter table grades drop foreign key grades_ibfk_1;
Alter table sharedbooks drop foreign key sharedbooks_ibfk_1;
Alter table studentgroups drop foreign key studentgroups_ibfk_1;
Alter table studentgroups drop foreign key studentgroups_ibfk_2;
Alter table userroles drop foreign key userroles_ibfk_2;
Alter table userroles drop foreign key userroles_ibfk_1;
Alter table authorlist drop foreign key authorlist_ibfk_1;
Alter table institutemembers drop foreign key institutemembers_ibfk_2;

/*-----------------------Poner Autoincrementales----------------------------------------------*/

ALTER TABLE `sharedbooks` CHANGE `SharedBooksId` `SharedBooksId` INT(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `authorlist` CHANGE `AuthorListId` `AuthorListId` INT(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `groupsperclasses` CHANGE `GroupsPerClassesId` `GroupsPerClassesId` INT(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `booksperclasses` CHANGE `BooksPerClasses` `BooksPerClasses` INT(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `classeslog` CHANGE `ClassesLogId` `ClassesLogId` INT(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `classes` CHANGE `ClassesId` `ClassesId` INT(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `studentgroups` CHANGE `GroupsId` `GroupsId` INT(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `widgetitem` CHANGE `WidgetItemId` `WidgetItemId` INT(11) NOT NULL AUTO_INCREMENT primary key;
ALTER TABLE `widget` CHANGE `WidgetId` `WidgetId` INT(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `tagsperpage` CHANGE `TagsPerPageId` `TagsPerPageId` INT(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `pages` CHANGE `PageId` `PageId` INT(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `tagsperbook` CHANGE `TagsPerBookId` `TagsPerBookId` INT(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `tags` CHANGE `TagsId` `TagsId` INT(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `book` CHANGE `BookID` `BookID` INT(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `grades` CHANGE `GradesID` `GradesID` INT(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `institutemembers` CHANGE `InstituteMembersID` `InstituteMembersID` INT(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `institute` CHANGE `InstituteId` `InstituteId` INT(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `userroles` CHANGE `UserRolesId` `UserRolesId` INT(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `user` CHANGE `UserId` `UserId` INT(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `roles` CHANGE `RolesId` `RolesId` INT(11) NOT NULL AUTO_INCREMENT;

/*----------------------------Borrar Page---------------------------------*/
Alter table widget drop column PageId;

/*-----------------------------Agregar LLaves Foreneas----------------------*/


Alter table userroles add foreign key(IdUser) references user(UserId);
Alter table userroles add foreign key(IdRole) references Roles(RolesId);

Alter table InstituteMembers add foreign key(UserId) references user(UserId);
Alter table InstituteMembers add foreign key(InstituteId) references Institute(InstituteID);

Alter table Grades add FOREIGN KEY(UserId) REFERENCES User (UserId);

Alter table Book add FOREIGN KEY(CreatedBy) REFERENCES User (UserId);
Alter table Book add FOREIGN KEY(LastUpdateBy) REFERENCES User (UserId);

Alter table tagsperbook add FOREIGN KEY(BookId) REFERENCES Book (BookID);
Alter table tagsperbook add FOREIGN KEY(TagsID) REFERENCES Tags (TagsId);

Alter table pages add FOREIGN KEY(BookId) REFERENCES Book (BookID);

Alter table tagsperpage add FOREIGN KEY(PageID) REFERENCES Pages (PageId);
Alter table tagsperpage add FOREIGN KEY(TagsID) REFERENCES Tags (TagsId);

Alter table widgetItem add FOREIGN KEY(PageId) REFERENCES Pages (PageId);
Alter table widgetItem add FOREIGN KEY(WidgetId) REFERENCES Widget (WidgetId);

Alter table studentGroups add FOREIGN KEY(UserId) REFERENCES User (UserId);
Alter table studentGroups add FOREIGN KEY(CreatedBy) REFERENCES User (UserId);

Alter table classes add FOREIGN KEY(TeacherAssigned) REFERENCES User (UserId);

Alter table classesLog add FOREIGN KEY(UserID) REFERENCES User (UserId);
Alter table classesLog add FOREIGN KEY(ClassesID) REFERENCES Classes (ClassesId);

Alter table BooksPerClasses add FOREIGN KEY(ClassesId) REFERENCES Classes (ClassesId);
Alter table BooksPerClasses add FOREIGN KEY(BooksId) REFERENCES Book (BookID);

Alter table GroupsPerClasses add FOREIGN KEY(ClassesId) REFERENCES Classes (ClassesId);
Alter table GroupsPerClasses add FOREIGN KEY(GroupsId) REFERENCES studentGroups (GroupsId);

Alter table AuthorList add FOREIGN KEY(UserID) REFERENCES User (UserId);
Alter table AuthorList add FOREIGN KEY(BookID) REFERENCES Book (BookID);

Alter table SharedBooks add FOREIGN KEY(UserID) REFERENCES User (UserId);
Alter table SharedBooks add FOREIGN KEY(BookID) REFERENCES Book (BookId);
