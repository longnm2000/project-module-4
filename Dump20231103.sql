-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: project
-- ------------------------------------------------------
-- Server version	8.0.35

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
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `adminId` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`adminId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'longpk2000@gmail.com','$2b$10$BwrdRPS4AhUzEcACjiRMFu4B/sxkFL2jteizQKMqp/GqalxoMpooO','Long');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manufacturer`
--

DROP TABLE IF EXISTS `manufacturer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `manufacturer` (
  `manufacturerId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`manufacturerId`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manufacturer`
--

LOCK TABLES `manufacturer` WRITE;
/*!40000 ALTER TABLE `manufacturer` DISABLE KEYS */;
INSERT INTO `manufacturer` VALUES (1,'SAMSUNG132'),(2,'LG'),(3,'ASUS'),(6,'MSI'),(7,'Dell'),(8,'Acer'),(9,'KAKA'),(10,'ViewSonic'),(11,'312321');
/*!40000 ALTER TABLE `manufacturer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order` (
  `orderId` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `totalAmount` decimal(12,2) NOT NULL,
  `shippingAddress` varchar(255) NOT NULL,
  `status` bigint NOT NULL DEFAULT '0',
  `orderDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`orderId`),
  KEY `fk_user_order_idx` (`userId`),
  CONSTRAINT `fk_user_order` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES (4,3,22000000.24,'ưqewqewq',3,'2023-11-02 16:27:45'),(5,3,11000000.12,'ewqewq',2,'2023-11-02 16:27:45'),(6,3,11000000.12,'ưqewq',2,'2023-11-03 01:56:41'),(7,3,46696393.00,'e2e12e12',3,'2023-11-03 03:34:42'),(8,3,23464262.00,'ưqewq',0,'2023-11-03 03:35:23'),(9,3,73000000.00,'e2ewqeqw',0,'2023-11-03 03:35:59'),(10,8,92696393.00,'Hàn Quốc',2,'2023-11-03 04:47:38');
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderdetail`
--

DROP TABLE IF EXISTS `orderdetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderdetail` (
  `orderdetailId` int NOT NULL AUTO_INCREMENT,
  `orderId` int NOT NULL,
  `productId` int NOT NULL,
  `productName` varchar(255) NOT NULL,
  `price` decimal(11,2) NOT NULL,
  `image` varchar(255) NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`orderdetailId`),
  KEY `fk_order_orderdetail_idx` (`orderId`),
  CONSTRAINT `fk_order_orderdetail` FOREIGN KEY (`orderId`) REFERENCES `order` (`orderId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderdetail`
--

LOCK TABLES `orderdetail` WRITE;
/*!40000 ALTER TABLE `orderdetail` DISABLE KEYS */;
INSERT INTO `orderdetail` VALUES (1,4,1,'Màn hình LG 24GQ50F-B/23.8inch/FHD (1920x1080)/165Hz',11000000.12,'https://images.fpt.shop/unsafe/fit-in/filters:quality(90):fill(white):upscale()/fptshop.com.vn/Uploads/Originals/2022/9/5/637979874359515747_man-hinh-samsung-ls27r350fhexxv-27-inch-fhd-19200-1080-75hz-4.jpg',2),(2,5,1,'Màn hình LG 24GQ50F-B/23.8inch/FHD (1920x1080)/165Hz',11000000.12,'https://images.fpt.shop/unsafe/fit-in/filters:quality(90):fill(white):upscale()/fptshop.com.vn/Uploads/Originals/2022/9/5/637979874359515747_man-hinh-samsung-ls27r350fhexxv-27-inch-fhd-19200-1080-75hz-4.jpg',1),(3,6,1,'Màn hình LG 24GQ50F-B/23.8inch/FHD (1920x1080)/165Hz',11000000.12,'https://images.fpt.shop/unsafe/fit-in/filters:quality(90):fill(white):upscale()/fptshop.com.vn/Uploads/Originals/2022/9/5/637979874359515747_man-hinh-samsung-ls27r350fhexxv-27-inch-fhd-19200-1080-75hz-4.jpg',1),(4,7,13,'Phan Long',232131.00,'https://firebasestorage.googleapis.com/v0/b/project-81adc.appspot.com/o/images%2F637993181711883959_man-hinh-viewsonic-va2432-h-23-8-inch-5.webp?alt=media&token=29c78aa8-f4c1-4336-ae04-aa7c0508846e',3),(5,7,11,'Màn hình Samsung LS27R350FHEXXV 27 inch/ FHD (1920x1080) 75Hz',23000000.00,'https://firebasestorage.googleapis.com/v0/b/project-81adc.appspot.com/o/images%2FSamsung-LS27R350FHEXXV-1.webp?alt=media&token=0c37baca-9dc6-4297-aa58-f44a00e53413',2),(6,8,13,'Phan Long',232131.00,'https://firebasestorage.googleapis.com/v0/b/project-81adc.appspot.com/o/images%2F637993181711883959_man-hinh-viewsonic-va2432-h-23-8-inch-5.webp?alt=media&token=29c78aa8-f4c1-4336-ae04-aa7c0508846e',2),(7,8,11,'Màn hình Samsung LS27R350FHEXXV 27 inch/ FHD (1920x1080) 75Hz',23000000.00,'https://firebasestorage.googleapis.com/v0/b/project-81adc.appspot.com/o/images%2FSamsung-LS27R350FHEXXV-1.webp?alt=media&token=0c37baca-9dc6-4297-aa58-f44a00e53413',1),(8,9,10,'Màn hình ASUS VA27EHE/27 inch/FHD (1920 x 1080)/75Hz ',10000000.00,'https://firebasestorage.googleapis.com/v0/b/project-81adc.appspot.com/o/images%2F638017727974851891_HASP-M%C3%A0n%20h%C3%ACnh%20ASUS%20VA27EHE27%20inchFHD%20(1).webp?alt=media&token=6ca83ff0-c606-49a7-9636-e76cf52c7a09',5),(9,9,11,'Màn hình Samsung LS27R350FHEXXV 27 inch/ FHD (1920x1080) 75Hz',23000000.00,'https://firebasestorage.googleapis.com/v0/b/project-81adc.appspot.com/o/images%2FSamsung-LS27R350FHEXXV-1.webp?alt=media&token=0c37baca-9dc6-4297-aa58-f44a00e53413',1),(10,10,13,'Phan Long',232131.00,'https://firebasestorage.googleapis.com/v0/b/project-81adc.appspot.com/o/images%2F637993181711883959_man-hinh-viewsonic-va2432-h-23-8-inch-5.webp?alt=media&token=29c78aa8-f4c1-4336-ae04-aa7c0508846e',3),(11,10,11,'Màn hình Samsung LS27R350FHEXXV 27 inch/ FHD (1920x1080) 75Hz',23000000.00,'https://firebasestorage.googleapis.com/v0/b/project-81adc.appspot.com/o/images%2FSamsung-LS27R350FHEXXV-1.webp?alt=media&token=0c37baca-9dc6-4297-aa58-f44a00e53413',4);
/*!40000 ALTER TABLE `orderdetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `picture`
--

DROP TABLE IF EXISTS `picture`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `picture` (
  `pictureId` int NOT NULL AUTO_INCREMENT,
  `productId` int NOT NULL,
  `source` varchar(255) NOT NULL,
  `type` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`pictureId`),
  KEY `fk_picture_product_idx` (`productId`),
  CONSTRAINT `fk_product_picture` FOREIGN KEY (`productId`) REFERENCES `product` (`productId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `picture`
--

LOCK TABLES `picture` WRITE;
/*!40000 ALTER TABLE `picture` DISABLE KEYS */;
INSERT INTO `picture` VALUES (1,1,'https://images.fpt.shop/unsafe/fit-in/filters:quality(90):fill(white):upscale()/fptshop.com.vn/Uploads/Originals/2022/9/5/637979874359515747_man-hinh-samsung-ls27r350fhexxv-27-inch-fhd-19200-1080-75hz-4.jpg',1),(2,1,'https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2022/9/5/637979874359115697_man-hinh-samsung-ls27r350fhexxv-27-inch-fhd-19200-1080-75hz-2.jpg',0),(3,1,'https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2022/9/5/637979874357765692_man-hinh-samsung-ls27r350fhexxv-27-inch-fhd-19200-1080-75hz-3.jpg',0),(4,1,'https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2022/9/5/637979874357135643_man-hinh-samsung-ls27r350fhexxv-27-inch-fhd-19200-1080-75hz-5.jpg',0),(5,1,'https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2022/9/5/637979874358385704_man-hinh-samsung-ls27r350fhexxv-27-inch-fhd-19200-1080-75hz-1.jpg',0),(10,10,'https://firebasestorage.googleapis.com/v0/b/project-81adc.appspot.com/o/images%2F638017727974851891_HASP-M%C3%A0n%20h%C3%ACnh%20ASUS%20VA27EHE27%20inchFHD%20(1).webp?alt=media&token=6ca83ff0-c606-49a7-9636-e76cf52c7a09',1),(11,10,'https://firebasestorage.googleapis.com/v0/b/project-81adc.appspot.com/o/images%2F638017727973749913_HASP-M%C3%A0n%20h%C3%ACnh%20ASUS%20VA27EHE27%20inchFHD%20(2).webp?alt=media&token=821af7f8-4ce6-4fff-b1b7-de70ef2e75f5',0),(12,10,'https://firebasestorage.googleapis.com/v0/b/project-81adc.appspot.com/o/images%2F638017727974064263_HASP-M%C3%A0n%20h%C3%ACnh%20ASUS%20VA27EHE27%20inchFHD%20(9).webp?alt=media&token=06866de7-01cc-4ede-8e0e-1c2fec28de4b',0),(13,10,'https://firebasestorage.googleapis.com/v0/b/project-81adc.appspot.com/o/images%2F638017727974695564_HASP-M%C3%A0n%20h%C3%ACnh%20ASUS%20VA27EHE27%20inchFHD%20(3).webp?alt=media&token=f05836d5-2acc-4f7e-a041-c24579a80174',0),(14,11,'https://firebasestorage.googleapis.com/v0/b/project-81adc.appspot.com/o/images%2FSamsung-LS27R350FHEXXV-1.webp?alt=media&token=0c37baca-9dc6-4297-aa58-f44a00e53413',1),(15,11,'https://firebasestorage.googleapis.com/v0/b/project-81adc.appspot.com/o/images%2F638017727974064263_HASP-M%C3%A0n%20h%C3%ACnh%20ASUS%20VA27EHE27%20inchFHD%20(9).webp?alt=media&token=782eb605-05af-4e2e-83d4-893e79ee659a',0),(16,11,'https://firebasestorage.googleapis.com/v0/b/project-81adc.appspot.com/o/images%2F638017727974851891_HASP-M%C3%A0n%20h%C3%ACnh%20ASUS%20VA27EHE27%20inchFHD%20(1).webp?alt=media&token=001387e3-b32f-4af8-907f-5125160ecade',0),(17,11,'https://firebasestorage.googleapis.com/v0/b/project-81adc.appspot.com/o/images%2F638017727973749913_HASP-M%C3%A0n%20h%C3%ACnh%20ASUS%20VA27EHE27%20inchFHD%20(2).webp?alt=media&token=e404f0ec-fe81-4ca2-9839-a097aa431c91',0),(18,11,'https://firebasestorage.googleapis.com/v0/b/project-81adc.appspot.com/o/images%2F638017727974695564_HASP-M%C3%A0n%20h%C3%ACnh%20ASUS%20VA27EHE27%20inchFHD%20(3).webp?alt=media&token=1a6fdd6b-5084-42de-8926-128a3d8ac2b4',0),(24,13,'https://firebasestorage.googleapis.com/v0/b/project-81adc.appspot.com/o/images%2F637993181711883959_man-hinh-viewsonic-va2432-h-23-8-inch-5.webp?alt=media&token=29c78aa8-f4c1-4336-ae04-aa7c0508846e',1),(25,13,'https://firebasestorage.googleapis.com/v0/b/project-81adc.appspot.com/o/images%2F638017727973749913_HASP-M%C3%A0n%20h%C3%ACnh%20ASUS%20VA27EHE27%20inchFHD%20(2).webp?alt=media&token=7413810a-785e-4324-8895-3b7c898ad68c',0),(26,13,'https://firebasestorage.googleapis.com/v0/b/project-81adc.appspot.com/o/images%2FSamsung-LS27R350FHEXXV-1.webp?alt=media&token=018b5057-af6f-4d62-ba2f-b51729559f18',0),(27,13,'https://firebasestorage.googleapis.com/v0/b/project-81adc.appspot.com/o/images%2F638017727974064263_HASP-M%C3%A0n%20h%C3%ACnh%20ASUS%20VA27EHE27%20inchFHD%20(9).webp?alt=media&token=0c374658-aa73-451d-848e-d20ef846129b',0),(28,13,'https://firebasestorage.googleapis.com/v0/b/project-81adc.appspot.com/o/images%2F637993181712040219_man-hinh-viewsonic-va2432-h-23-8-inch-4.webp?alt=media&token=2eb4cf79-f309-4380-b752-35a0292cb8e0',0);
/*!40000 ALTER TABLE `picture` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `productId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `refreshrateId` int NOT NULL,
  `detail` varchar(255) NOT NULL,
  `manufacturerId` int NOT NULL,
  `description` longtext NOT NULL,
  `resolutionId` int NOT NULL,
  `quantity` int NOT NULL,
  `size` decimal(10,2) DEFAULT NULL,
  `price` decimal(11,2) NOT NULL,
  `createAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`productId`),
  KEY `fk_refreshrate_product_idx` (`refreshrateId`),
  KEY `fk_manufacturer_product_idx` (`manufacturerId`),
  KEY `fk_resolution_product_idx` (`resolutionId`),
  CONSTRAINT `fk_manufacturer_product` FOREIGN KEY (`manufacturerId`) REFERENCES `manufacturer` (`manufacturerId`) ON DELETE CASCADE,
  CONSTRAINT `fk_refreshrate_product` FOREIGN KEY (`refreshrateId`) REFERENCES `refreshrate` (`refreshrateId`) ON DELETE CASCADE,
  CONSTRAINT `fk_resolution_product` FOREIGN KEY (`resolutionId`) REFERENCES `resolution` (`resolutionId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Màn hình LG 24GQ50F-B/23.8inch/FHD (1920x1080)/165Hz',4,'Tấm nền: VA, Thời gian phản hồi: 5ms, Tiêu thụ năng lượng: 24 W',2,'Chiếc màn hình thế hệ mới của LG – UltraGear 24GQ50F-B hội tụ những tính năng hàng đầu để đem lại trải nghiệm gaming hoàn hảo nhất cho người dùng. Không chỉ có tần số quét 165Hz siêu mượt, sản phẩm còn đem đến tốc độ phản hồi 1ms, công nghệ AMD FreeSync và thiết kế viền bao quanh siêu mỏng.Chiếc màn hình thay đổi cuộc chơi của bạnNhanh hơn, mượt hơn với tần số quét 165HzKhông nhòe mờ với công nghệ 1ms MBRTính năng cao cấp AMD FreeSyncThiết kế hầm hố với phong cách mới từ LGGóp phần định hình phong cách chơi game của bạn',2,100,1.00,11000000.12,'2023-10-30 03:59:42'),(2,'Phan Long',2,'đuawad',2,'dqwdwq',3,10,12.00,232131.00,'2023-11-02 20:39:44'),(3,'eqw',2,'đuawad',1,'ewq',1,10,10.00,232131.00,'2023-11-02 20:45:56'),(4,'eqw',2,'đuawad',1,'ewq',1,10,10.00,232131.00,'2023-11-02 20:47:50'),(5,'eqw',2,'đuawad',1,'ewq',1,10,10.00,232131.00,'2023-11-02 20:47:54'),(6,'eqw',2,'đuawad',1,'ewq',1,10,10.00,232131.00,'2023-11-02 20:48:34'),(7,'eqw',2,'đuawad',1,'ewq',1,10,10.00,232131.00,'2023-11-02 20:52:05'),(8,'Phan Long',3,'đuawad',3,'wqewq',2,10,12.00,232131.00,'2023-11-02 20:54:43'),(10,'Màn hình ASUS VA27EHE/27 inch/FHD (1920 x 1080)/75Hz ',4,'Tiêu thụ năng lượng',3,'Là sản phẩm hội tụ hàng loạt công nghệ hiển thị hiện đại, màn hình Asus VA27EHE 27 inch sẽ đáp ứng tốt mọi nhu cầu của bạn, từ làm việc cho đến chơi game giải trí. Tấm nền IPS LCD 27 inch siêu rộng với tần số quét 75Hz và khả năng hạn chế xé hình nhờ Adapter-Sync là những điểm cộng xứng đáng để bạn cân nhắc ở chiếc màn hình này.',4,50,27.00,10000000.00,'2023-11-03 02:03:21'),(11,'Màn hình Samsung LS27R350FHEXXV 27 inch/ FHD (1920x1080) 75Hz',2,'Sang trọng',2,'Đặc điểm nổi bật của Màn hình Samsung LS27R350FHEXXV 27 inch/ FHD (1920x1080) 75Hz Màn hình Samsung LS27R350FHEXXV 27 inch/ FHD (1920x1080) 75Hz Màn hình Samsung LS27R350FHEXXV 27 inch/ FHD (1920x1080) 75Hz Màn hình Samsung LS27R350FHEXXV 27 inch/ FHD (1920x1080) 75Hz Màn hình Samsung LS27R350FHEXXV 27 inch/ FHD (1920x1080) 75Hz Màn hình Samsung LS27R350FHEXXV 27 inch/ FHD (1920x1080) 75Hz Đánh giá chi tiết Màn hình Samsung LS27R350FHEXXV 27 inch/ FHD (1920x1080) 75Hz Samsung LS27R350FHEXXV là mẫu màn hình 27 inch thời trang với thiết kế viền màn hình siêu mỏng, chân đế chữ V hiện đại. Màn hình này thích hợp cho cả công việc văn phòng hay chơi game nhờ độ phân giải Full HD, hỗ trợ AMD Radeon FreeSync và chế độ chơi game chuyên dụng.',2,50,27.00,23000000.00,'2023-11-03 02:11:24'),(13,'Phan Long',3,'Tiêu thụ năng lượng',9,'Là một trong những mẫu màn hình xuất sắc nhất trong tầm giá phải chăng, ViewSonic VA2432-H quy tụ loạt tính năng hấp dẫn thường chỉ có ở các sản phẩm cấp như tấm nền IPS, độ bao phủ màu 104% sRGB, tần số quét 75Hz, thiết kế viền siêu mỏng và công nghệ bảo vệ mắt người dùng.',2,20,12.00,232131.00,'2023-11-03 02:56:38');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refreshrate`
--

DROP TABLE IF EXISTS `refreshrate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refreshrate` (
  `refreshrateId` int NOT NULL AUTO_INCREMENT,
  `refreshrateValue` int NOT NULL,
  PRIMARY KEY (`refreshrateId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refreshrate`
--

LOCK TABLES `refreshrate` WRITE;
/*!40000 ALTER TABLE `refreshrate` DISABLE KEYS */;
INSERT INTO `refreshrate` VALUES (1,60),(2,75),(3,144),(4,165);
/*!40000 ALTER TABLE `refreshrate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resolution`
--

DROP TABLE IF EXISTS `resolution`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resolution` (
  `resolutionId` int NOT NULL AUTO_INCREMENT,
  `resolutionValue` varchar(45) NOT NULL,
  PRIMARY KEY (`resolutionId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resolution`
--

LOCK TABLES `resolution` WRITE;
/*!40000 ALTER TABLE `resolution` DISABLE KEYS */;
INSERT INTO `resolution` VALUES (1,'HD'),(2,'FullHD'),(3,'2K'),(4,'4K');
/*!40000 ALTER TABLE `resolution` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `lastName` varchar(45) NOT NULL,
  `firstName` varchar(45) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `gender` tinyint(1) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `isLogin` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`userId`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Nguyen','Long','longnm2000@gmail.com','$2b$10$BwrdRPS4AhUzEcACjiRMFu4B/sxkFL2jteizQKMqp/GqalxoMpooO',0,'0123456789',1),(2,'Lệ','Hi','longnguyenmanh20052000@gmail.com','$2b$10$tQRGzBJQupZ/6tvTaYF5pecoNlnNm2pog2vQiuhRyKgusI.dKspMS',1,'0123456789',1),(3,'Trịnh','Yua','ryu123@gmail.com','$2b$10$tTWkaRBRZP4KosYd1OX8ruch9L5/InRHW9oj4uK4lMlKrb37AjTY6',2,'0398926955',1),(4,'ewq','ewqew','qwqewq@gmail.com','$2b$10$tTWkaRBRZP4KosYd1OX8ruch9L5/InRHW9oj4uK4lMlKrb37AjTY6',0,'0398926955',1),(5,'dwqdq','ewq','wqewqeqww@gmail.com','$2b$10$tTWkaRBRZP4KosYd1OX8ruch9L5/InRHW9oj4uK4lMlKrb37AjTY6',0,'0398926955',1),(6,'weqw','ds','weqw@gmail.com','$2b$10$tTWkaRBRZP4KosYd1OX8ruch9L5/InRHW9oj4uK4lMlKrb37AjTY6',0,'0398926955',1),(7,'Trịnh','Hi','ryu1234@gmail.com','$2b$10$2ZDvV9EANgBy4tsrCp8/ueI4NxFbozAeoWx/wznK.0oS0eAj2uMfK',0,'1234567890',1),(8,'Nguyễn','Long','long123456@gmail.com','$2b$10$eyZFiQgYSFooLFon8k1abOpYb0Lx8wFa89XpHunkpEh4Kyd09VXiu',0,'0398926955',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-03 13:32:18
