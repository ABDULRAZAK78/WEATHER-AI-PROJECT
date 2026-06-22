-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: weatherdb
-- ------------------------------------------------------
-- Server version	8.0.44

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

--
-- Table structure for table `weather_data`
--

DROP TABLE IF EXISTS `weather_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `weather_data` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `ai_advice` longtext,
  `city` varchar(255) DEFAULT NULL,
  `weather_condition` varchar(255) DEFAULT NULL,
  `fetched_at` datetime(6) DEFAULT NULL,
  `humidity` double NOT NULL,
  `temperature` double NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weather_data`
--

LOCK TABLES `weather_data` WRITE;
/*!40000 ALTER TABLE `weather_data` DISABLE KEYS */;
INSERT INTO `weather_data` VALUES (1,'Stay safe and check local weather updates.','Hyderabad','few clouds','2026-05-18 14:48:50.190661',32,39.23),(2,'Stay safe and check local weather updates.','Delhi','clear sky','2026-05-18 14:50:21.739596',19,42.05),(3,'Stay safe and check local weather updates.','Guntur','overcast clouds','2026-05-18 14:51:36.011650',35,39.1),(4,'Stay safe and check local weather updates.','guntur','overcast clouds','2026-05-18 14:52:38.087817',35,39.1),(5,'Stay safe and check local weather updates.','Hyderabad','few clouds','2026-05-18 15:03:41.284390',32,39.23),(6,'Stay safe and check local weather updates.','vijayawada','scattered clouds','2026-05-18 15:09:25.032896',41,37.97),(7,'Stay safe and check local weather updates.','Hyderabad','few clouds','2026-05-18 15:10:10.310973',30,38.23),(8,'Stay safe and check local weather updates.','Bangalore','scattered clouds','2026-05-18 15:10:41.252383',45,33.28),(9,'Stay safe and check local weather updates.','Hyderabad','scattered clouds','2026-05-20 13:46:52.301626',34,37.23),(10,'Stay safe and check local weather updates.','Dubai','dust','2026-05-20 13:46:56.890623',11,40.96),(11,'Stay safe and check local weather updates.','Tokyo','broken clouds','2026-05-20 13:47:00.144919',67,25.82),(12,'Stay safe and check local weather updates.','Hyderabad','scattered clouds','2026-05-20 13:47:01.229270',34,37.23),(13,'Stay safe and check local weather updates.','Bangalore','scattered clouds','2026-05-20 13:47:02.772598',55,30.47),(14,'Stay safe and check local weather updates.','Mumbai','haze','2026-05-20 13:47:04.367394',58,32.99),(15,'Stay safe and check local weather updates.','Dubai','dust','2026-05-20 13:47:06.025192',11,40.96),(16,'Stay safe and check local weather updates.','Dubai','dust','2026-05-20 13:47:26.026337',11,40.96),(17,'Stay safe and check local weather updates.','Hyderabad','Sunny','2026-05-20 13:58:18.162975',19,40.1),(18,'Stay safe and check local weather updates.','Vuyyuru','Sunny','2026-05-20 13:58:28.414364',16,46),(19,'Stay safe and check local weather updates.','Warangal','Sunny','2026-05-20 13:59:32.549645',12,44.4),(20,'Stay safe and check local weather updates.','Jangoan','Thundery outbreaks in nearby','2026-05-20 13:59:53.180863',47,36.2),(21,'Stay safe and check local weather updates.','Nuzvid','Sunny','2026-05-20 14:00:27.478224',15,46),(22,'Stay safe and check local weather updates.','Vissannapeta','Sunny','2026-05-20 14:00:48.816365',15,46),(23,'Stay safe and check local weather updates.','Hanamkonda','Sunny','2026-05-20 14:01:52.515182',10,44.9),(24,'Stay safe and check local weather updates.','Hyderabad','Sunny','2026-05-20 14:08:30.397721',17,40.6),(25,'Stay safe and check local weather updates.','Hanamkonda','Sunny','2026-05-20 14:08:36.233543',10,44.9),(26,'Stay safe and check local weather updates.','Hyderabad','Sunny','2026-05-20 14:10:37.288583',17,40.6),(27,'Stay safe and check local weather updates.','Hyderabad','Sunny','2026-05-20 14:12:05.591882',17,40.6),(28,'Stay safe and check local weather updates.','Hyderabad','Sunny','2026-05-20 14:12:06.457623',17,40.6),(29,'Stay safe and check local weather updates.','Hyderabad','Sunny','2026-05-20 14:14:13.039603',17,40.6),(30,'Stay safe and check local weather updates.','Hyderabad','Sunny','2026-05-20 14:16:40.079219',17,40.6),(31,'Stay safe and check local weather updates.','Hyderabad','Sunny','2026-05-20 14:19:23.275428',17,40.6),(32,'Stay safe and check local weather updates.','Bethel','Overcast','2026-05-20 14:19:53.838804',83,25.1),(33,'Stay safe and check local weather updates.','Hyderabad','Partly cloudy','2026-05-20 14:21:48.039564',33,37),(34,'Stay safe and check local weather updates.','Hyderabad','Partly cloudy','2026-05-20 14:21:48.935640',33,37),(35,'Stay safe and check local weather updates.','Bethel Park','Fog','2026-05-20 14:22:03.278029',84,18.9),(36,'Stay safe and check local weather updates.','Bethel','Overcast','2026-05-20 14:22:27.932772',83,25.1),(37,'Stay safe and check local weather updates.','Bangalore','Partly cloudy','2026-05-20 14:25:58.416836',56,32.3),(38,'Stay safe and check local weather updates.','Bangalore','Partly cloudy','2026-05-20 14:25:59.335862',56,32.3),(39,'It\'s feeling pretty hot and dry outside, the partly cloudy skies aren\'t providing much relief from the sun, and the 37 degrees temperature is really making you feel like you\'re walking into a warm oven. If you\'re planning to step out, make sure to grab a bottle of water and wear a hat or use an umbrella to protect yourself from the intense sunlight.','Hyderabad','Partly cloudy','2026-05-20 14:35:26.342213',35,37.2),(40,'It\'s absolutely scorching outside in Vuyyuru right now, with the sun beating down relentlessly and the dry air making it feel like you\'re walking into a giant oven. If you need to head out, make sure to grab a bottle of water and wear some light, breathable clothing to help keep you cool and comfortable in this sweltering heat.','Vuyyuru','Sunny','2026-05-20 14:36:38.929731',24,43.2),(41,'It\'s a pretty pleasant day outside, with the partly cloudy skies and moderate humidity making the 26 degrees feel quite comfortable, almost like a warm spring morning. If you\'re planning to be out and about, I\'d recommend grabbing a light jacket or sweater for later, as it can still get a bit chilly in the shade or when the sun starts to set.','Tokyo','Partly cloudy','2026-05-20 14:37:29.402907',58,26.3),(42,'It feels absolutely scorching outside, the intense heat enveloping you the moment you step out, even though the overcast conditions might make you think it\'s not that bad, but trust me, it\'s still a furnace out there. If you do need to venture out, make sure to grab a bottle of water and stay hydrated, as the dry air will suck the moisture out of you in no time, even if you\'re just running a quick errand.','Dubai','Overcast','2026-05-20 14:37:39.486064',13,40.2),(43,'It\'s absolutely scorching outside, the kind of heat that hits you like a wall as soon as you step out, making every breath feel like you\'re inhaling hot air from a furnace. If you do need to venture out, make sure to carry a refillable water bottle with you to stay hydrated, as the dry heat can quickly dehydrate you, especially in this kind of sunny weather.','Hyderabad','Sunny','2026-05-20 15:04:25.731329',16,40.9);
/*!40000 ALTER TABLE `weather_data` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-20 15:11:57
