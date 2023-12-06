use FUNREAD;

create table Mail(
emailId int not null primary key auto_increment,
emailTo varchar(200) not null,
emailFrom varchar(200) not null,
emailSubject varchar(50),
bodyMessage text(500) not null
);

create table MailControl(
mailControlId int not null primary key auto_increment,
date datetime default(sysdate()),
category int not null,
status varchar(5) not null,
idControl int ,
emailFrom varchar(200) not null,
FOREIGN KEY(idControl) REFERENCES Mail (emailId)
);

ALTER TABLE User ADD UNIQUE (email);
Alter table MailControl add FOREIGN KEY(emailFrom) REFERENCES User (Email);