-- MySQL dump 10.13  Distrib 8.0.35, for Win64 (x86_64)
--
-- Host: localhost    Database: ecommercesubgrupo2
-- ------------------------------------------------------
-- Server version	8.0.35

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
-- Current Database: `ecommercesubgrupo2`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `ecommercesubgrupo2` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `ecommercesubgrupo2`;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL,
  `name` varchar(30) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `productCount` int DEFAULT NULL,
  `imgSrc` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (101,'Autos','Los mejores precios en autos 0 kilómetro, de alta y media gama.',5,'img/cat101_1.jpg'),(102,'Juguetes','Encuentra aquí los mejores precios para niños/as de cualquier edad.',4,'img/cat102_1.jpg'),(103,'Muebles','Muebles antiguos, nuevos y para ser armados por uno mismo.',4,'img/cat103_1.jpg'),(104,'Herramientas','Herramientas para cualquier tipo de trabajo.',0,'img/cat104_1.jpg'),(105,'Computadoras','Todo en cuanto a computadoras, para uso de oficina y/o juegos.',1,'img/cat105_1.jpg'),(106,'Vestimenta','Gran variedad de ropa, nueva y de segunda mano.',0,'img/cat106_1.jpg'),(107,'Electrodomésticos','Todos los electrodomésticos modernos y de bajo consumo.',0,'img/cat107_1.jpg'),(108,'Deporte','Toda la variedad de indumentaria para todo tipo de deporte.',0,'img/cat108_1.jpg'),(109,'Celulares','Celulares de todo tipo para cubrir todas las necesidades.',0,'img/cat109_1.jpg');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category_product`
--

DROP TABLE IF EXISTS `category_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category_product` (
  `idCategory` int NOT NULL,
  `idProduct` int NOT NULL,
  PRIMARY KEY (`idCategory`,`idProduct`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_product`
--

LOCK TABLES `category_product` WRITE;
/*!40000 ALTER TABLE `category_product` DISABLE KEYS */;
INSERT INTO `category_product` VALUES (101,50921),(101,50922),(101,50923),(101,50924),(101,50925),(101,60819),(101,60820),(101,60821),(101,60822),(101,60823),(101,60824),(101,60825),(101,60826),(101,60827),(101,60828),(101,60829),(101,60830),(101,60831),(101,60832),(101,60833),(102,50741),(102,50742),(102,50743),(102,50744),(103,60801),(103,60802),(103,60803),(103,60804),(105,40281);
/*!40000 ALTER TABLE `category_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idproduct` int NOT NULL,
  `score` int DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `user` varchar(255) DEFAULT NULL,
  `dateTime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`,`idproduct`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (48,50925,3,'Ligeramente caro pero cumple','howtobruno','2023-11-26 01:26:09');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `commentswithimage`
--

DROP TABLE IF EXISTS `commentswithimage`;
/*!50001 DROP VIEW IF EXISTS `commentswithimage`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `commentswithimage` AS SELECT 
 1 AS `id`,
 1 AS `idproduct`,
 1 AS `score`,
 1 AS `description`,
 1 AS `user`,
 1 AS `dateTime`,
 1 AS `image`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `productbycategory`
--

DROP TABLE IF EXISTS `productbycategory`;
/*!50001 DROP VIEW IF EXISTS `productbycategory`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `productbycategory` AS SELECT 
 1 AS `idCategory`,
 1 AS `id`,
 1 AS `name`,
 1 AS `description`,
 1 AS `cost`,
 1 AS `currency`,
 1 AS `soldCount`,
 1 AS `image`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `productimages`
--

DROP TABLE IF EXISTS `productimages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productimages` (
  `id` int NOT NULL,
  `image` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productimages`
--

LOCK TABLES `productimages` WRITE;
/*!40000 ALTER TABLE `productimages` DISABLE KEYS */;
INSERT INTO `productimages` VALUES (50921,'img/prod50921_1.jpg'),(50921,'img/prod50921_3.jpg'),(50921,'img/prod50921_2.jpg'),(50921,'img/prod50921_4.jpg'),(50922,'img/prod50922_1.jpg'),(50922,'img/prod50922_2.jpg'),(50922,'img/prod50922_3.jpg'),(50922,'img/prod50922_4.jpg'),(50923,'img/prod50923_2.jpg'),(50923,'img/prod50923_1.jpg'),(50923,'img/prod50923_3.jpg'),(50923,'img/prod50923_4.jpg'),(50924,'img/prod50924_1.jpg'),(50924,'img/prod50924_2.jpg'),(50924,'img/prod50924_3.jpg'),(50924,'img/prod50924_4.jpg'),(50925,'img/prod50925_1.jpg'),(50925,'img/prod50925_2.jpg'),(50925,'img/prod50925_4.jpg'),(50925,'img/prod50925_3.jpg'),(50741,'img/prod50741_1.jpg'),(50741,'img/prod50741_2.jpg'),(50741,'img/prod50741_3.jpg'),(50741,'img/prod50741_4.jpg'),(50742,'img/prod50742_1.jpg'),(50742,'img/prod50742_2.jpg'),(50742,'img/prod50742_3.jpg'),(50742,'img/prod50742_4.jpg'),(50743,'img/prod50743_1.jpg'),(50743,'img/prod50743_2.jpg'),(50743,'img/prod50743_3.jpg'),(50743,'img/prod50743_4.jpg'),(50744,'img/prod50744_1.jpg'),(50744,'img/prod50744_2.jpg'),(50744,'img/prod50744_3.jpg'),(50744,'img/prod50744_4.jpg'),(60801,'img/prod60801_1.jpg'),(60801,'img/prod60801_2.jpg'),(60801,'img/prod60801_3.jpg'),(60801,'img/prod60801_4.jpg'),(60802,'img/prod60802_1.jpg'),(60802,'img/prod60802_2.jpg'),(60802,'img/prod60802_3.jpg'),(60802,'img/prod60802_4.jpg'),(60803,'img/prod60803_1.jpg'),(60803,'img/prod60803_2.jpg'),(60803,'img/prod60803_3.jpg'),(60803,'img/prod60803_4.jpg'),(60804,'img/prod60804_2.jpg'),(60804,'img/prod60804_3.jpg'),(60804,'img/prod60804_1.jpg'),(60804,'img/prod60804_4.jpg'),(40281,'img/prod40281_2.jpg'),(40281,'img/prod40281_1.jpg'),(40281,'img/prod40281_3.jpg'),(40281,'img/prod40281_4.jpg'),(60830,'/img/Aston Martin DB120.png'),(60830,'/img/Aston Martin DB121.png'),(60831,'/img/Aston_Martin DB120.png'),(60831,'/img/Aston_Martin DB121.png'),(60832,'/img/Aston_Martin_DB120.png'),(60832,'/img/Aston_Martin_DB121.png'),(60833,'img/Aston_Martin_DB120.png'),(60833,'img/Aston_Martin_DB121.png');
/*!40000 ALTER TABLE `productimages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `productinfo`
--

DROP TABLE IF EXISTS `productinfo`;
/*!50001 DROP VIEW IF EXISTS `productinfo`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `productinfo` AS SELECT 
 1 AS `id`,
 1 AS `name`,
 1 AS `description`,
 1 AS `cost`,
 1 AS `currency`,
 1 AS `soldCount`,
 1 AS `images`,
 1 AS `relatedProducts`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(25) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `cost` int DEFAULT NULL,
  `currency` varchar(10) DEFAULT NULL,
  `soldCount` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=60834 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (40281,'Computadora de escritorio','Computadora de escritorio. Potencia y rendimiento, para juegos o trabajo',2599,'USD',11),(50741,'Oso de peluche','Oso de peluche gigante, con el bebé. Resistente y lavable. Tus hijos los amarán',2400,'UYU',97),(50742,'Pelota de básquetbol','Balón de baloncesto profesional, para interiores, tamaño 5, 27.5 pulgadas. Oficial de la NBA',2999,'UYU',11),(50743,'PlayStation 5','Maravíllate con increíbles gráficos y disfruta de nuevas funciones de PS5. Con E/S integrada.',59999,'UYU',16),(50744,'Bicicleta','¡La mejor BMX pequeña del mercado! Frenos traseros y cuadro duradero de acero Hi-Ten.',10999,'UYU',8),(50921,'Chevrolet Onix Joy','Generación 2019, variedad de colores. Motor 1.0, ideal para ciudad.',13500,'USD',14),(50922,'Fiat Way','La versión de Fiat que brinda confort y a un precio accesible.',14500,'USD',52),(50923,'Suzuki Celerio','Un auto que se ha ganado la buena fama por su economía con el combustible.',12500,'USD',25),(50924,'Peugeot 208','El modelo de auto que se sigue renovando y manteniendo su prestigio en comodidad.',15200,'USD',17),(50925,'Bugatti Chiron','El mejor hiperdeportivo de mundo. Producción limitada a 500 unidades.',3500000,'USD',0),(60801,'Juego de comedor','Un conjunto sencillo y sólido, ideal para zonas de comedor pequeñas, hecho en madera maciza de pino',4000,'UYU',88),(60802,'Sofá','Cómodo sofá de tres cuerpos, con chaiselongue intercambiable. Ideal para las siestas',24000,'UYU',12),(60803,'Armario','Diseño clásico con puertas con forma de panel. Espejo de cuerpo entero para ver cómo te queda la ropa',8000,'UYU',24),(60804,'Mesa de centro','Añade más funciones a tu sala de estar, ya que te permite cambiar fácilmente de actividad.',10000,'UYU',37),(60833,'Aston Martin DB12','El auto más fachero',260000,'USD',0);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `relatedproducts`
--

DROP TABLE IF EXISTS `relatedproducts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `relatedproducts` (
  `id1` int NOT NULL,
  `id2` int NOT NULL,
  PRIMARY KEY (`id1`,`id2`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `relatedproducts`
--

LOCK TABLES `relatedproducts` WRITE;
/*!40000 ALTER TABLE `relatedproducts` DISABLE KEYS */;
INSERT INTO `relatedproducts` VALUES (40281,50743),(40281,50744),(50741,50742),(50741,50744),(50742,50741),(50742,50743),(50743,50742),(50743,50744),(50744,50741),(50744,50743),(50921,50922),(50921,50924),(50922,50921),(50922,50923),(50923,50922),(50923,50924),(50924,50921),(50924,50923),(50925,50921),(50925,50924),(60801,60802),(60801,60804),(60802,60801),(60802,60803),(60803,60802),(60803,60804),(60804,60801),(60804,60803),(60818,50921),(60818,50923),(60819,50922),(60819,50925),(60821,50922),(60821,60820),(60822,50922),(60822,60821),(60823,50922),(60823,60821),(60824,50923),(60824,60820),(60825,50925),(60825,60820),(60826,60819),(60826,60820),(60827,50924),(60827,50925),(60828,50921),(60828,50922),(60829,50922),(60829,50924),(60830,50921),(60830,50922),(60831,50922),(60831,50923),(60832,50921),(60832,50925),(60833,50924),(60833,50925);
/*!40000 ALTER TABLE `relatedproducts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `email` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(256) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `secondname` varchar(50) DEFAULT NULL,
  `surname` varchar(50) DEFAULT NULL,
  `secondsurname` varchar(50) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `image` varchar(50) DEFAULT 'gitlab.svg',
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('howtobruno@gmail.com','howtobruno','956cd9e97c44cbb5c9f18ccf258bb3ea0fbac91d027d2ac9489185f531478242','Bruno','','Rodriguez','','','','howtobruno.png');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_products`
--

DROP TABLE IF EXISTS `users_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_products` (
  `emailUser` varchar(50) NOT NULL,
  `idProduct` int NOT NULL,
  `productCount` int DEFAULT '1',
  PRIMARY KEY (`emailUser`,`idProduct`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_products`
--

LOCK TABLES `users_products` WRITE;
/*!40000 ALTER TABLE `users_products` DISABLE KEYS */;
INSERT INTO `users_products` VALUES ('civho@gmail.com',50742,1),('civho@gmail.com',50925,1),('howtobruno@gmail.com',40281,3),('howtobruno@gmail.com',50921,1),('howtobruno@gmail.com',60833,1);
/*!40000 ALTER TABLE `users_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Current Database: `ecommercesubgrupo2`
--

USE `ecommercesubgrupo2`;

--
-- Final view structure for view `commentswithimage`
--

/*!50001 DROP VIEW IF EXISTS `commentswithimage`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `commentswithimage` AS select `c`.`id` AS `id`,`c`.`idproduct` AS `idproduct`,`c`.`score` AS `score`,`c`.`description` AS `description`,`c`.`user` AS `user`,`c`.`dateTime` AS `dateTime`,`u`.`image` AS `image` from (`comments` `c` join `users` `u` on((`u`.`username` = `c`.`user`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `productbycategory`
--

/*!50001 DROP VIEW IF EXISTS `productbycategory`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = cp850 */;
/*!50001 SET character_set_results     = cp850 */;
/*!50001 SET collation_connection      = cp850_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `productbycategory` AS select `cp`.`idCategory` AS `idCategory`,`p`.`id` AS `id`,`p`.`name` AS `name`,`p`.`description` AS `description`,`p`.`cost` AS `cost`,`p`.`currency` AS `currency`,`p`.`soldCount` AS `soldCount`,(select `productimages`.`image` from `productimages` where (`productimages`.`id` = `p`.`id`) order by `productimages`.`image` limit 1) AS `image` from ((`products` `p` join `category_product` `cp` on((`cp`.`idProduct` = `p`.`id`))) join `categories` `c` on((`cp`.`idCategory` = `c`.`id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `productinfo`
--

/*!50001 DROP VIEW IF EXISTS `productinfo`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = cp850 */;
/*!50001 SET character_set_results     = cp850 */;
/*!50001 SET collation_connection      = cp850_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `productinfo` AS select `p`.`id` AS `id`,`p`.`name` AS `name`,`p`.`description` AS `description`,`p`.`cost` AS `cost`,`p`.`currency` AS `currency`,`p`.`soldCount` AS `soldCount`,group_concat(distinct `pi`.`image` separator ',') AS `images`,group_concat(distinct `rp`.`id2` separator ',') AS `relatedProducts` from ((`products` `p` join `productimages` `pi`) join `relatedproducts` `rp`) where ((`p`.`id` = `rp`.`id1`) and (`p`.`id` = `pi`.`id`)) group by `p`.`id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-26 18:55:58
