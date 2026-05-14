-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 12, 2026 at 12:19 PM
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
-- Database: `qr_review`
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
  `keywords` text DEFAULT NULL,
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
  `questions` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`questions`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`id`, `clientId`, `name`, `businessName`, `keywords`, `email`, `mobile`, `password`, `placeId`, `logo`, `isActive`, `createdAt`, `updatedAt`, `websiteUrl`, `primaryColor`, `secondaryColor`, `questions`) VALUES
(3, 'client_59nwzqs', 'priyanshu Garg', 'banking', '', 'impriyanshu.garg@gmail.com', '9977343574', '$2b$10$SfwjyU4TCebRKsbPoC2.3OzhbsmV.ejrq2sJkVlzx0O7loDrX1HRK', 'ChINN4xEHwyugTkRP_VLclm8MZ8', NULL, 1, '2026-04-19 11:13:59', '2026-05-11 07:47:44', 'chandrayu.com', '#d83bf7', '#2dd4bf', '[]'),
(4, 'client_744dx7c', 'qaisar moin', 'Academy', NULL, 'pritibandewar2929@gmail.com', '9244950772', '$2b$10$veGAq0rxRSksUogfhsHwq.TcMoiLU4hZh8rlozswY.5orVoBpjw72', 'ChINN4xEHwyugTkRP_VLclm8MZ8', '/uploads/1778318592897-304850687.jpg', 1, '2026-04-19 16:45:38', '2026-05-09 09:23:13', 'chandrayu.com', '#3b82f6', '#2dd4bf', NULL),
(6, 'client_6cqtdpq', 'DOAGuru', 'IT', NULL, 'doaguruinfosystems@gmail.com', '9244950772', '$2b$10$NRl3rfVdNrM3FS19gGVIAOvwVSNeVjrGlQHjW3.o3YnfrZQp0lKJe', 'ChIJT-5eGRaxgTkRxyMc7_psGWI', '/uploads/1776761332222-270648210.png', 1, '2026-04-21 08:48:52', '2026-05-09 09:34:10', NULL, '#3b82f6', '#2dd4bf', NULL),
(13, 'client_ugsn88u', 'Ashish dubey', 'Learning', NULL, 'ad201054@gmail.com', '9424303812', '$2b$10$EfYfxeyC7MDIzgPXYHf/9.3q5b9fGBoL2z49Cyiw/c6vX0Ad5P0xu', 'ChINN4xEHwyugTkRP_VLclm8MZ8', '/uploads/1778319366324-916690385.jpg', 1, '2026-05-09 09:36:06', '2026-05-09 09:36:06', 'chandrayu.com', '#3b82f6', '#2dd4bf', NULL),
(14, 'client_gdj5kc5', 'Priti Bandewar', 'Beauty', NULL, 'pritibandewar68@gmail.com', '+919244950772', '$2b$10$Wu/AOn6J.CvbdRAq4nIsO.79hsCS2KkRhTFbZY9GzZJqryyHxIvam', 'ChINN4xEHwyugTkRP_VLclm8MZ8', NULL, 1, '2026-05-09 10:41:55', '2026-05-09 11:31:54', 'enejhherbal.com', '#b3bed0', '#6fd42b', '[{\"question\":\"Which service did you take?\",\"options\":[\"priti bandewar\",\"moin\",\"pg\"]},{\"question\":\"What did you like about the service?\",\"options\":[\"hello\",\"hiii\",\"dev\",\"ansh\"]}]'),
(17, 'test-id', 'Test Name', 'Test Biz', 'test keywords', 'test@example.com', '1234567890', 'hash', 'place-id', 'logo.png', 1, '2026-05-11 07:23:59', '2026-05-11 07:23:59', 'http://test.com', '#000000', '#ffffff', '[]'),
(18, 'client_yumsojm', 'Anas Khan', 'Teaching', 'best school, good faculty, standered teaching skills, learing to student i sthe best way', 'pritibandewar6868@gmail.com', '+919244950772', '$2b$10$ZYLDVHElaycFIpfpRzGXKe817pCucC0DcURG6Ytwv8LTRBCpACLF.', 'ChINN4xEHwyugTkRP_VLclm8MZ8', NULL, 1, '2026-05-11 07:30:11', '2026-05-11 07:30:11', 'anasportfolio.com', '#f73b3b', '#3f2bd4', '[{\"question\":\"Which service did you take?\",\"options\":[\"School\",\"Coaching\",\"Guidence\"]},{\"question\":\"What did you like about the service?\",\"options\":[\"Faculty\",\"Communication\",\"learning speed\",\"\"]}]'),
(19, 'client_fn9e9kx', 'Anas Khan', 'Teaching', 'best school, good faculty, standered teaching skills, learing to student i sthe best way', 'pritibandewar52@gmail.com', '+919244950772', '$2b$10$B35oXwISjrbRKupaRCq1s.tCpP5q6DGrjC4qcCq2nH2av2WfJqyOW', 'ChINN4xEHwyugTkRP_VLclm8MZ8', '/uploads/1778484727659-190588060.jpg', 1, '2026-05-11 07:32:08', '2026-05-11 07:32:08', 'pritibandewar6868@gmail.com', '#3b82f6', '#2dd4bf', '[{\"question\":\"Which service did you take?\",\"options\":[\"School\",\"Faculty\",\"learning\"]},{\"question\":\"What did you like about the service?\",\"options\":[\"faculty\",\"Communication\",\"\",\"\"]}]'),
(20, 'client_6h2p9vz', 'Anas Khan', 'Teaching', 'best school, good faculty, standered teaching skills, learing to student i sthe best way', 'pritibandewar29@gmail.com', '+919244950772', '$2b$10$SPkBf6eETccRoSk0IFBvAe5QCTk486vPVXKu7hfY6Bnrrp26hszOS', 'ChINN4xEHwyugTkRP_VLclm8MZ8', NULL, 1, '2026-05-11 07:38:00', '2026-05-11 07:46:52', 'anasportfolio.com', '#f73b3b', '#2bd455', '[{\"question\":\"Which service did you take?\",\"options\":[\"Digital Marketing\",\"Web Development\",\"SEO Services\"]},{\"question\":\"What did you like about the service?\",\"options\":[\"Quality\",\"Communication\",\"Speed\",\"Pricing\"]}]');

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
(3, 'client_744dx7c', 'renewal_reminder', 'Client \"Priti Test Client\" (Camp) ka Starter plan 3 May 2026 ko expire ho raha hai. Renewal ke liye contact karein.', 1, '2026-05-01 17:24:00'),
(4, 'client_gdj5kc5', 'renewal_reminder', 'MANUAL REMINDER: Admin sent renewal follow-up to Priti Bandewar. Plan: Professional.', 1, '2026-05-11 05:45:20'),
(5, 'client_ugsn88u', 'renewal_reminder', 'MANUAL REMINDER: Admin sent renewal follow-up to Ashish dubey. Plan: Professional.', 1, '2026-05-11 05:45:48'),
(6, 'client_gdj5kc5', 'renewal_reminder', 'MANUAL REMINDER: Admin sent renewal follow-up to Priti Bandewar. Plan: Professional.', 1, '2026-05-11 05:45:49'),
(7, 'client_gdj5kc5', 'renewal_reminder', 'MANUAL REMINDER: Admin sent renewal follow-up to Priti Bandewar. Plan: Professional.', 1, '2026-05-11 05:46:01'),
(8, 'client_gdj5kc5', 'renewal_reminder', 'MANUAL REMINDER: Admin sent renewal follow-up to Priti Bandewar. Plan: Professional.', 1, '2026-05-11 05:46:38');

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
(32, 'admin', 'Priti Bandewar', '09244950772', 'pritibandewar52@gmail.com', 2, 'Heyehsh', 0, '2026-05-08 06:32:23'),
(33, 'admin', 'Direct Google Redirect', NULL, NULL, 4, 'Redirected to Google Maps', 1, '2026-05-08 06:41:15'),
(34, 'admin', 'Priti Bandewar', '09244950772', 'pritibandewar52@gmail.com', 2, 'fdgzdfgzxfb', 0, '2026-05-08 06:55:41'),
(35, 'admin', 'Direct Google Redirect', NULL, NULL, 4, 'Redirected to Google Maps with AI Review', 1, '2026-05-08 07:16:28'),
(36, 'admin', 'Priti Bandewar', '09244950772', 'pritibandewar52@gmail.com', 2, 'xdvzxc zcx', 0, '2026-05-08 07:17:40'),
(37, 'admin', 'Direct Google Redirect', NULL, NULL, 4, 'Redirected to Google Maps with AI Review', 1, '2026-05-08 07:21:32'),
(38, 'admin', 'Direct Google Redirect', NULL, NULL, 4, 'Redirected to Google Maps with AI Review', 1, '2026-05-08 07:21:58'),
(39, 'admin', 'Direct Google Redirect', NULL, NULL, 4, 'Redirected to Google Maps with AI Review', 1, '2026-05-08 07:26:12'),
(40, 'admin', 'Direct Google Redirect', NULL, NULL, 5, 'Redirected to Google Maps with AI Review', 1, '2026-05-08 07:29:05'),
(41, 'admin', 'Priti Bandewar', '09244950772', 'pritibandewar52@gmail.com', 3, 'hjgljghjb', 0, '2026-05-08 07:31:14'),
(42, 'admin', 'Direct Google Redirect', NULL, NULL, 4, 'Redirected to Google Maps with AI Review', 1, '2026-05-08 07:45:33'),
(43, 'admin', 'Direct Google Redirect', NULL, NULL, 4, 'Redirected to Google Maps with AI Review', 1, '2026-05-08 07:46:33'),
(44, 'admin', 'Google Reviewer', NULL, NULL, 4, 'Just had to give a big shoutout to DOAGuru InfoSystems for their top-notch digital marketing services! Their creative and innovative approach really helped increase our sales and leads. Highly recommend them for all your digital marketing needs!', 1, '2026-05-08 07:58:22'),
(45, 'admin', 'Google Reviewer', NULL, NULL, 4, 'DOAGuru InfoSystems absolutely exceeded my expectations with their video shooting services! The quick support and smooth process made working with them a breeze. Highly recommend for anyone needing top-notch digital marketing services.', 1, '2026-05-08 08:07:25'),
(46, 'client_6cqtdpq', 'Priti Bandewar', '09244950772', 'pritibandewar52@gmail.com', 3, 'zdfncxvn', 0, '2026-05-08 08:08:00'),
(47, 'client_6cqtdpq', 'Priti Bandewar', '09244950772', 'pritibandewar52@gmail.com', 3, 'zdfncxvn', 0, '2026-05-08 08:08:00'),
(48, 'admin', 'Google Reviewer', NULL, NULL, 4, 'I had the most incredible experience with DOAGuru InfoSystems! Their digital marketing services were top-notch and truly helped boost my business. The team was so friendly and professional throughout the entire process - highly recommend giving them a try!', 1, '2026-05-08 08:48:55'),
(49, 'admin', 'Google Reviewer', NULL, NULL, 5, 'Just had the best experience with DOAGuru InfoSystems! Their digital marketing services are top-notch, and their web development team is super creative and innovative. Communication was great, and thanks to them, our brand visibility has skyrocketed along with increased sales and leads! Highly recommend!', 1, '2026-05-08 09:16:38'),
(50, 'admin', 'Priti Bandewar', '09244950772', '9329978427@ybl', 1, 'yjuyhg', 0, '2026-05-08 09:18:55'),
(51, 'admin', 'Google Reviewer', NULL, NULL, 5, 'Absolutely blown away by the top-notch services provided by DOAGuru InfoSystems! Their digital marketing expertise, combined with their amazing web development skills, resulted in increased sales and better brand visibility for our business. The communication was great, and the on-time delivery of high-quality content made the whole process smooth and efficient. Amazing website/app - highly recommend!', 1, '2026-05-08 09:42:17'),
(52, 'admin', 'Google Reviewer', NULL, NULL, 5, 'DOAGuru InfoSystems is the real deal when it comes to digital marketing and graphic designing! Their video editing skills took our brand visibility to the next level. Their professional behavior and outstanding support make them a top choice for any business. Highly recommended!', 1, '2026-05-08 10:47:31'),
(53, 'admin', 'Google Reviewer', NULL, NULL, 5, 'I had such an amazing experience with DOAGuru InfoSystems for my digital marketing needs! Their graphic designing and video editing services were top-notch, resulting in increased sales and better brand visibility for my business. The professional team at DOAGuru InfoSystems provided outstanding support and great communication throughout the process. Highly recommended!', 1, '2026-05-08 10:52:05');

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
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `reminder_sent` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subscriptions`
--

INSERT INTO `subscriptions` (`id`, `clientId`, `planId`, `status`, `start_date`, `end_date`, `renewal_date`, `auto_renew`, `amount_paid`, `payment_method`, `transaction_id`, `notes`, `createdAt`, `updatedAt`, `reminder_sent`) VALUES
(1, 'client_59nwzqs', 1, 'cancelled', '2026-04-23 11:51:13', '2026-05-23 11:51:20', '2026-04-23 11:51:20', 1, 500.00, 'manual', '', 'I purchesed a plan', '2026-04-23 06:21:13', '2026-04-23 07:11:45', 0),
(2, 'client_6cqtdpq', 2, 'cancelled', '2026-04-23 11:52:27', '2026-05-23 11:52:27', NULL, 1, 2000.00, 'manual', '', '', '2026-04-23 06:22:27', '2026-04-23 06:23:48', 0),
(3, 'client_59nwzqs', 3, 'active', '2026-04-23 14:55:49', '2026-05-23 14:55:49', NULL, 1, 5000.00, 'manual', '', '', '2026-04-23 09:25:49', '2026-04-24 06:55:48', 0),
(6, 'client_744dx7c', 1, 'expired', '2026-05-01 22:53:52', '2026-05-03 00:00:00', NULL, 1, NULL, NULL, NULL, NULL, '2026-05-01 17:23:52', '2026-05-09 09:25:06', 0),
(7, 'client_744dx7c', 2, 'active', '2026-05-09 14:55:06', '2026-06-08 14:55:06', NULL, 1, 5000.00, 'manual', '', '', '2026-05-09 09:25:06', '2026-05-09 09:25:06', 0),
(8, 'client_ugsn88u', 2, 'active', '2026-05-09 16:42:15', '2026-06-08 16:42:15', NULL, 1, 400.00, 'manual', '', '', '2026-05-09 11:12:15', '2026-05-09 11:12:15', 0),
(9, 'client_gdj5kc5', 2, 'active', '2026-05-09 17:00:52', '2026-06-08 17:00:52', NULL, 1, 500.00, 'manual', '', '', '2026-05-09 11:30:52', '2026-05-09 11:30:52', 0),
(10, 'client_6h2p9vz', 2, 'active', '2026-05-11 13:09:33', '2026-06-10 13:09:33', NULL, 1, 400.00, 'manual', '', '', '2026-05-11 07:39:33', '2026-05-11 07:39:33', 0);

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
(7, 'client_744dx7c', 6, 'upgraded', 1, 2, 'Subscription changed', '2026-05-09 09:25:06'),
(8, 'client_744dx7c', 7, 'created', NULL, 2, NULL, '2026-05-09 09:25:06'),
(9, 'client_ugsn88u', 8, 'created', NULL, 2, NULL, '2026-05-09 11:12:15'),
(10, 'client_gdj5kc5', 9, 'created', NULL, 2, NULL, '2026-05-09 11:30:52'),
(11, 'client_6h2p9vz', 10, 'created', NULL, 2, NULL, '2026-05-11 07:39:33');

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
  `badge` varchar(100) DEFAULT NULL,
  `plan_code` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subscription_plans`
--

INSERT INTO `subscription_plans` (`id`, `name`, `description`, `price`, `currency`, `duration_days`, `max_reviews_per_month`, `features`, `is_active`, `createdAt`, `updatedAt`, `badge`, `plan_code`) VALUES
(1, 'Starter', 'Essential tools to start collecting reviews', 0.00, 'INR', 30, 100, '[\"Review Collection System\",\"Review Tracking\"]', 1, '2026-04-23 06:03:20', '2026-04-24 12:07:10', NULL, 'starter'),
(2, 'Professional', 'Advanced tools to grow your business', 399.00, 'INR', 30, 100, '[\"AI-Powered Auto Reply\",\"WhatsApp Integration\",\"Negative Review Alerts (Email)\",\"Detailed Analytics & Insights\",\"Priority Support\"]', 1, '2026-04-23 06:03:20', '2026-04-24 12:24:33', NULL, 'professional'),
(3, 'Enterprise', 'Complete automation for scaling businesses', 599.00, 'INR', 30, NULL, '[\"Full Review Automation Suite\",\"Advanced AI Auto Reply (Customizable)\",\"WhatsApp Automation\",\"Real-Time Negative Review Alerts (Email + WhatsApp)\",\"24/7 Dedicated Support\"]', 1, '2026-04-23 06:03:20', '2026-04-24 12:00:48', NULL, 'enterprise'),
(5, '', NULL, 0.00, 'INR', NULL, NULL, NULL, 1, '2026-04-24 11:05:36', '2026-04-24 11:05:36', NULL, NULL);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `subscriptions`
--
ALTER TABLE `subscriptions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `subscription_history`
--
ALTER TABLE `subscription_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `subscription_plans`
--
ALTER TABLE `subscription_plans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=289;

--
-- AUTO_INCREMENT for table `subscription_plans_legacy`
--
ALTER TABLE `subscription_plans_legacy`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

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
