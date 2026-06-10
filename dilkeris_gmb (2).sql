-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 10, 2026 at 07:14 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dilkeris_gmb`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `email`, `password`, `createdAt`) VALUES
(1, 'pritibandewar52@gmail.com', '$2b$10$h9l7zCuuZUBfch2zpT/P0ehv8hFKyNGbLbU3uynzrSB7IkUVwp.3y', '2026-04-14 06:48:03');

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE `clients` (
  `id` int(11) NOT NULL,
  `clientId` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `businessName` varchar(150) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `mobile` varchar(15) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `placeId` varchar(255) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT 1,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `websiteUrl` varchar(255) DEFAULT NULL,
  `primaryColor` varchar(7) DEFAULT '#3b82f6',
  `secondaryColor` varchar(7) DEFAULT '#2dd4bf',
  `questions` longtext DEFAULT NULL,
  `keywords` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`id`, `clientId`, `name`, `businessName`, `email`, `mobile`, `password`, `placeId`, `logo`, `isActive`, `createdAt`, `updatedAt`, `websiteUrl`, `primaryColor`, `secondaryColor`, `questions`, `keywords`) VALUES
(3, 'client_59nwzqs', 'priyanshu Garg', 'Banking', 'impriyanshu.garg@gmail.com', '9977343574', '$2b$10$B.if8IeCq7bpCA4LNwkUaukgkWXzNLhm7LXMdEhKLx1ad552J17.6', 'ChINN4xEHwyugTkRP_VLclm8MZ8', NULL, 1, '2026-04-19 11:13:59', '2026-06-09 14:08:08', NULL, '#3b82f6', '#2dd4bf', NULL, NULL),
(4, 'client_744dx7c', 'dev dubey', 'Camp', 'pritibandewar2929@gmail.com', '9244950772', '$2b$10$p7ukZEx.v6nYsgLdEcb3IequjVRkxXo1UljOoldZBKlVBB3cQQu2a', 'ChINN4xEHwyugTkRP_VLclm8MZ8', '/uploads/1776617137752-595759299.jpg', 1, '2026-04-19 16:45:38', '2026-06-09 14:08:08', NULL, '#3b82f6', '#2dd4bf', NULL, NULL),
(6, 'client_6cqtdpq', 'DOAGuru', 'IT', 'doaguruinfosystems@gmail.com', '9244950772', '$2b$10$NRl3rfVdNrM3FS19gGVIAOvwVSNeVjrGlQHjW3.o3YnfrZQp0lKJe', 'ChIJT-5eGRaxgTkRxyMc7_psGWI', '/uploads/1776761332222-270648210.png', 1, '2026-04-21 08:48:52', '2026-06-09 14:08:08', NULL, '#3b82f6', '#2dd4bf', NULL, NULL),
(9, 'client_7ek5u3c', 'Dr. Gunjan Goswami', 'Jyotirmay IVF & Fertility Centre', 'jyotirmayivfcenter@gmail.com', '77248 19233', '$2b$10$Uf59HY2h96VjavDUCOW7QOGYnHQGgwc5EyUVTk3ddkepM.UG.K4Q2', 'ChIJEZWnS4lbhDkRa14hE07UEs4', '/uploads/1780314578217-439357025.jpeg', 1, '2026-06-01 05:38:24', '2026-06-09 14:08:08', NULL, '#d7003c', '#d7003c', NULL, NULL),
(10, 'client_iy1tj9c', ' Dr. Abhishek Goswami', 'Goswami X-ray Ultrasound & Pathology', 'goswamidiagnosticsrewa@gmail.com', '81097 98004 ', '$2b$10$Nwemrh6tgbtOCciOp6pphuAKkUgEEJIyRR2ZbGeZb0WUFxemV65ne', 'ChIJHyYZeTRahDkRSZzOtVhVtTM', '/uploads/1780315426948-409553462.jpeg', 1, '2026-06-01 11:46:04', '2026-06-09 14:08:08', NULL, '#f7903b', '#000000', NULL, NULL),
(11, 'client_pp3ps36', 'Dr. Akhilesh Patel', 'National Hospital ', 'dr.akhi007@gmail.com', '76623 59974', '$2b$10$Fy18iTIq1bS0dXJmjOS0aO.pLNkZqtoYfLFyk2wK2P76Gz0c9bpm2', 'ChIJgW0hR8lbhDkRVx-SPRZ7wjc', '/uploads/1780315407269-687461779.jpeg', 1, '2026-06-01 12:03:27', '2026-06-09 14:08:08', NULL, '#1c57b5', '#e34f4f', NULL, NULL),
(12, 'client_yc37fcn', 'Jabalpur Hospital', 'Jabalpur Hospital and Research Centre ', 'jabalpurhospital2024@gmail.com', '761 402 6000', '$2b$10$TucIQWqAdqvI.KYtykx/6e71XByfXEOwEgWJ1I6AhF49sMw26D1Qm', 'ChIJN4xEHwyugTkRP_VLclm8MZ8', '/uploads/1780316105425-203470629.jpeg', 1, '2026-06-01 12:15:08', '2026-06-09 14:08:08', NULL, '#f73b3b', '#2bd466', NULL, NULL),
(13, 'client_53ykr2p', ' Dr. Archana Shrivastava', 'Pluro Jabalpur Fertility and IVF Center', 'dr.archanashrivastav@gmail.com', '77708 77117', '$2b$10$aZsvoVAWp2/IfYfZ3Xd0Q.3IklqH62waL0bmi5tuaT53LbTTiBa2G', 'ChIJ749m7aqvgTkRkHLEqGu31Rc', '/uploads/1781020330401-506721990.jpg', 1, '2026-06-09 07:07:31', '2026-06-09 15:52:10', 'pritibandewar52@gmail.com', '#e12456', '#2b3fd4', '[{\"question\":\"Which treatment/service did you take?\",\"options\":[\"IVF Treatment\",\"Fertility Consultation\",\"Low Sperm Count Treatment\",\"Gynecology Treatment\",\"Laparoscopic Surgery\",\"Pregnancy Care\"]},{\"question\":\"Why did you choose our clinic?\",\"options\":[\"Best IVF Centre in Jabalpur\",\"Best IVF Doctor in Jabalpur\",\"Best Fertility Specialist Clinic in Jabalpur\",\"Experienced Doctor\"]},{\"question\":\"How would you describe our services?\",\"options\":[\"Best IVF Treatment in Jabalpur\",\"Best Fertility Care\",\"Best Gynecologist in Jabalpur\",\"Best Laparoscopic Surgeon in Jabalpur\",\"Trusted IVF Centre\"]}]', 'Best IVF Centre in Jabalpur, Best IVF Doctor in Jabalpur, Best Fertility specialist Clinic in Jabalpur, IVF Treatment in Jabalpur, Low Sperm Count Treatment in Jabalpur, Best Laparoscopic Surgeon In Jabalpur, Best Gynecologist In Jabalpur  '),
(14, 'client_4h059z8', 'Dr Pooja Gangwar Patel', 'Dr Pooja Gangwar Patel', 'Poojagangwar44@gmail.com', '7828950421', '$2b$10$KWI/Tc.Nma.wmCIcED7Xm.R4I7V3.zW4ce61AgEwYKNL.SStkpG7m', 'ChIJnReQD6ZbhDkRibys0ovKNF0', '/uploads/1780994071347-849934893.png', 1, '2026-06-09 08:34:32', '2026-06-09 14:08:08', NULL, '#3b82f6', '#2dd4bf', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `client_branding`
--

CREATE TABLE `client_branding` (
  `id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `primaryColor` varchar(7) DEFAULT '#3b82f6',
  `secondaryColor` varchar(7) DEFAULT '#2dd4bf'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `client_branding`
--

INSERT INTO `client_branding` (`id`, `client_id`, `logo`, `primaryColor`, `secondaryColor`) VALUES
(1, 3, NULL, '#3b82f6', '#2dd4bf'),
(2, 4, '/uploads/1776617137752-595759299.jpg', '#3b82f6', '#2dd4bf'),
(3, 6, '/uploads/1776761332222-270648210.png', '#3b82f6', '#2dd4bf'),
(4, 9, '/uploads/1780314578217-439357025.jpeg', '#d7003c', '#d7003c'),
(5, 10, '/uploads/1780315426948-409553462.jpeg', '#f7903b', '#000000'),
(6, 11, '/uploads/1780315407269-687461779.jpeg', '#1c57b5', '#e34f4f'),
(7, 12, '/uploads/1780316105425-203470629.jpeg', '#f73b3b', '#2bd466'),
(8, 13, '/uploads/1780989559112-742878283.jpg', '#e12456', '#2b3fd4'),
(9, 14, '/uploads/1780994071347-849934893.png', '#3b82f6', '#2dd4bf');

-- --------------------------------------------------------

--
-- Table structure for table `client_business`
--

CREATE TABLE `client_business` (
  `id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `businessName` varchar(150) DEFAULT NULL,
  `websiteUrl` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `client_business`
--

INSERT INTO `client_business` (`id`, `client_id`, `businessName`, `websiteUrl`) VALUES
(1, 3, 'Banking', NULL),
(2, 4, 'Camp', NULL),
(3, 6, 'IT', NULL),
(4, 9, 'Jyotirmay IVF & Fertility Centre', ''),
(5, 10, 'Goswami X-ray Ultrasound & Pathology', ''),
(6, 11, 'National Hospital ', 'nationalhospitalrewa.com'),
(7, 12, 'Jabalpur Hospital and Research Centre ', 'jabalpurhospital.com'),
(8, 13, 'Pluro Jabalpur Fertility and IVF Center', 'jabalpurivfcentre.com'),
(9, 14, 'Dr Pooja Gangwar Patel', 'https://nationalhospitalrewa.com');

-- --------------------------------------------------------

--
-- Table structure for table `client_faqs`
--

CREATE TABLE `client_faqs` (
  `id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `question` text DEFAULT NULL,
  `answer` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `client_keywords`
--

CREATE TABLE `client_keywords` (
  `id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `keyword` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `client_locations`
--

CREATE TABLE `client_locations` (
  `id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `placeId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `client_locations`
--

INSERT INTO `client_locations` (`id`, `client_id`, `placeId`) VALUES
(1, 3, 'ChINN4xEHwyugTkRP_VLclm8MZ8'),
(2, 4, 'ChINN4xEHwyugTkRP_VLclm8MZ8'),
(3, 6, 'ChIJT-5eGRaxgTkRxyMc7_psGWI'),
(4, 9, 'ChIJEZWnS4lbhDkRa14hE07UEs4'),
(5, 10, 'ChIJHyYZeTRahDkRSZzOtVhVtTM'),
(6, 11, 'ChIJgW0hR8lbhDkRVx-SPRZ7wjc'),
(7, 12, 'ChIJN4xEHwyugTkRP_VLclm8MZ8'),
(8, 13, 'ChIJ749m7aqvgTkRkHLEqGu31Rc'),
(9, 14, 'ChIJnReQD6ZbhDkRibys0ovKNF0');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `clientId` varchar(50) DEFAULT NULL,
  `type` varchar(50) NOT NULL,
  `message` text NOT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `clientId`, `type`, `message`, `is_read`, `createdAt`) VALUES
(2, 'client_59nwzqs', 'renewal_reminder', 'TEST NOTIFICATION: Client DOAGuru subscription is expiring in 2 days. Please follow up.', 1, '2026-04-23 08:52:50'),
(3, 'client_59nwzqs', 'renewal_reminder', 'Client priyanshu Garg\'s Enterprise plan is expiring on 5/23/2026. Please contact for renewal.', 1, '2026-05-21 02:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `clientId` varchar(50) NOT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `rating` int(11) NOT NULL,
  `review` text DEFAULT NULL,
  `isPositive` tinyint(1) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `clientId`, `fullName`, `mobile`, `email`, `rating`, `review`, `isPositive`, `createdAt`) VALUES
(20, 'client_59nwzqs', 'Priti Bandewar', '9244950772', 'pritibandewar68@gmail.com', 2, 'this was little good', 0, '2026-04-19 17:34:26'),
(21, 'admin', 'Ajeet Chaturvedi', '9926938817', 'ajeetchaturvedi@gmail.com', 3, 'fjkdga;jfgha;lvn', 0, '2026-04-19 17:49:48'),
(22, 'admin', 'Priti Bandewar', '9329978427', NULL, 5, NULL, 1, '2026-04-20 05:39:47'),
(23, 'admin', 'Priti Bandewar', '9329978427', NULL, 4, NULL, 1, '2026-04-20 05:45:48'),
(24, 'admin', 'Priti Bandewar', '9244950772', NULL, 4, 'great experience', 1, '2026-04-21 08:42:39'),
(25, 'client_59nwzqs', 'Priti Bandewar', '9244950772', NULL, 4, 'great experience', 1, '2026-04-21 08:44:02'),
(26, 'client_6cqtdpq', 'Priti Bandewar', '9244950772', NULL, 4, 'Great service ', 1, '2026-04-21 08:55:50'),
(27, 'admin', 'Priti Bandewar', '9244950772', NULL, 5, 'Ultimate services prompt response result oriented approach', 1, '2026-04-21 08:59:33'),
(28, 'admin', 'Priti Bandewar', '9244950772', NULL, 3, 'Bad service ', 0, '2026-04-21 09:04:56'),
(29, 'client_59nwzqs', 'Priti Bandewar', '9244950772', NULL, 3, 'good', 0, '2026-04-23 09:29:30'),
(30, 'client_59nwzqs', 'priyanshu garg', '9977343574', NULL, 3, 'dsgasdg', 0, '2026-04-23 09:35:04'),
(31, 'client_59nwzqs', 'dev dubey', '9329978427', NULL, 3, 'sdgasdgasdv', 0, '2026-04-23 09:35:28'),
(32, 'admin', 'Priti Bandewar', '9244950772', NULL, 5, 'Good service ', 1, '2026-04-24 18:13:57'),
(33, 'admin', 'Priti Bandewar', '9244950772', NULL, 5, 'Good service ', 1, '2026-04-24 18:13:59'),
(34, 'admin', 'Priti Bandewar', '9244950772', NULL, 5, 'Good service ', 1, '2026-04-24 18:14:00'),
(35, 'admin', 'Priti Bandewar', '9244950772', NULL, 5, 'Good service ', 1, '2026-04-24 18:14:01'),
(36, 'admin', 'Prachi Hardaha ', '7049306131', NULL, 5, 'Amazing experience!\n\nI would definitely recommend them to others.', 1, '2026-04-24 18:47:45'),
(37, 'admin', 'Palak Raikwar', '8602885880', NULL, 5, 'Not satisfied ', 1, '2026-05-07 10:50:14'),
(38, 'admin', 'Palak raikwar', '8602885880', NULL, 3, 'Not satisfied ', 0, '2026-05-07 10:59:08'),
(39, 'admin', 'Palak Raikwar ', '8602085880', NULL, 5, 'Good service', 1, '2026-05-07 11:00:18'),
(40, 'admin', 'Google Reviewer', NULL, NULL, 5, 'I had a wonderful experience at our business. The Digital Marketing, Video Shooting, Increased Sales/Leads was absolutely fantastic. Highly recommend them to anyone looking for excellent quality and care!', 1, '2026-05-24 07:14:13'),
(41, 'admin', 'Anshu ', '7000102121', 'abhinavp877@gmail.com', 2, 'Need improvement', 0, '2026-05-24 07:15:05'),
(42, 'admin', 'Anshu ', '7000102121', 'abhinavp877@gmail.com', 2, 'Need improvement', 0, '2026-05-24 07:15:06'),
(43, 'admin', 'Google Reviewer', NULL, NULL, 5, 'Honestly, really happy with my experience at DOAGuru InfoSystems. The Digital Marketing, Video Editing, Better Brand Visibility was handled so well — felt like they actually cared. Would go back without a second thought!', 1, '2026-06-02 09:04:18'),
(44, 'client_53ykr2p', 'Google Reviewer', NULL, NULL, 5, 'Honestly, really happy with my experience at Pluro Jabalpur Fertility and IVF Center. The Best IVF Centre in Jabalpur, Best IVF Doctor in Jabalpur, Best Fertility specialist Clinic in Jabalpur, IVF Treatment in Jabalpur, Low Sperm Count Treatment in Jabalpur, Best Laparoscopic Surgeon In Jabalpur, Best Gynecologist In Jabalpur  , Gynecology Treatment was handled so well — felt like they actually cared. Would go back without a second thought!', 1, '2026-06-09 09:16:15'),
(45, 'client_53ykr2p', 'Dr. Archana Shrivastava', '77708 77117', 'dr.archanashrivastav@gmail.com', 5, 'Very clean place and helpful teachers.', 1, '2026-06-09 09:49:32'),
(46, 'client_53ykr2p', 'Dr. Archana Shrivastava', '7770877117', 'dr.archanashrivastav@gmail.com', 5, 'Very clean place and helpful teachers.', 1, '2026-06-09 10:17:43'),
(47, 'client_53ykr2p', 'Dr. Archana Shrivastava', '7770877117', 'dr.archanashrivastav@gmail.com', 3, 'Very clean place and helpful teachers.', 0, '2026-06-09 10:23:00'),
(48, 'client_53ykr2p', 'Dr. Archana Shrivastava', '7770877117', 'dr.archanashrivastav@gmail.com', 5, 'Very clean place and helpful teachers.', 1, '2026-06-09 10:23:08');

-- --------------------------------------------------------

--
-- Table structure for table `subscriptions`
--

CREATE TABLE `subscriptions` (
  `id` int(11) NOT NULL,
  `clientId` varchar(50) NOT NULL,
  `planId` int(11) NOT NULL,
  `status` enum('active','inactive','expired','cancelled') DEFAULT 'active',
  `start_date` datetime NOT NULL DEFAULT current_timestamp(),
  `end_date` datetime NOT NULL,
  `renewal_date` datetime DEFAULT NULL,
  `auto_renew` tinyint(1) DEFAULT 1,
  `amount_paid` decimal(10,2) DEFAULT NULL,
  `payment_method` varchar(50) DEFAULT NULL,
  `transaction_id` varchar(100) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subscriptions`
--

INSERT INTO `subscriptions` (`id`, `clientId`, `planId`, `status`, `start_date`, `end_date`, `renewal_date`, `auto_renew`, `amount_paid`, `payment_method`, `transaction_id`, `notes`, `createdAt`, `updatedAt`) VALUES
(1, 'client_59nwzqs', 1, 'cancelled', '2026-04-23 11:51:13', '2026-05-23 11:51:20', '2026-04-23 11:51:20', 1, 500.00, 'manual', '', 'I purchesed a plan', '2026-04-23 06:21:13', '2026-04-23 07:11:45'),
(2, 'client_6cqtdpq', 2, 'cancelled', '2026-04-23 11:52:27', '2026-05-23 11:52:27', NULL, 1, 2000.00, 'manual', '', '', '2026-04-23 06:22:27', '2026-04-23 06:23:48'),
(3, 'client_59nwzqs', 3, 'active', '2026-04-23 14:55:49', '2026-05-23 14:55:49', NULL, 1, 5000.00, 'manual', '', '', '2026-04-23 09:25:49', '2026-04-23 09:25:49'),
(4, 'client_53ykr2p', 2, 'active', '2026-06-09 15:16:05', '2026-07-09 15:16:05', NULL, 1, 500.00, 'manual', '', '', '2026-06-09 07:16:05', '2026-06-09 07:16:05');

-- --------------------------------------------------------

--
-- Table structure for table `subscription_history`
--

CREATE TABLE `subscription_history` (
  `id` int(11) NOT NULL,
  `clientId` varchar(50) NOT NULL,
  `subscriptionId` int(11) DEFAULT NULL,
  `action` enum('created','renewed','upgraded','downgraded','cancelled','expired') NOT NULL,
  `old_planId` int(11) DEFAULT NULL,
  `new_planId` int(11) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subscription_history`
--

INSERT INTO `subscription_history` (`id`, `clientId`, `subscriptionId`, `action`, `old_planId`, `new_planId`, `notes`, `createdAt`) VALUES
(1, 'client_59nwzqs', 1, 'created', NULL, 1, NULL, '2026-04-23 06:21:13'),
(2, 'client_59nwzqs', 1, 'renewed', NULL, NULL, NULL, '2026-04-23 06:21:20'),
(3, 'client_6cqtdpq', 2, 'created', NULL, 2, NULL, '2026-04-23 06:22:27'),
(4, 'client_6cqtdpq', 2, 'cancelled', NULL, NULL, NULL, '2026-04-23 06:23:48'),
(5, 'client_59nwzqs', 1, 'cancelled', NULL, NULL, NULL, '2026-04-23 07:11:45'),
(6, 'client_59nwzqs', 3, 'created', NULL, 3, NULL, '2026-04-23 09:25:49'),
(7, 'client_53ykr2p', 4, 'created', NULL, 2, NULL, '2026-06-09 07:16:05');

-- --------------------------------------------------------

--
-- Table structure for table `subscription_plans`
--

CREATE TABLE `subscription_plans` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `currency` varchar(5) DEFAULT 'INR',
  `duration_days` int(11) DEFAULT 30,
  `max_reviews_per_month` int(11) DEFAULT NULL,
  `features` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`features`)),
  `is_active` tinyint(1) DEFAULT 1,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `plan_code` varchar(50) DEFAULT NULL,
  `badge` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subscription_plans`
--

INSERT INTO `subscription_plans` (`id`, `name`, `description`, `price`, `currency`, `duration_days`, `max_reviews_per_month`, `features`, `is_active`, `createdAt`, `updatedAt`, `plan_code`, `badge`) VALUES
(1, 'Starter', 'Essential tools to start collecting reviews', 0.00, 'INR', 30, 100, '[\"Review Collection System\",\"Review Tracking\"]', 1, '2026-04-23 06:03:20', '2026-04-24 13:52:03', 'starter', NULL),
(2, 'Professional', 'Advanced tools to grow your business', 399.00, 'INR', 30, 100, '[\"AI-Powered Auto Reply\",\"WhatsApp Integration\",\"Negative Review Alerts (Email)\",\"Detailed Analytics & Insights\",\"Priority Support\"]', 1, '2026-04-23 06:03:20', '2026-04-24 13:52:03', 'professional', NULL),
(3, 'Enterprise', 'Complete automation for scaling businesses', 599.00, 'INR', 30, NULL, '[\"Full Review Automation Suite\",\"Advanced AI Auto Reply (Customizable)\",\"WhatsApp Automation\",\"Real-Time Negative Review Alerts (Email + WhatsApp)\",\"24/7 Dedicated Support\"]', 1, '2026-04-23 06:03:20', '2026-04-24 13:52:03', 'enterprise', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `subscription_plans_legacy`
--

CREATE TABLE `subscription_plans_legacy` (
  `id` int(11) NOT NULL,
  `clientId` int(11) NOT NULL,
  `started_date` date NOT NULL,
  `end_date` date NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_active` tinyint(1) DEFAULT 1,
  `name` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `currency` varchar(5) DEFAULT 'INR',
  `duration_days` int(11) DEFAULT 30,
  `max_reviews_per_month` int(11) DEFAULT NULL,
  `features` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`features`)),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `clientId` (`clientId`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `clientId_2` (`clientId`);

--
-- Indexes for table `client_branding`
--
ALTER TABLE `client_branding`
  ADD PRIMARY KEY (`id`),
  ADD KEY `client_id` (`client_id`);

--
-- Indexes for table `client_business`
--
ALTER TABLE `client_business`
  ADD PRIMARY KEY (`id`),
  ADD KEY `client_id` (`client_id`);

--
-- Indexes for table `client_faqs`
--
ALTER TABLE `client_faqs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `client_id` (`client_id`);

--
-- Indexes for table `client_keywords`
--
ALTER TABLE `client_keywords`
  ADD PRIMARY KEY (`id`),
  ADD KEY `client_id` (`client_id`);

--
-- Indexes for table `client_locations`
--
ALTER TABLE `client_locations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `client_id` (`client_id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `notifications_client_fk` (`clientId`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_subscriptions_client_status` (`clientId`,`status`),
  ADD KEY `idx_subscriptions_plan` (`planId`);

--
-- Indexes for table `subscription_history`
--
ALTER TABLE `subscription_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_subscription_history_client` (`clientId`),
  ADD KEY `idx_subscription_history_subscription` (`subscriptionId`);

--
-- Indexes for table `subscription_plans`
--
ALTER TABLE `subscription_plans`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_plan_name` (`name`);

--
-- Indexes for table `subscription_plans_legacy`
--
ALTER TABLE `subscription_plans_legacy`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_subscription_plans_client` (`clientId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `client_branding`
--
ALTER TABLE `client_branding`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `client_business`
--
ALTER TABLE `client_business`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `client_faqs`
--
ALTER TABLE `client_faqs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `client_keywords`
--
ALTER TABLE `client_keywords`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `client_locations`
--
ALTER TABLE `client_locations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `subscriptions`
--
ALTER TABLE `subscriptions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `subscription_history`
--
ALTER TABLE `subscription_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `subscription_plans`
--
ALTER TABLE `subscription_plans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1675;

--
-- AUTO_INCREMENT for table `subscription_plans_legacy`
--
ALTER TABLE `subscription_plans_legacy`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `client_branding`
--
ALTER TABLE `client_branding`
  ADD CONSTRAINT `client_branding_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `client_business`
--
ALTER TABLE `client_business`
  ADD CONSTRAINT `client_business_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `client_faqs`
--
ALTER TABLE `client_faqs`
  ADD CONSTRAINT `client_faqs_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `client_keywords`
--
ALTER TABLE `client_keywords`
  ADD CONSTRAINT `client_keywords_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `client_locations`
--
ALTER TABLE `client_locations`
  ADD CONSTRAINT `client_locations_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_client_fk` FOREIGN KEY (`clientId`) REFERENCES `clients` (`clientId`);

--
-- Constraints for table `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD CONSTRAINT `subscriptions_client_fk` FOREIGN KEY (`clientId`) REFERENCES `clients` (`clientId`);

--
-- Constraints for table `subscription_history`
--
ALTER TABLE `subscription_history`
  ADD CONSTRAINT `subscription_history_client_fk` FOREIGN KEY (`clientId`) REFERENCES `clients` (`clientId`),
  ADD CONSTRAINT `subscription_history_subscription_fk` FOREIGN KEY (`subscriptionId`) REFERENCES `subscriptions` (`id`);

--
-- Constraints for table `subscription_plans_legacy`
--
ALTER TABLE `subscription_plans_legacy`
  ADD CONSTRAINT `fk_subscription_plans_client` FOREIGN KEY (`clientId`) REFERENCES `clients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
