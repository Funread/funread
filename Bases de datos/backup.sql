-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: funread
-- ------------------------------------------------------
-- Server version	9.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=193 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add user',4,'add_user'),(14,'Can change user',4,'change_user'),(15,'Can delete user',4,'delete_user'),(16,'Can view user',4,'view_user'),(17,'Can add content type',5,'add_contenttype'),(18,'Can change content type',5,'change_contenttype'),(19,'Can delete content type',5,'delete_contenttype'),(20,'Can view content type',5,'view_contenttype'),(21,'Can add session',6,'add_session'),(22,'Can change session',6,'change_session'),(23,'Can delete session',6,'delete_session'),(24,'Can view session',6,'view_session'),(25,'Can add user',7,'add_user'),(26,'Can change user',7,'change_user'),(27,'Can delete user',7,'delete_user'),(28,'Can view user',7,'view_user'),(29,'Can add book',8,'add_book'),(30,'Can change book',8,'change_book'),(31,'Can delete book',8,'delete_book'),(32,'Can view book',8,'view_book'),(33,'Can add pages',9,'add_pages'),(34,'Can change pages',9,'change_pages'),(35,'Can delete pages',9,'delete_pages'),(36,'Can view pages',9,'view_pages'),(37,'Can add widget',10,'add_widget'),(38,'Can change widget',10,'change_widget'),(39,'Can delete widget',10,'delete_widget'),(40,'Can view widget',10,'view_widget'),(41,'Can add widget item',11,'add_widgetitem'),(42,'Can change widget item',11,'change_widgetitem'),(43,'Can delete widget item',11,'delete_widgetitem'),(44,'Can view widget item',11,'view_widgetitem'),(45,'Can add folder',12,'add_folder'),(46,'Can change folder',12,'change_folder'),(47,'Can delete folder',12,'delete_folder'),(48,'Can view folder',12,'view_folder'),(49,'Can add tags',13,'add_tags'),(50,'Can change tags',13,'change_tags'),(51,'Can delete tags',13,'delete_tags'),(52,'Can view tags',13,'view_tags'),(53,'Can add file',14,'add_file'),(54,'Can change file',14,'change_file'),(55,'Can delete file',14,'delete_file'),(56,'Can view file',14,'view_file'),(57,'Can add mail',15,'add_mail'),(58,'Can change mail',15,'change_mail'),(59,'Can delete mail',15,'delete_mail'),(60,'Can view mail',15,'view_mail'),(61,'Can add mail control',16,'add_mailcontrol'),(62,'Can change mail control',16,'change_mailcontrol'),(63,'Can delete mail control',16,'delete_mailcontrol'),(64,'Can view mail control',16,'view_mailcontrol'),(65,'Can add roles',17,'add_roles'),(66,'Can change roles',17,'change_roles'),(67,'Can delete roles',17,'delete_roles'),(68,'Can view roles',17,'view_roles'),(69,'Can add author list',18,'add_authorlist'),(70,'Can change author list',18,'change_authorlist'),(71,'Can delete author list',18,'delete_authorlist'),(72,'Can view author list',18,'view_authorlist'),(73,'Can add shared books',19,'add_sharedbooks'),(74,'Can change shared books',19,'change_sharedbooks'),(75,'Can delete shared books',19,'delete_sharedbooks'),(76,'Can view shared books',19,'view_sharedbooks'),(77,'Can add grades',20,'add_grades'),(78,'Can change grades',20,'change_grades'),(79,'Can delete grades',20,'delete_grades'),(80,'Can view grades',20,'view_grades'),(81,'Can add institute',21,'add_institute'),(82,'Can change institute',21,'change_institute'),(83,'Can delete institute',21,'delete_institute'),(84,'Can view institute',21,'view_institute'),(85,'Can add institute members',22,'add_institutemembers'),(86,'Can change institute members',22,'change_institutemembers'),(87,'Can delete institute members',22,'delete_institutemembers'),(88,'Can view institute members',22,'view_institutemembers'),(89,'Can add books per classes',23,'add_booksperclasses'),(90,'Can change books per classes',23,'change_booksperclasses'),(91,'Can delete books per classes',23,'delete_booksperclasses'),(92,'Can view books per classes',23,'view_booksperclasses'),(93,'Can add groups per classes',24,'add_groupsperclasses'),(94,'Can change groups per classes',24,'change_groupsperclasses'),(95,'Can delete groups per classes',24,'delete_groupsperclasses'),(96,'Can view groups per classes',24,'view_groupsperclasses'),(97,'Can add students groups',25,'add_studentsgroups'),(98,'Can change students groups',25,'change_studentsgroups'),(99,'Can delete students groups',25,'delete_studentsgroups'),(100,'Can view students groups',25,'view_studentsgroups'),(101,'Can add tags per page',26,'add_tagsperpage'),(102,'Can change tags per page',26,'change_tagsperpage'),(103,'Can delete tags per page',26,'delete_tagsperpage'),(104,'Can view tags per page',26,'view_tagsperpage'),(105,'Can add classes',27,'add_classes'),(106,'Can change classes',27,'change_classes'),(107,'Can delete classes',27,'delete_classes'),(108,'Can view classes',27,'view_classes'),(109,'Can add classes log',28,'add_classeslog'),(110,'Can change classes log',28,'change_classeslog'),(111,'Can delete classes log',28,'delete_classeslog'),(112,'Can view classes log',28,'view_classeslog'),(113,'Can add teachers',29,'add_teachers'),(114,'Can change teachers',29,'change_teachers'),(115,'Can delete teachers',29,'delete_teachers'),(116,'Can view teachers',29,'view_teachers'),(117,'Can add media',30,'add_media'),(118,'Can change media',30,'change_media'),(119,'Can delete media',30,'delete_media'),(120,'Can view media',30,'view_media'),(121,'Can add groups create',31,'add_groupscreate'),(122,'Can change groups create',31,'change_groupscreate'),(123,'Can delete groups create',31,'delete_groupscreate'),(124,'Can view groups create',31,'view_groupscreate'),(125,'Can add options',32,'add_options'),(126,'Can change options',32,'change_options'),(127,'Can delete options',32,'delete_options'),(128,'Can view options',32,'view_options'),(129,'Can add joins',33,'add_joins'),(130,'Can change joins',33,'change_joins'),(131,'Can delete joins',33,'delete_joins'),(132,'Can view joins',33,'view_joins'),(133,'Can add userroles',34,'add_userroles'),(134,'Can change userroles',34,'change_userroles'),(135,'Can delete userroles',34,'delete_userroles'),(136,'Can view userroles',34,'view_userroles'),(137,'Can add book category',35,'add_bookcategory'),(138,'Can change book category',35,'change_bookcategory'),(139,'Can delete book category',35,'delete_bookcategory'),(140,'Can view book category',35,'view_bookcategory'),(141,'Can add book dilemma',36,'add_bookdilemma'),(142,'Can change book dilemma',36,'change_bookdilemma'),(143,'Can delete book dilemma',36,'delete_bookdilemma'),(144,'Can view book dilemma',36,'view_bookdilemma'),(145,'Can add dilemma per book',37,'add_dilemmaperbook'),(146,'Can change dilemma per book',37,'change_dilemmaperbook'),(147,'Can delete dilemma per book',37,'delete_dilemmaperbook'),(148,'Can view dilemma per book',37,'view_dilemmaperbook'),(149,'Can add book dimension',38,'add_bookdimension'),(150,'Can change book dimension',38,'change_bookdimension'),(151,'Can delete book dimension',38,'delete_bookdimension'),(152,'Can view book dimension',38,'view_bookdimension'),(153,'Can add subtitled',39,'add_subtitled'),(154,'Can change subtitled',39,'change_subtitled'),(155,'Can delete subtitled',39,'delete_subtitled'),(156,'Can view subtitled',39,'view_subtitled'),(157,'Can add badge',40,'add_badge'),(158,'Can change badge',40,'change_badge'),(159,'Can delete badge',40,'delete_badge'),(160,'Can view badge',40,'view_badge'),(161,'Can add user points log',41,'add_userpointslog'),(162,'Can change user points log',41,'change_userpointslog'),(163,'Can delete user points log',41,'delete_userpointslog'),(164,'Can view user points log',41,'view_userpointslog'),(165,'Can add team user',42,'add_teamuser'),(166,'Can change team user',42,'change_teamuser'),(167,'Can delete team user',42,'delete_teamuser'),(168,'Can view team user',42,'view_teamuser'),(169,'Can add team',43,'add_team'),(170,'Can change team',43,'change_team'),(171,'Can delete team',43,'delete_team'),(172,'Can view team',43,'view_team'),(173,'Can add user badge',44,'add_userbadge'),(174,'Can change user badge',44,'change_userbadge'),(175,'Can delete user badge',44,'delete_userbadge'),(176,'Can view user badge',44,'view_userbadge'),(177,'Can add user points',45,'add_userpoints'),(178,'Can change user points',45,'change_userpoints'),(179,'Can delete user points',45,'delete_userpoints'),(180,'Can view user points',45,'view_userpoints'),(181,'Can add avatar creator',46,'add_avatarcreator'),(182,'Can change avatar creator',46,'change_avatarcreator'),(183,'Can delete avatar creator',46,'delete_avatarcreator'),(184,'Can view avatar creator',46,'view_avatarcreator'),(185,'Can add user book progress',47,'add_userbookprogress'),(186,'Can change user book progress',47,'change_userbookprogress'),(187,'Can delete user book progress',47,'delete_userbookprogress'),(188,'Can view user book progress',47,'view_userbookprogress'),(189,'Can add book badge',48,'add_bookbadge'),(190,'Can change book badge',48,'change_bookbadge'),(191,'Can delete book badge',48,'delete_bookbadge'),(192,'Can view book badge',48,'view_bookbadge');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user` (
  `id` int NOT NULL AUTO_INCREMENT,
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_groups` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authorlist`
--

DROP TABLE IF EXISTS `authorlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authorlist` (
  `AuthorListId` int NOT NULL AUTO_INCREMENT,
  `BookID` int DEFAULT NULL,
  `UserID` int DEFAULT NULL,
  PRIMARY KEY (`AuthorListId`),
  KEY `authorlist_BookID_9ca75d4b_fk_book_BookID` (`BookID`),
  KEY `authorlist_UserID_f224abf1_fk_user_UserId` (`UserID`),
  CONSTRAINT `authorlist_BookID_9ca75d4b_fk_book_BookID` FOREIGN KEY (`BookID`) REFERENCES `book` (`BookID`),
  CONSTRAINT `authorlist_UserID_f224abf1_fk_user_UserId` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authorlist`
--

LOCK TABLES `authorlist` WRITE;
/*!40000 ALTER TABLE `authorlist` DISABLE KEYS */;
/*!40000 ALTER TABLE `authorlist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `avatarcreator`
--

DROP TABLE IF EXISTS `avatarcreator`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `avatarcreator` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `skin_color` varchar(50) NOT NULL,
  `hair_style` varchar(50) NOT NULL,
  `accessories` json NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avatarcreator`
--

LOCK TABLES `avatarcreator` WRITE;
/*!40000 ALTER TABLE `avatarcreator` DISABLE KEYS */;
/*!40000 ALTER TABLE `avatarcreator` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `badges`
--

DROP TABLE IF EXISTS `badges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `badges` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `points` int NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `is_teacher_badge` tinyint(1) NOT NULL,
  `progress_placeholder` int DEFAULT NULL,
  `show_progress` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `badges`
--

LOCK TABLES `badges` WRITE;
/*!40000 ALTER TABLE `badges` DISABLE KEYS */;
INSERT INTO `badges` (`id`, `title`, `description`, `points`, `icon`, `is_teacher_badge`, `progress_placeholder`, `show_progress`) VALUES (3,'Costa Rican Hero','Complete the book Costa Rica\'s Heroes.',50,'/Media/media/Badges/BadgeCostaricaHeroes1.png',0,0,0),(4,'Little Hero','Read about a Costa Rican Hero',50,'/Media/media/Badges/BadgeCostaricaHeroes2.png',0,0,0),(5,'Complete Crystal\'s Journey To The Stars.','Complete the book Crystal\'s Journey To The Stars.',50,'/Media/media/Badges/BadgeCrystalsJourney1.png',0,0,0),(6,'Finish all activities','Finish all activities from Crystal\'s Journey To The Stars.',50,'/Media/media/Badges/BadgeCrystalsJourney1.png',0,0,0),(7,'Brave Heart','Complete the book The Story Of Amina\'s Struggle.',50,'/Media/media/Badges/BadgeAnimas1.png',0,0,0),(8,'Path to Victory','Finish all activities from The Story Of Amina\'s Struggle.',50,'/Media/media/Badges/BadgeAnimas1.png',0,0,0),(9,'Community Hero','Complete the book Esteban Saves His Community.',50,'/Media/media/Badges/BadgeEstebanSavesHisCommunity1.png',0,0,0),(10,'Wise Helper','Finish all activities from Esteban Saves His Community.',50,'/Media/media/Badges/BadgeEstebanSavesHisCommunity1.png',0,0,0);
/*!40000 ALTER TABLE `badges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book` (
  `BookID` int NOT NULL AUTO_INCREMENT,
  `Title` varchar(200) NOT NULL,
  `Category` int DEFAULT NULL,
  `Portrait` varchar(200) DEFAULT NULL,
  `CreatedAt` datetime(6) DEFAULT NULL,
  `LastUpdateAt` datetime(6) DEFAULT NULL,
  `State` int NOT NULL,
  `SharedBook` int DEFAULT NULL,
  `Description` varchar(500) DEFAULT NULL,
  `CreatedBy` int DEFAULT NULL,
  `LastUpdateBy` int DEFAULT NULL,
  PRIMARY KEY (`BookID`),
  UNIQUE KEY `Title` (`Title`),
  KEY `book_CreatedBy_6b9d499e_fk_user_UserId` (`CreatedBy`),
  KEY `book_LastUpdateBy_3a7dc064_fk_user_UserId` (`LastUpdateBy`),
  CONSTRAINT `book_CreatedBy_6b9d499e_fk_user_UserId` FOREIGN KEY (`CreatedBy`) REFERENCES `user` (`UserId`),
  CONSTRAINT `book_LastUpdateBy_3a7dc064_fk_user_UserId` FOREIGN KEY (`LastUpdateBy`) REFERENCES `user` (`UserId`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book`
--

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
INSERT INTO `book` (`BookID`, `Title`, `Category`, `Portrait`, `CreatedAt`, `LastUpdateAt`, `State`, `SharedBook`, `Description`, `CreatedBy`, `LastUpdateBy`) VALUES (1,'TestBook',1,NULL,'2025-02-21 21:15:49.235378','2025-02-21 21:15:49.235378',0,0,'123123',1,1),(2,'Maze Runner',1,'/Media/media/2.jpg','2025-02-26 14:41:05.246367','2025-02-26 14:41:05.246367',0,0,'Maze Runner',4,4),(3,'Crytal\'s Journey To The Stars',1,'/Media/media/3.jpg','2025-03-07 15:36:37.651234','2025-03-07 15:36:37.651234',0,0,'Book Written by Marcela Montenegro',1,1),(4,'Costa Rica’s Heroes',1,'/Media/media/4_tZ1x7vy.png','2025-04-24 07:50:08.316292','2025-04-24 07:50:08.316292',0,0,'I WEEK IMPLEMENTATION',5,5),(5,'Crystal\'s Journey To The Stars',1,'/Media/media/5_3Z43LGh.png','2025-04-24 09:36:57.476252','2025-04-24 09:36:57.476252',0,0,'II WEEK IMPLEMENTATION',5,5),(6,'The Story Of Amina\'s Struggle',1,'/Media/media/6_t0cDBza.png','2025-04-24 09:40:40.425054','2025-04-24 09:40:40.425054',0,0,'III WEEK IMPLEMENTATION',5,5),(7,'Esteban Saves His Community',1,'/Media/media/7_4jD6vcP.png','2025-04-24 09:47:39.703045','2025-04-24 09:47:39.703045',0,0,'IV WEEK IMPLEMENTATION',5,5),(8,'Ilak the Earth Child',1,NULL,'2025-04-29 13:32:22.663400','2025-04-29 13:32:22.663400',0,0,'This book....',5,5),(9,'THE RIVER AND THE BOY',1,NULL,'2025-05-14 16:41:17.066839','2025-05-14 16:41:17.066839',0,0,'This book will be about the story of a boy who lives close to the river. He loves to take his doggie and swim with him.',5,5),(10,'The Puppy Book',1,'/Media/media/9_Z5O9ylk.png','2025-05-14 17:13:44.355241','2025-05-14 17:13:44.355241',0,0,'The Puppy Book',5,5);
/*!40000 ALTER TABLE `book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookbadge`
--

DROP TABLE IF EXISTS `bookbadge`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookbadge` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `BadgeId` bigint NOT NULL,
  `BookId` int NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `bookbadge_BadgeId_dabc87a8_fk_badges_id` (`BadgeId`),
  KEY `bookbadge_BookId_1621daaf` (`BookId`),
  CONSTRAINT `bookbadge_BadgeId_dabc87a8_fk_badges_id` FOREIGN KEY (`BadgeId`) REFERENCES `badges` (`id`),
  CONSTRAINT `bookbadge_BookId_1621daaf_fk_book_BookID` FOREIGN KEY (`BookId`) REFERENCES `book` (`BookID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookbadge`
--

LOCK TABLES `bookbadge` WRITE;
/*!40000 ALTER TABLE `bookbadge` DISABLE KEYS */;
INSERT INTO `bookbadge` (`Id`, `BadgeId`, `BookId`) VALUES (1,3,4),(2,4,4),(3,5,5),(4,6,5),(5,7,6),(6,8,6),(7,9,7),(8,10,7);
/*!40000 ALTER TABLE `bookbadge` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookcategory`
--

DROP TABLE IF EXISTS `bookcategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookcategory` (
  `BookCategoryID` int NOT NULL AUTO_INCREMENT,
  `CategoryName` varchar(100) NOT NULL,
  PRIMARY KEY (`BookCategoryID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookcategory`
--

LOCK TABLES `bookcategory` WRITE;
/*!40000 ALTER TABLE `bookcategory` DISABLE KEYS */;
INSERT INTO `bookcategory` (`BookCategoryID`, `CategoryName`) VALUES (1,'Justicia Social');
/*!40000 ALTER TABLE `bookcategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookdilemma`
--

DROP TABLE IF EXISTS `bookdilemma`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookdilemma` (
  `BookDilemmaID` int NOT NULL AUTO_INCREMENT,
  `Dilemma` varchar(500) NOT NULL,
  `BookDimensionID` int NOT NULL,
  PRIMARY KEY (`BookDilemmaID`),
  KEY `bookdilemma_BookDimensionID_8a832aad_fk_bookdimen` (`BookDimensionID`),
  CONSTRAINT `bookdilemma_BookDimensionID_8a832aad_fk_bookdimen` FOREIGN KEY (`BookDimensionID`) REFERENCES `bookdimension` (`BookDimensionID`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookdilemma`
--

LOCK TABLES `bookdilemma` WRITE;
/*!40000 ALTER TABLE `bookdilemma` DISABLE KEYS */;
INSERT INTO `bookdilemma` (`BookDilemmaID`, `Dilemma`, `BookDimensionID`) VALUES (1,'Paises pobres',1),(2,'Discapacidad laboral',1),(3,'Trabajo infantil',1),(4,'Excursion',1),(5,'Becas escolares',1),(6,'Idioma',2),(7,'Acceso TICS',2),(8,'Mujeres',2),(9,'Acoso escolar',2),(10,'Familia',2),(11,'Hijos de parejas homosexuales',2),(12,'Elección delegado',3),(13,'Voto elecciones generales',3),(14,'Alumnos escasa participación',3),(15,'Gobierno democrático',3),(16,'Lenguas cooficiales',3),(17,'Justicia Universal',3);
/*!40000 ALTER TABLE `bookdilemma` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookdimension`
--

DROP TABLE IF EXISTS `bookdimension`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookdimension` (
  `BookDimensionID` int NOT NULL AUTO_INCREMENT,
  `DimensionName` varchar(150) NOT NULL,
  `BookCategoryID` int NOT NULL,
  PRIMARY KEY (`BookDimensionID`),
  KEY `bookdimension_BookCategoryID_a4a53629_fk_bookcateg` (`BookCategoryID`),
  CONSTRAINT `bookdimension_BookCategoryID_a4a53629_fk_bookcateg` FOREIGN KEY (`BookCategoryID`) REFERENCES `bookcategory` (`BookCategoryID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookdimension`
--

LOCK TABLES `bookdimension` WRITE;
/*!40000 ALTER TABLE `bookdimension` DISABLE KEYS */;
INSERT INTO `bookdimension` (`BookDimensionID`, `DimensionName`, `BookCategoryID`) VALUES (1,'Redistribucion de recursos, bienes y capacidades',1),(2,'Reconocimiento de la diversidad y la valoración y celebración',1),(3,'Representación de todas las personas de forma democrática, especialmente en aquellos ámbitos que más les afectan y están más implicados',1);
/*!40000 ALTER TABLE `bookdimension` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `booksperclasses`
--

DROP TABLE IF EXISTS `booksperclasses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booksperclasses` (
  `BooksPerClasses` int NOT NULL AUTO_INCREMENT,
  `Order` int DEFAULT NULL,
  `isactive` int DEFAULT NULL,
  `BooksId` int DEFAULT NULL,
  `ClassesId` int DEFAULT NULL,
  PRIMARY KEY (`BooksPerClasses`),
  KEY `booksperclasses_BooksId_62682c88_fk_book_BookID` (`BooksId`),
  KEY `booksperclasses_ClassesId_c4f6e396_fk_classes_ClassesId` (`ClassesId`),
  CONSTRAINT `booksperclasses_BooksId_62682c88_fk_book_BookID` FOREIGN KEY (`BooksId`) REFERENCES `book` (`BookID`),
  CONSTRAINT `booksperclasses_ClassesId_c4f6e396_fk_classes_ClassesId` FOREIGN KEY (`ClassesId`) REFERENCES `classes` (`ClassesId`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booksperclasses`
--

LOCK TABLES `booksperclasses` WRITE;
/*!40000 ALTER TABLE `booksperclasses` DISABLE KEYS */;
INSERT INTO `booksperclasses` (`BooksPerClasses`, `Order`, `isactive`, `BooksId`, `ClassesId`) VALUES (11,1,1,4,8),(13,1,1,5,10),(14,1,1,4,11),(15,NULL,1,4,10),(16,NULL,1,6,10),(17,NULL,1,7,10);
/*!40000 ALTER TABLE `booksperclasses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classes`
--

DROP TABLE IF EXISTS `classes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classes` (
  `ClassesId` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(200) NOT NULL,
  `Grade` int DEFAULT NULL,
  `CreatedAt` datetime(6) DEFAULT NULL,
  `LastUpdateAt` datetime(6) DEFAULT NULL,
  `StartDate` datetime(6) DEFAULT NULL,
  `FinishDate` datetime(6) DEFAULT NULL,
  `isactive` int DEFAULT NULL,
  `GroupsCreateId` int DEFAULT NULL,
  `TeacherAssigned` int DEFAULT NULL,
  PRIMARY KEY (`ClassesId`),
  KEY `classes_GroupsCreateId_9bf79e5a_fk_groupscreate_id` (`GroupsCreateId`),
  KEY `classes_TeacherAssigned_beabde17_fk_user_UserId` (`TeacherAssigned`),
  CONSTRAINT `classes_GroupsCreateId_9bf79e5a_fk_groupscreate_id` FOREIGN KEY (`GroupsCreateId`) REFERENCES `groupscreate` (`id`),
  CONSTRAINT `classes_TeacherAssigned_beabde17_fk_user_UserId` FOREIGN KEY (`TeacherAssigned`) REFERENCES `user` (`UserId`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classes`
--

LOCK TABLES `classes` WRITE;
/*!40000 ALTER TABLE `classes` DISABLE KEYS */;
INSERT INTO `classes` (`ClassesId`, `Name`, `Grade`, `CreatedAt`, `LastUpdateAt`, `StartDate`, `FinishDate`, `isactive`, `GroupsCreateId`, `TeacherAssigned`) VALUES (8,'I Week Implementation',6,'2025-04-28 11:30:14.511329','2025-04-28 11:30:14.511329','2025-05-08 13:00:00.000000','2025-05-08 23:00:00.000000',1,6,5),(10,'II Week Implementation',6,'2025-04-28 12:09:26.427947','2025-04-28 12:09:26.427947','2025-05-15 13:00:00.000000','2025-05-15 23:00:00.000000',1,7,5),(11,'Costa Rica\'s Heroes',6,'2025-04-29 13:12:32.742721','2025-04-29 13:12:32.742721','2025-05-07 13:00:00.000000','2025-05-08 23:00:00.000000',1,8,5);
/*!40000 ALTER TABLE `classes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classeslog`
--

DROP TABLE IF EXISTS `classeslog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classeslog` (
  `ClassesLogId` int NOT NULL AUTO_INCREMENT,
  `CreatedAt` datetime(6) DEFAULT NULL,
  `Description` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `ClassesID` int NOT NULL,
  `UserID` int NOT NULL,
  PRIMARY KEY (`ClassesLogId`),
  KEY `classeslog_ClassesID_e27aaaaa_fk_classes_ClassesId` (`ClassesID`),
  KEY `classeslog_UserID_496e46de_fk_user_UserId` (`UserID`),
  CONSTRAINT `classeslog_ClassesID_e27aaaaa_fk_classes_ClassesId` FOREIGN KEY (`ClassesID`) REFERENCES `classes` (`ClassesId`),
  CONSTRAINT `classeslog_UserID_496e46de_fk_user_UserId` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classeslog`
--

LOCK TABLES `classeslog` WRITE;
/*!40000 ALTER TABLE `classeslog` DISABLE KEYS */;
/*!40000 ALTER TABLE `classeslog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dilemmaperbook`
--

DROP TABLE IF EXISTS `dilemmaperbook`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dilemmaperbook` (
  `DilemmaPerBookID` int NOT NULL AUTO_INCREMENT,
  `BookDilemmaID` int NOT NULL,
  `BookID` int NOT NULL,
  PRIMARY KEY (`DilemmaPerBookID`),
  KEY `dilemmaperbook_BookDilemmaID_5d5ed72b_fk_bookdilem` (`BookDilemmaID`),
  KEY `dilemmaperbook_BookID_da6fa17c_fk_book_BookID` (`BookID`),
  CONSTRAINT `dilemmaperbook_BookDilemmaID_5d5ed72b_fk_bookdilem` FOREIGN KEY (`BookDilemmaID`) REFERENCES `bookdilemma` (`BookDilemmaID`),
  CONSTRAINT `dilemmaperbook_BookID_da6fa17c_fk_book_BookID` FOREIGN KEY (`BookID`) REFERENCES `book` (`BookID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dilemmaperbook`
--

LOCK TABLES `dilemmaperbook` WRITE;
/*!40000 ALTER TABLE `dilemmaperbook` DISABLE KEYS */;
INSERT INTO `dilemmaperbook` (`DilemmaPerBookID`, `BookDilemmaID`, `BookID`) VALUES (1,1,1),(2,3,2),(3,1,3),(4,4,4),(5,1,5),(6,1,6),(7,1,7),(8,16,8),(9,4,9),(10,5,10);
/*!40000 ALTER TABLE `dilemmaperbook` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(4,'auth','user'),(18,'Author','authorlist'),(46,'AvatarCreator','avatarcreator'),(40,'Badges','badge'),(48,'bookbadge','bookbadge'),(8,'Books','book'),(35,'BooksDilemma','bookcategory'),(36,'BooksDilemma','bookdilemma'),(38,'BooksDilemma','bookdimension'),(37,'BooksDilemma','dilemmaperbook'),(23,'BooksPerClasses','booksperclasses'),(27,'Classes','classes'),(28,'ClassesLog','classeslog'),(5,'contenttypes','contenttype'),(14,'Files','file'),(12,'folder','folder'),(20,'Grades','grades'),(31,'GroupsCreate','groupscreate'),(24,'GroupsPerClasses','groupsperclasses'),(21,'Institute','institute'),(22,'Institute','institutemembers'),(33,'Joins','joins'),(15,'Mailer','mail'),(16,'Mailer','mailcontrol'),(30,'Media','media'),(32,'Options','options'),(9,'Pages','pages'),(17,'Roles','roles'),(6,'sessions','session'),(19,'Sharedbooks','sharedbooks'),(25,'StudentsGroups','studentsgroups'),(39,'Subtitled','subtitled'),(13,'Tags','tags'),(26,'TagsPerPage','tagsperpage'),(29,'TeacherApp','teachers'),(43,'Team','team'),(42,'TeamUser','teamuser'),(44,'UserBadge','userbadge'),(47,'userbookprogress','userbookprogress'),(45,'UserPoints','userpoints'),(41,'UserPointsLog','userpointslog'),(34,'Userroles','userroles'),(7,'Users','user'),(10,'Widget','widget'),(11,'Widget','widgetitem');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES (1,'Users','0001_initial','2025-02-22 03:05:31.854193'),(2,'Books','0001_initial','2025-02-22 03:05:32.234212'),(3,'Author','0001_initial','2025-02-22 03:05:32.435791'),(4,'AvatarCreator','0001_initial','2025-02-22 03:05:32.480629'),(5,'Badges','0001_initial','2025-02-22 03:05:32.530179'),(6,'Badges','0002_badge_progress_placeholder_badge_show_progress','2025-02-22 03:05:32.602655'),(7,'BooksDilemma','0001_initial','2025-02-22 03:05:33.083867'),(8,'Media','0001_initial','2025-02-22 03:05:33.135538'),(9,'GroupsCreate','0001_initial','2025-02-22 03:05:33.321078'),(10,'Classes','0001_initial','2025-02-22 03:05:33.520262'),(11,'BooksPerClasses','0001_initial','2025-02-22 03:05:33.725576'),(12,'ClassesLog','0001_initial','2025-02-22 03:05:33.917627'),(13,'folder','0001_initial','2025-02-22 03:05:34.071861'),(14,'Tags','0001_initial','2025-02-22 03:05:34.130863'),(15,'Files','0001_initial','2025-02-22 03:05:34.420238'),(16,'Grades','0001_initial','2025-02-22 03:05:34.618065'),(17,'StudentsGroups','0001_initial','2025-02-22 03:05:34.947098'),(18,'GroupsPerClasses','0001_initial','2025-02-22 03:05:35.149306'),(19,'Institute','0001_initial','2025-02-22 03:05:35.397242'),(20,'Joins','0001_initial','2025-02-22 03:05:35.584282'),(21,'Mailer','0001_initial','2025-02-22 03:05:35.817404'),(22,'Pages','0001_initial','2025-02-22 03:05:35.981956'),(23,'Widget','0001_initial','2025-02-22 03:05:36.252427'),(24,'Options','0001_initial','2025-02-22 03:05:36.761160'),(25,'Roles','0001_initial','2025-02-22 03:05:36.820295'),(26,'Sharedbooks','0001_initial','2025-02-22 03:05:37.032757'),(27,'Subtitled','0001_initial','2025-02-22 03:05:37.162903'),(28,'TagsPerPage','0001_initial','2025-02-22 03:05:37.370841'),(29,'TeacherApp','0001_initial','2025-02-22 03:05:37.413633'),(30,'Team','0001_initial','2025-02-22 03:05:37.459560'),(31,'TeamUser','0001_initial','2025-02-22 03:05:37.668324'),(32,'TeamUser','0002_alter_teamuser_user','2025-02-22 03:05:37.700754'),(33,'UserBadge','0001_initial','2025-02-22 03:05:37.919057'),(34,'UserBadge','0002_userbadge_achieved_userbadge_progress','2025-02-22 03:05:38.020221'),(35,'Users','0002_user_level','2025-02-22 03:05:38.118087'),(36,'Users','0003_alter_user_level','2025-02-22 03:05:38.264068'),(37,'UserPoints','0001_initial','2025-02-22 03:05:38.412852'),(38,'UserPoints','0002_userpoints_delete_userpointslog','2025-02-22 03:05:38.584182'),(39,'UserPointsLog','0001_initial','2025-02-22 03:05:38.735924'),(40,'UserPointsLog','0002_alter_userpointslog_user','2025-02-22 03:05:38.797604'),(41,'Userroles','0001_initial','2025-02-22 03:05:39.100957'),(42,'contenttypes','0001_initial','2025-02-22 03:05:39.169794'),(43,'auth','0001_initial','2025-02-22 03:05:40.101886'),(44,'admin','0001_initial','2025-02-22 03:05:40.354362'),(45,'admin','0002_logentry_remove_auto_add','2025-02-22 03:05:40.374023'),(46,'admin','0003_logentry_add_action_flag_choices','2025-02-22 03:05:40.402343'),(47,'contenttypes','0002_remove_content_type_name','2025-02-22 03:05:40.703014'),(48,'auth','0002_alter_permission_name_max_length','2025-02-22 03:05:40.844372'),(49,'auth','0003_alter_user_email_max_length','2025-02-22 03:05:40.920108'),(50,'auth','0004_alter_user_username_opts','2025-02-22 03:05:40.955272'),(51,'auth','0005_alter_user_last_login_null','2025-02-22 03:05:41.083850'),(52,'auth','0006_require_contenttypes_0002','2025-02-22 03:05:41.095831'),(53,'auth','0007_alter_validators_add_error_messages','2025-02-22 03:05:41.116447'),(54,'auth','0008_alter_user_username_max_length','2025-02-22 03:05:41.229257'),(55,'auth','0009_alter_user_last_name_max_length','2025-02-22 03:05:41.334619'),(56,'auth','0010_alter_group_name_max_length','2025-02-22 03:05:41.383110'),(57,'auth','0011_update_proxy_permissions','2025-02-22 03:05:41.444823'),(58,'auth','0012_alter_user_first_name_max_length','2025-02-22 03:05:41.562646'),(59,'sessions','0001_initial','2025-02-22 03:05:41.648479'),(60,'bookbadge','0001_initial','2025-04-24 13:15:03.652540'),(61,'bookbadge','0002_alter_bookbadge_unique_together','2025-04-24 13:15:03.761713'),(62,'userbookprogress','0001_initial','2025-04-24 13:15:03.960361');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `file`
--

DROP TABLE IF EXISTS `file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `file` (
  `FileId` int NOT NULL AUTO_INCREMENT,
  `Namefile` varchar(200) NOT NULL,
  `FileLocation` varchar(200) NOT NULL,
  `FoldersId` int NOT NULL,
  `IdTags` int DEFAULT NULL,
  `UploadBy` int NOT NULL,
  PRIMARY KEY (`FileId`),
  KEY `file_FoldersId_58e8d127_fk_folders_FoldersId` (`FoldersId`),
  KEY `file_IdTags_430eda59_fk_tags_TagsId` (`IdTags`),
  KEY `file_UploadBy_13a4c892_fk_user_UserId` (`UploadBy`),
  CONSTRAINT `file_FoldersId_58e8d127_fk_folders_FoldersId` FOREIGN KEY (`FoldersId`) REFERENCES `folders` (`FoldersId`),
  CONSTRAINT `file_IdTags_430eda59_fk_tags_TagsId` FOREIGN KEY (`IdTags`) REFERENCES `tags` (`TagsId`),
  CONSTRAINT `file_UploadBy_13a4c892_fk_user_UserId` FOREIGN KEY (`UploadBy`) REFERENCES `user` (`UserId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `file`
--

LOCK TABLES `file` WRITE;
/*!40000 ALTER TABLE `file` DISABLE KEYS */;
/*!40000 ALTER TABLE `file` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `folders`
--

DROP TABLE IF EXISTS `folders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `folders` (
  `FoldersId` int NOT NULL AUTO_INCREMENT,
  `NameFolders` varchar(200) NOT NULL,
  `createdBy` int NOT NULL,
  PRIMARY KEY (`FoldersId`),
  KEY `folders_createdBy_e92a3262_fk_user_UserId` (`createdBy`),
  CONSTRAINT `folders_createdBy_e92a3262_fk_user_UserId` FOREIGN KEY (`createdBy`) REFERENCES `user` (`UserId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `folders`
--

LOCK TABLES `folders` WRITE;
/*!40000 ALTER TABLE `folders` DISABLE KEYS */;
/*!40000 ALTER TABLE `folders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grades`
--

DROP TABLE IF EXISTS `grades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grades` (
  `GradesID` int NOT NULL AUTO_INCREMENT,
  `Progress` int DEFAULT NULL,
  `Grade` double DEFAULT NULL,
  `isactive` int DEFAULT NULL,
  `BookID` int NOT NULL,
  `UserId` int NOT NULL,
  PRIMARY KEY (`GradesID`),
  KEY `grades_BookID_d760f945_fk_book_BookID` (`BookID`),
  KEY `grades_UserId_62b50991_fk_user_UserId` (`UserId`),
  CONSTRAINT `grades_BookID_d760f945_fk_book_BookID` FOREIGN KEY (`BookID`) REFERENCES `book` (`BookID`),
  CONSTRAINT `grades_UserId_62b50991_fk_user_UserId` FOREIGN KEY (`UserId`) REFERENCES `user` (`UserId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grades`
--

LOCK TABLES `grades` WRITE;
/*!40000 ALTER TABLE `grades` DISABLE KEYS */;
/*!40000 ALTER TABLE `grades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `groupscreate`
--

DROP TABLE IF EXISTS `groupscreate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `groupscreate` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(300) NOT NULL,
  `createdat` datetime(6) DEFAULT NULL,
  `isactive` int DEFAULT NULL,
  `createdby_id` int NOT NULL,
  `idimage_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `groupscreate_createdby_id_d07d38ab_fk_user_UserId` (`createdby_id`),
  KEY `groupscreate_idimage_id_d1b10547_fk_media_id` (`idimage_id`),
  CONSTRAINT `groupscreate_createdby_id_d07d38ab_fk_user_UserId` FOREIGN KEY (`createdby_id`) REFERENCES `user` (`UserId`),
  CONSTRAINT `groupscreate_idimage_id_d1b10547_fk_media_id` FOREIGN KEY (`idimage_id`) REFERENCES `media` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groupscreate`
--

LOCK TABLES `groupscreate` WRITE;
/*!40000 ALTER TABLE `groupscreate` DISABLE KEYS */;
INSERT INTO `groupscreate` (`id`, `name`, `createdat`, `isactive`, `createdby_id`, `idimage_id`) VALUES (6,'I Week Implementation','2025-04-28 11:29:44.709576',1,5,1),(7,'II Week Implementation','2025-04-28 12:08:58.189983',1,5,1),(8,'Group 1 Week 1','2025-04-29 13:09:16.939107',1,5,1),(9,'Group 2 Week 1','2025-04-29 13:23:26.028380',1,5,1);
/*!40000 ALTER TABLE `groupscreate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `groupsperclasses`
--

DROP TABLE IF EXISTS `groupsperclasses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `groupsperclasses` (
  `GroupsPerClassesId` int NOT NULL AUTO_INCREMENT,
  `ClassesId` int DEFAULT NULL,
  `StudentsGroupsId` int DEFAULT NULL,
  PRIMARY KEY (`GroupsPerClassesId`),
  KEY `groupsperclasses_ClassesId_10cbcc07_fk_classes_ClassesId` (`ClassesId`),
  KEY `groupsperclasses_StudentsGroupsId_d9560df5_fk_studentgr` (`StudentsGroupsId`),
  CONSTRAINT `groupsperclasses_ClassesId_10cbcc07_fk_classes_ClassesId` FOREIGN KEY (`ClassesId`) REFERENCES `classes` (`ClassesId`),
  CONSTRAINT `groupsperclasses_StudentsGroupsId_d9560df5_fk_studentgr` FOREIGN KEY (`StudentsGroupsId`) REFERENCES `studentgroups` (`StudentsGroupsId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groupsperclasses`
--

LOCK TABLES `groupsperclasses` WRITE;
/*!40000 ALTER TABLE `groupsperclasses` DISABLE KEYS */;
/*!40000 ALTER TABLE `groupsperclasses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institute`
--

DROP TABLE IF EXISTS `institute`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institute` (
  `InstituteId` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(200) NOT NULL,
  PRIMARY KEY (`InstituteId`),
  UNIQUE KEY `Name` (`Name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institute`
--

LOCK TABLES `institute` WRITE;
/*!40000 ALTER TABLE `institute` DISABLE KEYS */;
/*!40000 ALTER TABLE `institute` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institutemembers`
--

DROP TABLE IF EXISTS `institutemembers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institutemembers` (
  `InstituteMembersID` int NOT NULL AUTO_INCREMENT,
  `InstituteID` int NOT NULL,
  `UserId` int NOT NULL,
  PRIMARY KEY (`InstituteMembersID`),
  KEY `institutemembers_InstituteID_4f5ee88b_fk_institute_InstituteId` (`InstituteID`),
  KEY `institutemembers_UserId_481757d0_fk_user_UserId` (`UserId`),
  CONSTRAINT `institutemembers_InstituteID_4f5ee88b_fk_institute_InstituteId` FOREIGN KEY (`InstituteID`) REFERENCES `institute` (`InstituteId`),
  CONSTRAINT `institutemembers_UserId_481757d0_fk_user_UserId` FOREIGN KEY (`UserId`) REFERENCES `user` (`UserId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institutemembers`
--

LOCK TABLES `institutemembers` WRITE;
/*!40000 ALTER TABLE `institutemembers` DISABLE KEYS */;
/*!40000 ALTER TABLE `institutemembers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invitations`
--

DROP TABLE IF EXISTS `invitations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invitations` (
  `joinId` int NOT NULL AUTO_INCREMENT,
  `code` longtext NOT NULL,
  `password` longtext NOT NULL,
  `bookId` int DEFAULT NULL,
  `classesId` int DEFAULT NULL,
  PRIMARY KEY (`joinId`),
  KEY `invitations_bookId_4927a53e_fk_book_BookID` (`bookId`),
  KEY `invitations_classesId_0b311ddf_fk_classes_ClassesId` (`classesId`),
  CONSTRAINT `invitations_bookId_4927a53e_fk_book_BookID` FOREIGN KEY (`bookId`) REFERENCES `book` (`BookID`),
  CONSTRAINT `invitations_classesId_0b311ddf_fk_classes_ClassesId` FOREIGN KEY (`classesId`) REFERENCES `classes` (`ClassesId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invitations`
--

LOCK TABLES `invitations` WRITE;
/*!40000 ALTER TABLE `invitations` DISABLE KEYS */;
/*!40000 ALTER TABLE `invitations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mail`
--

DROP TABLE IF EXISTS `mail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mail` (
  `emailId` int NOT NULL AUTO_INCREMENT,
  `emailTo` varchar(254) NOT NULL,
  `emailFrom` varchar(254) NOT NULL,
  `emailSubject` varchar(100) NOT NULL,
  `bodyMessage` longtext NOT NULL,
  PRIMARY KEY (`emailId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mail`
--

LOCK TABLES `mail` WRITE;
/*!40000 ALTER TABLE `mail` DISABLE KEYS */;
/*!40000 ALTER TABLE `mail` ENABLE KEYS */;
UNLOCK TABLES;

--

--

DROP TABLE IF EXISTS `media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `media` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(300) NOT NULL,
  `extension` varchar(10) NOT NULL,
  `file` varchar(100) NOT NULL,
  `type` int NOT NULL,
  `galleryType` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `media`
--

LOCK TABLES `media` WRITE;
/*!40000 ALTER TABLE `media` DISABLE KEYS */;
INSERT INTO `media` (`id`, `name`, `extension`, `file`, `type`, `galleryType`) VALUES (1,'1','png','media/1.png',2,2),(2,'2','jpg','media/2.jpg',1,NULL),(3,'3','jpg','media/3.jpg',1,NULL),(4,'4','png','media/4_tZ1x7vy.png',1,NULL),(5,'5','png','media/5_3Z43LGh.png',1,NULL),(6,'6','png','media/6_t0cDBza.png',1,NULL),(7,'7','png','media/7_4jD6vcP.png',1,NULL),(8,'8','png','media/8_t3Cc0wN.png',1,NULL),(9,'9','png','media/9_Z5O9ylk.png',1,NULL);
/*!40000 ALTER TABLE `media` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `options`
--

DROP TABLE IF EXISTS `options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `options` (
  `idoption` int NOT NULL AUTO_INCREMENT,
  `answer` varchar(500) NOT NULL,
  `points` int DEFAULT NULL,
  `iscorrect` int DEFAULT NULL,
  `isactive` int DEFAULT NULL,
  `createdat` datetime(6) DEFAULT NULL,
  `createdby_id` int NOT NULL,
  `idimage_id` int DEFAULT NULL,
  `idwidgetitem_id` int DEFAULT NULL,
  PRIMARY KEY (`idoption`),
  KEY `options_createdby_id_b8eb98b5_fk_user_UserId` (`createdby_id`),
  KEY `options_idimage_id_9617caae_fk_media_id` (`idimage_id`),
  KEY `options_idwidgetitem_id_c9ffbfe1_fk_widgetitem_WidgetItemId` (`idwidgetitem_id`),
  CONSTRAINT `options_createdby_id_b8eb98b5_fk_user_UserId` FOREIGN KEY (`createdby_id`) REFERENCES `user` (`UserId`),
  CONSTRAINT `options_idimage_id_9617caae_fk_media_id` FOREIGN KEY (`idimage_id`) REFERENCES `media` (`id`),
  CONSTRAINT `options_idwidgetitem_id_c9ffbfe1_fk_widgetitem_WidgetItemId` FOREIGN KEY (`idwidgetitem_id`) REFERENCES `widgetitem` (`WidgetItemId`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `options`
--

LOCK TABLES `options` WRITE;
/*!40000 ALTER TABLE `options` DISABLE KEYS */;
INSERT INTO `options` (`idoption`, `answer`, `points`, `iscorrect`, `isactive`, `createdat`, `createdby_id`, `idimage_id`, `idwidgetitem_id`) VALUES (1,'runs',0,0,1,NULL,1,NULL,43),(2,'hopes',10,1,1,NULL,1,NULL,43),(3,'blue',0,0,1,NULL,1,NULL,43),(4,'answer1',10,1,1,NULL,1,NULL,34),(5,'answer2',0,0,1,NULL,1,NULL,34),(6,'brave',10,1,1,NULL,1,NULL,44),(7,'mad',0,0,1,NULL,1,NULL,44),(8,'sad',0,0,1,NULL,1,NULL,44),(9,'courageous',10,1,1,NULL,1,NULL,45),(10,'sad',0,0,1,NULL,1,NULL,45),(11,'tall',0,0,1,NULL,1,NULL,45),(12,'happy',10,1,1,NULL,1,NULL,46),(13,'sad',0,0,1,NULL,1,NULL,46),(14,'amazing',0,0,1,NULL,1,NULL,46),(15,'announces',10,1,1,NULL,1,NULL,47),(16,'says',0,0,1,NULL,1,NULL,47),(17,'chooses',0,0,1,NULL,1,NULL,47),(18,'wants',0,0,1,NULL,1,NULL,66),(19,'wanted',10,1,1,NULL,1,NULL,66),(20,'won\'t',0,0,1,NULL,1,NULL,66),(21,'helped',10,1,1,NULL,1,NULL,67),(22,'helps',0,0,1,NULL,1,NULL,67),(23,'help',0,0,1,NULL,1,NULL,67),(24,'supports',0,0,1,NULL,1,NULL,68),(26,'supported',10,1,1,NULL,1,NULL,68),(27,'support',0,0,1,NULL,1,NULL,68),(28,'discoverred',0,0,1,NULL,1,NULL,69),(29,'discovers',0,0,1,NULL,1,NULL,69),(30,'discovered',10,1,1,NULL,1,NULL,69),(31,'won',10,1,1,NULL,1,NULL,70),(32,'won\'t',0,0,1,NULL,1,NULL,70),(33,'wins',0,0,1,NULL,1,NULL,70);
/*!40000 ALTER TABLE `options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pages`
--

DROP TABLE IF EXISTS `pages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pages` (
  `PageId` int NOT NULL AUTO_INCREMENT,
  `Type` int NOT NULL,
  `Template` int NOT NULL,
  `ElementOrder` int NOT NULL,
  `GridDirection` longtext,
  `GridNumRows` int DEFAULT NULL,
  `Actived` int DEFAULT NULL,
  `BookId` int DEFAULT NULL,
  PRIMARY KEY (`PageId`),
  KEY `pages_BookId_f1863eda_fk_book_BookID` (`BookId`),
  CONSTRAINT `pages_BookId_f1863eda_fk_book_BookID` FOREIGN KEY (`BookId`) REFERENCES `book` (`BookID`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pages`
--

LOCK TABLES `pages` WRITE;
/*!40000 ALTER TABLE `pages` DISABLE KEYS */;
INSERT INTO `pages` (`PageId`, `Type`, `Template`, `ElementOrder`, `GridDirection`, `GridNumRows`, `Actived`, `BookId`) VALUES (1,0,0,1,'horizontal',1,1,1),(2,0,0,1,'horizontal',1,1,1),(3,0,0,1,'horizontal',1,1,1),(4,0,0,1,'horizontal',1,1,1),(5,0,0,1,'horizontal',1,1,1),(6,2,0,1,'horizontal',1,1,1),(7,2,0,0,'horizontal',1,1,1),(8,2,0,0,'horizontal',1,1,3),(9,2,0,0,'horizontal',1,1,3),(10,2,0,0,'horizontal',1,1,3),(11,2,0,0,'horizontal',1,1,3),(12,2,0,0,'horizontal',1,1,3),(13,2,0,0,'horizontal',1,1,3),(14,2,0,0,'horizontal',1,1,3),(15,2,0,0,'horizontal',1,1,3),(16,2,0,0,'horizontal',1,1,3),(17,2,0,0,'horizontal',1,1,3),(18,2,0,0,'horizontal',1,1,3),(19,2,0,0,'horizontal',1,1,3),(20,2,0,0,'horizontal',1,1,3),(21,2,0,0,'horizontal',1,1,3),(22,2,0,0,'horizontal',1,1,3),(23,2,0,0,'horizontal',1,1,3),(24,2,0,0,'horizontal',1,1,3),(25,4,0,0,'horizontal',1,1,3),(26,4,0,0,'horizontal',1,1,1),(27,4,0,0,'horizontal',1,1,3),(28,2,0,1,'horizontal',1,1,4),(29,2,0,2,'horizontal',1,1,4),(30,2,0,3,'horizontal',1,1,4),(31,2,0,4,'horizontal',1,1,4),(32,2,0,5,'horizontal',1,1,4),(33,2,0,6,'horizontal',1,1,4),(34,2,0,7,'horizontal',1,1,4),(35,2,0,8,'horizontal',1,1,4),(38,4,0,9,'horizontal',1,1,4),(39,4,0,10,'horizontal',1,1,4),(40,4,0,11,'horizontal',1,1,4),(41,4,0,12,'horizontal',1,1,4),(42,4,0,13,'horizontal',1,1,4),(43,2,0,1,'horizontal',1,1,5),(44,2,0,1,'horizontal',1,1,5),(45,2,0,1,'horizontal',1,1,5),(46,2,0,1,'horizontal',1,1,5),(47,2,0,1,'horizontal',1,1,5),(48,2,0,1,'horizontal',1,1,5),(49,2,0,1,'horizontal',1,1,5),(50,2,0,1,'horizontal',1,1,5),(51,2,0,1,'horizontal',1,1,5),(52,2,0,1,'horizontal',1,1,5),(53,2,0,1,'horizontal',1,1,5),(54,2,0,1,'horizontal',1,1,5),(55,2,0,1,'horizontal',1,1,5),(56,2,0,1,'horizontal',1,1,5),(57,2,0,1,'horizontal',1,1,5),(58,2,0,1,'horizontal',1,1,5),(59,2,0,1,'horizontal',1,1,5),(60,2,0,1,'horizontal',1,1,5),(61,4,0,1,'horizontal',1,1,5),(62,4,0,1,'horizontal',1,1,5),(63,4,0,1,'horizontal',1,1,5),(64,4,0,1,'horizontal',1,1,5),(65,4,0,1,'horizontal',1,1,5);
/*!40000 ALTER TABLE `pages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `RolesId` int NOT NULL AUTO_INCREMENT,
  `Role` varchar(200) NOT NULL,
  PRIMARY KEY (`RolesId`),
  UNIQUE KEY `Role` (`Role`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` (`RolesId`, `Role`) VALUES (1,'administrativo'),(2,'estudiante'),(3,'profesor');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sharedbooks`
--

DROP TABLE IF EXISTS `sharedbooks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sharedbooks` (
  `SharedBooksId` int NOT NULL AUTO_INCREMENT,
  `BookID` int DEFAULT NULL,
  `UserID` int DEFAULT NULL,
  PRIMARY KEY (`SharedBooksId`),
  KEY `sharedbooks_BookID_3c933870_fk_book_BookID` (`BookID`),
  KEY `sharedbooks_UserID_fc5a94cd_fk_user_UserId` (`UserID`),
  CONSTRAINT `sharedbooks_BookID_3c933870_fk_book_BookID` FOREIGN KEY (`BookID`) REFERENCES `book` (`BookID`),
  CONSTRAINT `sharedbooks_UserID_fc5a94cd_fk_user_UserId` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sharedbooks`
--

LOCK TABLES `sharedbooks` WRITE;
/*!40000 ALTER TABLE `sharedbooks` DISABLE KEYS */;
/*!40000 ALTER TABLE `sharedbooks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `studentgroups`
--

DROP TABLE IF EXISTS `studentgroups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `studentgroups` (
  `StudentsGroupsId` int NOT NULL AUTO_INCREMENT,
  `isTeacher` int DEFAULT NULL,
  `CreatedAt` datetime(6) DEFAULT NULL,
  `isactive` int DEFAULT NULL,
  `CreatedBy` int NOT NULL,
  `GroupsCreateId` int NOT NULL,
  `UserId` int NOT NULL,
  PRIMARY KEY (`StudentsGroupsId`),
  UNIQUE KEY `studentgroups_UserId_GroupsCreateId_2369a45f_uniq` (`UserId`,`GroupsCreateId`),
  KEY `studentgroups_CreatedBy_0b0248e2_fk_user_UserId` (`CreatedBy`),
  KEY `studentgroups_GroupsCreateId_9fecebf7_fk_groupscreate_id` (`GroupsCreateId`),
  CONSTRAINT `studentgroups_CreatedBy_0b0248e2_fk_user_UserId` FOREIGN KEY (`CreatedBy`) REFERENCES `user` (`UserId`),
  CONSTRAINT `studentgroups_GroupsCreateId_9fecebf7_fk_groupscreate_id` FOREIGN KEY (`GroupsCreateId`) REFERENCES `groupscreate` (`id`),
  CONSTRAINT `studentgroups_UserId_d44e3f99_fk_user_UserId` FOREIGN KEY (`UserId`) REFERENCES `user` (`UserId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `studentgroups`
--

LOCK TABLES `studentgroups` WRITE;
/*!40000 ALTER TABLE `studentgroups` DISABLE KEYS */;
INSERT INTO `studentgroups` (`StudentsGroupsId`, `isTeacher`, `CreatedAt`, `isactive`, `CreatedBy`, `GroupsCreateId`, `UserId`) VALUES (5,0,'2025-04-28 11:30:53.004803',1,5,6,2),(6,0,'2025-04-28 12:09:00.775635',1,5,7,2),(7,0,'2025-04-29 13:17:02.766597',1,5,8,6);
/*!40000 ALTER TABLE `studentgroups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subtitled`
--

DROP TABLE IF EXISTS `subtitled`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subtitled` (
  `idsubtitled` int NOT NULL AUTO_INCREMENT,
  `transcription` json NOT NULL,
  `translation` json NOT NULL,
  `idmedia` int NOT NULL,
  PRIMARY KEY (`idsubtitled`),
  KEY `subtitled_idmedia_246db65a_fk_media_id` (`idmedia`),
  CONSTRAINT `subtitled_idmedia_246db65a_fk_media_id` FOREIGN KEY (`idmedia`) REFERENCES `media` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subtitled`
--

LOCK TABLES `subtitled` WRITE;
/*!40000 ALTER TABLE `subtitled` DISABLE KEYS */;
/*!40000 ALTER TABLE `subtitled` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tags` (
  `TagsId` int NOT NULL AUTO_INCREMENT,
  `description` varchar(50) NOT NULL,
  `descriptionn` varchar(50) NOT NULL,
  PRIMARY KEY (`TagsId`),
  UNIQUE KEY `description` (`description`),
  UNIQUE KEY `descriptionn` (`descriptionn`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tagsperpage`
--

DROP TABLE IF EXISTS `tagsperpage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tagsperpage` (
  `TagsPerPageId` int NOT NULL AUTO_INCREMENT,
  `PageID` int DEFAULT NULL,
  `TagsID` int DEFAULT NULL,
  PRIMARY KEY (`TagsPerPageId`),
  KEY `tagsperpage_PageID_14b7a954_fk_pages_PageId` (`PageID`),
  KEY `tagsperpage_TagsID_e54bfd98_fk_tags_TagsId` (`TagsID`),
  CONSTRAINT `tagsperpage_PageID_14b7a954_fk_pages_PageId` FOREIGN KEY (`PageID`) REFERENCES `pages` (`PageId`),
  CONSTRAINT `tagsperpage_TagsID_e54bfd98_fk_tags_TagsId` FOREIGN KEY (`TagsID`) REFERENCES `tags` (`TagsId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tagsperpage`
--

LOCK TABLES `tagsperpage` WRITE;
/*!40000 ALTER TABLE `tagsperpage` DISABLE KEYS */;
/*!40000 ALTER TABLE `tagsperpage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher`
--

DROP TABLE IF EXISTS `teacher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teacher` (
  `TeacherId` int NOT NULL AUTO_INCREMENT,
  `TeacherName` varchar(500) NOT NULL,
  `TeacherPwd` varchar(50) NOT NULL,
  PRIMARY KEY (`TeacherId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher`
--

LOCK TABLES `teacher` WRITE;
/*!40000 ALTER TABLE `teacher` DISABLE KEYS */;
/*!40000 ALTER TABLE `teacher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team`
--

DROP TABLE IF EXISTS `team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `team` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `Points` int NOT NULL,
  `CreatedAt` datetime(6) NOT NULL,
  `LastUpdated` datetime(6) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team`
--

LOCK TABLES `team` WRITE;
/*!40000 ALTER TABLE `team` DISABLE KEYS */;
/*!40000 ALTER TABLE `team` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teamuser`
--

DROP TABLE IF EXISTS `teamuser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teamuser` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `TeamId` int NOT NULL,
  `UserId` int NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `teamuser_TeamId_64489ee3_fk_team_Id` (`TeamId`),
  KEY `teamuser_UserId_eb6aad8b_fk_user_UserId` (`UserId`),
  CONSTRAINT `teamuser_TeamId_64489ee3_fk_team_Id` FOREIGN KEY (`TeamId`) REFERENCES `team` (`Id`),
  CONSTRAINT `teamuser_UserId_eb6aad8b_fk_user_UserId` FOREIGN KEY (`UserId`) REFERENCES `user` (`UserId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teamuser`
--

LOCK TABLES `teamuser` WRITE;
/*!40000 ALTER TABLE `teamuser` DISABLE KEYS */;
/*!40000 ALTER TABLE `teamuser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `UserId` int NOT NULL AUTO_INCREMENT,
  `Email` varchar(254) NOT NULL,
  `Name` varchar(200) DEFAULT NULL,
  `LastName` varchar(200) DEFAULT NULL,
  `password` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `CreatedAt` datetime(6) DEFAULT NULL,
  `Actived` int DEFAULT NULL,
  `UserName` varchar(200) DEFAULT NULL,
  `Level` int DEFAULT NULL,
  PRIMARY KEY (`UserId`),
  UNIQUE KEY `Email` (`Email`),
  UNIQUE KEY `UserName` (`UserName`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`UserId`, `Email`, `Name`, `LastName`, `password`, `CreatedAt`, `Actived`, `UserName`, `Level`) VALUES (1,'zana@gmail.com','Zana','Pizarro','ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f','2025-02-21 21:15:21.339371',1,'ZanaCR',NULL),(2,'zana@test.com','ZanaStudent','Pizarro','ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f','2025-02-21 21:16:38.241289',1,'ZanaCRC',NULL),(3,'jeremy.pizarro@funread.com','Jeremy Pizarro','Pizarro','ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f','2025-02-26 14:07:10.407476',1,'JeremyFunr',NULL),(4,'sandra.guzman@funread.cr','Sandra Guzmán','Guzmán','ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f','2025-02-26 14:38:39.268817',1,'SandraFunread',NULL),(5,'marcelamontenegro@funread.com','Marcela','Montenegro','ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f','2025-04-24 07:47:07.210631',1,'MarceMontenegro',NULL),(6,'jeremy@funread.com','Jeremy Montenegro','Montenegro','ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f','2025-04-29 13:15:29.650618',1,'Monte-Jere',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userbadge`
--

DROP TABLE IF EXISTS `userbadge`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userbadge` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `date` datetime(6) NOT NULL,
  `badge_id` bigint NOT NULL,
  `user_id` int NOT NULL,
  `achieved` tinyint(1) NOT NULL,
  `progress` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userbadge_badge_id_83e2660f_fk_badges_id` (`badge_id`),
  KEY `userbadge_user_id_173a5980_fk_user_UserId` (`user_id`),
  CONSTRAINT `userbadge_badge_id_83e2660f_fk_badges_id` FOREIGN KEY (`badge_id`) REFERENCES `badges` (`id`),
  CONSTRAINT `userbadge_user_id_173a5980_fk_user_UserId` FOREIGN KEY (`user_id`) REFERENCES `user` (`UserId`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userbadge`
--

LOCK TABLES `userbadge` WRITE;
/*!40000 ALTER TABLE `userbadge` DISABLE KEYS */;
INSERT INTO `userbadge` (`id`, `date`, `badge_id`, `user_id`, `achieved`, `progress`) VALUES (9,'2025-04-28 13:16:27.355721',3,2,1,0),(10,'2025-04-28 13:16:27.531832',4,2,1,0),(11,'2025-04-29 13:19:49.911650',3,6,1,0),(12,'2025-04-29 13:19:50.141385',4,6,1,0),(13,'2025-05-05 21:33:50.637362',5,2,1,0),(14,'2025-05-05 21:33:50.727506',6,2,1,0);
/*!40000 ALTER TABLE `userbadge` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userbookprogress`
--

DROP TABLE IF EXISTS `userbookprogress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userbookprogress` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Status` int NOT NULL,
  `Calificacion` double DEFAULT NULL,
  `BookId` int NOT NULL,
  `UserId` int NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `userbookprogress_BookId_48fefd8f_fk_book_BookID` (`BookId`),
  KEY `userbookprogress_UserId_985447e2_fk_user_UserId` (`UserId`),
  CONSTRAINT `userbookprogress_BookId_48fefd8f_fk_book_BookID` FOREIGN KEY (`BookId`) REFERENCES `book` (`BookID`),
  CONSTRAINT `userbookprogress_UserId_985447e2_fk_user_UserId` FOREIGN KEY (`UserId`) REFERENCES `user` (`UserId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userbookprogress`
--

LOCK TABLES `userbookprogress` WRITE;
/*!40000 ALTER TABLE `userbookprogress` DISABLE KEYS */;
INSERT INTO `userbookprogress` (`Id`, `Status`, `Calificacion`, `BookId`, `UserId`) VALUES (1,1,100,4,2),(3,1,100,5,2),(4,1,100,4,5),(5,1,100,4,6);
/*!40000 ALTER TABLE `userbookprogress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userpoints`
--

DROP TABLE IF EXISTS `userpoints`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userpoints` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `total_points` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userpoints_user_id_bca82fd3_fk_user_UserId` (`user_id`),
  CONSTRAINT `userpoints_user_id_bca82fd3_fk_user_UserId` FOREIGN KEY (`user_id`) REFERENCES `user` (`UserId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userpoints`
--

LOCK TABLES `userpoints` WRITE;
/*!40000 ALTER TABLE `userpoints` DISABLE KEYS */;
INSERT INTO `userpoints` (`id`, `total_points`, `user_id`) VALUES (3,330,2),(4,100,6);
/*!40000 ALTER TABLE `userpoints` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userpointslog`
--

DROP TABLE IF EXISTS `userpointslog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userpointslog` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Points` int NOT NULL,
  `Reason` varchar(255) NOT NULL,
  `Date` date NOT NULL,
  `UserId` int NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `userpointslog_UserId_7c1cee42_fk_user_UserId` (`UserId`),
  CONSTRAINT `userpointslog_UserId_7c1cee42_fk_user_UserId` FOREIGN KEY (`UserId`) REFERENCES `user` (`UserId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userpointslog`
--

LOCK TABLES `userpointslog` WRITE;
/*!40000 ALTER TABLE `userpointslog` DISABLE KEYS */;
/*!40000 ALTER TABLE `userpointslog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userroles`
--

DROP TABLE IF EXISTS `userroles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userroles` (
  `UserRolesId` int NOT NULL AUTO_INCREMENT,
  `IdRole` int NOT NULL,
  `IdUser` int NOT NULL,
  PRIMARY KEY (`UserRolesId`),
  KEY `userroles_IdRole_c2fd6b66_fk_roles_RolesId` (`IdRole`),
  KEY `userroles_IdUser_eb9dbf8e_fk_user_UserId` (`IdUser`),
  CONSTRAINT `userroles_IdRole_c2fd6b66_fk_roles_RolesId` FOREIGN KEY (`IdRole`) REFERENCES `roles` (`RolesId`),
  CONSTRAINT `userroles_IdUser_eb9dbf8e_fk_user_UserId` FOREIGN KEY (`IdUser`) REFERENCES `user` (`UserId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userroles`
--

LOCK TABLES `userroles` WRITE;
/*!40000 ALTER TABLE `userroles` DISABLE KEYS */;
INSERT INTO `userroles` (`UserRolesId`, `IdRole`, `IdUser`) VALUES (1,3,1),(2,2,2),(3,3,3),(4,3,4),(5,3,5),(6,2,6);
/*!40000 ALTER TABLE `userroles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `widget`
--

DROP TABLE IF EXISTS `widget`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `widget` (
  `WidgetId` int NOT NULL AUTO_INCREMENT,
  `Type` int DEFAULT NULL,
  `Name` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`WidgetId`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `widget`
--

LOCK TABLES `widget` WRITE;
/*!40000 ALTER TABLE `widget` DISABLE KEYS */;
INSERT INTO `widget` (`WidgetId`, `Type`, `Name`) VALUES (1,1,'Title'),(2,1,'Description'),(3,2,'Image'),(4,2,'Video'),(5,2,'Audio'),(6,3,'Shape'),(7,4,'True Or False'),(8,4,'Complete'),(9,4,'Quiz'),(10,5,'Code');
/*!40000 ALTER TABLE `widget` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `widgetitem`
--

DROP TABLE IF EXISTS `widgetitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `widgetitem` (
  `WidgetItemId` int NOT NULL AUTO_INCREMENT,
  `Value` json DEFAULT NULL,
  `Type` int DEFAULT NULL,
  `ElementOrder` int DEFAULT NULL,
  `PageId` int DEFAULT NULL,
  `WidgetId` int DEFAULT NULL,
  PRIMARY KEY (`WidgetItemId`),
  KEY `widgetitem_PageId_fcdb6b69_fk_pages_PageId` (`PageId`),
  KEY `widgetitem_WidgetId_935558da_fk_widget_WidgetId` (`WidgetId`),
  CONSTRAINT `widgetitem_PageId_fcdb6b69_fk_pages_PageId` FOREIGN KEY (`PageId`) REFERENCES `pages` (`PageId`),
  CONSTRAINT `widgetitem_WidgetId_935558da_fk_widget_WidgetId` FOREIGN KEY (`WidgetId`) REFERENCES `widget` (`WidgetId`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `widgetitem`
--

LOCK TABLES `widgetitem` WRITE;
/*!40000 ALTER TABLE `widgetitem` DISABLE KEYS */;
INSERT INTO `widgetitem` (`WidgetItemId`, `Value`, `Type`, `ElementOrder`, `PageId`, `WidgetId`) VALUES (1,'{\"data\": \"<p>Test</p>\"}',1,0,1,2),(2,'{\"data\": \"/Media/media/1.png\"}',2,0,2,3),(3,'{\"data\": \"/Media/media/1.png\"}',2,0,3,3),(4,'{\"data\": \"<p>EJEMPLO</p>\"}',1,0,4,2),(5,'{\"data\": \"/Media/media/2.jpg\"}',2,0,5,3),(9,'{\"x\": 100, \"y\": 100, \"fill\": \"blue\", \"stroke\": \"black\", \"strokeWidth\": 2}',4,1,6,3),(10,'{\"x\": 0, \"y\": 0, \"src\": \"/Media/media/Crystals/1.jpg\", \"width\": 720, \"height\": 720}',2,1,8,3),(11,'{\"x\": 0, \"y\": 0, \"src\": \"/Media/media/Crystals/2.jpg\", \"width\": 720, \"height\": 720}',2,1,9,3),(12,'{\"x\": 0, \"y\": 0, \"src\": \"/Media/media/Crystals/3.jpg\", \"width\": 720, \"height\": 720}',2,1,10,3),(13,'{\"x\": 0, \"y\": 0, \"src\": \"/Media/media/Crystals/4.jpg\", \"width\": 720, \"height\": 720}',2,1,11,3),(14,'{\"x\": 0, \"y\": 0, \"src\": \"/Media/media/Crystals/5.jpg\", \"width\": 720, \"height\": 720}',2,1,12,3),(15,'{\"x\": 0, \"y\": 0, \"src\": \"/Media/media/Crystals/6.jpg\", \"width\": 720, \"height\": 720}',2,1,13,3),(16,'{\"x\": 0, \"y\": 0, \"src\": \"/Media/media/Crystals/7.jpg\", \"width\": 720, \"height\": 720}',2,1,14,3),(17,'{\"x\": 0, \"y\": 0, \"src\": \"/Media/media/Crystals/8.jpg\", \"width\": 720, \"height\": 720}',2,1,15,3),(18,'{\"x\": 0, \"y\": 0, \"src\": \"/Media/media/Crystals/9.jpg\", \"width\": 720, \"height\": 720}',2,1,16,3),(19,'{\"x\": 0, \"y\": 0, \"src\": \"/Media/media/Crystals/10.jpg\", \"width\": 720, \"height\": 720}',2,1,17,3),(20,'{\"x\": 0, \"y\": 0, \"src\": \"/Media/media/Crystals/11.jpg\", \"width\": 720, \"height\": 720}',2,1,18,3),(21,'{\"x\": 0, \"y\": 0, \"src\": \"/Media/media/Crystals/12.jpg\", \"width\": 720, \"height\": 720}',2,1,19,3),(22,'{\"x\": 0, \"y\": 0, \"src\": \"/Media/media/Crystals/13.jpg\", \"width\": 720, \"height\": 720}',2,1,20,3),(23,'{\"x\": 0, \"y\": 0, \"src\": \"/Media/media/Crystals/14.jpg\", \"width\": 720, \"height\": 720}',2,1,21,3),(24,'{\"x\": 0, \"y\": 0, \"src\": \"/Media/media/Crystals/15.jpg\", \"width\": 720, \"height\": 720}',2,1,22,3),(25,'{\"x\": 0, \"y\": 0, \"src\": \"/Media/media/Crystals/16.jpg\", \"width\": 720, \"height\": 720}',2,1,23,3),(26,'{\"x\": 0, \"y\": 0, \"src\": \"/Media/media/Crystals/17.jpg\", \"width\": 720, \"height\": 720}',2,1,24,3),(27,'{\"x\": 0, \"y\": 0, \"src\": \"/Media/media/Crystals/18.jpg\", \"width\": 720, \"height\": 720}',2,1,25,3),(28,'{\"x\": 50, \"y\": 50, \"fill\": \"red\", \"name\": \"rectangle\", \"width\": 120, \"height\": 80, \"stroke\": \"black\"}',3,0,6,3),(29,'{\"x\": 200, \"y\": 100, \"fill\": \"blue\", \"name\": \"circle\", \"radius\": 40, \"stroke\": \"black\"}',3,0,6,3),(30,'{\"x\": 200, \"y\": 50, \"fill\": \"green\", \"name\": \"square\", \"size\": 100, \"stroke\": \"black\"}',3,0,6,3),(31,'{\"x\": 50, \"y\": 200, \"fill\": \"white\", \"name\": \"message\", \"width\": 150, \"height\": 100, \"stroke\": \"black\"}',3,0,6,3),(32,'{\"x\": 250, \"y\": 200, \"fill\": \"#e0e0e0\", \"name\": \"thinking\", \"width\": 120, \"height\": 80, \"stroke\": \"black\"}',3,0,6,3),(33,'{\"title\": \"Choose the correct verb or adjective from the options.\", \"question\": \"Esteban _______ to win the scholarship. (Choose the correct verb)\"}',4,0,25,9),(34,'{\"title\": \"TEST\", \"question\": \"Esteban _______ to win the scholarship. (Choose the correct verb)\"}',4,0,27,9),(35,'{\"x\": 0, \"y\": 0, \"src\": \"/Media/media/CostaRicasHeroes/1.png\", \"width\": 720, \"height\": 720}',2,0,28,3),(36,'{\"x\": 0, \"y\": 0, \"src\": \"/Media/media/CostaRicasHeroes/2.png\", \"width\": 700, \"height\": 720}',2,0,29,3),(37,'{\"x\": 0, \"y\": 0, \"src\": \"/Media/media/CostaRicasHeroes/3.png\", \"width\": 700, \"height\": 720}',2,0,30,3),(38,'{\"x\": 0, \"y\": 0, \"src\": \"/Media/media/CostaRicasHeroes/4.png\", \"width\": 700, \"height\": 720}',2,0,31,3),(39,'{\"x\": 0, \"y\": 0, \"src\": \"/Media/media/CostaRicasHeroes/5.png\", \"width\": 700, \"height\": 720}',2,0,32,3),(40,'{\"x\": 0, \"y\": 0, \"src\": \"/Media/media/CostaRicasHeroes/6.png\", \"width\": 700, \"height\": 720}',2,0,33,3),(41,'{\"x\": 0, \"y\": 0, \"src\": \"/Media/media/CostaRicasHeroes/7.png\", \"width\": 700, \"height\": 720}',2,0,34,3),(42,'{\"x\": 0, \"y\": 0, \"src\": \"/Media/media/CostaRicasHeroes/8.png\", \"width\": 700, \"height\": 720}',2,0,35,3),(43,'{\"title\": \"Choose the correct verb or adjective from the options.\", \"question\": \"Esteban _______ to win the scholarship. (Choose the correct verb)\"}',4,0,38,9),(44,'{\"title\": \"Choose the correct verb or adjective from the options.\", \"question\": \"Juan Santamaría was_______. (Choose the correct adjective)\"}',4,0,39,9),(45,'{\"title\": \"Choose the correct verb or adjective from the options.\", \"question\": \"Juanito Mora was _______. (Choose the correct adjective)\"}',4,0,40,9),(46,'{\"title\": \"Choose the correct verb or adjective from the options.\", \"question\": \"The teacher was _______ with Esteban’s hard work. (Choose the correct adjective)\"}',4,0,41,9),(47,'{\"title\": \"Choose the correct verb or adjective from the options.\", \"question\": \"Ms. Daniela _______ the scholarship winner. (Choose the correct verb)\"}',4,0,42,9),(48,'{\"x\": 0, \"y\": 0, \"src\": \"/Media/media/CrystalsJourney/1.png\", \"width\": 720, \"height\": 720}',2,0,43,3),(49,'{\"x\": 0, \"y\": 0, \"src\": \"/Media/media/CrystalsJourney/2.png\", \"width\": 720, \"height\": 720}',2,0,44,3),(50,'{\"x\": 0, \"y\": 0, \"src\": \"/Media/media/CrystalsJourney/3.png\", \"width\": 720, \"height\": 720}',2,0,45,3),(51,'{\"x\": 0, \"y\": 0, \"src\": \"/Media/media/CrystalsJourney/4.png\", \"width\": 720, \"height\": 720}',2,0,46,3),(52,'{\"x\": 0, \"y\": 0, \"src\": \"/Media/media/CrystalsJourney/5.png\", \"width\": 720, \"height\": 720}',2,0,47,3),(53,'{\"x\": 0, \"y\": 0, \"src\": \"/Media/media/CrystalsJourney/6.png\", \"width\": 720, \"height\": 720}',2,0,48,3),(54,'{\"x\": 0, \"y\": 0, \"src\": \"/Media/media/CrystalsJourney/7.png\", \"width\": 720, \"height\": 720}',2,0,49,3),(55,'{\"x\": 0, \"y\": 0, \"src\": \"/Media/media/CrystalsJourney/8.png\", \"width\": 720, \"height\": 720}',2,0,50,3),(56,'{\"x\": 0, \"y\": 0, \"src\": \"/Media/media/CrystalsJourney/9.png\", \"width\": 720, \"height\": 720}',2,0,51,3),(57,'{\"x\": 0, \"y\": 0, \"src\": \"/Media/media/CrystalsJourney/10.png\", \"width\": 720, \"height\": 720}',2,0,52,3),(58,'{\"x\": 0, \"y\": 0, \"src\": \"/Media/media/CrystalsJourney/11.png\", \"width\": 720, \"height\": 720}',2,0,53,3),(59,'{\"x\": 0, \"y\": 0, \"src\": \"/Media/media/CrystalsJourney/12.png\", \"width\": 720, \"height\": 720}',2,0,54,3),(60,'{\"x\": 0, \"y\": 0, \"src\": \"/Media/media/CrystalsJourney/13.png\", \"width\": 720, \"height\": 720}',2,0,55,3),(61,'{\"x\": 0, \"y\": 0, \"src\": \"/Media/media/CrystalsJourney/14.png\", \"width\": 720, \"height\": 720}',2,0,56,3),(62,'{\"x\": 0, \"y\": 0, \"src\": \"/Media/media/CrystalsJourney/15.png\", \"width\": 720, \"height\": 720}',2,0,57,3),(63,'{\"x\": 0, \"y\": 0, \"src\": \"/Media/media/CrystalsJourney/16.png\", \"width\": 720, \"height\": 720}',2,0,58,3),(64,'{\"x\": 0, \"y\": 0, \"src\": \"/Media/media/CrystalsJourney/17.png\", \"width\": 720, \"height\": 720}',2,0,59,3),(65,'{\"x\": 0, \"y\": 0, \"src\": \"/Media/media/CrystalsJourney/18.png\", \"width\": 720, \"height\": 720}',2,0,60,3),(66,'{\"title\": \"Students complete a 5-question reading comprehension quiz on FUNREAD Platform, where they must fill in the correct past tense verb.\", \"question\": \"Crystal ______ (want) to enter the Science Fair.\"}',4,0,61,9),(67,'{\"title\": \"Students complete a 5-question reading comprehension quiz on FUNREAD Platform, where they must fill in the correct past tense verb.\", \"question\": \"Teacher Gloria ______ (help) Crystal get a computer.\"}',4,0,62,9),(68,'{\"title\": \"Students complete a 5-question reading comprehension quiz on FUNREAD Platform, where they must fill in the correct past tense verb.\", \"question\": \"The community ______ (support) Crystal so she could participate in the Science Fair.\"}',4,0,63,9),(69,'{\"title\": \"Students complete a 5-question reading comprehension quiz on FUNREAD Platform, where they must fill in the correct past tense verb.\", \"question\": \"Marie Curie ______ (discover) radium and polonium.\"}',4,0,64,9),(70,'{\"title\": \"Students complete a 5-question reading comprehension quiz on FUNREAD Platform, where they must fill in the correct past tense verb.\", \"question\": \"At the end of the story, Crystal ______ (win) the Science Fair.\"}',4,0,65,9);
/*!40000 ALTER TABLE `widgetitem` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-02  1:08:18
