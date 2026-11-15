-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Nov 15, 2026 at 07:56 AM
-- Server version: 9.1.0
-- PHP Version: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ql_bdh`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
CREATE TABLE IF NOT EXISTS `bookings` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `customer_id` bigint NOT NULL,
  `companion_id` bigint NOT NULL,
  `booking_date` date NOT NULL,
  `start_time` time NOT NULL,
  `duration_hours` int DEFAULT NULL,
  `total_price` bigint DEFAULT NULL,
  `location_meetup` varchar(255) DEFAULT NULL,
  `status` tinyint DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `location` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK6yoehbyvdoefleowakvwixh3q` (`companion_id`),
  KEY `FKib6gjgj2e9binkktxmm175bmm` (`customer_id`)
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `customer_id`, `companion_id`, `booking_date`, `start_time`, `duration_hours`, `total_price`, `location_meetup`, `status`, `created_at`, `location`) VALUES
(1, 1, 2, '2026-10-20', '09:47:00', 1, 300000, NULL, 0, '2026-10-17 02:44:48', 'aaaaaaaaa'),
(2, 1, 2, '2026-10-20', '09:47:00', 1, 300000, NULL, 0, '2026-10-17 02:44:48', 'aaaaaaaaa'),
(3, 1, 2, '2026-10-20', '09:47:00', 1, 300000, NULL, 0, '2026-10-17 02:44:48', 'aaaaaaaaa'),
(4, 1, 2, '2026-10-20', '09:47:00', 1, 300000, NULL, 0, '2026-10-17 02:44:59', 'aaaaaaaaa'),
(5, 1, 2, '2026-10-02', '09:49:00', 1, 300000, NULL, 0, '2026-10-17 02:48:26', 'aaa'),
(6, 1, 2, '2026-10-02', '09:49:00', 1, 300000, NULL, 0, '2026-10-17 02:48:28', 'aaa'),
(7, 1, 2, '2026-10-02', '09:49:00', 1, 300000, NULL, 0, '2026-10-17 02:48:37', 'aaa'),
(8, 1, 2, '2026-10-02', '09:49:00', 1, 300000, NULL, 0, '2026-10-17 02:48:38', 'aaa'),
(9, 1, 2, '2026-10-02', '09:49:00', 1, 300000, NULL, 0, '2026-10-17 02:48:38', 'aaa'),
(10, 1, 2, '2026-10-02', '09:49:00', 1, 300000, NULL, 0, '2026-10-17 02:48:38', 'aaa'),
(11, 1, 2, '2026-10-02', '09:49:00', 1, 300000, NULL, 0, '2026-10-17 02:48:38', 'aaa'),
(12, 1, 2, '2026-10-02', '09:49:00', 1, 300000, NULL, 0, '2026-10-17 02:48:39', 'aaa'),
(13, 1, 2, '2026-10-02', '09:49:00', 1, 300000, NULL, 0, '2026-10-17 02:48:39', 'aaa'),
(14, 1, 2, '2026-10-02', '09:49:00', 1, 300000, NULL, 0, '2026-10-17 02:48:40', 'aaa'),
(15, 1, 2, '2026-10-27', '09:57:00', 1, 300000, NULL, 0, '2026-10-17 02:55:11', 'aa'),
(16, 1, 2, '2026-10-27', '09:57:00', 1, 300000, NULL, 0, '2026-10-17 02:55:13', 'aa'),
(17, 1, 2, '2026-10-27', '09:57:00', 1, 300000, NULL, 0, '2026-10-17 02:55:15', 'aa'),
(18, 1, 2, '2026-10-27', '09:57:00', 1, 300000, NULL, 0, '2026-10-17 02:55:27', 'aa'),
(19, 1, 2, '2026-10-27', '09:57:00', 1, 300000, NULL, 0, '2026-10-17 02:55:28', 'aa'),
(20, 1, 2, '2026-10-27', '09:57:00', 1, 300000, NULL, 0, '2026-10-17 02:55:30', 'aa'),
(21, 1, 2, '2026-10-27', '09:57:00', 1, 300000, NULL, 0, '2026-10-17 02:55:32', 'aa'),
(22, 1, 2, '2026-10-27', '09:57:00', 1, 300000, NULL, 0, '2026-10-17 02:55:38', 'aa'),
(23, 1, 2, '2026-10-27', '09:57:00', 1, 300000, NULL, 0, '2026-10-17 02:55:41', 'aa'),
(24, 1, 2, '2026-10-27', '09:57:00', 1, 300000, NULL, 0, '2026-10-17 02:55:59', 'aa');

-- --------------------------------------------------------

--
-- Table structure for table `companion_profiles`
--

DROP TABLE IF EXISTS `companion_profiles`;
CREATE TABLE IF NOT EXISTS `companion_profiles` (
  `user_id` bigint NOT NULL,
  `gender` tinyint DEFAULT NULL,
  `age` int DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `price_per_hour` int DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `avatar_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `companion_profiles`
--

INSERT INTO `companion_profiles` (`user_id`, `gender`, `age`, `location`, `price_per_hour`, `description`, `avatar_url`) VALUES
(1, 0, 22, 'Hồ Chí Minh', 250000, 'Sinh viên năm cuối, vui vẻ, hòa đồng. Thích đi dạo phố, uống cafe và xem phim.', 'https://ui-avatars.com/api/?name=Thu+Ha&background=fdba74&color=fff&size=256'),
(2, 1, 26, 'Hà Nội', 300000, 'Lịch sự, tâm lý. Biết lái xe ô tô, có thể đi xa, sẵn sàng lắng nghe tâm sự.', 'https://ui-avatars.com/api/?name=Van+Hoang&background=93c5fd&color=fff&size=256'),
(3, 0, 20, 'Đà Nẵng', 150000, 'Ngoại hình dễ thương, biết chụp ảnh sống ảo. Thích hợp làm bạn đồng hành du lịch.', 'https://ui-avatars.com/api/?name=Ngoc+Mai&background=f9a8d4&color=fff&size=256');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `status` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password_hash`, `full_name`, `phone`, `role`, `status`, `created_at`) VALUES
(1, 'thuha@gmail.com', '123456', 'Nguyễn Thị Thu Hà', '0901234567', 'COMPANION', 1, '2026-10-13 18:40:39'),
(2, 'vanhoang@gmail.com', '123456', 'Trần Văn Hoàng', '0912345678', 'COMPANION', 1, '2026-10-13 18:40:39'),
(3, 'ngocmai@gmail.com', '123456', 'Lê Ngọc Mai', '0923456789', 'COMPANION', 1, '2026-10-13 18:40:39'),
(4, 'khachhang1@gmail.com', '123456', 'Khách Hàng VIP', '0988888888', 'CUSTOMER', 1, '2026-10-13 18:40:39');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
