-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: smarthatch
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

SET
  SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET
  time_zone = "+00:00";
--
  -- Database: `SmartHatch`
  --
  DROP DATABASE IF EXISTS SmartHatch;
CREATE DATABASE IF NOT EXISTS `SmartHatch` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `SmartHatch`;
CREATE USER IF NOT EXISTS 'root_fswd' @'localhost' IDENTIFIED BY 'root_fswd';
GRANT ALL PRIVILEGES ON *.* TO 'root_fswd' @'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;

--
--
-- Table structure for table `device`
--

DROP TABLE IF EXISTS `device`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `device` (
  `DeviceID` int NOT NULL,
  `Type` tinyint NOT NULL,
  `Naam` varchar(150) DEFAULT NULL,
  `Beschrijving` varchar(200) DEFAULT NULL,
  `Waarde` float DEFAULT NULL,
  PRIMARY KEY (`DeviceID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `device`
--

LOCK TABLES `device` WRITE;
/*!40000 ALTER TABLE `device` DISABLE KEYS */;
INSERT INTO `device` VALUES (1,0,'sit amet ornare lectus','Donec est mauris, rhoncus id, mollis nec, cursus a, enim.',269),(2,1,'congue a, aliquet vel, vulputate','magnis dis parturient montes, nascetur ridiculus mus. Proin vel nisl. Quisque fringilla euismod enim. Etiam gravida molestie',730),(3,0,'justo nec ante. Maecenas','neque. Morbi quis urna. Nunc quis arcu vel quam dignissim pharetra. Nam ac nulla. In tincidunt congue turpis.',745),(4,0,'eu, eleifend nec, malesuada','enim. Etiam gravida molestie arcu. Sed eu nibh vulputate mauris sagittis placerat. Cras dictum ultricies',991),(5,1,'enim mi','est ac mattis semper, dui lectus rutrum urna, nec luctus felis purus ac tellus. Suspendisse',506),(6,1,'eu lacus. Quisque imperdiet,','Nulla aliquet. Proin velit. Sed malesuada augue ut lacus. Nulla tincidunt, neque',437),(7,1,'enim mi','est ac mattis semper, dui lectus rutrum urna, nec luctus felis purus ac tellus. Suspendisse',805),(8,0,'iaculis odio.','ante. Maecenas mi felis, adipiscing fringilla, porttitor vulputate, posuere vulputate, lacus. Cras interdum. Nunc sollicitudin',788),(9,1,'feugiat tellus lorem eu metus.','volutpat nunc sit amet metus. Aliquam erat volutpat. Nulla facilisis. Suspendisse',976),(10,0,'sagittis semper. Nam tempor diam','Nunc lectus pede, ultrices a, auctor non, feugiat nec, diam. Duis mi enim, condimentum eget, volutpat ornare, facilisis',656),(11,1,'Donec fringilla. Donec','id nunc interdum feugiat. Sed nec',612),(12,0,'tempor,','ut',625),(13,1,'erat volutpat. Nulla dignissim. Maecenas','parturient montes, nascetur ridiculus mus. Proin vel arcu eu odio tristique pharetra. Quisque ac',59),(14,1,'vulputate, nisi sem','aliquam arcu. Aliquam ultrices iaculis odio. Nam interdum enim non nisi. Aenean eget metus.',96),(15,0,'blandit mattis.','malesuada. Integer id magna et ipsum cursus vestibulum. Mauris magna. Duis dignissim tempor arcu. Vestibulum ut eros',864),(16,1,'non, feugiat','lobortis mauris. Suspendisse aliquet molestie tellus. Aenean egestas hendrerit',204),(17,0,'odio.','hendrerit consectetuer, cursus et, magna. Praesent interdum ligula eu enim. Etiam imperdiet dictum magna.',653),(18,1,'fringilla','vel quam dignissim pharetra. Nam ac nulla. In tincidunt congue turpis. In condimentum. Donec at arcu.',367),(19,0,'non sapien','Cras vulputate velit eu sem. Pellentesque ut ipsum ac mi eleifend egestas. Sed pharetra, felis eget varius ultrices,',419),(20,0,'Curabitur vel','amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer',69),(21,1,'sit amet diam eu','consequat dolor vitae dolor. Donec fringilla. Donec feugiat metus sit amet ante. Vivamus non lorem',507),(22,1,'nunc nulla vulputate','Maecenas mi felis, adipiscing fringilla, porttitor vulputate, posuere vulputate, lacus. Cras interdum. Nunc sollicitudin commodo ipsum. Suspendisse non leo.',652),(23,0,'pellentesque massa','nec enim. Nunc ut erat. Sed nunc est, mollis non, cursus non, egestas a, dui.',17),(25,0,'est, vitae','felis ullamcorper viverra. Maecenas iaculis aliquet diam. Sed diam lorem, auctor quis, tristique',137),(26,0,'dolor, nonummy ac, feugiat non,','nec tellus.',281),(27,0,'placerat,','lacus. Etiam bibendum fermentum metus. Aenean sed pede nec ante blandit viverra. Donec',375),(28,1,'lobortis quis, pede. Suspendisse','Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus',655),(29,1,'nec,','vitae, sodales at, velit. Pellentesque ultricies dignissim lacus. Aliquam rutrum lorem ac risus. Morbi metus. Vivamus euismod',700),(30,0,'lacus.','placerat eget, venenatis a, magna. Lorem ipsum dolor sit',32),(31,1,'vehicula','Nam interdum enim non nisi. Aenean eget metus. In nec orci. Donec nibh. Quisque nonummy ipsum',881),(32,1,'diam luctus lobortis. Class aptent','a ultricies adipiscing, enim mi tempor lorem, eget mollis lectus pede et risus. Quisque libero lacus, varius et, euismod et,',39),(33,1,'blandit mattis.','malesuada. Integer id magna et ipsum cursus vestibulum. Mauris magna. Duis dignissim tempor arcu. Vestibulum ut eros',417),(34,0,'justo nec ante. Maecenas','neque. Morbi quis urna. Nunc quis arcu vel quam dignissim pharetra. Nam ac nulla. In tincidunt congue turpis.',497),(35,0,'sit amet luctus vulputate,','Phasellus ornare. Fusce mollis. Duis sit amet diam eu dolor egestas rhoncus.',346),(36,1,'tempor,','ut',101),(37,1,'enim mi','est ac mattis semper, dui lectus rutrum urna, nec luctus felis purus ac tellus. Suspendisse',199),(38,1,'nec, malesuada ut,','nec, mollis vitae, posuere at, velit. Cras lorem lorem, luctus ut, pellentesque eget,',731),(39,1,'Vestibulum ut','Vivamus molestie dapibus ligula. Aliquam',704),(40,0,'dolor quam, elementum at, egestas','Quisque',27),(41,0,'erat vitae risus. Duis','lectus pede, ultrices a, auctor',734),(42,0,'Duis at lacus. Quisque purus','enim commodo hendrerit. Donec porttitor tellus non',378),(43,1,'turpis nec mauris blandit','quis, tristique ac, eleifend vitae,',426),(44,1,'dictum augue','porttitor eros nec tellus. Nunc lectus pede, ultrices a, auctor non, feugiat nec, diam.',618),(45,0,'ac','Sed id risus',990),(46,0,'malesuada vel,','facilisis eget,',776),(47,1,'non quam. Pellentesque habitant morbi','scelerisque, lorem ipsum sodales purus, in molestie tortor nibh sit amet orci. Ut sagittis lobortis mauris. Suspendisse aliquet molestie tellus.',773),(48,1,'consectetuer adipiscing elit.','pharetra, felis eget varius ultrices, mauris ipsum porta elit, a feugiat tellus lorem eu',498),(50,1,'Nullam vitae','Mauris nulla. Integer urna. Vivamus molestie dapibus ligula. Aliquam erat volutpat. Nulla dignissim. Maecenas ornare egestas ligula. Nullam',91),(56,1,'blandit mattis.','malesuada. Integer id magna et ipsum cursus vestibulum. Mauris magna. Duis dignissim tempor arcu. Vestibulum ut eros',565),(69,0,'non sapien','Cras vulputate velit eu sem. Pellentesque ut ipsum ac mi eleifend egestas. Sed pharetra, felis eget varius ultrices,',685);
/*!40000 ALTER TABLE `device` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historiek`
--

DROP TABLE IF EXISTS `historiek`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historiek` (
  `Volgnummer` int NOT NULL AUTO_INCREMENT,
  `DeviceID` int DEFAULT NULL,
  `Waarde` float DEFAULT NULL,
  `Status` tinyint NOT NULL,
  `Datum` datetime NOT NULL,
  PRIMARY KEY (`Volgnummer`),
  KEY `fk_Historiek_Device_idx` (`DeviceID`),
  CONSTRAINT `fk_Historiek_Device` FOREIGN KEY (`DeviceID`) REFERENCES `device` (`DeviceID`),
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historiek`
--

LOCK TABLES `historiek` WRITE;
/*!40000 ALTER TABLE `historiek` DISABLE KEYS */;
INSERT INTO `historiek` VALUES (1,4,69,0,'2020-02-01 00:00:00'),(2,31,56,1,'2020-02-01 00:00:00'),(3,44,50,1,'2020-02-01 00:00:00'),(4,39,48,1,'2020-02-01 00:00:00'),(5,40,47,0,'2020-02-01 00:00:00'),(6,20,46,0,'2020-02-01 00:00:00'),(7,25,45,1,'2020-02-01 00:00:00'),(8,41,44,1,'2020-02-01 00:00:00'),(9,17,43,1,'2020-02-01 00:00:00'),(10,35,42,1,'2020-02-01 00:00:00'),(11,50,41,1,'2020-02-01 00:00:00'),(12,23,40,0,'2020-02-01 12:00:00'),(13,48,39,1,'2020-02-01 12:00:00'),(14,29,38,0,'2020-02-01 12:00:00'),(15,13,37,0,'2020-02-01 12:00:00'),(16,14,36,0,'2020-02-01 12:00:00'),(17,45,35,0,'2020-02-01 12:00:00'),(18,42,34,1,'2020-02-01 12:00:00'),(19,1,33,0,'2020-02-01 12:00:00'),(20,47,32,1,'2020-02-02 00:00:00'),(21,6,31,1,'2020-02-02 00:00:00'),(22,27,30,0,'2020-02-02 00:00:00'),(23,8,29,1,'2020-02-02 00:00:00'),(24,46,28,0,'2020-02-02 00:00:00'),(25,18,27,0,'2020-02-02 00:00:00'),(26,26,26,1,'2020-02-02 00:00:00'),(27,28,25,1,'2020-02-02 00:00:00'),(28,38,23,0,'2020-02-02 12:00:00'),(29,43,22,0,'2020-02-02 12:00:00'),(30,16,21,0,'2020-02-02 12:00:00'),(31,30,20,1,'2020-02-02 12:00:00'),(32,22,19,0,'2020-02-02 12:00:00'),(33,9,18,1,'2020-02-02 12:00:00'),(34,32,17,1,'2020-02-02 12:00:00'),(35,11,16,0,'2020-02-02 12:00:00'),(36,21,15,1,'2020-02-03 00:00:00'),(37,2,14,0,'2020-02-03 00:00:00'),(38,10,13,0,'2020-02-03 00:00:00'),(39,37,12,1,'2020-02-03 00:00:00'),(40,33,11,1,'2020-02-03 00:00:00'),(41,36,10,0,'2020-02-03 00:00:00'),(42,19,9,1,'2020-02-03 00:00:00'),(43,34,8,1,'2020-02-03 00:00:00'),(44,5,7,0,'2020-02-03 12:00:00'),(45,56,6,1,'2020-02-03 12:00:00'),(46,12,5,0,'2020-02-03 12:00:00'),(47,69,4,0,'2020-02-03 12:00:00'),(48,3,3,1,'2020-02-03 12:00:00'),(49,7,2,1,'2020-02-03 12:00:00'),(50,15,1,0,'2020-02-03 12:00:00');
/*!40000 ALTER TABLE `historiek` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kat`
--

DROP TABLE IF EXISTS `kat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kat` (
  `KatID` int NOT NULL,
  `Naam` varchar(45) DEFAULT NULL,
  `RfidNummer` varchar(45) NOT NULL,
  `Status` tinyint NOT NULL,
  PRIMARY KEY (`KatID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kat`
--

LOCK TABLES `kat` WRITE;
/*!40000 ALTER TABLE `kat` DISABLE KEYS */;
INSERT INTO `kat` VALUES (1,'Aladdin Bonner','3',0),(2,'Tarik Hanson','1',1),(3,'Isabelle Manning','24',1),(4,'Shelley Cruz','1',1),(5,'Debra Beck','35',1),(6,'Amos Flores','6',1),(7,'Lane Cooke','29',1),(8,'Charlotte Finch','17',1),(9,'Joel Johnston','33',0),(10,'Kevyn Conley','9',0),(11,'Desiree Trevino','11',0),(12,'Macy Robbins','38',0),(13,'Stone Haynes','21',0),(14,'Armand Gibson','8',0),(15,'Drew Burt','33',1),(16,'Ora Hurley','43',0),(17,'Adrian Taylor','6',1),(18,'April Berry','26',1),(19,'Philip Charles','19',0),(20,'Jamalia Walsh','33',1),(21,'Velma Sherman','36',0),(22,'Chase Hendrix','33',0),(23,'Virginia Whitney','37',0),(25,'Petra Peterson','19',0),(26,'Dalton Peck','36',0),(27,'Walter Molina','38',0),(28,'Calvin Dunn','38',1),(29,'Aladdin Holcomb','13',0),(30,'Ora Powell','37',1),(31,'Kimberly Hudson','27',1),(32,'Kiara Parks','27',0),(33,'Honorato Wilkins','3',1),(34,'Emerson Whitehead','32',1),(35,'Danielle White','41',1),(36,'Barclay Brewer','17',1),(37,'Eagan Wall','15',0),(38,'Shelley Bruce','25',1),(39,'Deborah Collier','11',0),(40,'Patricia Cobb','1',1),(41,'Jorden Park','33',0),(42,'Hoyt Foster','34',0),(43,'Lenore Lee','2',1),(44,'Charde Shaffer','14',1),(45,'Richard Weeks','27',0),(46,'Natalie Phillips','1',0),(47,'Roth Cherry','6',1),(48,'Wesley Adams','36',1),(50,'Joy Summers','37',1),(56,'Fatima Black','31',1),(69,'Dahlia Paul','36',0);
/*!40000 ALTER TABLE `kat` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
