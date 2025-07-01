-- FUNREAD.auth_group definition

CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- FUNREAD.auth_user definition

CREATE TABLE `auth_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- FUNREAD.avatarcreator definition

CREATE TABLE `avatarcreator` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `skin_color` varchar(50) NOT NULL,
  `hair_style` varchar(50) NOT NULL,
  `accessories` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`accessories`)),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- FUNREAD.badges definition

CREATE TABLE `badges` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `points` int(11) NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `is_teacher_badge` tinyint(1) NOT NULL,
  `progress_placeholder` int(11) DEFAULT NULL,
  `show_progress` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- FUNREAD.bookcategory definition

CREATE TABLE `bookcategory` (
  `BookCategoryID` int(11) NOT NULL AUTO_INCREMENT,
  `CategoryName` varchar(100) NOT NULL,
  PRIMARY KEY (`BookCategoryID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- FUNREAD.django_content_type definition

CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- FUNREAD.django_migrations definition

CREATE TABLE `django_migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- FUNREAD.django_session definition

CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- FUNREAD.institute definition

CREATE TABLE `institute` (
  `InstituteId` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(200) NOT NULL,
  PRIMARY KEY (`InstituteId`),
  UNIQUE KEY `Name` (`Name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- FUNREAD.mail definition

CREATE TABLE `mail` (
  `emailId` int(11) NOT NULL AUTO_INCREMENT,
  `emailTo` varchar(254) NOT NULL,
  `emailFrom` varchar(254) NOT NULL,
  `emailSubject` varchar(100) NOT NULL,
  `bodyMessage` longtext NOT NULL,
  PRIMARY KEY (`emailId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- FUNREAD.media definition

CREATE TABLE `media` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(300) NOT NULL,
  `extension` varchar(10) NOT NULL,
  `file` varchar(100) NOT NULL,
  `type` int(11) NOT NULL,
  `galleryType` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- FUNREAD.roles definition

CREATE TABLE `roles` (
  `RolesId` int(11) NOT NULL AUTO_INCREMENT,
  `Role` varchar(200) NOT NULL,
  PRIMARY KEY (`RolesId`),
  UNIQUE KEY `Role` (`Role`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- FUNREAD.tags definition

CREATE TABLE `tags` (
  `TagsId` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(50) NOT NULL,
  `descriptionn` varchar(50) NOT NULL,
  PRIMARY KEY (`TagsId`),
  UNIQUE KEY `description` (`description`),
  UNIQUE KEY `descriptionn` (`descriptionn`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- FUNREAD.teacher definition

CREATE TABLE `teacher` (
  `TeacherId` int(11) NOT NULL AUTO_INCREMENT,
  `TeacherName` varchar(500) NOT NULL,
  `TeacherPwd` varchar(50) NOT NULL,
  PRIMARY KEY (`TeacherId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- FUNREAD.team definition

CREATE TABLE `team` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `Points` int(11) NOT NULL,
  `CreatedAt` datetime(6) NOT NULL,
  `LastUpdated` datetime(6) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- FUNREAD.`user` definition

CREATE TABLE `user` (
  `UserId` int(11) NOT NULL AUTO_INCREMENT,
  `Email` varchar(254) NOT NULL,
  `Name` varchar(200) DEFAULT NULL,
  `LastName` varchar(200) DEFAULT NULL,
  `password` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `CreatedAt` datetime(6) DEFAULT NULL,
  `Actived` int(11) DEFAULT NULL,
  `UserName` varchar(200) DEFAULT NULL,
  `Level` int(11) DEFAULT NULL,
  PRIMARY KEY (`UserId`),
  UNIQUE KEY `Email` (`Email`),
  UNIQUE KEY `UserName` (`UserName`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- FUNREAD.widget definition

CREATE TABLE `widget` (
  `WidgetId` int(11) NOT NULL AUTO_INCREMENT,
  `Type` int(11) DEFAULT NULL,
  `Name` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`WidgetId`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- FUNREAD.auth_permission definition

CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=193 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- FUNREAD.auth_user_groups definition

CREATE TABLE `auth_user_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- FUNREAD.auth_user_user_permissions definition

CREATE TABLE `auth_user_user_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- FUNREAD.book definition

CREATE TABLE `book` (
  `BookID` int(11) NOT NULL AUTO_INCREMENT,
  `Title` varchar(200) NOT NULL,
  `Category` int(11) DEFAULT NULL,
  `Portrait` varchar(200) DEFAULT NULL,
  `CreatedAt` datetime(6) DEFAULT NULL,
  `LastUpdateAt` datetime(6) DEFAULT NULL,
  `State` int(11) NOT NULL,
  `SharedBook` int(11) DEFAULT NULL,
  `Description` varchar(500) DEFAULT NULL,
  `CreatedBy` int(11) DEFAULT NULL,
  `LastUpdateBy` int(11) DEFAULT NULL,
  PRIMARY KEY (`BookID`),
  UNIQUE KEY `Title` (`Title`),
  KEY `book_CreatedBy_6b9d499e_fk_user_UserId` (`CreatedBy`),
  KEY `book_LastUpdateBy_3a7dc064_fk_user_UserId` (`LastUpdateBy`),
  CONSTRAINT `book_CreatedBy_6b9d499e_fk_user_UserId` FOREIGN KEY (`CreatedBy`) REFERENCES `user` (`UserId`),
  CONSTRAINT `book_LastUpdateBy_3a7dc064_fk_user_UserId` FOREIGN KEY (`LastUpdateBy`) REFERENCES `user` (`UserId`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- FUNREAD.bookbadge definition

CREATE TABLE `bookbadge` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `BadgeId` bigint(20) NOT NULL,
  `BookId` int(11) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `bookbadge_BadgeId_dabc87a8_fk_badges_id` (`BadgeId`),
  KEY `bookbadge_BookId_1621daaf` (`BookId`),
  CONSTRAINT `bookbadge_BadgeId_dabc87a8_fk_badges_id` FOREIGN KEY (`BadgeId`) REFERENCES `badges` (`id`),
  CONSTRAINT `bookbadge_BookId_1621daaf_fk_book_BookID` FOREIGN KEY (`BookId`) REFERENCES `book` (`BookID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- FUNREAD.bookdimension definition

CREATE TABLE `bookdimension` (
  `BookDimensionID` int(11) NOT NULL AUTO_INCREMENT,
  `DimensionName` varchar(150) NOT NULL,
  `BookCategoryID` int(11) NOT NULL,
  PRIMARY KEY (`BookDimensionID`),
  KEY `bookdimension_BookCategoryID_a4a53629_fk_bookcateg` (`BookCategoryID`),
  CONSTRAINT `bookdimension_BookCategoryID_a4a53629_fk_bookcateg` FOREIGN KEY (`BookCategoryID`) REFERENCES `bookcategory` (`BookCategoryID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- FUNREAD.django_admin_log definition

CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext DEFAULT NULL,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK (`action_flag` >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- FUNREAD.folders definition

CREATE TABLE `folders` (
  `FoldersId` int(11) NOT NULL AUTO_INCREMENT,
  `NameFolders` varchar(200) NOT NULL,
  `createdBy` int(11) NOT NULL,
  PRIMARY KEY (`FoldersId`),
  KEY `folders_createdBy_e92a3262_fk_user_UserId` (`createdBy`),
  CONSTRAINT `folders_createdBy_e92a3262_fk_user_UserId` FOREIGN KEY (`createdBy`) REFERENCES `user` (`UserId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- FUNREAD.grades definition

CREATE TABLE `grades` (
  `GradesID` int(11) NOT NULL AUTO_INCREMENT,
  `Progress` int(11) DEFAULT NULL,
  `Grade` double DEFAULT NULL,
  `isactive` int(11) DEFAULT NULL,
  `BookID` int(11) NOT NULL,
  `UserId` int(11) NOT NULL,
  PRIMARY KEY (`GradesID`),
  KEY `grades_BookID_d760f945_fk_book_BookID` (`BookID`),
  KEY `grades_UserId_62b50991_fk_user_UserId` (`UserId`),
  CONSTRAINT `grades_BookID_d760f945_fk_book_BookID` FOREIGN KEY (`BookID`) REFERENCES `book` (`BookID`),
  CONSTRAINT `grades_UserId_62b50991_fk_user_UserId` FOREIGN KEY (`UserId`) REFERENCES `user` (`UserId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- FUNREAD.groupscreate definition

CREATE TABLE `groupscreate` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(300) NOT NULL,
  `createdat` datetime(6) DEFAULT NULL,
  `isactive` int(11) DEFAULT NULL,
  `createdby_id` int(11) NOT NULL,
  `idimage_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `groupscreate_createdby_id_d07d38ab_fk_user_UserId` (`createdby_id`),
  KEY `groupscreate_idimage_id_d1b10547_fk_media_id` (`idimage_id`),
  CONSTRAINT `groupscreate_createdby_id_d07d38ab_fk_user_UserId` FOREIGN KEY (`createdby_id`) REFERENCES `user` (`UserId`),
  CONSTRAINT `groupscreate_idimage_id_d1b10547_fk_media_id` FOREIGN KEY (`idimage_id`) REFERENCES `media` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- FUNREAD.institutemembers definition

CREATE TABLE `institutemembers` (
  `InstituteMembersID` int(11) NOT NULL AUTO_INCREMENT,
  `InstituteID` int(11) NOT NULL,
  `UserId` int(11) NOT NULL,
  PRIMARY KEY (`InstituteMembersID`),
  KEY `institutemembers_InstituteID_4f5ee88b_fk_institute_InstituteId` (`InstituteID`),
  KEY `institutemembers_UserId_481757d0_fk_user_UserId` (`UserId`),
  CONSTRAINT `institutemembers_InstituteID_4f5ee88b_fk_institute_InstituteId` FOREIGN KEY (`InstituteID`) REFERENCES `institute` (`InstituteId`),
  CONSTRAINT `institutemembers_UserId_481757d0_fk_user_UserId` FOREIGN KEY (`UserId`) REFERENCES `user` (`UserId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- FUNREAD.pages definition

CREATE TABLE `pages` (
  `PageId` int(11) NOT NULL AUTO_INCREMENT,
  `Type` int(11) NOT NULL,
  `Template` int(11) NOT NULL,
  `ElementOrder` int(11) NOT NULL,
  `GridDirection` longtext DEFAULT NULL,
  `GridNumRows` int(11) DEFAULT NULL,
  `Actived` int(11) DEFAULT NULL,
  `BookId` int(11) DEFAULT NULL,
  PRIMARY KEY (`PageId`),
  KEY `pages_BookId_f1863eda_fk_book_BookID` (`BookId`),
  CONSTRAINT `pages_BookId_f1863eda_fk_book_BookID` FOREIGN KEY (`BookId`) REFERENCES `book` (`BookID`)
) ENGINE=InnoDB AUTO_INCREMENT=141 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- FUNREAD.sharedbooks definition

CREATE TABLE `sharedbooks` (
  `SharedBooksId` int(11) NOT NULL AUTO_INCREMENT,
  `BookID` int(11) DEFAULT NULL,
  `UserID` int(11) DEFAULT NULL,
  PRIMARY KEY (`SharedBooksId`),
  KEY `sharedbooks_BookID_3c933870_fk_book_BookID` (`BookID`),
  KEY `sharedbooks_UserID_fc5a94cd_fk_user_UserId` (`UserID`),
  CONSTRAINT `sharedbooks_BookID_3c933870_fk_book_BookID` FOREIGN KEY (`BookID`) REFERENCES `book` (`BookID`),
  CONSTRAINT `sharedbooks_UserID_fc5a94cd_fk_user_UserId` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- FUNREAD.studentgroups definition

CREATE TABLE `studentgroups` (
  `StudentsGroupsId` int(11) NOT NULL AUTO_INCREMENT,
  `isTeacher` int(11) DEFAULT NULL,
  `CreatedAt` datetime(6) DEFAULT NULL,
  `isactive` int(11) DEFAULT NULL,
  `CreatedBy` int(11) NOT NULL,
  `GroupsCreateId` int(11) NOT NULL,
  `UserId` int(11) NOT NULL,
  PRIMARY KEY (`StudentsGroupsId`),
  UNIQUE KEY `studentgroups_UserId_GroupsCreateId_2369a45f_uniq` (`UserId`,`GroupsCreateId`),
  KEY `studentgroups_CreatedBy_0b0248e2_fk_user_UserId` (`CreatedBy`),
  KEY `studentgroups_GroupsCreateId_9fecebf7_fk_groupscreate_id` (`GroupsCreateId`),
  CONSTRAINT `studentgroups_CreatedBy_0b0248e2_fk_user_UserId` FOREIGN KEY (`CreatedBy`) REFERENCES `user` (`UserId`),
  CONSTRAINT `studentgroups_GroupsCreateId_9fecebf7_fk_groupscreate_id` FOREIGN KEY (`GroupsCreateId`) REFERENCES `groupscreate` (`id`),
  CONSTRAINT `studentgroups_UserId_d44e3f99_fk_user_UserId` FOREIGN KEY (`UserId`) REFERENCES `user` (`UserId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- FUNREAD.subtitled definition

CREATE TABLE `subtitled` (
  `idsubtitled` int(11) NOT NULL AUTO_INCREMENT,
  `transcription` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`transcription`)),
  `translation` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`translation`)),
  `idmedia` int(11) NOT NULL,
  PRIMARY KEY (`idsubtitled`),
  KEY `subtitled_idmedia_246db65a_fk_media_id` (`idmedia`),
  CONSTRAINT `subtitled_idmedia_246db65a_fk_media_id` FOREIGN KEY (`idmedia`) REFERENCES `media` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- FUNREAD.tagsperpage definition

CREATE TABLE `tagsperpage` (
  `TagsPerPageId` int(11) NOT NULL AUTO_INCREMENT,
  `PageID` int(11) DEFAULT NULL,
  `TagsID` int(11) DEFAULT NULL,
  PRIMARY KEY (`TagsPerPageId`),
  KEY `tagsperpage_PageID_14b7a954_fk_pages_PageId` (`PageID`),
  KEY `tagsperpage_TagsID_e54bfd98_fk_tags_TagsId` (`TagsID`),
  CONSTRAINT `tagsperpage_PageID_14b7a954_fk_pages_PageId` FOREIGN KEY (`PageID`) REFERENCES `pages` (`PageId`),
  CONSTRAINT `tagsperpage_TagsID_e54bfd98_fk_tags_TagsId` FOREIGN KEY (`TagsID`) REFERENCES `tags` (`TagsId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- FUNREAD.teamuser definition

CREATE TABLE `teamuser` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `TeamId` int(11) NOT NULL,
  `UserId` int(11) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `teamuser_TeamId_64489ee3_fk_team_Id` (`TeamId`),
  KEY `teamuser_UserId_eb6aad8b_fk_user_UserId` (`UserId`),
  CONSTRAINT `teamuser_TeamId_64489ee3_fk_team_Id` FOREIGN KEY (`TeamId`) REFERENCES `team` (`Id`),
  CONSTRAINT `teamuser_UserId_eb6aad8b_fk_user_UserId` FOREIGN KEY (`UserId`) REFERENCES `user` (`UserId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- FUNREAD.userbadge definition

CREATE TABLE `userbadge` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `date` datetime(6) NOT NULL,
  `badge_id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `achieved` tinyint(1) NOT NULL,
  `progress` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userbadge_badge_id_83e2660f_fk_badges_id` (`badge_id`),
  KEY `userbadge_user_id_173a5980_fk_user_UserId` (`user_id`),
  CONSTRAINT `userbadge_badge_id_83e2660f_fk_badges_id` FOREIGN KEY (`badge_id`) REFERENCES `badges` (`id`),
  CONSTRAINT `userbadge_user_id_173a5980_fk_user_UserId` FOREIGN KEY (`user_id`) REFERENCES `user` (`UserId`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- FUNREAD.userbookprogress definition

CREATE TABLE `userbookprogress` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Status` int(11) NOT NULL,
  `Calificacion` double DEFAULT NULL,
  `BookId` int(11) NOT NULL,
  `UserId` int(11) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `userbookprogress_BookId_48fefd8f_fk_book_BookID` (`BookId`),
  KEY `userbookprogress_UserId_985447e2_fk_user_UserId` (`UserId`),
  CONSTRAINT `userbookprogress_BookId_48fefd8f_fk_book_BookID` FOREIGN KEY (`BookId`) REFERENCES `book` (`BookID`),
  CONSTRAINT `userbookprogress_UserId_985447e2_fk_user_UserId` FOREIGN KEY (`UserId`) REFERENCES `user` (`UserId`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- FUNREAD.userpoints definition

CREATE TABLE `userpoints` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `total_points` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userpoints_user_id_bca82fd3_fk_user_UserId` (`user_id`),
  CONSTRAINT `userpoints_user_id_bca82fd3_fk_user_UserId` FOREIGN KEY (`user_id`) REFERENCES `user` (`UserId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- FUNREAD.userpointslog definition

CREATE TABLE `userpointslog` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Points` int(11) NOT NULL,
  `Reason` varchar(255) NOT NULL,
  `Date` date NOT NULL,
  `UserId` int(11) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `userpointslog_UserId_7c1cee42_fk_user_UserId` (`UserId`),
  CONSTRAINT `userpointslog_UserId_7c1cee42_fk_user_UserId` FOREIGN KEY (`UserId`) REFERENCES `user` (`UserId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- FUNREAD.userroles definition

CREATE TABLE `userroles` (
  `UserRolesId` int(11) NOT NULL AUTO_INCREMENT,
  `IdRole` int(11) NOT NULL,
  `IdUser` int(11) NOT NULL,
  PRIMARY KEY (`UserRolesId`),
  KEY `userroles_IdRole_c2fd6b66_fk_roles_RolesId` (`IdRole`),
  KEY `userroles_IdUser_eb9dbf8e_fk_user_UserId` (`IdUser`),
  CONSTRAINT `userroles_IdRole_c2fd6b66_fk_roles_RolesId` FOREIGN KEY (`IdRole`) REFERENCES `roles` (`RolesId`),
  CONSTRAINT `userroles_IdUser_eb9dbf8e_fk_user_UserId` FOREIGN KEY (`IdUser`) REFERENCES `user` (`UserId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- FUNREAD.widgetitem definition

CREATE TABLE `widgetitem` (
  `WidgetItemId` int(11) NOT NULL AUTO_INCREMENT,
  `Value` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`Value`)),
  `Type` int(11) DEFAULT NULL,
  `ElementOrder` int(11) DEFAULT NULL,
  `PageId` int(11) DEFAULT NULL,
  `WidgetId` int(11) DEFAULT NULL,
  PRIMARY KEY (`WidgetItemId`),
  KEY `widgetitem_PageId_fcdb6b69_fk_pages_PageId` (`PageId`),
  KEY `widgetitem_WidgetId_935558da_fk_widget_WidgetId` (`WidgetId`),
  CONSTRAINT `widgetitem_PageId_fcdb6b69_fk_pages_PageId` FOREIGN KEY (`PageId`) REFERENCES `pages` (`PageId`),
  CONSTRAINT `widgetitem_WidgetId_935558da_fk_widget_WidgetId` FOREIGN KEY (`WidgetId`) REFERENCES `widget` (`WidgetId`)
) ENGINE=InnoDB AUTO_INCREMENT=138 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- FUNREAD.auth_group_permissions definition

CREATE TABLE `auth_group_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- FUNREAD.authorlist definition

CREATE TABLE `authorlist` (
  `AuthorListId` int(11) NOT NULL AUTO_INCREMENT,
  `BookID` int(11) DEFAULT NULL,
  `UserID` int(11) DEFAULT NULL,
  PRIMARY KEY (`AuthorListId`),
  KEY `authorlist_BookID_9ca75d4b_fk_book_BookID` (`BookID`),
  KEY `authorlist_UserID_f224abf1_fk_user_UserId` (`UserID`),
  CONSTRAINT `authorlist_BookID_9ca75d4b_fk_book_BookID` FOREIGN KEY (`BookID`) REFERENCES `book` (`BookID`),
  CONSTRAINT `authorlist_UserID_f224abf1_fk_user_UserId` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- FUNREAD.bookdilemma definition

CREATE TABLE `bookdilemma` (
  `BookDilemmaID` int(11) NOT NULL AUTO_INCREMENT,
  `Dilemma` varchar(500) NOT NULL,
  `BookDimensionID` int(11) NOT NULL,
  PRIMARY KEY (`BookDilemmaID`),
  KEY `bookdilemma_BookDimensionID_8a832aad_fk_bookdimen` (`BookDimensionID`),
  CONSTRAINT `bookdilemma_BookDimensionID_8a832aad_fk_bookdimen` FOREIGN KEY (`BookDimensionID`) REFERENCES `bookdimension` (`BookDimensionID`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- FUNREAD.classes definition

CREATE TABLE `classes` (
  `ClassesId` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(200) NOT NULL,
  `Grade` int(11) DEFAULT NULL,
  `CreatedAt` datetime(6) DEFAULT NULL,
  `LastUpdateAt` datetime(6) DEFAULT NULL,
  `StartDate` datetime(6) DEFAULT NULL,
  `FinishDate` datetime(6) DEFAULT NULL,
  `isactive` int(11) DEFAULT NULL,
  `GroupsCreateId` int(11) DEFAULT NULL,
  `TeacherAssigned` int(11) DEFAULT NULL,
  PRIMARY KEY (`ClassesId`),
  KEY `classes_GroupsCreateId_9bf79e5a_fk_groupscreate_id` (`GroupsCreateId`),
  KEY `classes_TeacherAssigned_beabde17_fk_user_UserId` (`TeacherAssigned`),
  CONSTRAINT `classes_GroupsCreateId_9bf79e5a_fk_groupscreate_id` FOREIGN KEY (`GroupsCreateId`) REFERENCES `groupscreate` (`id`),
  CONSTRAINT `classes_TeacherAssigned_beabde17_fk_user_UserId` FOREIGN KEY (`TeacherAssigned`) REFERENCES `user` (`UserId`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- FUNREAD.classeslog definition

CREATE TABLE `classeslog` (
  `ClassesLogId` int(11) NOT NULL AUTO_INCREMENT,
  `CreatedAt` datetime(6) DEFAULT NULL,
  `Description` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `ClassesID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  PRIMARY KEY (`ClassesLogId`),
  KEY `classeslog_ClassesID_e27aaaaa_fk_classes_ClassesId` (`ClassesID`),
  KEY `classeslog_UserID_496e46de_fk_user_UserId` (`UserID`),
  CONSTRAINT `classeslog_ClassesID_e27aaaaa_fk_classes_ClassesId` FOREIGN KEY (`ClassesID`) REFERENCES `classes` (`ClassesId`),
  CONSTRAINT `classeslog_UserID_496e46de_fk_user_UserId` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- FUNREAD.dilemmaperbook definition

CREATE TABLE `dilemmaperbook` (
  `DilemmaPerBookID` int(11) NOT NULL AUTO_INCREMENT,
  `BookDilemmaID` int(11) NOT NULL,
  `BookID` int(11) NOT NULL,
  PRIMARY KEY (`DilemmaPerBookID`),
  KEY `dilemmaperbook_BookDilemmaID_5d5ed72b_fk_bookdilem` (`BookDilemmaID`),
  KEY `dilemmaperbook_BookID_da6fa17c_fk_book_BookID` (`BookID`),
  CONSTRAINT `dilemmaperbook_BookDilemmaID_5d5ed72b_fk_bookdilem` FOREIGN KEY (`BookDilemmaID`) REFERENCES `bookdilemma` (`BookDilemmaID`),
  CONSTRAINT `dilemmaperbook_BookID_da6fa17c_fk_book_BookID` FOREIGN KEY (`BookID`) REFERENCES `book` (`BookID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- FUNREAD.file definition

CREATE TABLE `file` (
  `FileId` int(11) NOT NULL AUTO_INCREMENT,
  `Namefile` varchar(200) NOT NULL,
  `FileLocation` varchar(200) NOT NULL,
  `FoldersId` int(11) NOT NULL,
  `IdTags` int(11) DEFAULT NULL,
  `UploadBy` int(11) NOT NULL,
  PRIMARY KEY (`FileId`),
  KEY `file_FoldersId_58e8d127_fk_folders_FoldersId` (`FoldersId`),
  KEY `file_IdTags_430eda59_fk_tags_TagsId` (`IdTags`),
  KEY `file_UploadBy_13a4c892_fk_user_UserId` (`UploadBy`),
  CONSTRAINT `file_FoldersId_58e8d127_fk_folders_FoldersId` FOREIGN KEY (`FoldersId`) REFERENCES `folders` (`FoldersId`),
  CONSTRAINT `file_IdTags_430eda59_fk_tags_TagsId` FOREIGN KEY (`IdTags`) REFERENCES `tags` (`TagsId`),
  CONSTRAINT `file_UploadBy_13a4c892_fk_user_UserId` FOREIGN KEY (`UploadBy`) REFERENCES `user` (`UserId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- FUNREAD.groupsperclasses definition

CREATE TABLE `groupsperclasses` (
  `GroupsPerClassesId` int(11) NOT NULL AUTO_INCREMENT,
  `ClassesId` int(11) DEFAULT NULL,
  `StudentsGroupsId` int(11) DEFAULT NULL,
  PRIMARY KEY (`GroupsPerClassesId`),
  KEY `groupsperclasses_ClassesId_10cbcc07_fk_classes_ClassesId` (`ClassesId`),
  KEY `groupsperclasses_StudentsGroupsId_d9560df5_fk_studentgr` (`StudentsGroupsId`),
  CONSTRAINT `groupsperclasses_ClassesId_10cbcc07_fk_classes_ClassesId` FOREIGN KEY (`ClassesId`) REFERENCES `classes` (`ClassesId`),
  CONSTRAINT `groupsperclasses_StudentsGroupsId_d9560df5_fk_studentgr` FOREIGN KEY (`StudentsGroupsId`) REFERENCES `studentgroups` (`StudentsGroupsId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- FUNREAD.invitations definition

CREATE TABLE `invitations` (
  `joinId` int(11) NOT NULL AUTO_INCREMENT,
  `code` longtext NOT NULL,
  `password` longtext NOT NULL,
  `bookId` int(11) DEFAULT NULL,
  `classesId` int(11) DEFAULT NULL,
  PRIMARY KEY (`joinId`),
  KEY `invitations_bookId_4927a53e_fk_book_BookID` (`bookId`),
  KEY `invitations_classesId_0b311ddf_fk_classes_ClassesId` (`classesId`),
  CONSTRAINT `invitations_bookId_4927a53e_fk_book_BookID` FOREIGN KEY (`bookId`) REFERENCES `book` (`BookID`),
  CONSTRAINT `invitations_classesId_0b311ddf_fk_classes_ClassesId` FOREIGN KEY (`classesId`) REFERENCES `classes` (`ClassesId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- FUNREAD.`options` definition

CREATE TABLE `options` (
  `idoption` int(11) NOT NULL AUTO_INCREMENT,
  `answer` varchar(500) NOT NULL,
  `points` int(11) DEFAULT NULL,
  `iscorrect` int(11) DEFAULT NULL,
  `isactive` int(11) DEFAULT NULL,
  `createdat` datetime(6) DEFAULT NULL,
  `createdby_id` int(11) NOT NULL,
  `idimage_id` int(11) DEFAULT NULL,
  `idwidgetitem_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`idoption`),
  KEY `options_createdby_id_b8eb98b5_fk_user_UserId` (`createdby_id`),
  KEY `options_idimage_id_9617caae_fk_media_id` (`idimage_id`),
  KEY `options_idwidgetitem_id_c9ffbfe1_fk_widgetitem_WidgetItemId` (`idwidgetitem_id`),
  CONSTRAINT `options_createdby_id_b8eb98b5_fk_user_UserId` FOREIGN KEY (`createdby_id`) REFERENCES `user` (`UserId`),
  CONSTRAINT `options_idimage_id_9617caae_fk_media_id` FOREIGN KEY (`idimage_id`) REFERENCES `media` (`id`),
  CONSTRAINT `options_idwidgetitem_id_c9ffbfe1_fk_widgetitem_WidgetItemId` FOREIGN KEY (`idwidgetitem_id`) REFERENCES `widgetitem` (`WidgetItemId`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- FUNREAD.booksperclasses definition

CREATE TABLE `booksperclasses` (
  `BooksPerClasses` int(11) NOT NULL AUTO_INCREMENT,
  `Order` int(11) DEFAULT NULL,
  `isactive` int(11) DEFAULT NULL,
  `BooksId` int(11) DEFAULT NULL,
  `ClassesId` int(11) DEFAULT NULL,
  PRIMARY KEY (`BooksPerClasses`),
  KEY `booksperclasses_BooksId_62682c88_fk_book_BookID` (`BooksId`),
  KEY `booksperclasses_ClassesId_c4f6e396_fk_classes_ClassesId` (`ClassesId`),
  CONSTRAINT `booksperclasses_BooksId_62682c88_fk_book_BookID` FOREIGN KEY (`BooksId`) REFERENCES `book` (`BookID`),
  CONSTRAINT `booksperclasses_ClassesId_c4f6e396_fk_classes_ClassesId` FOREIGN KEY (`ClassesId`) REFERENCES `classes` (`ClassesId`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
