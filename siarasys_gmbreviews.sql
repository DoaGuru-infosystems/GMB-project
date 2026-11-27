-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 27, 2026 at 06:07 AM
-- Server version: 10.6.28-MariaDB
-- PHP Version: 8.4.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `siarasys_gmbreviews`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `email`, `password`, `created_at`) VALUES
(1, 'doaguruinfosystems@gmail.com', '$2b$10$UhV5AsrnSTNytU318gwIkOJkD/B8X/wGoIX8I9uiIqCuSphDR9o/.', '2026-06-11 20:44:07');

-- --------------------------------------------------------

--
-- Table structure for table `businesses`
--

CREATE TABLE `businesses` (
  `id` bigint(20) NOT NULL,
  `client_id` bigint(20) NOT NULL,
  `business_name` varchar(150) NOT NULL,
  `place_id` varchar(255) DEFAULT NULL,
  `website_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `businesses`
--

INSERT INTO `businesses` (`id`, `client_id`, `business_name`, `place_id`, `website_url`) VALUES
(1, 1, 'Pluro Jabalpur Fertility and IVF Centre', 'ChIJ749m7aqvgTkRkHLEqGu31Rc', 'jabalpurivfcentre.com'),
(2, 2, 'DOAGuru InfoSystems', 'ChIJT-5eGRaxgTkRxyMc7_psGWI', 'www.doaguru.com'),
(3, 3, 'Jyotirmay IVF & Fertility Centre', 'ChIJEZWnS4lbhDkRa14hE07UEs4', ''),
(4, 5, 'Goswami X-ray Ultrasound & Pathology', 'ChIJHyYZeTRahDkRSZzOtVhVtTM', ''),
(5, 6, 'National Hospital ', 'ChIJgW0hR8lbhDkRVx-SPRZ7wjc', 'nationalhospitalrewa.com'),
(6, 7, 'Jabalpur Hospital', 'ChIJN4xEHwyugTkRP_VLclm8MZ8', 'jabalpurhospital.com'),
(7, 8, 'Dr Pooja Gangwar Patel', 'ChIJnReQD6ZbhDkRibys0ovKNF0', 'doaguruinfosystems@gmail.com'),
(8, 9, 'Life Medicity Multi Speciality Hospital', 'ChIJO4FWRgqvgTkRLrUqggo5_Lw', 'www.lifemedicity.com'),
(9, 10, 'Navjyoti Eye Care', 'ChIJmzNAJauvgTkRheYBtaZN7XU', 'navjyotieyecare4@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `business_branding`
--

CREATE TABLE `business_branding` (
  `id` bigint(20) NOT NULL,
  `business_id` bigint(20) NOT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `primary_color` varchar(7) DEFAULT '#3b82f6',
  `secondary_color` varchar(7) DEFAULT '#2dd4bf'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `business_branding`
--

INSERT INTO `business_branding` (`id`, `business_id`, `logo`, `primary_color`, `secondary_color`) VALUES
(1, 1, '/uploads/1781773849470-339967421.png', '#c6152f', '#2e2bd4'),
(2, 2, '/uploads/logonew.png', '#3b82f6', '#2dd4bf'),
(3, 3, '/uploads/1781358159849-449474705.jpeg', '#f7863b', '#2b74d4'),
(4, 4, '/uploads/1781359337795-171107782.jpeg', '#f9ab47', '#168de0'),
(5, 5, '/uploads/1781359926281-570630137.jpeg', '#3169c4', '#2dd4bf'),
(6, 6, '/uploads/1781360674976-197021494.jpeg', '#ff2301', '#223c8c'),
(7, 7, '/uploads/1781764334313-65075582.png', '#3b82f6', '#2dd4bf'),
(8, 8, '/uploads/1785590474927-815138691.png', '#f58021', '#01a959'),
(9, 9, '/uploads/1788785588183-755834290.png', '#3b82f6', '#2dd4bf');

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE `clients` (
  `id` bigint(20) NOT NULL,
  `clientId` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`id`, `clientId`, `name`, `email`, `mobile`, `password`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'client_f8zsxao', 'Dr. Archana Shrivastava', 'dr.archanashrivastav@gmail.com', '7770877117', '$2b$10$zRCS7BKW7joxsqzAyHoW4uN8eYPp9kSd9MHsZ/8uWHPE9TPj9gXty', 1, '2026-06-11 21:51:54', '2026-06-18 09:10:49'),
(2, 'admin', 'DOAGuru InfoSystems', 'doaguruinfosystems@gmail.com', '+91-7440992424', '', 1, '2026-06-13 04:13:02', '2026-06-13 04:13:02'),
(3, 'client_p7cgwwd', 'Dr. Gunjan Goswami ', 'Jyotirmayivfcenter@gmail.com', '7724819233', '$2b$10$jciKlUmP2rjCRYU.eFVsJuAouM2lCnVB4yds7gR2Z3oucKfyofb/u', 0, '2026-06-13 13:42:39', '2026-07-09 08:02:22'),
(5, 'client_6w3lpym', ' Dr. Abhishek Goswami', 'goswamidiagnosticsrewa@gmail.com', '8109798004', '$2b$10$w0Ve5kUScKTBq9l2ZSSgN.9OyOsKxaf4f3YDMf8uROlhcSpjx8A0K', 0, '2026-06-13 14:02:17', '2026-07-09 08:02:29'),
(6, 'client_pi7vlqw', 'Dr. Akhilesh Patel ', 'dr.akhi007@gmail.com', '7662359974', '$2b$10$sa8O9yc6T1LfE.4Hs25z4.AH8lxZaKfOQmh7PUbyftOCCNg9I3loq', 0, '2026-06-13 14:12:06', '2026-09-07 13:18:41'),
(7, 'client_bvevbru', 'Jabalpur Hospital', 'Jabalpurhospital2024@gmail.com', '7614026000', '$2b$10$JwLeq/YWTtRiLc8et0jp9epJ9vPesj7tug8pwtBnCVri.d84GSlOe', 1, '2026-06-13 14:24:35', '2026-06-13 14:24:35'),
(8, 'client_h3nrit7', 'Dr Pooja Gangwar Patel', 'Poojagangwar44@gmail.com', '7828950421', '$2b$10$YZxH07js53ijmCBr4rpcUepFXpy8fFXUFXwLuboawYi.NDdt06A4e', 0, '2026-06-18 06:32:14', '2026-09-07 13:17:25'),
(9, 'client_b0mtt6h', 'Life Medicity Multi Speciality Hospital', 'lifemedicity@gmail.com', '07614925151', '$2b$10$NfIIZ5tLGVa7NLsHD4yxy.3QzhO15V72Sm4nNlMxA32X0fQi9FIqW', 1, '2026-07-31 07:43:35', '2026-08-01 13:21:15'),
(10, 'client_vo63kuy', 'Dr Rukmendra Pratap Singh Warkade', 'navjyotieyecare4@gmail.com', '07024076325', '$2b$10$1c/WZbIkd0Di1gkYMMPHgumfkNSTVbkBgnUehwRJsHc/VexV4OP82', 1, '2026-09-07 12:53:08', '2026-09-07 12:53:08');

-- --------------------------------------------------------

--
-- Table structure for table `keywords`
--

CREATE TABLE `keywords` (
  `id` bigint(20) NOT NULL,
  `client_id` bigint(20) NOT NULL,
  `keyword_name` varchar(100) NOT NULL,
  `is_active` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `keywords`
--

INSERT INTO `keywords` (`id`, `client_id`, `keyword_name`, `is_active`) VALUES
(8, 2, 'Digital Marketing', 1),
(9, 2, 'Web Development', 1),
(10, 2, 'SEO Services', 1),
(11, 2, 'Social Media Marketing', 1),
(12, 2, 'Video Editing', 1),
(13, 2, 'Graphic Designing', 1),
(38, 5, 'Best sonography centre in Rewa', 1),
(39, 5, 'Best fetal anomaly scan in Rewa', 1),
(40, 5, 'Best NT Scan in Rewa', 1),
(41, 5, 'Best Fetal health check ultrasound in Rewa', 1),
(42, 5, 'Fetal Echocardiography in Rewa', 1),
(43, 6, 'Best Hospital in Rewa', 1),
(44, 6, 'Best Delivery Hospital in Rewa', 1),
(45, 6, 'Best Surgery Hospital in Rewa', 1),
(46, 6, 'Cancer Surgery Hospital in Rewa', 1),
(47, 6, 'Best Gynecology Hospital in Rewa', 1),
(48, 6, 'C-Section Hospital in Rewa', 1),
(49, 6, 'Laparoscopic Surgery Hospital in Rewa', 1),
(50, 6, 'PCOD Treatment Hospital in Rewa', 1),
(51, 6, 'Ectopic Pregnancy Treatment Hospital in Rewa', 1),
(52, 7, 'best hospital in Jabalpur', 1),
(53, 7, 'Healthcare facility in Jabalpur', 1),
(54, 7, 'Medical services in Jabalpur', 1),
(55, 7, 'Emergency hospital Services in Jabalpur', 1),
(56, 7, 'Medical care center in Jabalpur', 1),
(57, 3, 'Best IVF Centre in Rewa', 1),
(58, 3, 'Best IVF Doctor in Rewa', 1),
(59, 3, 'Best Fertility Clinic in Rewa', 1),
(60, 3, 'Best Laparoscopic Surgeon In Rewa', 1),
(61, 3, 'Best Gynecologist In Rewa', 1),
(77, 8, 'Best Gynecologist in Rewa', 1),
(78, 8, 'Infertility Doctor in Rewa', 1),
(79, 8, 'Normal Delivery Doctor in Rewa', 1),
(80, 8, 'Pregnancy Care Specialist in Rewa', 1),
(81, 8, 'Women\'s Health Doctor in Rewa', 1),
(96, 1, 'Best IVF Centre in Jabalpur', 1),
(97, 1, 'Best IVF Doctor in Jabalpur', 1),
(98, 1, 'Best Fertility specialist Clinic in Jabalpur', 1),
(99, 1, 'IVF Treatment in Jabalpur', 1),
(100, 1, 'Low Sperm Count Treatment in Jabalpur', 1),
(101, 1, 'Best Laparoscopic Surgeon In Jabalpur', 1),
(102, 1, 'Best Gynecologist In Jabalpur', 1),
(118, 9, 'Advanced Pulmonology Lifecare Hospital In Jabalpur', 1),
(119, 9, 'CGHS Approved Hospital In Jabalpur', 1),
(120, 9, 'Best Gastroenterology Hospital In Jabalpur', 1),
(121, 9, 'Multi Speciality Hospital In Jabalpur', 1),
(122, 9, 'Best Hospital In Jabalpur', 1),
(123, 10, 'Best eye specialist in ranjhi jabalpur', 1),
(124, 10, 'Eye care clinic Jabalpur', 1),
(125, 10, 'Best eye hospital in ranjhi Jabalpur', 1),
(126, 10, 'Eye treatment in jabalpur', 1),
(127, 10, 'Eye checkup in ranjhi jabalpur', 1);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` bigint(20) NOT NULL,
  `client_id` bigint(20) NOT NULL,
  `type` varchar(50) DEFAULT NULL,
  `message` text NOT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` bigint(20) NOT NULL,
  `client_id` bigint(20) DEFAULT NULL,
  `customer_name` varchar(255) DEFAULT NULL,
  `customer_mobile` varchar(20) DEFAULT NULL,
  `customer_email` varchar(255) DEFAULT NULL,
  `rating` tinyint(4) NOT NULL,
  `review` text DEFAULT NULL,
  `is_positive` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `client_id`, `customer_name`, `customer_mobile`, `customer_email`, `rating`, `review`, `is_positive`, `created_at`) VALUES
(1, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre provided excellent gynecology treatment. The Best Gynecologist in Jabalpur truly cares about their patients\' well-being. Staff was friendly and professional.', 1, '2026-06-12 18:22:06'),
(2, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre provided excellent gynecology treatment. The staff was professional and caring. Great experience overall!', 1, '2026-06-13 08:44:07'),
(3, 2, 'Google Reviewer', NULL, NULL, 5, 'DOAGuru InfoSystems helped boost our online presence significantly! The team\'s expertise in digital marketing really made a difference. Great experience overall.', 1, '2026-06-13 08:44:30'),
(4, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital provides excellent general consultation services. I am impressed by the quality of care and the professionalism of the staff!', 1, '2026-06-13 14:29:20'),
(5, 7, 'priti bandewar', '9244950772', 'pritibandewar52@gmail.com', 3, 'testing', 0, '2026-06-13 14:30:23'),
(6, 6, 'Google Reviewer', NULL, NULL, 5, 'National Hospital mein surgery ke liye gaya tha aur mujhe bahut acchi service mili. Best Surgery Hospital in Rewa keh ke sach mein kehna chahunga. Patient care bhi kaafi accha tha. Highly recommend!', 1, '2026-06-15 09:26:12'),
(7, 6, 'Google Reviewer', NULL, NULL, 5, 'नेशनल हॉस्पिटल में मैंने एक आम डिलीवरी सेवा का अनुभव किया। डॉक्टर्स बहुत अच्छे और अनुभवी थे। यहाँ की सेवाएँ मुझे बहुत प्रसन्न की।', 1, '2026-06-15 13:15:54'),
(8, 6, 'Google Reviewer', NULL, NULL, 5, 'रीवा में सर्वश्रेष्ठ लेप्रोस्कोपिक सर्जरी हॉस्पिटल है National Hospital। यहाँ के डॉक्टर्स और स्टाफ बहुत अच्छे हैं। मुझे यहाँ की सेवाएँ बहुत पसंद आईं।', 1, '2026-06-15 13:22:14'),
(9, 6, 'Google Reviewer', NULL, NULL, 5, 'रीवा में सर्वश्रेष्ठ लेप्रोस्कोपिक सर्जरी हॉस्पिटल है National Hospital। यहाँ के डॉक्टर्स और स्टाफ बहुत अच्छे हैं। मुझे यहाँ की सेवाएँ बहुत पसंद आईं।', 1, '2026-06-15 13:22:39'),
(10, 6, 'Google Reviewer', NULL, NULL, 5, 'National Hospital provided excellent care during my laparoscopic surgery. The staff was attentive and professional, making the whole experience much smoother. Thank you!', 1, '2026-06-16 06:49:19'),
(11, 6, 'Google Reviewer', NULL, NULL, 5, 'Had a successful laparoscopic surgery at National Hospital. Grateful for the professional care provided!', 1, '2026-06-16 06:50:19'),
(12, 6, 'Google Reviewer', NULL, NULL, 5, 'National Hospital provided exceptional care during my laparoscopic surgery. The staff was attentive and reassuring throughout the entire process. Highly satisfied with the service!', 1, '2026-06-16 06:51:50'),
(13, 6, 'Google Reviewer', NULL, NULL, 5, 'नेशनल हॉस्पिटल में मेरा अनुभव बहुत अच्छा रहा। उनकी टीम ने लेप्रोस्कॉपिक सर्जरी, कैंसर सर्जरी और जनरल सर्जरी में मुझे बहुत अच्छी सेवा दी। मैं यहाँ जाने की सलाह देता हूँ।', 1, '2026-06-16 08:25:25'),
(14, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre provided excellent care during my IVF treatment. The staff is incredibly knowledgeable and supportive throughout the entire process. I will definitely be recommending their services to others!', 1, '2026-06-18 07:27:45'),
(15, 8, 'Google Reviewer', NULL, NULL, 5, 'Dr Pooja Gangwar Patel is amazing! Experienced doctor, very helpful, caring, and supportive. Will definitely be returning for women\'s health treatment.', 1, '2026-06-18 08:43:39'),
(16, 6, 'Google Reviewer', NULL, NULL, 5, 'National Hospital provided excellent care during my general surgery. The staff was attentive and the patient care was top-notch. Great experience overall!', 1, '2026-06-18 10:04:27'),
(17, 6, 'Google Reviewer', NULL, NULL, 5, 'National Hospital provided excellent care during my general surgery. The staff was attentive and the patient care was top-notch. Great experience overall!', 1, '2026-06-18 10:04:27'),
(18, 1, 'Google Reviewer', NULL, NULL, 5, 'Laproscopic surgen dr archana shrivastv mam ne meri normal delivery Kiya me mam ke treatment se bahut khus hu thank you so much mam', 1, '2026-06-19 08:12:11'),
(19, 1, 'Google Reviewer', NULL, NULL, 5, 'Laproscopic surgen dr archana shrivastv mam ne meri normal delivery Kiya me mam ke treatment se bahut khus hu thank you so much mam', 1, '2026-06-19 08:13:29'),
(20, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein treatment bahut accha tha. Best Fertility Specialist Clinic in Jabalpur ke liye yahan jaana highly recommend karunga. Staff experienced hai aur IVF treatment bhi top-notch hai.', 1, '2026-06-19 09:18:05'),
(21, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein treatment bahut hi achha mila. Pregnancy care aur IVF ke liye best doctor aur gynecologist available hain yahan. Staff bhi supportive hai. Highly recommend!', 1, '2026-06-19 10:10:06'),
(22, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein treatment bahut hi accha tha. Laparoscopic surgery ke liye best option hai yahan aur IVF doctor bhi top-notch hai. Satisfied with the services provided here.', 1, '2026-06-23 06:07:21'),
(23, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bohot sahi raha, Laparoscopic Surgery ke liye best option hai aur IVF treatment bhi top-notch hai. Staff helpful tha aur overall treatment satisfactory tha. Highly recommend!', 1, '2026-06-23 08:29:15'),
(24, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein treatment bahut accha tha. Laparoscopic surgery aur IVF ke liye yahan best gynecologist available hai. Highly recommend!', 1, '2026-06-23 10:04:09'),
(25, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre ne laparoscopic surgery ke liye best doctor provide kiya. Doctor experienced the aur treatment bohot accha tha. Highly recommend!', 1, '2026-06-23 10:09:12'),
(26, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital provides excellent service and is a trusted healthcare facility in Jabalpur. The health checkup was thorough, and the staff was very friendly and professional. Will definitely be returning for any future medical needs!', 1, '2026-06-25 07:54:54'),
(27, 1, 'Google Reviewer', NULL, NULL, 5, 'Had a successful laparoscopic surgery at Pluro Jabalpur Fertility and IVF Centre. The best IVF treatment in Jabalpur indeed! Great experience overall!', 1, '2026-06-25 08:05:07'),
(28, 1, 'Google Reviewer', NULL, NULL, 5, 'Had a successful laparoscopic surgery at Pluro Jabalpur Fertility and IVF Centre. The best IVF treatment in Jabalpur indeed! Great experience overall!', 1, '2026-06-25 08:05:57'),
(29, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital provided excellent inpatient care and 24x7 emergency support. Trusted healthcare service from dedicated staff! Will definitely be returning in the future.', 1, '2026-06-25 08:06:51'),
(30, 7, 'Ajay pandey', '9425859760', 'ajaypandey@gmail.com', 2, 'Good \n', 0, '2026-06-25 08:10:09'),
(31, 7, 'Google Reviewer', NULL, NULL, 4, 'Jabalpur Hospital provided a thorough health checkup with experienced doctors in a trusted healthcare facility in Jabalpur. The staff was knowledgeable and accommodating. Great experience overall!', 1, '2026-06-25 08:46:46'),
(32, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital provided excellent emergency treatment. The staff at Jabalpur Hospital were very professional and caring. Satisfaction guaranteed.', 1, '2026-06-25 09:02:23'),
(33, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital provides excellent surgical treatment with experienced doctors and advanced medical services. The staff was attentive and the inpatient care was top-notch! Great healthcare facility in Jabalpur.', 1, '2026-06-25 10:31:22'),
(34, 7, 'Shrinika ', '7000982732', 'sourabhshukla62@gmail.com', 2, 'The treatment is very good and doctors advice is very well but the management is very poor even I booked private single private AC room and that\'s rooms charges is something around 5800 but there is no hand wash there is no TV as a tender as a customer ipad that that much rupees basic items are actually necessary \nCommon washrooms areVery unhygienic \nAnd many more but the all conclusion is management is very weak so work on management treatments and doctors are very good', 0, '2026-06-26 04:33:55'),
(35, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital provided excellent surgery treatment and inpatient care. The experienced doctors and professional medical team ensured I received top-notch healthcare services. I will definitely be returning for any future medical needs.', 1, '2026-06-26 06:11:23'),
(36, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein treatment bohot accha tha. Laparoscopic Surgery ke liye best option hai yahan. Highly satisfied with the experienced doctor.', 1, '2026-06-26 07:21:37'),
(37, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital provides exceptional medical care with experienced doctors and advanced services. The staff is professional, and the emergency support is available 24/7. Quality healthcare facility in Jabalpur.', 1, '2026-06-26 07:27:23'),
(38, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein treatment bahut accha tha. Mujhe laparoscopic surgery ke liye yahan se bahut help mili. Best IVF Centre in Jabalpur ke taur par bhi yahan ka experience bohot acha hai. Highly recommend.', 1, '2026-06-26 08:08:21'),
(39, 7, 'Amandeep singh', NULL, 'singhamandeep916595.ad@gmail.com', 3, 'Good', 0, '2026-06-26 11:47:46'),
(40, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital provides exceptional specialist consultation with a professional medical team. The trusted healthcare service in Jabalpur is top-notch!', 1, '2026-06-26 14:32:38'),
(41, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital provides exceptional specialist consultation with a professional medical team. The trusted healthcare service in Jabalpur is top-notch!', 1, '2026-06-26 14:32:39'),
(42, 7, 'Google Reviewer', NULL, NULL, 5, 'जबलपुर हॉस्पिटल में जनरल कंसल्टेशन के लिए गया था। डॉक्टर्स बहुत हेल्पफुल और प्रोफेशनल थे। सेवा में कोई कमी नहीं थी। यहाँ आने की सलाह देता हूँ।', 1, '2026-06-26 19:24:47'),
(43, 7, 'Pallavi Shailendra Ganvir ', '6264140859', 'meshrampallavi.1994@gmail.com', 2, 'Excellent service is provided to us all staff and non staff members are cooperative and helpful ', 0, '2026-06-28 07:52:00'),
(44, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital mein treatment bahut achha mila. Emergency ke time par staff bahut supportive thi. Highly recommend.', 1, '2026-06-28 09:38:13'),
(45, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bohot sahi raha. Laparoscopic Surgery ke liye yahan ka treatment best hai. Best IVF Doctor in Jabalpur ke liye zaroor consider karein. Highly recommend!', 1, '2026-06-29 08:10:07'),
(46, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bohot sahi raha, Laparoscopic Surgery ke liye yahan ka treatment best hai. Best IVF doctor in Jabalpur aur IVF treatment bhi top-notch hai. Highly recommend!', 1, '2026-06-29 11:24:43'),
(47, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital में मेरा अच्छा अनुभव था। यहाँ के अनुभवी डॉक्टर्स और उनकी उन्नत चिकित्सा सेवाएँ मुझे पूरी तरह से विश्वास दिलाती हैं। सभी चेकअप और आवश्यक सुविधाएँ उपलब्ध हैं।', 1, '2026-06-29 12:13:39'),
(48, 1, 'Google Reviewer', NULL, NULL, 4, 'Pluro Jabalpur Fertility and IVF Centre provided me with excellent fertility consultation and the best gynecologist care in Jabalpur. The staff was knowledgeable and caring, making the whole experience stress-free. Great service overall!', 1, '2026-07-01 06:35:49'),
(49, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre really took care of me during my pregnancy. The doctor was experienced and the best gynecologist in Jabalpur! Staff was friendly and professional. Great experience overall.', 1, '2026-07-01 07:25:44'),
(50, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bohot sahi raha, Laparoscopic Surgery aur Best Fertility Care ke liye yeh clinic highly recommend karunga.', 1, '2026-07-01 09:02:25'),
(51, 8, 'Google Reviewer', NULL, NULL, 5, 'Dr Pooja Gangwar Patel जी ने मेरी Pregnancy Care और Gynecology Consultation के लिए बहुत अच्छी सेवा दी। मुझे उनके साथ काम करके बहुत अच्छा अनुभव हुआ। उनकी विशेषज्ञता और ध्यान की प्राप्ति से मैं वाकई संतुष्ट हूँ।', 1, '2026-07-02 06:30:44'),
(52, 6, 'Google Reviewer', NULL, NULL, 5, 'National Hospital provided excellent Laparoscopic Surgery. The best Surgery Hospital in Rewa! Staff were knowledgeable and caring.', 1, '2026-07-02 06:31:42'),
(53, 6, 'Google Reviewer', NULL, NULL, 5, 'National Hospital provided top-notch care during my general surgery. The staff was professional and attentive throughout the entire process. Highly satisfied with the service!', 1, '2026-07-02 06:48:48'),
(54, 8, 'Google Reviewer', NULL, NULL, 5, 'Dr Pooja Gangwar Patel is the best gynecologist in Rewa. Very helpful during my pregnancy care! Will definitely be back for future appointments.', 1, '2026-07-02 06:50:03'),
(55, 8, 'Google Reviewer', NULL, NULL, 5, 'Dr Pooja Gangwar Patel provides exceptional pregnancy care and professional advice. The best gynecologist in Rewa for sure! Great experience overall.', 1, '2026-07-02 06:50:08'),
(56, 8, 'Google Reviewer', NULL, NULL, 5, 'Dr Pooja Gangwar Patel was a lifesaver during my pregnancy. Her expert care, advice, and warmth made the whole experience stress-free and comforting!', 1, '2026-07-02 06:51:51'),
(57, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein treatment bahut accha tha. Laparoscopic surgery ke liye experienced doctor available hai aur IVF treatment bhi best hai Jabalpur mein. Highly satisfied with the services provided!', 1, '2026-07-02 07:32:12'),
(58, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein treatment bahut accha tha. Laparoscopic surgery experience bhi kafi acha tha aur doctor bahut experienced the. Best IVF treatment in Jabalpur mila. Highly satisfied!', 1, '2026-07-02 07:32:57'),
(59, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein bahut accha experience tha. Laparoscopic Surgery aur IVF treatment ke liye yahan aaya tha aur staff bahut supportive aur professional the. Satisfied with the services provided.', 1, '2026-07-02 07:35:40'),
(60, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein bahut accha experience tha. Laparoscopic Surgery aur IVF treatment ke liye yahan aaya tha aur staff bahut supportive aur professional the. Satisfied with the services provided.', 1, '2026-07-02 07:35:43'),
(61, 1, 'Anjli Jain', '9131940488', 'anjlijain1998@gmail.com', 3, 'Me Anjli jain meri sadi ko 10 sal ho gaye the mere bachhe nai the phir mene Dr Archana mam ki dikhaya ab me pregnent hu Archana  mam ka treatment best hai', 0, '2026-07-02 10:31:17'),
(62, 6, 'Google Reviewer', NULL, NULL, 5, 'National Hospital में Cancer Surgery का treatment कराया और मुझे इनकी services से बहुत खुशी हुई। सबसे Best Surgery Hospital in Rewa के रूप में National Hospital का नाम सच में उचित है।', 1, '2026-07-03 06:00:59'),
(63, 8, 'Google Reviewer', NULL, NULL, 5, 'डॉक्टर पूजा गंगवार पटेल के साथ मेरा नॉर्मल डिलीवरी का अनुभव बहुत अच्छा रहा। उन्होंने मुझे बहुत साथीपूर्ण और सहानुभूति से समर्थन दिया। यहाँ का अनुभव उत्कृष्ट था।', 1, '2026-07-03 06:03:43'),
(64, 7, 'Kootri Rajesh', '7049622421', 'rajeshnambiar2282@gmail.com', 1, 'Very good ', 0, '2026-07-03 09:00:30'),
(65, 7, 'Hafeez Mohammad ', '9630064433', 'mdhafeezk99@gmail.com', 3, 'Just ok', 0, '2026-07-03 09:43:58'),
(66, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein treatment bahut hi achha tha. Best IVF doctor in Jabalpur aur best IVF treatment mili. Satisfied with the services provided.', 1, '2026-07-06 07:20:22'),
(67, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein treatment bahut hi accha tha. Dr. Pluro Jabalpur Fertility and IVF Centre ne best IVF treatment diya. Highly satisfied with the services provided.', 1, '2026-07-06 09:50:29'),
(68, 1, 'Google Reviewer', NULL, NULL, 5, 'I truly believe that Dr. Archana Shrivastava and her fertility center are among the best. Dr. Archana’s experience, expertise, and compassionate approach make all the difference.\n\nI can’t even put into words how much we went through during this journey. There were so many challenges and emotional moments, but throughout it all, ma’am was always there to support and guide us. The way she counsels and reassures her patients is truly remarkable. Her positive energy is so comforting that it naturally fills you with hope and confidence.\n\nToday, I received my positive pregnancy result, and I simply cannot express the happiness I feel. This moment wouldn’t have been possible without Dr. Archana and her incredible team.\n\nThank you so much, ma’am, and thank you to everyone at the fertility center for making our dream come true. I will always be grateful. ❣️🧿', 1, '2026-07-06 10:10:35'),
(69, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre ka IVF treatment bahut accha tha. Best IVF doctor in Jabalpur aur best IVF treatment experience yahan mila. Staff helpful tha, overall experience accha raha. Highly recommend!', 1, '2026-07-06 10:19:55'),
(70, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre ka IVF treatment bahut accha tha. Best IVF doctor in Jabalpur aur best IVF treatment experience yahan mila. Staff helpful tha, overall experience accha raha. Highly recommend!', 1, '2026-07-06 10:19:58'),
(71, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital provided excellent emergency treatment and diagnostic services. The medical team was highly professional and the facility offered trusted healthcare in Jabalpur!', 1, '2026-07-06 12:37:48'),
(72, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital mein treatment bohot accha hai. 24×7 Emergency Support aur Advanced Medical Services kaafi helpful hain. Highly recommend!', 1, '2026-07-08 07:07:35'),
(73, 7, 'Sourabh Vishwakarma', '9806488206', 'vishwakarmasourabh61@gmail.com', 3, 'Please improve the hygiene in the hospital rooms. The cleanliness is not up to the mark, and the AC is not working properly. However, the other services are good and the staff is supportive.', 0, '2026-07-08 11:44:10'),
(74, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein treatment bohot accha tha. Laparoscopic surgery ke liye experienced doctor se mila, trusted IVF centre hai yahan. Best fertility care milti hai yahan, bohot satisfied hoon. Highly recommend!', 1, '2026-07-10 08:37:12'),
(75, 1, 'Google Reviewer', NULL, NULL, 5, 'I got the best success in looking at myself in the first attempt  Pluro Jabalpur Fertility and IVF Centre provided top-notch care during my fertility treatment. The staff was friendly and knowledgeable, making the whole experience much easier. Will definitely come back if needed in the future!', 1, '2026-07-11 06:02:24'),
(76, 1, 'Google Reviewer', NULL, NULL, 5, ' I got success when I showed it to Jabalpur Fertility Centre for the first time   Pluro Jabalpur Fertility and IVF Centre exceeded my expectations with their top-notch gynecology treatment and expert laparoscopic surgery. Truly the best IVF doctor in Jabalpur! The staff is incredibly knowledgeable and caring.\nBest doctor in jabalpur .......❤️❤️❤️', 1, '2026-07-11 06:09:29'),
(77, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bohot sahi raha. Pregnancy care aur experienced doctor ne mujhe bahut accha feel karwaya. Best gynecologist in Jabalpur ke liye yahan jarur jaayein!', 1, '2026-07-11 09:19:05'),
(78, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bohot sahi raha. Pregnancy care aur experienced doctor ne mujhe bahut accha feel karwaya. Best gynecologist in Jabalpur ke liye yahan jarur jaayein!', 1, '2026-07-11 09:19:06'),
(79, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bohot sahi raha. Pregnancy care aur experienced doctor se mila, best gynecologist in Jabalpur. Bahut khush hoon! highly recommend.', 1, '2026-07-11 09:20:52'),
(80, 7, 'Google Reviewer', NULL, NULL, 4, 'Jabalpur Hospital provided excellent care during my recent visit. The experienced doctors and efficient diagnostic services made my treatment process smooth and effective. Highly satisfied with the trusted healthcare service.', 1, '2026-07-12 06:04:57'),
(81, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein treatment bohot accha tha. Laparoscopic surgery ke liye experienced doctor se mila aur IVF treatment bhi top-notch thi. Highly satisfied with the services provided here.', 1, '2026-07-13 07:50:30'),
(82, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital mein treatment lene ka experience bohot accha raha. Emergency ke waqt sabhi staff ki service bhi bahut impressive thi. Zaroor suggest karunga!', 1, '2026-07-13 09:59:13'),
(83, 7, 'Aishwarya Rai ', '9131754208', 'sweetaish28@gmail.com', 1, 'The manager admitted the patient by lying that private beds are available for treatment.\nHe disguised us and wasted our treatment time.\n', 0, '2026-07-13 17:34:02'),
(84, 7, 'Google Reviewer', NULL, NULL, 5, 'जबलपुर हॉस्पिटल में मैंने एक हेल्थ चेकअप कराया था। सारे मेडिकल टीम का व्यवहार बहुत प्रोफेशनल था। मुझे यहाँ की सेवाएँ बहुत अच्छी लगीं।', 1, '2026-07-14 05:21:10'),
(85, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital provided excellent surgery treatment with an experienced medical team. The 24x7 emergency support was a huge relief during a stressful time. Grateful for their trusted healthcare service!\n\nWe were privileged to have Dr. Sangeeta Shrivastava as our treating doctor. She is very humble, caring and an excellent surgeon.\nWe would also like to thank Dr. Deepali Dr. Renuka,.\n\nAlso the nursing staff was quite cooperative, energetic and provided good mental support to our patient. Special mention to sister Shikha, Bhumi, Pushpa and others.\n\nAlso the cleanliness staff was very cooperative and available always at our service.\nA special thanks to the hospital management for providing good doctors, staff and overall support', 1, '2026-07-14 08:27:42'),
(86, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre provides top-notch IVF treatment. The best IVF doctor in Jabalpur leads the team. Very satisfied with the service!', 1, '2026-07-14 09:32:20'),
(87, 7, 'Akash Deep Rajput ', '8084668981', 'akashdeepika672@gmail.com', 2, 'Hospital very good', 0, '2026-07-15 07:59:51'),
(88, 7, 'Google Reviewer', NULL, NULL, 5, 'जबलपुर हॉस्पिटल में हेल्थ चेकअप के लिए गया था। सर्वश्रेष्ठ सुविधाएँ और चिकित्सकों का अद्वितीय सहयोग मिला। जबलपुर में यह मेडिकल केयर सेंटर सर्वश्रेष्ठ है।', 1, '2026-07-15 08:58:33'),
(89, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bohot sahi raha. IVF Treatment ke liye yahan Best IVF Doctor in Jabalpur hai. Best IVF Treatment in Jabalpur pradan ki gayi. Highly recommend.', 1, '2026-07-16 06:54:43'),
(90, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital provided top-notch medical services with experienced doctors and a professional medical team. The general consultation was thorough and the overall healthcare service was trusted. Will definitely be coming back in the future!', 1, '2026-07-16 08:51:07'),
(91, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre ka treatment bahut accha hai. IVF treatment ke liye yeh definitely ek top choice hai. Staff supportive aur experienced hai. Highly recommend!', 1, '2026-07-17 09:52:23'),
(92, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital provided excellent general consultation and emergency treatment. The 24x7 emergency support was a lifesaver. Great staff and trusted healthcare facility in Jabalpur!', 1, '2026-07-17 11:57:24'),
(93, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital ka surgery treatment bohot accha tha. Best hospital in Jabalpur hai. Highly recommend karunga.', 1, '2026-07-17 12:09:21'),
(94, 7, 'Google Reviewer', NULL, NULL, 5, 'जबलपुर अस्पताल में मैंने एक सामान्य परामर्श प्राप्त किया। जबलपुर में सर्वश्रेष्ठ अस्पताल मिला। एहसास कुछ खास था।', 1, '2026-07-18 12:28:25'),
(95, 7, 'Google Reviewer', NULL, NULL, 5, 'जबलपुर हॉस्पिटल की सेवाओं के लिए मैं पूरा भरोसा कर सकता हूँ। हेल्थ चेकअप के लिए यहाँ आने पर मुझे बहुत अच्छा अनुभव हुआ। 24×7 इमरजेंसी सपोर्ट उचित और सहायक है।', 1, '2026-07-19 06:33:45'),
(96, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital provided excellent Surgery Treatment with experienced doctors and a professional medical team. The staff was attentive and caring throughout my entire stay.', 1, '2026-07-19 18:03:13'),
(97, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital provides top-notch emergency treatment with experienced doctors and advanced medical services! The 24x7 emergency support is a lifesaver.', 1, '2026-07-19 18:15:32'),
(98, 7, 'Rohit singh', '6260498905', 'rohitt.singhh12@gmail.com', 2, 'Worst management. Also if u come to the hospital please come with the attender who stand in long queue for opd cash payment counter. And atleast 3-4 hr will takes inthe hospital.', 0, '2026-07-20 08:00:25'),
(99, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein treatment bahut achha tha. Dr. Singh ne IVF process ke baare mein sab samjha diya aur supportive rahe. Highly satisfied with the services.', 1, '2026-07-20 10:47:28'),
(100, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein treatment bahut behtareen tha. Doctor ne best IVF treatment diya. Highly satisfied!', 1, '2026-07-20 10:52:43'),
(101, 7, 'Google Reviewer', NULL, NULL, 5, 'जबलपुर हॉस्पिटल में आपकी जल्दी से उपचार मिलता है। जबलपुर में भरोसेमंद स्वास्थ्य सुविधाएं हैं। यहाँ की सेवाओं पर पूरा भरोसा किया जा सकता है।', 1, '2026-07-21 09:19:47'),
(102, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital mein treatment lene ka experience bohot accha raha. Experienced doctors aur professional medical team ne mujhe trustworthy healthcare service di. Diagnostic services aur surgery treatment bhi top-notch the. Highly recommend!', 1, '2026-07-21 09:49:10'),
(103, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital provides exceptional Specialist Consultation services in Jabalpur. The healthcare facility is reliable and the staff are highly professional. Great experience overall!', 1, '2026-07-21 12:27:13'),
(104, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital provides exceptional Specialist Consultation services in Jabalpur. The healthcare facility is reliable and the staff are highly professional. Great experience overall!', 1, '2026-07-21 12:27:59'),
(105, 7, 'Brijesh', '9300217211', 'brijesh72@gmail.com', 3, 'Services are needed to be improved as we were not satisfied by the service of the staff and other', 0, '2026-07-21 13:34:03'),
(106, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein treatment bahut hi accha tha. Doctor aur staff bahut supportive the. Satisfied with the services provided.', 1, '2026-07-22 06:38:02'),
(107, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre provided excellent care during my laparoscopic surgery. The staff was professional and attentive throughout the entire process. Highly satisfied with the service!', 1, '2026-07-22 06:51:36'),
(108, 7, 'Google Reviewer', NULL, NULL, 5, 'जबलपुर अस्पताल में मेरा अनुभव बहुत अच्छा रहा। यहाँ की सेवाएँ उत्कृष्ट हैं और विशेषज्ञ डॉक्टर्स ने मुझे बहुत अच्छा इलाज दिया। मैं यहाँ आने की सलाह देता हूँ।', 1, '2026-07-22 07:39:34'),
(109, 7, 'Shrikant Singh ', '6260303344', 'ks441726@gmail.com', 1, 'Good treatment ', 0, '2026-07-22 08:39:50'),
(110, 7, 'Google Reviewer', NULL, NULL, 4, 'Jabalpur Hospital में मेरा सर्जरी इलाज हुआ। अनुभवी डॉक्टर्स ने मुझे विश्वास दिलाया। भरोसे की योग्य सेवा।', 1, '2026-07-22 09:42:11'),
(111, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bohot sahi raha. IVF treatment ke liye yahan best doctor hai aur treatment bhi best hai. Highly recommend.', 1, '2026-07-22 09:44:56'),
(112, 7, 'Google Reviewer', NULL, NULL, 4, 'जबलपुर हॉस्पिटल ने मुझे आपातकालीन उपचार के लिए 24×7 एमर्जेंसी सपोर्ट दिया। मैं इस विश्वसनीय हेल्थकेयर सेवा पर पूरा विश्वास कर सकता हूँ।', 1, '2026-07-22 10:49:43'),
(113, 7, 'Google Reviewer', NULL, NULL, 5, 'जबलपुर अस्पताल में मेरे एमर्जेंसी उपचार का अनुभव बहुत अच्छा रहा। वहाँ के उन्नत चिकित्सा सेवाएँ और पेशेवर चिकित्सा टीम ने मुझे पूरी तरह से संतुष्ट किया।', 1, '2026-07-22 11:10:46'),
(114, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital ka treatment bohot accha tha. Trusted healthcare facility hai Jabalpur mein. Emergency treatment ke liye yahan par jarur ja sakte hain. Highly recommend!', 1, '2026-07-22 11:14:21'),
(115, 7, 'Geetansh jain', '9630628115', 'jainkavya81@gmail.com', 2, 'Wonderful ', 0, '2026-07-22 12:30:08'),
(116, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital provided excellent emergency treatment, truly the best hospital in Jabalpur. Trusted healthcare service all around! Staff were professional and caring. CCU staff are very caring and coperative sister kanchan and riya sanjana incharge tanzema', 1, '2026-07-22 13:48:06'),
(117, 7, 'Google Reviewer', NULL, NULL, 5, 'जबलपुर अस्पताल ने मुझे आपातकालीन उपचार में सर्वश्रेष्ठ सहायता दी। जबलपुर में सर्वश्रेष्ठ अस्पताल की सेवाएँ यहाँ उपलब्ध हैं। उनके साथ अच्छा अनुभव रहा।meri nani admit thi dr bhavik  dhirawani sir k under me undone bilkul achha kar diya bahut achhe Dr hai mai to yahi boluga sir k Jaisa pure jabalpur me koi Dr nahisir aapki team bhi ek no hai or aap bhi ek no always Allah bless you sir🙏🙏🙏', 1, '2026-07-22 19:08:41'),
(118, 7, 'Google Reviewer', NULL, NULL, 5, 'जबलपुर अस्पताल ने मुझे आपातकालीन उपचार में सर्वश्रेष्ठ सहायता दी। जबलपुर में सर्वश्रेष्ठ अस्पताल की सेवाएँ यहाँ उपलब्ध हैं। उनके साथ अच्छा अनुभव रहा।meri nani admit thi dr bhavik  dhirawani sir k under me undone bilkul achha kar diya bahut achhe Dr hai mai to yahi boluga sir k Jaisa pure jabalpur me koi Dr nahisir aapki team bhi ek no hai or aap bhi ek no always Allah bless you sir🙏🙏🙏', 1, '2026-07-22 19:18:22'),
(119, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital provided excellent emergency treatment. The best hospital in Jabalpur for trusted healthcare services. Staff was caring and efficient.  Incharge tanzima staff kanchan riya sanjana CCU staff ', 1, '2026-07-23 07:35:50'),
(120, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital provided top-notch experience for my 1st baby\'s delivery with experienced doctors and a professional medical team. The staff was caring and attentive throughout my entire stay. Special kudos to Richa ma\'am & hospitality staff', 1, '2026-07-23 08:22:00'),
(121, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital provided excellent surgery treatment with experienced doctors and 24x7 emergency support. The medical team was professional and the advanced medical services were top-notch. Keep it up!', 1, '2026-07-23 09:03:35'),
(122, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital mein bahut accha experience tha. Best Hospital in Jabalpur hai aur consultation bhi bahut achha mila. Zaroor recommend karunga!', 1, '2026-07-23 09:25:08'),
(123, 7, 'Google Reviewer', NULL, NULL, 4, 'Jabalpur Hospital provided excellent General Consultation services. The staff was knowledgeable and caring. Truly a trusted healthcare facility in Jabalpur!', 1, '2026-07-23 09:35:15'),
(124, 7, 'Google Reviewer', NULL, NULL, 5, 'जबलपुर हॉस्पिटल में सामान्य परामर्श के लिए गया था। यहाँ की सुविधाएँ बेहतरीन थीं। जबलपुर में सबसे अच्छा अस्पताल है।', 1, '2026-07-23 10:31:57'),
(125, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital में मेरा अनुभव बहुत अच्छा रहा। यहाँ की सेवाएँ उत्कृष्ट हैं और डॉक्टर्स अनुभवी हैं। मैं यहाँ आने की सलाह देता हूँ।', 1, '2026-07-23 10:37:21'),
(126, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital provided excellent general consultation services. The staff was knowledgeable and caring. Highly satisfied with the experience!', 1, '2026-07-23 11:16:21'),
(127, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital provided excellent general consultation services. The staff was knowledgeable and caring. Highly satisfied with the experience!', 1, '2026-07-23 11:16:31'),
(128, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital provided excellent general consultation services. The staff was knowledgeable and caring. Highly satisfied with the experience!', 1, '2026-07-23 11:16:34'),
(129, 7, 'Google Reviewer', NULL, NULL, 4, 'Jabalpur Hospital provides excellent emergency treatment and is a trusted healthcare facility in Jabalpur. The staff are caring and attentive, making the overall experience positive. Will definitely be returning!', 1, '2026-07-23 11:28:05'),
(130, 7, 'Google Reviewer', NULL, NULL, 4, 'Jabalpur Hospital provided excellent surgical treatment. It is a trusted healthcare facility in Jabalpur with a professional and caring medical team. I would definitely choose this hospital again for any future medical needs.\n\nSuggestions for improvement:\n\n- Please install soap dispensers in the bathrooms to improve hygiene.\n- For patients using insurance, medicines should be provided directly by the hospital staff. Currently, patients have to get a stamp from a crowded counter and then collect their medicines from the ground floor, which is inconvenient. Simplifying this process would greatly improve the patient experience.', 1, '2026-07-23 11:44:52'),
(131, 7, 'Google Reviewer', NULL, NULL, 4, 'Jabalpur Hospital provided excellent surgical treatment. It is a trusted healthcare facility in Jabalpur with a professional and caring medical team. I would definitely choose this hospital again for any future medical needs.\n\nSuggestions for improvement:\n\n- Please install soap dispensers in the bathrooms to improve hygiene.\n- For patients using insurance, medicines should be provided directly by the hospital staff. Currently, patients have to get a stamp from a crowded counter and then collect their medicines from the ground floor, which is inconvenient. Simplifying this process would greatly improve the patient experience.', 1, '2026-07-23 11:45:21'),
(132, 7, 'Google Reviewer', NULL, NULL, 5, 'जबलपुर हॉस्पिटल एक सर्जरी उपचार केंद्र है जो 24×7 आपातकालीन समर्थन प्रदान करता है। मुझे यहाँ की चिकित्सा सेवाएँ बहुत अच्छी लगीं।', 1, '2026-07-23 11:50:53'),
(133, 7, 'Abhay', NULL, 'vickeypatel135@gmail.com', 1, 'Neglance not satisfied with the services . ', 0, '2026-07-23 11:57:48'),
(134, 7, 'Pushkar ', NULL, 'usualhacking@gmail.com', 1, 'Negligence not satisfied with the service \nIt\'s been more than 3 days but doctor haven\'t come the patient need neurosurgeon but he has not visited after multiple requests and the answer from the staff was not satisfactory ', 0, '2026-07-23 11:58:25'),
(135, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital ne mujhe excellent medical care di, experienced doctors aur professional medical team ke saath. 24x7 emergency support available hai aur surgery treatment bhi top-notch hai. Overall, Jabalpur Hospital trusted healthcare service provide karta hai.', 1, '2026-07-24 07:36:35'),
(136, 7, 'Bindu Jaiswal', '8269415584', 'bindujaiswal508@gmail.com', 2, 'Best hospital in jabalpur', 0, '2026-07-24 08:08:35'),
(137, 7, 'Yasmin Khan', '9981961801', 'yk6979236@gmail.com', 3, 'Sisters and staff all was very helpful', 0, '2026-07-24 08:24:57'),
(138, 7, 'Pushkar Agarwal', NULL, 'usualhacking@gmail.com', 1, 'Worst hospital in jabalpur ', 0, '2026-07-24 09:33:25'),
(139, 7, 'Google Reviewer', NULL, NULL, 5, 'बहुत ही अच्छी सुविधाएँ और अनुभवी डॉक्टर। जबलपुर हॉस्पिटल में सर्जरी उपचार के लिए सर्वश्रेष्ठ विकल्प है। यहाँ की मेडिकल सेवाएँ उच्च स्तरीय हैं।', 1, '2026-07-24 10:21:14'),
(140, 7, 'Google Reviewer', NULL, NULL, 4, 'जबलपुर हॉस्पिटल में मैंने एक सामान्य परामर्श पाया। यहाँ की चिकित्सा सुविधाएँ बेहतरीन हैं और डॉक्टर्स अनुभवी हैं। 24x7 इमरजेंसी सपोर्ट और उन्नत चिकित्सा सेवाएँ उपलब्ध हैं।', 1, '2026-07-24 10:56:10'),
(141, 7, 'Google Reviewer', NULL, NULL, 4, 'जबलपुर हॉस्पिटल में मैंने एक सामान्य परामर्श पाया। यहाँ की चिकित्सा सुविधाएँ बेहतरीन हैं और डॉक्टर्स अनुभवी हैं। 24x7 इमरजेंसी सपोर्ट और उन्नत चिकित्सा सेवाएँ उपलब्ध हैं।', 1, '2026-07-24 10:56:11'),
(142, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital mein treatment bahut achha mila. Staff bahut helpful aur caring the. Satisfied with the service.', 1, '2026-07-24 11:50:17'),
(143, 7, 'Shafik Ahmad', NULL, 'shafikahmad11078@gmail.com', 2, 'Ok', 0, '2026-07-24 13:24:20'),
(144, 7, 'Google Reviewer', NULL, NULL, 4, 'Jabalpur Hospital provided good inpatient care. Trusted healthcare facility in Jabalpur with good medical services!', 1, '2026-07-24 13:49:48'),
(145, 7, 'Google Reviewer', NULL, NULL, 4, 'Jabalpur Hospital offers exceptional inpatient care. Trusted healthcare service in Jabalpur! Staff was caring and attentive.', 1, '2026-07-25 06:31:42'),
(146, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital provided top-notch surgery treatment. Trusted healthcare service in Jabalpur. Very satisfied with the care received.', 1, '2026-07-25 08:01:50'),
(147, 7, 'Google Reviewer', NULL, NULL, 5, 'जबलपुर हॉस्पिटल में एक सामान्य परामर्श के लिए गया था। यहाँ की सेवाएँ शानदार थीं और जबलपुर में सर्वश्रेष्ठ हॉस्पिटल के रूप में परिचित हो। यहाँ की सुविधाएँ उत्कृष्ट थीं।', 1, '2026-07-25 09:09:17'),
(148, 7, 'Google Reviewer', NULL, NULL, 4, 'Jabalpur Hospital provided excellent emergency treatment with experienced doctors and trusted healthcare service. The staff was compassionate and knowledgeable, making me feel well taken care of during my visit.', 1, '2026-07-25 09:49:23'),
(149, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital mein treatment bohot accha mila. Best Hospital in Jabalpur. Highly satisfied!', 1, '2026-07-25 10:10:02'),
(150, 7, 'Moshmi Patel', '8817891752', 'patelmoshmi1@gmail.com', 2, 'Yas', 0, '2026-07-25 13:34:35'),
(151, 7, 'Ravi verma', '8770040690', 'dr.ravi.medico@gmail.com', 2, 'Good treatment ', 0, '2026-07-26 07:53:17'),
(152, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital provided excellent surgery treatment. The staff were attentive and professional, making it the best hospital in Jabalpur for a reason! Great experience overall.', 1, '2026-07-26 09:56:13'),
(153, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital provided top-notch surgery treatment. Best hospital in Jabalpur. Staff was incredibly caring and professional. Great experience overall!', 1, '2026-07-26 09:57:37'),
(154, 7, 'Google Reviewer', NULL, NULL, 4, 'Jabalpur Hospital provided top-notch surgery treatment with experienced doctors and advanced medical services. The professional medical team ensured I received the best care possible!', 1, '2026-07-26 10:19:24'),
(155, 7, 'Google Reviewer', NULL, NULL, 5, 'जबलपुर हॉस्पिटल में सर्जरी इलाज की बहुत अच्छी सेवा मिली। अनुभवी डॉक्टर्स और पेशेवर मेडिकल टीम ने मुझे बहुत अच्छा इलाज दिया। मैं यहाँ आने की सलाह देता हूँ।', 1, '2026-07-26 11:08:50'),
(156, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein treatment bahut hi accha tha. Laparoscopic Surgery aur IVF services ke liye yahan par visit kiya aur mujhe bahut achhi care mili. Highly satisfied with the services provided!', 1, '2026-07-27 06:03:34'),
(157, 7, 'Google Reviewer', NULL, NULL, 4, 'जबलपुर हॉस्पिटल में मैंने एक सामान्य परामर्श के लिए जाना था। यहाँ की सेवाएँ उत्कृष्ट थीं और 24x7 आपातकालीन समर्थन मिलने के साथ, विश्वसनीय स्वास्थ्य सेवा प्रदान की जाती है। जबलपुर हॉस्पिटल को मैं पूरी तरह से भरोसा कर सकता हूँ।', 1, '2026-07-27 07:09:59'),
(158, 7, 'Google Reviewer', NULL, NULL, 5, 'जबलपुर हॉस्पिटल में मेरा अनुभव बहुत अच्छा रहा। सामान्य परामर्श के लिए बेस्ट हॉस्पिटल है यह। जबलपुर में सर्वश्रेष्ठ हॉस्पिटल की भावना यहाँ जरूर मिलती है।', 1, '2026-07-27 07:43:23'),
(159, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital provides exceptional care and has a highly skilled medical team. The service here is top-notch! Will definitely come back if needed.', 1, '2026-07-27 09:41:30'),
(160, 7, 'Sooraj gupta', '8839955465', 'sooraj.jbp29@gmail.com', 3, 'Nice treatment ', 0, '2026-07-27 11:31:33'),
(161, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital mein treatment bohot accha mila. Doctors ka approach bhi professional tha. Satisfied hoon, zaroor recommend karunga.', 1, '2026-07-28 06:01:53'),
(162, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein treatment bahut accha tha. Laparoscopic surgery ke liye experienced doctor se mila aur best fertility care mili. Highly recommend karunga!', 1, '2026-07-28 07:41:46'),
(163, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein treatment bahut accha tha. Laparoscopic surgery ke liye experienced doctor se mila aur best fertility care mili. Highly recommend karunga!', 1, '2026-07-28 07:41:49'),
(164, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital provided prompt emergency treatment and specialist consultation. Experienced doctors and 24x7 emergency support make it a trusted healthcare facility in Jabalpur! Highly satisfied with the service.', 1, '2026-07-28 07:51:08'),
(165, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital में मैंने एक सामान्य परामर्श प्राप्त किया। यहाँ की सेवाएँ बहुत भरोसे के हैं। जबलपुर में सर्वश्रेष्ठ अस्पताल है।', 1, '2026-07-28 09:23:33'),
(166, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital provided top-notch healthcare services! The staff was friendly and the medical treatment was exceptional. Truly grateful for their expertise!', 1, '2026-07-28 13:13:26'),
(167, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital provides excellent emergency treatment and specialist consultation. The professional medical team offers trusted healthcare services with 24x7 emergency support. The health checkup was thorough and reassuring.', 1, '2026-07-28 13:35:54'),
(168, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital provides excellent health checkup and surgical treatment services. The diagnostic services are top-notch, and the inpatient care is exceptional!', 1, '2026-07-28 13:45:35'),
(169, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital provides excellent health checkup and surgical treatment services. The diagnostic services are top-notch, and the inpatient care is exceptional!', 1, '2026-07-28 13:46:02'),
(170, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital mein treatment bohot accha tha, inpatient care bhi top-notch thi. Best hospital in Jabalpur for sure! Highly recommend.', 1, '2026-07-28 14:12:51'),
(171, 6, 'Vikash patel ', '9993683509', 'vikashpatel05549@gmail.com', 3, 'Good hospital', 0, '2026-07-29 07:23:18'),
(172, 8, 'Google Reviewer', NULL, NULL, 5, 'Dr Pooja Gangwar Patel ने मेरी प्रेग्नेंसी केयर और नॉर्मल डिलीवरी में मदद की। उनकी जानकारी और सेवा मुझे बहुत पसंद आई। उनके साथ जानकारी लेने में मुझे कोई भी दिक्कत नहीं आई। धन्यवाद।', 1, '2026-07-29 07:24:06'),
(173, 8, 'Google Reviewer', NULL, NULL, 5, 'डॉक्टर पूजा गंगवार पटेल की प्रेग्नेंसी केयर के लिए मैंने अनुभव किया। वे अत्यधिक अनुभवी डॉक्टर हैं जो पेशेवर सलाह देती हैं। मेरा अनुभव उत्कृष्ट रहा और वे बहुत मददगार थीं।', 1, '2026-07-29 07:25:29'),
(174, 6, 'Google Reviewer', NULL, NULL, 5, 'नेशनल हॉस्पिटल में मेरा डिलीवरी का अनुभव बेहतरीन रहा। अनुभवी डॉक्टर्स और उत्कृष्ट देखभाल से मुझे यहाँ पर विश्वास हुआ।', 1, '2026-07-29 07:29:27'),
(175, 6, 'Google Reviewer', NULL, NULL, 5, 'नेशनल हॉस्पिटल में मेरे साथ कैंसर सर्जरी की सेवा बेहतर रही। यहाँ की लेपरोस्कोपिक सर्जरी और जनरल सर्जरी की व्यवस्था बेहद प्रोफेशनल थी। रीवा में सर्वश्रेष्ठ संबोधन और उत्तम मर्जी की सुविधा मिली। सेवाओं पर पूरा भरोसा किया जा सकता है।', 1, '2026-07-29 07:31:01'),
(176, 7, 'Google Reviewer', NULL, NULL, 5, 'जबलपुर हॉस्पिटल में मेरी बच्ची का जन्म हुआ और मैं बहुत संतुष्ट हूँ। यहाँ के अनुभवी डॉक्टर्स और डॉ. प्रज्ञा मैडम का बहुत धन्यवाद करता हूं मैं और मुझे विश्वास दिलाया कि मैं सही हाथों में हूँ। यह जबलपुर का सर्वश्रेष्ठ हॉस्पिटल है।', 1, '2026-07-29 08:12:25'),
(177, 7, 'Google Reviewer', NULL, NULL, 4, 'Jabalpur Hospital provided excellent diagnostic services with a trusted healthcare facility in Jabalpur. Very satisfied with the medical care center in Jabalpur! Great experience overall.', 1, '2026-07-29 09:23:45'),
(178, 7, 'Anand Kori', '9340870978', 'ak7084006@gmail.com', 3, 'Excellent service provided by doctor, staff.', 0, '2026-07-29 11:53:13'),
(179, 7, 'Google Reviewer', NULL, NULL, 5, 'जबलपुर हॉस्पिटल ने मेरे लिए बेहतरीन डायग्नोस्टिक सेवाएँ प्रदान की। मुझे वहाँ की सेवाओं पर पूरा भरोसा है। यहाँ आने की सलाह देता हूँ।', 1, '2026-07-29 12:08:07'),
(180, 7, 'Shivam soni ', '9479623386', 'ss9958899@gmail.com', 3, 'Very good ', 0, '2026-07-29 12:48:07'),
(181, 7, 'Ajay Singh', NULL, 'ajaysmarty53@gmail.com', 3, 'Ok services', 0, '2026-07-29 14:17:21'),
(182, 7, 'SANJEEV KUMAR TARAIYA', '9451845120', 'sanjeev.taraiya@gmail.com', 3, 'Dr. नर्स सिस्टर क्लीनिंग स्टाफ very good नेचर', 0, '2026-07-29 15:04:10'),
(183, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital provided excellent care during my surgery treatment. The experienced doctors and professional medical team made me feel confident in their hands. The inpatient care and 24x7 emergency support were top-notch!', 1, '2026-07-30 04:49:42'),
(184, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital provided exceptional inpatient care. The staff at Jabalpur Hospital is exceptionally skilled and compassionate. The trusted healthcare facility in Jabalpur exceeded all my expectations!', 1, '2026-07-30 07:53:19'),
(185, 7, 'Beena jatav', '9165529020', 'bobbybabataxijablpur@gmail.com', 3, 'Theek hai hospital kis vyavasthaen thanks Jabalpur hospital', 0, '2026-07-30 09:39:08'),
(186, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital में मेरा अनुभव बेहतरीन रहा। यहाँ की अस्पतालीय देखभाल बेहद उत्कृष्ट है। मैं यहाँ जाने की सलाह दूँगा।', 1, '2026-07-30 10:00:07'),
(187, 7, 'Savita', '9026791693', 'tanishyadav762@gmail.com', 1, 'Mera naam Savita h mai Jabalpur hospital me chest pain hone per dikhane gayi thi 24july ko admit kiye wha per mera treatment shourabh grover sir kar rhe the unhone mujhe 5 din admit kiye jab meri halat me sudhar nhi huwa to wah mere sath abhadra ka vyavhaar kiye bole yaha juthe. Bimari ka. Bahana karke  padi ho   bimari ko ignore karna chahiye mere husband 5 din se raat bhar wha the ek din k liye Ghar chale gaye mere sath beti thi meri kahne lage beti ko seva me lagayi h inki beti seva me best award payegi wha moujud sabhi nurs or marij hasane lage . Jabalpur hospital me Mera experience bahut hi ghatiya kism ka tha ek dr. Ka farz h ki marij ko apne bato se khush kare na ki usko mansik Tanaav me rakhe ', 0, '2026-07-30 10:00:39'),
(188, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital provided exceptional surgery treatment with experienced doctors and professional medical team. The 24x7 emergency support was a lifesaver! Will definitely come back if needed.', 1, '2026-07-30 11:36:26'),
(189, 9, 'mahak goswami', '7828992266', 'mehakgoswmi@gmail.com', 3, 'Very gooo', 0, '2026-07-31 07:54:32'),
(190, 9, 'Google Reviewer', NULL, NULL, 5, 'बहुत ही उत्कृष्ट अनुभव! लाइफ मेडिसिटी मल्टी स्पेशियलिटी हॉस्पिटल में मैं बहुत संतुष्ट रहा। शायद फिर से लौटूं।', 1, '2026-07-31 07:56:24'),
(191, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital provided excellent service. The staff was attentive and the facility was clean. Very satisfied with my experience!', 1, '2026-07-31 07:57:38'),
(192, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein laparoscopic surgery karwayi. Doctor ka experience dekh kar bharosa badh gaya. Jabalpur mein best laparoscopic surgeon hain yahan par. Highly recommend!', 1, '2026-07-31 08:00:14'),
(193, 7, 'Google Reviewer', NULL, NULL, 5, 'जबलपुर हॉस्पिटल में मेरा अनुभव बहुत अच्छा रहा। यहाँ के डॉक्टर्स अनुभवी और कुशल हैं, और सेवाएँ भी उत्कृष्ट हैं। यहाँ पर मेडिकल केयर केंद्र के रूप में पूर्ण भरोसा किया जा सकता है।', 1, '2026-07-31 11:31:55'),
(194, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital provides excellent medical care with experienced doctors. The staff is friendly and attentive, making the overall experience very positive. Highly satisfied with their services!', 1, '2026-07-31 12:10:32'),
(195, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital provided an excellent health checkup service in Jabalpur. The staff was very friendly and professional. I will definitely be returning in the future.', 1, '2026-08-01 05:54:05'),
(196, 7, 'Ravindra singh', '9424757052', 'ravindrauike65@gmail.com', 2, 'Very god', 0, '2026-08-01 10:29:16'),
(197, 7, 'Google Reviewer', NULL, NULL, 5, 'जबलपुर हॉस्पिटल में अपनी emergency treatment के लिए गया था। वहाँ की ट्रस्टेड हेल्थकेयर फेसिलिटी ने मुझे विश्वास दिलाया कि मैं उन्हें पूरी भरोसा के साथ संक्षिप्त समय में जानबूझकर चुना।', 1, '2026-08-02 13:26:16'),
(198, 7, 'Maya asati', '6263406001', 'priyanceasati@gmail.com', 2, 'No message', 0, '2026-08-03 06:36:40'),
(199, 7, 'Ravindra Jain', '9826480280', 'caravindrajain22@gmail.com', 2, 'Very nice hospital and facilities specially paramedical staff is very good', 0, '2026-08-03 11:50:36'),
(200, 7, 'Google Reviewer', NULL, NULL, 5, 'जबलपुर हॉस्पिटल ने मेरे हेल्थ चेकअप को बहुत अच्छी तरह से आयोजित किया। वहाँ की पेशेवर मेडिकल टीम ने मुझे विश्वास जिता लिया। जबलपुर में यह हॉस्पिटल सर्वश्रेष्ठ है।', 1, '2026-08-03 15:37:40'),
(201, 7, 'Google Reviewer', NULL, NULL, 4, 'जबलपुर हॉस्पिटल में आयुर्वेदिक उपचार की अच्छी सेवा मिली। अनुभवी डॉक्टर्स ने त्वरित चिकित्सा की और मेरी स्थिति में सुधार किया। मैं यहाँ आने की सलाह देता हूँ।', 1, '2026-08-04 09:05:54');
INSERT INTO `reviews` (`id`, `client_id`, `customer_name`, `customer_mobile`, `customer_email`, `rating`, `review`, `is_positive`, `created_at`) VALUES
(202, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital में चिकित्सकों की उत्कृष्ट सेवा से मैं बहुत संतुष्ट हूँ। हाँ, यहाँ की सेवाएँ वाकई अद्वितीय हैं।', 1, '2026-08-04 10:22:01'),
(203, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein laparoscopic surgery karwayi thi, aur mujhe doctor ka experience bohot accha laga. Yahan ka best laparoscopic surgeon Jabalpur mein hai. Highly recommend!', 1, '2026-08-04 10:43:35'),
(204, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein laparoscopic surgery karwayi thi, aur mujhe doctor ka experience bohot accha laga. Yahan ka best laparoscopic surgeon Jabalpur mein hai. Highly recommend!', 1, '2026-08-04 10:43:47'),
(205, 7, 'Dr anil Kumar', '9598610986', 'anilgautam578@gmail.com', 3, 'Ok ok', 0, '2026-08-05 08:26:22'),
(206, 7, 'Google Reviewer', NULL, NULL, 4, 'Jabalpur Hospital का काम सच में लाजवाब है। surgery treatment, health checkup, सर्वश्रेष्ठ hospital in jabalpur, professional medical team के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-08-05 10:41:21'),
(207, 7, 'Google Reviewer', NULL, NULL, 4, 'Jabalpur Hospital का काम सच में लाजवाब है। surgery treatment, health checkup, सर्वश्रेष्ठ hospital in jabalpur, professional medical team के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-08-05 10:41:37'),
(208, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital provided excellent emergency treatment. The staff was professional and caring. Great experience overall!', 1, '2026-08-05 14:17:55'),
(209, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital का काम सच में लाजवाब है। general consultation, emergency treatment, health checkup, specialist consultation, inpatient care, diagnostic सेवाएं, surgery treatment, सर्वश्रेष्ठ hospital in jabalpur, trusted healthcare facility in jabalpur, experienced doctors, advanced medical सेवाएं, 24×7 emergency सहायता, सर्वश्रेष्ठ hospital in jabalpur, medical care center in jabalpur, trusted healthcare service, professional medical team के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-08-05 14:29:53'),
(210, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital का काम सच में लाजवाब है। general consultation, emergency treatment, health checkup, specialist consultation, inpatient care, diagnostic सेवाएं, surgery treatment, सर्वश्रेष्ठ hospital in jabalpur, trusted healthcare facility in jabalpur, experienced doctors, advanced medical सेवाएं, 24×7 emergency सहायता, सर्वश्रेष्ठ hospital in jabalpur, medical care center in jabalpur, trusted healthcare service, professional medical team के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-08-05 14:30:11'),
(211, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital provided excellent emergency treatment when I needed it most. The staff were efficient and caring throughout my entire stay. Very grateful for their exceptional service!', 1, '2026-08-06 05:02:47'),
(212, 7, 'Ram krpal', '7080242250', 'vineetmobilehub@gmail.com', 3, 'Reception all good and all conditions be careful respond all time ', 0, '2026-08-06 10:27:30'),
(213, 7, 'Google Reviewer', NULL, NULL, 4, 'Jabalpur Hospital mein experience bahut accha raha. Emergency Treatment, 24×7 Emergency Support, Professional Medical Team ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-08-06 16:00:49'),
(214, 1, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Pluro Jabalpur Fertility and IVF Centre for Gynecology Treatment, Experienced Doctor, Best Gynecologist in Jabalpur. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-08-07 07:22:17'),
(215, 1, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Pluro Jabalpur Fertility and IVF Centre for Gynecology Treatment, Experienced Doctor, Best Gynecologist in Jabalpur. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-08-07 07:25:25'),
(216, 7, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Jabalpur Hospital for Specialist Consultation, Emergency Treatment, Inpatient Care, Diagnostic Services, Surgery Treatment, Best Hospital in Jabalpur, Trusted Healthcare Facility in Jabalpur, Experienced Doctors, Advanced Medical Services, 24×7 Emergency Support, Best Hospital in Jabalpur, Medical Care Center in Jabalpur, Trusted Healthcare Service, Professional Medical Team. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-08-07 07:37:48'),
(217, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital mein experience bahut accha raha. Specialist Consultation, Inpatient Care, Experienced Doctors, Professional Medical Team ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-08-07 08:41:36'),
(218, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital का काम सच में लाजवाब है। emergency treatment, trusted healthcare facility in jabalpur, medical care center in jabalpur के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-08-07 09:23:42'),
(219, 1, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Pluro Jabalpur Fertility and IVF Centre for Gynecology Treatment, Experienced Doctor, Best Gynecologist in Jabalpur. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-08-07 10:13:11'),
(220, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. IVF Treatment, Best IVF Doctor in Jabalpur, Best IVF Treatment in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-08-07 10:23:41'),
(221, 7, 'Google Reviewer', NULL, NULL, 5, 'Dear Team , your morning , afternoon and night staff is very good , Their behavior, work style, and nature are excellent. They provide great care to the patient and their family, working tirelessly and cheerfully while maintaining professional discipline and upholding the hospital\'s standards. My patient is in Room No. 402.', 1, '2026-08-07 10:29:47'),
(222, 7, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Jabalpur Hospital for Emergency Treatment, Trusted Healthcare Facility in Jabalpur, Trusted Healthcare Service. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-08-07 12:38:01'),
(223, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Laparoscopic Surgery, Experienced Doctor, Best Laparoscopic Surgeon in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-08-08 07:25:52'),
(224, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Laparoscopic Surgery, Experienced Doctor, Best Laparoscopic Surgeon in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-08-08 07:25:57'),
(225, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Laparoscopic Surgery, Experienced Doctor, Best Gynecologist in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-08-08 08:18:37'),
(226, 7, 'Google Reviewer', NULL, NULL, 5, 'Very good ', 1, '2026-08-08 08:52:36'),
(227, 7, 'Google Reviewer', NULL, NULL, 4, 'Jabalpur Hospital का काम सच में लाजवाब है। surgery treatment, experienced doctors, trusted healthcare service के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-08-08 11:38:10'),
(228, 7, 'Google Reviewer', NULL, NULL, 4, 'Jabalpur Hospital का काम सच में लाजवाब है। emergency treatment, trusted healthcare facility in jabalpur, experienced doctors, सर्वश्रेष्ठ hospital in jabalpur, advanced medical सेवाएं, 24×7 emergency सहायता, trusted healthcare service, medical care center in jabalpur के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!\nOverall experience is good.\nBut management work need to improve little more.. Because there is so many communications gap. After all management teem need to be some politely response with the person.\n', 1, '2026-08-08 16:29:37'),
(229, 7, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Jabalpur Hospital for Surgery Treatment, Best Hospital in Jabalpur, Best Hospital in Jabalpur. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-08-09 08:24:53'),
(230, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital का काम सच में लाजवाब है। specialist consultation, general consultation, सर्वश्रेष्ठ hospital in jabalpur, trusted healthcare facility in jabalpur, advanced medical सेवाएं, experienced doctors, 24×7 emergency सहायता, सर्वश्रेष्ठ hospital in jabalpur, trusted healthcare service, medical care center in jabalpur, professional medical team के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-08-09 08:44:11'),
(231, 7, 'Sk Rizwan Kha', '7440333786', 'skrizwankha2@gmail.com', 3, 'I\'m fine ', 0, '2026-08-09 11:47:14'),
(232, 7, 'Ramdas sharma', '9074749999', 'chaitanya29chotu@gmail.com', 1, 'Very bad behaviour staff, cruel doctors, not a good management', 0, '2026-08-09 11:51:14'),
(233, 1, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Pluro Jabalpur Fertility and IVF Centre for IVF Treatment, Best IVF Doctor in Jabalpur, Trusted IVF Centre. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-08-10 09:04:58'),
(234, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. IVF Treatment, Best IVF Doctor in Jabalpur, Best IVF Treatment in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-08-10 09:48:25'),
(235, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. IVF Treatment, Best IVF Doctor in Jabalpur, Best IVF Treatment in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-08-10 09:48:25'),
(236, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. IVF Treatment, Best IVF Doctor in Jabalpur, Best IVF Treatment in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-08-10 09:48:25'),
(237, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. IVF Treatment, Best IVF Doctor in Jabalpur, Best IVF Treatment in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-08-10 09:53:05'),
(238, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Laparoscopic Surgery, Experienced Doctor, Best Fertility Care ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-08-10 10:36:30'),
(239, 7, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Jabalpur Hospital for Health Checkup, Experienced Doctors, Best Hospital in Jabalpur, Best Hospital in Jabalpur. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-08-11 18:03:13'),
(240, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Laparoscopic Surgery, Experienced Doctor, Best Gynecologist in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-08-12 10:27:52'),
(241, 7, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Jabalpur Hospital for Best Hospital in Jabalpur, Best Hospital in Jabalpur. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-08-12 19:16:07'),
(242, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Laparoscopic Surgery, Experienced Doctor, Best Fertility Care ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-08-13 07:36:01'),
(243, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital mein experience bahut accha raha. Diagnostic Services, Trusted Healthcare Facility in Jabalpur, Professional Medical Team ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-08-13 09:20:46'),
(244, 7, 'हरछट बई', '9301605017', 'choudharysavita752@gmail.com', 2, '\n', 0, '2026-08-13 11:03:27'),
(245, 7, 'Google Reviewer', NULL, NULL, 4, 'Really glad I went with Jabalpur Hospital for Emergency Treatment, Health Checkup, Specialist Consultation, Diagnostic Services, Experienced Doctors, Trusted Healthcare Facility in Jabalpur, 24×7 Emergency Support, Professional Medical Team. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-08-13 14:33:19'),
(246, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. IVF Treatment, Best IVF Centre in Jabalpur, Best IVF Doctor in Jabalpur, Best IVF Treatment in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-08-14 07:37:01'),
(247, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. IVF Treatment, Best IVF Doctor in Jabalpur, Best IVF Treatment in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-08-14 07:37:32'),
(248, 7, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Jabalpur Hospital for Diagnostic Services, Surgery Treatment, Inpatient Care, Specialist Consultation, Health Checkup, Emergency Treatment, General Consultation, Best Hospital in Jabalpur, Trusted Healthcare Facility in Jabalpur, Experienced Doctors, Advanced Medical Services, 24×7 Emergency Support, Best Hospital in Jabalpur, Medical Care Center in Jabalpur, Trusted Healthcare Service, Professional Medical Team. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-08-14 08:44:53'),
(249, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Laparoscopic Surgery, Experienced Doctor, Best Gynecologist in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-08-14 09:23:45'),
(250, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Laparoscopic Surgery, Experienced Doctor, Best Laparoscopic Surgeon in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-08-14 09:35:43'),
(251, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Laparoscopic Surgery, Experienced Doctor, Best Fertility Care ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-08-14 09:37:51'),
(252, 7, 'Ritesh kamal tandon', '9425150505', 'riteshpepsi67jbp@gmail.com', 3, 'I kamal tandon was staying in room number 225. The best services done by all staff very good, specially Mr Arvind Yadav suja nayak and Krishna Bhaiya and Bal Mukku Bhaiya, and house keeping female cleaning staff they have done their level best very good staff.', 0, '2026-08-14 10:33:02'),
(253, 7, 'Mohammad muzeeb rayeen ', '9300002012', 'mujeebkhan00002012@gmail.com', 2, ' Verry Good', 0, '2026-08-14 11:38:25'),
(254, 7, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Jabalpur Hospital for Surgery Treatment, Best Hospital in Jabalpur, Professional Medical Team. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-08-15 07:09:50'),
(255, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Laparoscopic Surgery, Best IVF Centre in Jabalpur, Best Laparoscopic Surgeon in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-08-17 07:31:53'),
(256, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Laparoscopic Surgery, Best Fertility Specialist Clinic in Jabalpur, Best Laparoscopic Surgeon in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-08-17 07:34:43'),
(257, 9, 'Google Reviewer', NULL, NULL, 4, 'Really glad I went with Life Medicity Multi Speciality Hospital for Good, Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-08-17 07:57:17'),
(258, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Gynecology Treatment, Experienced Doctor, Best Gynecologist in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-08-17 08:05:20'),
(259, 1, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Pluro Jabalpur Fertility and IVF Centre for IVF Treatment, Fertility Consultation, Low Sperm Count Treatment, Gynecology Treatment, Laparoscopic Surgery, Pregnancy Care, Best IVF Doctor in Jabalpur, Best IVF Centre in Jabalpur, Best Fertility Specialist Clinic in Jabalpur, Experienced Doctor, Best IVF Treatment in Jabalpur, Best Fertility Care, Best Gynecologist in Jabalpur, Best Laparoscopic Surgeon in Jabalpur, Trusted IVF Centre. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-08-17 09:07:41'),
(260, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre का काम सच में लाजवाब है। ivf treatment, fertility consultation, low sperm count treatment, gynecology treatment, laparoscopic surgery, pregnancy care, सर्वश्रेष्ठ ivf doctor in jabalpur, सर्वश्रेष्ठ ivf centre in jabalpur, सर्वश्रेष्ठ fertility specialist clinic in jabalpur, experienced doctor, सर्वश्रेष्ठ ivf treatment in jabalpur, सर्वश्रेष्ठ fertility care, सर्वश्रेष्ठ gynecologist in jabalpur, सर्वश्रेष्ठ laparoscopic surgeon in jabalpur, trusted ivf centre के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-08-17 09:10:00'),
(261, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. IVF Treatment, Best IVF Doctor in Jabalpur, Best IVF Treatment in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-08-17 09:27:29'),
(262, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. IVF Treatment, Best IVF Doctor in Jabalpur, Best IVF Treatment in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-08-17 09:29:19'),
(263, 7, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Jabalpur Hospital for General Consultation, Inpatient Care, Trusted Healthcare Facility in Jabalpur, Experienced Doctors, Trusted Healthcare Service. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-08-17 11:07:13'),
(264, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital का काम सच में लाजवाब है। inpatient care, surgery treatment, diagnostic सेवाएं, specialist consultation, health checkup, emergency treatment, general consultation, सर्वश्रेष्ठ hospital in jabalpur, trusted healthcare facility in jabalpur, experienced doctors, advanced medical सेवाएं, 24×7 emergency सहायता, सर्वश्रेष्ठ hospital in jabalpur, trusted healthcare service, medical care center in jabalpur, professional medical team के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-08-17 15:04:18'),
(265, 9, 'Tamanna shaik ', '9494441738', 'Tshaik33@gmail.com', 3, 'Good staff', 0, '2026-08-18 06:03:03'),
(266, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Fertility Consultation, Pregnancy Care, Best IVF Doctor in Jabalpur, Experienced Doctor, Best Fertility Specialist Clinic in Jabalpur, Best Fertility Care ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-08-18 06:10:50'),
(267, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital का काम सच में लाजवाब है। excellent, satisfied, yes के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-08-18 06:12:12'),
(268, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital mein experience bahut accha raha. Excellent, Very Satisfied, Yes ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-08-18 06:34:47'),
(269, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital mein experience bahut accha raha. Excellent, Satisfied, Yes ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-08-18 06:34:58'),
(270, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-08-18 06:35:12'),
(271, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital mein experience bahut accha raha. Excellent, Satisfied, Yes ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-08-18 06:35:51'),
(272, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Pregnancy Care, Experienced Doctor, Trusted IVF Centre ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-08-18 07:46:45'),
(273, 1, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Pluro Jabalpur Fertility and IVF Centre for Pregnancy Care, Gynecology Treatment, Experienced Doctor, Best Gynecologist in Jabalpur. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-08-18 09:08:33'),
(274, 7, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Jabalpur Hospital for Professional Medical Team. The whole thing was smooth and the team was genuinely helpful. Solid experience. Riya Meena n Krishna helped a lot n support with best care I wish them a great futures ahead❤️', 1, '2026-08-18 11:33:03'),
(275, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-08-18 12:25:11'),
(276, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-08-19 08:05:37'),
(277, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital का काम सच में लाजवाब है। excellent, very satisfied, yes के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-08-19 08:11:20'),
(278, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-08-19 08:16:23'),
(279, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital का काम सच में लाजवाब है। excellent, very satisfied, yes के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-08-19 08:16:52'),
(280, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Neutral, Maybe. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-08-19 08:24:22'),
(281, 9, 'Sheela Kalar', '7440895443', 'sheelakalar143@gmail.com', 3, 'Good acha hospital hai', 0, '2026-08-19 08:38:01'),
(282, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Laparoscopic Surgery, Experienced Doctor, Best Gynecologist in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-08-19 09:52:12'),
(283, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Laparoscopic Surgery, Experienced Doctor, Best Gynecologist in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-08-19 09:53:34'),
(284, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital का काम सच में लाजवाब है। emergency treatment, सर्वश्रेष्ठ hospital in jabalpur, 24×7 emergency सहायता, professional medical team के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-08-19 16:51:20'),
(285, 7, 'Chandan Kumar Singh', '7024127267', 'ckswcr@gmail.com', 3, 'Medicine should be administerd after verifying the prescribed Medicine ', 0, '2026-08-20 09:44:33'),
(286, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Laparoscopic Surgery, Experienced Doctor, Best Laparoscopic Surgeon in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-08-20 09:48:47'),
(287, 1, 'Rumpa sharma', '6205288434', 'gunjan.aptech@gmail.com', 3, 'Very good and satisfied my self ', 0, '2026-08-20 09:50:20'),
(288, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Laparoscopic Surgery, Experienced Doctor, Best Laparoscopic Surgeon in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-08-20 09:50:59'),
(289, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Laparoscopic Surgery, Experienced Doctor, Best Laparoscopic Surgeon in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-08-20 09:53:13'),
(290, 7, 'Parlad Singh maravi ', '7489456596', 'psmaravi02@gmail.com', 2, 'Yas ', 0, '2026-08-20 12:30:06'),
(291, 7, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Jabalpur Hospital for Surgery Treatment, Inpatient Care, Diagnostic Services, Specialist Consultation, General Consultation, Best Hospital in Jabalpur, Trusted Healthcare Facility in Jabalpur, Experienced Doctors, Advanced Medical Services, 24×7 Emergency Support, Best Hospital in Jabalpur. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-08-20 12:31:23'),
(292, 7, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Jabalpur Hospital for Surgery Treatment, Inpatient Care, Diagnostic Services, Specialist Consultation, General Consultation, Best Hospital in Jabalpur, Trusted Healthcare Facility in Jabalpur, Experienced Doctors, Advanced Medical Services, 24×7 Emergency Support, Best Hospital in Jabalpur. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-08-20 12:31:41'),
(293, 7, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Jabalpur Hospital for Surgery Treatment, Inpatient Care, Diagnostic Services, Specialist Consultation, General Consultation, Best Hospital in Jabalpur, Trusted Healthcare Facility in Jabalpur, Experienced Doctors, Advanced Medical Services, 24×7 Emergency Support, Best Hospital in Jabalpur. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-08-20 12:31:51'),
(294, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Laparoscopic Surgery, Best Fertility Specialist Clinic in Jabalpur, Best IVF Treatment in Jabalpur, Best Laparoscopic Surgeon in Jabalpur, Best Gynecologist in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-08-21 07:22:56'),
(295, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Laparoscopic Surgery, Best Fertility Specialist Clinic in Jabalpur, Experienced Doctor, Trusted IVF Centre, Best Laparoscopic Surgeon in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-08-21 07:30:43'),
(296, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Laparoscopic Surgery, Best Fertility Specialist Clinic in Jabalpur, Experienced Doctor, Trusted IVF Centre, Best Laparoscopic Surgeon in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-08-21 07:31:46'),
(297, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Laparoscopic Surgery, Best Fertility Specialist Clinic in Jabalpur, Experienced Doctor, Best Laparoscopic Surgeon in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-08-21 07:32:30'),
(298, 7, 'Google Reviewer', NULL, NULL, 4, 'Jabalpur Hospital का काम सच में लाजवाब है। health checkup, experienced doctors, medical care center in jabalpur के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-08-21 13:55:40'),
(299, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Gynecology Treatment, Experienced Doctor, Trusted IVF Centre ke liye inka kaam sach mein badhiya hai thoda staff ko aur cooperative hone ki jarurat hai jaise “shubhi madam ko “. Next time bhi yehi choice hogi!', 1, '2026-08-22 06:43:23'),
(300, 7, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Jabalpur Hospital for General Consultation, Inpatient Care, Best Hospital in Jabalpur, 24×7 Emergency Support, Best Hospital in Jabalpur. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-08-22 14:33:11'),
(301, 7, 'Google Reviewer', NULL, NULL, 4, 'Really glad I went with Jabalpur Hospital for Specialist Consultation, Trusted Healthcare Facility in Jabalpur, Medical Care Center in Jabalpur. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-08-24 09:29:27'),
(302, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Pregnancy Care, Gynecology Treatment, Experienced Doctor, Best Gynecologist in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-08-25 08:10:16'),
(303, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital का काम सच में लाजवाब है। excellent, satisfied, yes के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-08-25 11:39:32'),
(304, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-08-25 11:46:38'),
(305, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-08-25 11:55:09'),
(306, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-08-25 11:55:31'),
(307, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. IVF Treatment, Gynecology Treatment, Best IVF Doctor in Jabalpur, Best IVF Treatment in Jabalpur, Best Fertility Care, Best Gynecologist in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-08-26 06:37:38'),
(308, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-08-27 05:18:01'),
(309, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Laparoscopic Surgery, Best Fertility Specialist Clinic in Jabalpur, Experienced Doctor, Best IVF Treatment in Jabalpur, Best Laparoscopic Surgeon in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-08-27 08:20:45'),
(310, 1, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Pluro Jabalpur Fertility and IVF Centre for Pregnancy Care, Experienced Doctor, Best Gynecologist in Jabalpur. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-08-27 10:53:24'),
(311, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital का काम सच में लाजवाब है। emergency treatment, सर्वश्रेष्ठ hospital in jabalpur, सर्वश्रेष्ठ hospital in jabalpur के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-08-27 12:42:57'),
(312, 8, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Dr Pooja Gangwar Patel for Normal Delivery, Gynecology Consultation, Women\'s Health Treatment, Best Gynecologist in Rewa, Experienced Doctor, Trusted Pregnancy Care, Excellent Experience, Caring & Supportive, Professional Advice. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-08-27 16:42:54'),
(313, 6, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with National Hospital  for Laparoscopic Surgery, General Surgery, Best Surgery Hospital in Rewa, Cancer Surgery Hospital in Rewa, Laparoscopic Surgery Hospital in Rewa, Best Patient Care, Trusted Healthcare Service. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-08-27 16:43:57'),
(314, 7, 'VIVEK PATEL', '8770059907', 'saivivekpatel1991@gmail.com', 2, 'Apke general ward ka hal chal bahut kharab hai waha ke staff bhe thik nahi khas kar ek doctor jo night duty me tha nam confrm nahi wahi puchne par bataya Abid sayad bilkul bhi bat karne ka tarika nahi na mareej se na samjhane ka tarika.or hamare patient ki tabiyat bhi bigdi thi genaral ward me.\nBit icu section or other doctor jese anoop jain duggal sir nayak sir and icu ke staff are best.but general ward ko sudharo or staff ko tameej sikhao plssss', 0, '2026-08-28 15:57:48'),
(315, 6, 'Google Reviewer', NULL, NULL, 5, 'National Hospital  का काम सच में लाजवाब है। ectopic pregnancy treatment, laparoscopic surgery, सर्वश्रेष्ठ surgery hospital in rewa के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-08-29 07:40:26'),
(316, 6, 'Google Reviewer', NULL, NULL, 5, 'National Hospital  का काम सच में लाजवाब है। सर्वश्रेष्ठ surgery hospital in rewa, experienced doctors, cancer surgery hospital in rewa के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-08-29 07:42:25'),
(317, 8, 'Google Reviewer', NULL, NULL, 5, 'Dr Pooja Gangwar Patel का काम सच में लाजवाब है। infertility treatment, pregnancy care, gynecology consultation, women\'s health treatment, trusted pregnancy care, सर्वश्रेष्ठ gynecologist in rewa के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-08-29 07:43:22'),
(318, 6, 'Google Reviewer', NULL, NULL, 5, 'National Hospital  का काम सच में लाजवाब है। laparoscopic surgery, general surgery, सर्वश्रेष्ठ surgery hospital in rewa, experienced doctors, सर्वश्रेष्ठ patient care के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-08-29 07:45:39'),
(319, 8, 'Google Reviewer', NULL, NULL, 5, 'Dr Pooja Gangwar Patel का काम सच में लाजवाब है। infertility treatment, pregnancy care, women\'s health treatment, सर्वश्रेष्ठ gynecologist in rewa, experienced doctor के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-08-29 07:46:27'),
(320, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital का काम सच में लाजवाब है। surgery treatment, general consultation, emergency treatment, health checkup, specialist consultation, inpatient care, diagnostic सेवाएं, सर्वश्रेष्ठ hospital in jabalpur, trusted healthcare facility in jabalpur, experienced doctors, advanced medical सेवाएं, 24×7 emergency सहायता, सर्वश्रेष्ठ hospital in jabalpur, medical care center in jabalpur, trusted healthcare service, professional medical team के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-08-29 11:12:24'),
(321, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-08-31 06:04:52'),
(322, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Laparoscopic Surgery, Best Fertility Specialist Clinic in Jabalpur, Best Fertility Care ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-08-31 06:56:31'),
(323, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Laparoscopic Surgery, Best Fertility Specialist Clinic in Jabalpur, Best Gynecologist in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-08-31 07:45:20'),
(324, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Laparoscopic Surgery, Best Fertility Specialist Clinic in Jabalpur, Best Fertility Care ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-09-01 07:59:55'),
(325, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. IVF Treatment, Best IVF Doctor in Jabalpur, Best IVF Treatment in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-09-01 09:00:22'),
(326, 7, 'Mrs kasturi jhariya ', '9406760188', 'kirtijhariya49@gmail.com', 3, 'Best hospital 🏥 and bast staff and hdu facilities and good 😊', 0, '2026-09-01 09:48:11'),
(327, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Pregnancy Care, Laparoscopic Surgery, Gynecology Treatment, Best Fertility Specialist Clinic in Jabalpur, Best Gynecologist in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-09-01 10:00:32'),
(328, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Pregnancy Care, Laparoscopic Surgery, Gynecology Treatment, Best Fertility Specialist Clinic in Jabalpur, Best Gynecologist in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-09-01 10:04:15'),
(329, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre का काम सच में लाजवाब है। pregnancy care, experienced doctor, सर्वश्रेष्ठ gynecologist in jabalpur के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-09-02 10:29:24'),
(330, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital का काम सच में लाजवाब है। general consultation, health checkup, surgery treatment, diagnostic सेवाएं, specialist consultation, सर्वश्रेष्ठ hospital in jabalpur, 24×7 emergency सहायता, सर्वश्रेष्ठ hospital in jabalpur, medical care center in jabalpur, professional medical team के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-09-02 10:30:37'),
(331, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital का काम सच में लाजवाब है। excellent, very satisfied, yes के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-09-02 13:34:19'),
(332, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Laparoscopic Surgery, Best Fertility Specialist Clinic in Jabalpur, Best IVF Doctor in Jabalpur, Best IVF Treatment in Jabalpur, Best Fertility Care, Best Laparoscopic Surgeon in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-09-03 07:08:57'),
(333, 1, 'Google Reviewer', NULL, NULL, 4, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Pregnancy Care, Experienced Doctor, Best Fertility Specialist Clinic in Jabalpur, Best Gynecologist in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-09-03 10:05:02'),
(334, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. IVF Treatment, Fertility Consultation, Best IVF Doctor in Jabalpur, Best IVF Treatment in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-09-03 10:09:20'),
(335, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Pregnancy Care, Experienced Doctor, Best Gynecologist in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-09-03 10:11:34'),
(336, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Gynecology Treatment, Laparoscopic Surgery, IVF Treatment, Best Fertility Specialist Clinic in Jabalpur, Best IVF Centre in Jabalpur, Best Fertility Care ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-09-03 10:12:26'),
(337, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Pregnancy Care, Experienced Doctor, Best Gynecologist in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-09-03 10:18:42'),
(338, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Gynecology Treatment, Experienced Doctor, Best Gynecologist in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-09-03 10:19:57'),
(339, 1, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Pluro Jabalpur Fertility and IVF Centre for IVF Treatment, Pregnancy Care, Best IVF Doctor in Jabalpur, Best IVF Centre in Jabalpur, Best Fertility Specialist Clinic in Jabalpur, Experienced Doctor, Best IVF Treatment in Jabalpur, Best Fertility Care, Best Gynecologist in Jabalpur, Trusted IVF Centre. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-09-03 10:22:02'),
(340, 1, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Pluro Jabalpur Fertility and IVF Centre for IVF Treatment, Fertility Consultation, Pregnancy Care, Best IVF Doctor in Jabalpur, Best IVF Centre in Jabalpur, Best Fertility Specialist Clinic in Jabalpur, Experienced Doctor, Best IVF Treatment in Jabalpur, Best Fertility Care, Best Gynecologist in Jabalpur, Trusted IVF Centre. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-09-03 10:25:04'),
(341, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Laparoscopic Surgery, Gynecology Treatment, Experienced Doctor, Best Fertility Care ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-09-03 10:30:29'),
(342, 1, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Pluro Jabalpur Fertility and IVF Centre for IVF Treatment, Fertility Consultation, Pregnancy Care, Best IVF Doctor in Jabalpur, Best IVF Centre in Jabalpur, Best Fertility Specialist Clinic in Jabalpur, Experienced Doctor, Best IVF Treatment in Jabalpur, Best Fertility Care, Best Gynecologist in Jabalpur, Trusted IVF Centre. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-09-03 10:32:12'),
(343, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital का काम सच में लाजवाब है। specialist consultation, surgery treatment, सर्वश्रेष्ठ hospital in jabalpur, trusted healthcare facility in jabalpur, experienced doctors, advanced medical सेवाएं, 24×7 emergency सहायता, सर्वश्रेष्ठ hospital in jabalpur, medical care center in jabalpur, trusted healthcare service, professional medical team के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-09-03 13:48:31'),
(344, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital का काम सच में लाजवाब है। excellent, very satisfied, yes के मामले में इनकी सेवा सही नाह नही witch थीर यहाँ के स्टाफ का व्यवहार Show। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-09-04 08:52:39'),
(345, 9, 'shivanibhumiya119@gmail.com', '6260125320', 'shivanibhumiya119@gmail.com', 2, 'अच्छा लगा', 0, '2026-09-04 09:05:24'),
(346, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Pregnancy Care, Experienced Doctor, Best Gynecologist in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-09-05 09:17:13'),
(347, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital का काम सच में लाजवाब है। excellent, very satisfied, yes के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-09-05 09:17:41'),
(348, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Laparoscopic Surgery, Experienced Doctor, Best Laparoscopic Surgeon in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-09-07 07:26:08'),
(349, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. IVF Treatment, Gynecology Treatment, Best IVF Doctor in Jabalpur, Best Fertility Specialist Clinic in Jabalpur, Best IVF Treatment in Jabalpur, Trusted IVF Centre ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-09-07 09:42:24');
INSERT INTO `reviews` (`id`, `client_id`, `customer_name`, `customer_mobile`, `customer_email`, `rating`, `review`, `is_positive`, `created_at`) VALUES
(350, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Pregnancy Care, Gynecology Treatment, Best IVF Doctor in Jabalpur, Best Fertility Specialist Clinic in Jabalpur, Best Fertility Care, Best Laparoscopic Surgeon in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-09-07 10:00:13'),
(351, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Fertility Consultation, Pregnancy Care, Best Fertility Specialist Clinic in Jabalpur, Best Laparoscopic Surgeon in Jabalpur, Trusted IVF Centre ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-09-07 10:05:38'),
(352, 2, 'Google Reviewer', NULL, NULL, 5, 'DOAGuru InfoSystems mein experience bahut accha raha. Digital Marketing, Great Communication ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-09-07 13:02:00'),
(353, 7, 'Google Reviewer', NULL, NULL, 5, 'My husband had a heart attack few days back. We went to emegency room of Jabalpur Hospital, the doctor and team on the duty were swift in response. They immediately diagonosed the issue and refferred to cardiac team. I would like to thank Dr. Bhavik Dhirawani (Cardiologist) who was kind enough to respond to this severe emergency during odd morning hours i.e 05.00 hrs for Angiography. I was sure that Ashish was in safe hands and he will be treated fine. I also would like to thank \nGiriraj Singh (Cardiac Manager)\nRitika & Harshita (Nursing Staff) for managing everything else.\n\nAlthough we do not wish this experience for anyone, but in case anyone does experience it, then Jabalpur hospital was the best place to get treated. \nWe wish their entire team well. \nThanks \nSakshi Hanjura Deb \n', 1, '2026-09-07 14:32:35'),
(354, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital का काम सच में लाजवाब है। excellent, very satisfied, yes के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-09-08 05:29:55'),
(355, 9, 'Amaan Ahmad', '9179277786', 'amaanahmad009988@gmail.com', 2, 'Nice staff and good hospital ', 0, '2026-09-08 05:53:43'),
(356, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital का काम सच में लाजवाब है। excellent, satisfied, yes के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-09-08 06:01:11'),
(357, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital का काम सच में लाजवाब है। excellent, very satisfied, yes के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-09-08 06:10:44'),
(358, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-09-08 06:13:39'),
(359, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-09-08 07:00:14'),
(360, 9, 'NETRAM PRAJAPATI ', '9407398558', 'netram.prj2011@gmail.com', 3, 'Good working ', 0, '2026-09-08 07:03:08'),
(361, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital का काम सच में लाजवाब है। अच्छा, satisfied, yes के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-09-08 08:15:12'),
(362, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital का काम सच में लाजवाब है। अच्छा, satisfied, yes के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-09-08 08:15:13'),
(363, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital का काम सच में लाजवाब है। excellent, very satisfied, yes के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-09-08 08:21:28'),
(364, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care mein experience bahut accha raha. Eye Treatment, Experienced Eye Doctor, Doctor’s Consultation and Guidance ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-09-08 12:05:46'),
(365, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care mein experience bahut accha raha. Eye Checkup, Best Eye Specialist in Ranjhi, Jabalpur, Experienced Eye Doctor, Best Eye Hospital, Quality Eye Care Services, Doctor’s Consultation and Guidance, Staff Behaviour and Clinic Environment, Treatment and Care, Eye Checkup Process ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-09-08 13:26:28'),
(366, 9, 'Rehan', '7440281618', 'rehankhanrehankhan85649@gmail.com', 1, 'Really glad I went with life medicity multi speciality hospital for excellent, very satisfied, yes.the whole thing was smooth and the team was genuinely helpful.solid experience will be back!', 0, '2026-09-08 18:22:59'),
(367, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-09-08 18:25:15'),
(368, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-09-08 18:26:36'),
(369, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-09-10 04:43:42'),
(370, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital का काम सच में लाजवाब है। average, satisfied, yes के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-09-10 04:48:34'),
(371, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care mein experience bahut accha raha. Eye Treatment, Best Eye Hospital, Treatment and Care ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-09-10 11:00:55'),
(372, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care mein experience bahut accha raha. Eye Treatment, Best Eye Hospital, Eye Checkup Process ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-09-10 11:08:10'),
(373, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care mein experience bahut accha raha. Eye Treatment, Best Eye Hospital ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-09-10 11:09:36'),
(374, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care mein experience bahut accha raha. Eye Treatment, Best Eye Hospital ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-09-10 11:09:42'),
(375, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care mein experience bahut accha raha. Eye Treatment, Experienced Eye Doctor, Treatment and Care ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-09-10 11:11:05'),
(376, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care का काम सच में लाजवाब है। routine eye examination, सर्वश्रेष्ठ eye hospital, eye checkup process के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-09-10 11:14:06'),
(377, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care mein experience bahut accha raha. Eye Treatment, Best Eye Hospital, Eye Checkup Process ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-09-10 12:12:32'),
(378, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care mein experience bahut accha raha. Eye Treatment, Experienced Eye Doctor, Doctor’s Consultation and Guidance ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-09-10 12:14:06'),
(379, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care mein experience bahut accha raha. Routine Eye Examination, Quality Eye Care Services, Treatment and Care ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-09-10 12:15:25'),
(380, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care mein experience bahut accha raha. Eye Treatment, Experienced Eye Doctor, Eye Checkup Process ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-09-10 12:18:32'),
(381, 10, 'Dr jayshree maravi ', '9993896096', 'Jayshree.maravi@gmail.com', 2, 'Excellent ', 0, '2026-09-10 12:28:29'),
(382, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care का काम सच में लाजवाब है। eye treatment, experienced eye doctor, doctor’s consultation and guidance के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-09-10 12:34:48'),
(383, 10, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Navjyoti Eye Care for Eye Checkup, Consultation for an Eye Problem, Quality Eye Care Services, Best Eye Specialist in Ranjhi, Jabalpur, Eye Checkup Process, Doctor’s Consultation and Guidance, Staff Behaviour and Clinic Environment. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-09-10 13:21:22'),
(384, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care का काम सच में लाजवाब है। eye treatment, experienced eye doctor, eye checkup process के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-09-10 13:56:55'),
(385, 1, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Pluro Jabalpur Fertility and IVF Centre for Laparoscopic Surgery, Best Fertility Specialist Clinic in Jabalpur, Best IVF Centre in Jabalpur, Best IVF Doctor in Jabalpur, Experienced Doctor, Best Laparoscopic Surgeon in Jabalpur, Best IVF Treatment in Jabalpur, Trusted IVF Centre. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-09-11 07:44:40'),
(386, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre का काम सच में लाजवाब है। fertility consultation, सर्वश्रेष्ठ fertility specialist clinic in jabalpur, सर्वश्रेष्ठ ivf doctor in jabalpur, सर्वश्रेष्ठ ivf centre in jabalpur, experienced doctor, सर्वश्रेष्ठ fertility care, सर्वश्रेष्ठ ivf treatment in jabalpur, सर्वश्रेष्ठ gynecologist in jabalpur, trusted ivf centre के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-09-11 07:49:50'),
(387, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre का काम सच में लाजवाब है। fertility consultation, सर्वश्रेष्ठ ivf doctor in jabalpur, सर्वश्रेष्ठ ivf centre in jabalpur, सर्वश्रेष्ठ fertility specialist clinic in jabalpur, experienced doctor, सर्वश्रेष्ठ fertility care, सर्वश्रेष्ठ ivf treatment in jabalpur, trusted ivf centre के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-09-11 08:19:36'),
(388, 10, 'Google Reviewer', NULL, NULL, 4, 'Navjyoti Eye Care का काम सच में लाजवाब है। eye checkup, experienced eye doctor, staff behaviour and clinic environment, eye checkup process, doctor’s consultation and guidance के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-09-11 14:06:45'),
(389, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care का काम सच में लाजवाब है। eye treatment, experienced eye doctor, eye checkup process के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-09-11 14:08:11'),
(390, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care का काम सच में लाजवाब है। eye treatment, experienced eye doctor, treatment and care के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-09-12 05:41:00'),
(391, 10, 'Google Reviewer', NULL, NULL, 4, 'Navjyoti Eye Care का काम सच में लाजवाब है। consultation for an eye problem, सर्वश्रेष्ठ eye hospital, eye checkup process के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-09-12 05:45:03'),
(392, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care का काम सच में लाजवाब है। eye treatment, सर्वश्रेष्ठ eye hospital के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-09-12 06:08:56'),
(393, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care का काम सच में लाजवाब है। eye checkup, experienced eye doctor, eye checkup process के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-09-12 06:27:17'),
(394, 10, 'Shalini kanojiya ', '6232144660', 'kanojiyashalini07@gmail.com', 3, '👍', 0, '2026-09-12 07:52:28'),
(395, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care का काम सच में लाजवाब है। eye checkup, सर्वश्रेष्ठ eye specialist in ranjhi, jabalpur, doctor’s consultation and guidance के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-09-12 07:52:50'),
(396, 10, 'Diksha Rajak ', '7724830623', 'dipikarajak37@gmail.com', 2, '👍', 0, '2026-09-12 07:53:00'),
(397, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care का काम सच में लाजवाब है। eye treatment, सर्वश्रेष्ठ eye specialist in ranjhi, jabalpur, eye checkup process के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-09-12 08:04:04'),
(398, 10, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Navjyoti Eye Care for Eye Treatment, Experienced Eye Doctor, Best Eye Hospital, Eye Checkup Process, Treatment and Care, Doctor’s Consultation and Guidance, Staff Behaviour and Clinic Environment. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-09-12 14:26:37'),
(399, 10, 'Krishna dagor ', '7400905602', 'priyankapriya@3457', 2, 'Best service ', 0, '2026-09-12 14:31:34'),
(400, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital का काम सच में लाजवाब है। general consultation, emergency treatment, specialist consultation, inpatient care, सर्वश्रेष्ठ hospital in jabalpur, advanced medical सेवाएं, experienced doctors, सर्वश्रेष्ठ hospital in jabalpur, professional medical team के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!\n', 1, '2026-09-14 13:58:13'),
(401, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital का काम सच में लाजवाब है। general consultation, emergency treatment, specialist consultation, inpatient care, सर्वश्रेष्ठ hospital in jabalpur, advanced medical सेवाएं, experienced doctors, सर्वश्रेष्ठ hospital in jabalpur, professional medical team के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!\n', 1, '2026-09-14 13:58:13'),
(402, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-09-15 11:15:51'),
(403, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital का काम सच में लाजवाब है। अच्छा, satisfied, yes के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-09-15 11:18:24'),
(404, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-09-15 11:20:19'),
(405, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-09-15 11:20:45'),
(406, 9, 'Google Reviewer', NULL, NULL, 4, 'Life Medicity Multi Speciality Hospital का काम सच में लाजवाब है। excellent, very satisfied, yes के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-09-15 11:28:03'),
(407, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital mein experience bahut accha raha. Excellent, Very Satisfied, Yes ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-09-15 11:30:27'),
(408, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Laparoscopic Surgery, Best Fertility Specialist Clinic in Jabalpur, Best Laparoscopic Surgeon in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-09-17 09:01:51'),
(409, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein mera experience bahut accha raha hai. Mainne gynecology treatment liya aur bohot achi sevice ki. Dr. Ramesh ji ne mere samasyaon ka nidaan kya aur mere aas-paas ka samadhan diya. Unki expertise aur samajhne ki kala ko dikhkar main bahut pleased raha hoon.', 1, '2026-09-17 09:02:48'),
(410, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital was a huge relief for me when I needed to get treated. The doctors and staff were very helpful and made sure I was comfortable throughout the process. I will definitely return for any future medical needs.', 1, '2026-09-17 09:55:28'),
(411, 9, 'Google Reviewer', NULL, NULL, 4, 'Really glad I went with Life Medicity Multi Speciality Hospital for Good, Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-09-17 09:56:29'),
(412, 9, 'Google Reviewer', NULL, NULL, 5, 'I visited Life Medicity Multi Speciality Hospital and I must say their staff is very helpful and courteous. The doctor I saw was excellent and explained everything clearly. I\'m very satisfied with the service I received here.', 1, '2026-09-17 09:57:19'),
(413, 9, 'Google Reviewer', NULL, NULL, 4, 'मैंने अपनी परिवार की देखभाल के लिए Life Medicity Multi Speciality Hospital का चयन किया और मुझे बहुत अच्छा अनुभव हुआ। उनके स्टाफ बहुत सहयोगी और कुशल थे।', 1, '2026-09-17 09:58:48'),
(414, 9, 'Google Reviewer', NULL, NULL, 4, 'मैंने अपनी परिवार की देखभाल के लिए Life Medicity Multi Speciality Hospital का चयन किया और मुझे बहुत अच्छा अनुभव हुआ। उनके स्टाफ बहुत सहयोगी और कुशल थे।', 1, '2026-09-17 09:59:06'),
(415, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital is a godsend. Their team handled my sister\'s surgery with care and precision. I\'m grateful to them for making a difficult time manageable.', 1, '2026-09-17 10:59:39'),
(416, 9, 'Aman Khan', '9907095017', 'ak8737598@gmail.com', 1, 'Very good ', 0, '2026-09-17 19:28:33'),
(417, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital mein experience bohot sahi raha. Doctor aur staff dono bahut helpful the. Unka service aur treatment bohot accha hai. Highly recommend.', 1, '2026-09-17 19:29:35'),
(418, 1, 'Google Reviewer', NULL, NULL, 5, 'I went to Pluro Jabalpur Fertility and IVF Centre for laparoscopic surgery and was really impressed with the whole process. The fertility specialist and laparoscopic surgeon there were very professional and explained everything in detail before and after the procedure. I would definitely come back here if I need any more fertility-related treatments.', 1, '2026-09-18 07:55:08'),
(419, 1, 'Google Reviewer', NULL, NULL, 5, 'I\'ve been to Pluro Jabalpur Fertility and IVF Centre for pregnancy care and I must say their experienced doctor is one of the best gynecologists in Jabalpur. The staff is very helpful and the place is clean. I was in a bit of stress but they made me feel better.', 1, '2026-09-18 08:28:15'),
(420, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. IVF Treatment, Laparoscopic Surgery, Best Fertility Specialist Clinic in Jabalpur, Best IVF Centre in Jabalpur, Best Laparoscopic Surgeon in Jabalpur, Best Gynecologist in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-09-18 08:32:49'),
(421, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. IVF Treatment, Laparoscopic Surgery, Best Fertility Specialist Clinic in Jabalpur, Best IVF Centre in Jabalpur, Best Laparoscopic Surgeon in Jabalpur, Best Gynecologist in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-09-18 08:33:56'),
(422, 9, 'Google Reviewer', NULL, NULL, 5, 'I went to Life Medicity Multi Speciality Hospital and was really impressed with the care they showed. The doctors were excellent and the whole experience was very satisfying. I\'m definitely going back there if I need any more medical attention.', 1, '2026-09-18 11:35:43'),
(423, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital is truly exceptional. I recently visited the hospital for a routine checkup and was thoroughly impressed with the care and attention I received. I felt extremely satisfied with the entire experience and will definitely be returning for any future medical needs.', 1, '2026-09-18 11:38:13'),
(424, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital mein experience bohot sahi raha. Treatment ke liye visit kiya tha aur maine bohot achha treatment dekha. Doctor ki behtrai aur staff ki madad bohot acchi thi. Main kabhi apne family ke liye yahaan ke liye zaroor suggest karunga.', 1, '2026-09-18 11:38:46'),
(425, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital is a gem of a hospital. I was very satisfied with the treatment I received for my mother, who was admitted with a severe case of diabetes.', 1, '2026-09-18 11:40:07'),
(426, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital is a gem of a hospital. I was very satisfied with the treatment I received for my mother, who was admitted with a severe case of diabetes.', 1, '2026-09-18 11:40:30'),
(427, 9, 'Google Reviewer', NULL, NULL, 5, 'I\'ve been to Life Medicity Multi Speciality Hospital a few times and every time I\'m very satisfied with the service. The doctors are excellent and took the time to explain everything to me, they even answered all my questions. I\'m definitely coming back here if I need medical attention again.', 1, '2026-09-18 11:41:20'),
(428, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital is a godsend for those in need of medical attention. I recently visited the hospital for a surgery and I must say the experience was excellent. The staff was very helpful and took care of me like family.', 1, '2026-09-18 11:41:22'),
(429, 9, 'Google Reviewer', NULL, NULL, 5, 'I\'ve been to Life Medicity Multi Speciality Hospital a few times and every time I\'m very satisfied with the service. The doctors are excellent and took the time to explain everything to me, they even answered all my questions. I\'m definitely coming back here if I need medical attention again.', 1, '2026-09-18 11:41:37'),
(430, 9, 'Google Reviewer', NULL, NULL, 5, 'I recently visited Life Medicity Multi Speciality Hospital for a check-up and was very satisfied with the care I received. The doctors were very professional and made me feel at ease.', 1, '2026-09-18 11:42:02'),
(431, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital is a great place for medical care. I was very satisfied with the treatment I received for my daughter. We will definitely return here for any future medical needs.', 1, '2026-09-18 11:45:51'),
(432, 9, 'Google Reviewer', NULL, NULL, 5, 'I visited Life Medicity Multi Speciality Hospital recently and was satisfied with the services they provided. The staff was helpful and made me feel at ease.', 1, '2026-09-18 11:47:08'),
(433, 9, 'Google Reviewer', NULL, NULL, 5, 'मैं लाइफ मेडिसिटी मल्टी स्पेशैलिटी हॉस्पिटल के बारे में बहुत अच्छा अनुभव है । उनकी सर्वश्रेष्ठ सेवाएँ और उत्कृष्ट डॉक्टरों की टीम ने मुझे बिना किसी संकोच के यहाँ आने का सुझाव देता हूँ । यहाँ के प्रत्येक व्यक्ति का व्यवहार बहुत सहयोगी और सहायक है । मैं इस हॉस्पिटल की सेवाओं पर पूरा भरोसा किया है और भविष्य में जरूरत पड़ने पर निश्चित रूप से यहाँ आने की योजना है ।', 1, '2026-09-18 11:48:30'),
(434, 9, 'Google Reviewer', NULL, NULL, 5, 'I visited Life Medicity Multi Speciality Hospital for my mother\'s treatment and I must say the doctors were very helpful and explained everything clearly. They took care of her condition and she is recovering well now. I am satisfied with the services they provided.', 1, '2026-09-18 11:51:14'),
(435, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein meri experience bohot sahi rahi. Mainin sirf pregnancy care ke liye jaakar, lekin yahan se hi apne IVF treatment ke liye test bhi kiye. Dr. ne apne expertise aur supportive staff se meri har chinta kaal kar diya. Jabalpur mein best IVF centre ke liye mainin Pluro hi chunega. \n\nIst generation mein simple, normal style\n\nMainin Jabalpur mein IVF ke liye bina koi second thought ke Pluro Jabalpur Fertility and IVF Centre ki taraf jaa raha tha. Mainin experience ke saath hi yahan se kiya apna IVF treatment bhi. Jo kuch bhi problem thi, Dr. ne apni jadat se socha, solution diya. Mainin har condition mein very satisfied raha, zaroor return karoonga.\n\nTwo tone style\n\nPluro Jabalpur Fertility and IVF Centre ki services bohot achchi hai. Jab Jabalpur mein best IVF treatment ke liye mere doston ko kuch bhi sunata, woh apne liye bhi Pluro hi jaate. Dr. ne apni expertise se our problems ko solve kiya. Jabalpur mein yahaan se IVF treatment karne ke liye bina koi second thought ke jaao.\n\nThird tone style\n\nApni aur mere ko IVF treatment ke liye Jabalpur mein Pluro Jabalpur Fertility and IVF Centre ki taraf jaa raha tha. Jabalpur mein IVF', 1, '2026-09-19 08:13:20'),
(436, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital was a lifesaver for me when I was in urgent need of medical attention. The doctors and staff were very helpful and made sure I was comfortable throughout the process. I\'ll definitely be back here if I need any more medical care.', 1, '2026-09-19 10:23:22'),
(437, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital is a great place for medical care. I was treated with care by the staff and my problem was diagnosed quickly. I\'m already planning to visit them again for a follow-up check-up.', 1, '2026-09-19 10:25:09'),
(438, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital is a great place for medical care. I was treated with care by the staff and my problem was diagnosed quickly. I\'m already planning to visit them again for a follow-up check-up.', 1, '2026-09-19 10:25:13'),
(439, 9, 'Google Reviewer', NULL, NULL, 5, 'मैं अपने परिवार के साथ Life Medicity Multi Speciality Hospital में इलाज के लिए गए और मैं यहाँ आने की सलाह देता हूँ। डॉक्टर्स और नर्सेज का बहुत अच्छा बर्ताव था और मुझे यहाँ की सेवाएँ बहुत अच्छी लगीं।', 1, '2026-09-19 10:29:44'),
(440, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bohot sahi raha. Mere aur mere patni ka IVF treatment ekdam successful ho gaya aur doctor ka behavior bhi bilkul professional tha. I am very satisfied with the treatment and their support staff. Highly recommend.', 1, '2026-09-23 07:05:14'),
(441, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bohot sahi raha. Mere aur mere patni ka IVF treatment ekdam successful ho gaya aur doctor ka behavior bhi bilkul professional tha. I am very satisfied with the treatment and their support staff. Highly recommend.', 1, '2026-09-23 07:05:16'),
(442, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bohot sahi raha. Mere aur mere patni ka IVF treatment ekdam successful ho gaya aur doctor ka behavior bhi bilkul professional tha. I am very satisfied with the treatment and their support staff. Highly recommend.', 1, '2026-09-23 07:05:18'),
(443, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bohot sahi raha. Mere aur mere patni ka IVF treatment ekdam successful ho gaya aur doctor ka behavior bhi bilkul professional tha. I am very satisfied with the treatment and their support staff. Highly recommend.', 1, '2026-09-23 07:05:24'),
(444, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital is really helpful. The staff were friendly and explained everything clearly. I\'ll definitely be back if I need any medical attention in the future.', 1, '2026-09-23 07:47:45'),
(445, 9, 'Google Reviewer', NULL, NULL, 5, 'I visited Life Medicity Multi Speciality Hospital for a check-up and was satisfied with the doctor\'s explanation of my test results. The staff was friendly and helpful. I will definitely return if I need any medical attention in the future.', 1, '2026-09-23 07:49:05'),
(446, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital is a great place to get medical help. The staff is very friendly and I was able to get an appointment on short notice.', 1, '2026-09-23 07:49:40'),
(447, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital is a great place to get medical help. The staff is very friendly and I was able to get an appointment on short notice.', 1, '2026-09-23 07:49:56'),
(448, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein mere experience bohot sahi raha. Mere wife ki dosti ka problem bada problem tha, Pluro ke laparoscopic surgery se uska samadhan ho gaya hai. Mere doctor ne bahut sahi suggestions di aur treatment bhi accha laga. Mere liye yeh ek bilkul accha experience tha.', 1, '2026-09-24 09:51:20'),
(449, 1, 'Google Reviewer', NULL, NULL, 5, 'I had a great experience with Pluro Jabalpur Fertility and IVF Centre. The laparoscopic surgery was a success and the best part was the doctor\'s clear explanation throughout the process. They have the best fertility specialist clinic in Jabalpur and I\'m grateful for the treatment I received.', 1, '2026-09-25 08:50:14'),
(450, 1, 'Google Reviewer', NULL, NULL, 5, 'I recently visited Pluro Jabalpur Fertility and IVF Centre for a laparoscopic surgery and I must say I was impressed with the best fertility specialist clinic in Jabalpur. The doctor was extremely experienced and explained everything to me before the procedure. I felt a lot more at ease with the best gynecologist in Jabalpur taking care of me.', 1, '2026-09-25 08:51:06'),
(451, 1, 'Google Reviewer', NULL, NULL, 5, 'I visited Pluro Jabalpur Fertility and IVF Centre for laparoscopic surgery and had a very good experience with the fertility specialist doctor. The doctor was very experienced and the staff was very cooperative. I was well taken care of throughout the treatment.', 1, '2026-09-25 08:53:01'),
(452, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre ke pas experience bohot sahi raha. Laparoscopic surgery kiya aur main thoda pehle kiya tha. \n\nBina soche maine yahaan ka treatment kiya aur kaam accha laga. Specialis khareed ke jaise feel kiya. \n\nMain apni friend ko bhi zaroor suggest karunga. Abhi tak treatment kiya hai aur kabhi kabhi ek baar dekha jayega.', 1, '2026-09-26 06:32:33'),
(453, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre ke pas experience bohot sahi raha. Laparoscopic surgery kiya aur main thoda pehle kiya tha. \n\nBina soche maine yahaan ka treatment kiya aur kaam accha laga. Specialis khareed ke jaise feel kiya. \n\nMain apni friend ko bhi zaroor suggest karunga. Abhi tak treatment kiya hai aur kabhi kabhi ek baar dekha jayega.', 1, '2026-09-26 06:32:35'),
(454, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein mera experience bohot hiya aisa tha jismein doctor ne sahi tarike se mera kaam kiya. Doctor ki experience aur IVF centre ka service bohot hiya accha tha. Mere case mein laparoscopic surgery ho gaya tha aur doctor ne sahi tarike se meri dard ko kam kiya. Inko zaroor suggest karunga.', 1, '2026-09-26 06:33:21'),
(455, 1, 'Harminder Sandhu', '7898366040', 'ginnisandhu79@gmail.com', 3, 'Too much waiting time', 0, '2026-09-26 07:27:06'),
(456, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bohot sahi raha. Mainne yahan laparoscopic surgery ki taiyari karwai aur surgery ke liye aapka ek anubhav seva karke. Unke doctar ne bahut hi acchi tarah se kaam kiya aur main use phir se zaroor use kunga.', 1, '2026-09-26 07:28:19'),
(457, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bohot sahi raha. Main yahaan laparoscopic surgery kiya tha aur treatment bohot accha tha. Doctor ne mujhe bahut sahi samjhaya aur maine bahut sahi faida kiya.', 1, '2026-09-28 06:43:43'),
(458, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein meri experience bohot hi achchi lagi. Maine laparoscopic surgery ke liye unka clinic visit kiya aur unka best fertility specialist clinic ka experience bohot hi achcha laga. Unka best laparoscopic surgeon ka kaam bohot hi professional aur expert tha. Main unke clinic ko visit karna chahunga aur unka kaam karna chahunga.', 1, '2026-09-28 09:02:55'),
(459, 1, 'Google Reviewer', NULL, NULL, 5, 'I visited Pluro Jabalpur Fertility and IVF Centre for pregnancy care and was really impressed with their experienced doctor. They also have the best fertility specialist clinic in Jabalpur, which was a huge relief for me. The staff was very friendly and made me feel at ease throughout the process.\n\nI\'ve been searching for the best IVF centre in Jabalpur for a while now and Pluro Jabalpur Fertility and IVF Centre exceeded all my expectations. Their best IVF doctor in Jabalpur is highly knowledgeable and always available for queries. I\'m so grateful to have found them.\n\nThe Pluro Jabalpur Fertility and IVF Centre is a hidden gem in Jabalpur. I went there for the best gynecologist in Jabalpur and was not disappointed. The doctor was very professional and explained everything in a way that was easy to understand.', 1, '2026-09-28 10:14:50'),
(460, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bohot sahi raha. Mere pregnancy ke dauran sab kuchh theek tha. Mere experienced doctor ka unke saath raha aur sabse achha infertility specialist hai. Mere gynaecologist ka bhi support bahut sahi tha. Bina koi problem ke treatment tha aur main bahut happy hoon. Highly recommend.', 1, '2026-09-28 10:16:04'),
(461, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre में मेरा एक अद्भुत अनुभव हुआ है। मैंने यहाँ अ स्वच्छता के लिए एक सर्वश्रेष्ठ लेप्रोस्कोपिक सर्जरी करवाई। किसी भी तरह की समस्या नहीं देखी गई। ', 1, '2026-09-28 10:28:30'),
(462, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bohot sahi raha. Treatment achiyaan thi aur doctor bhi bahut experience wala tha. Unki team ne mere laparoscopic surgery ko bahut accha se handle kiya aur koi bhi problem na hone dein.', 1, '2026-09-30 08:20:10'),
(463, 1, 'Google Reviewer', NULL, NULL, 5, 'I visited the Pluro Jabalpur Fertility and IVF Centre for a fertility consultation. The staff was very cooperative and helpful throughout the process. I feel confident about my decision to seek their care.', 1, '2026-10-01 12:00:44'),
(464, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital provided me with top-class medical care. Their team was extremely supportive and understanding throughout my treatment.', 1, '2026-10-02 07:15:40'),
(465, 9, 'Google Reviewer', NULL, NULL, 5, 'मैं Life Medicity Multi Speciality Hospital में अपना इलाज करवाने के बाद बहुत संतुष्ट हूँ। उनके डॉक्टर्स और स्टाफ बहुत सहयोगी और मददगार हैं। मैं यहाँ आने की सलाह देता हूँ।', 1, '2026-10-02 07:30:23'),
(466, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital is amazing, I was here with my aunt who was admitted for a week and the care she received was excellent. The doctors and nurses were very kind and helpful. I\'m definitely coming back here if I need any medical attention in the future.', 1, '2026-10-02 07:33:27'),
(467, 9, 'Google Reviewer', NULL, NULL, 5, 'मैं बहुत खुश हूँ कि मैंने Life Medicity Multi Speciality Hospital चुना। यहाँ की सेवाएँ उत्कृष्ट थीं। यहाँ के डॉक्टर और स्टाफ बहुत सहयोगी और मित्राना व्यवहार करते हैं। मैं यहाँ आने की सलाह देता हूँ।', 1, '2026-10-02 07:52:38'),
(468, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital was a godsend when I needed medical attention. The staff were very helpful and knowledgeable, making me feel at ease throughout the process.', 1, '2026-10-02 07:53:39'),
(469, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital mein experience bohot sahi raha. Treatment bohot accha hai, doctors ki expertise dekhkar feel kiya ki main theek ho jayega.', 1, '2026-10-02 07:53:50'),
(470, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital was a godsend when I needed medical attention. The staff were very helpful and knowledgeable, making me feel at ease throughout the process.', 1, '2026-10-02 07:54:03'),
(471, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital mein experience bohot sahi raha. Treatment accha tha aur doctor ka behavior bhi bahut acha tha. Kuch logon ki behoshat ke baad bhi unhon ko theek se treatment diya aur agar koi bhi problem aaye to unka samadhan kiya. Highly recommend.', 1, '2026-10-02 07:55:51'),
(472, 9, 'Google Reviewer', NULL, NULL, 5, 'मैं Life Medicity Multi Speciality Hospital जाने की सलाह देता हूँ। उनकी सर्वश्रेष्ठ सेवाएँ मुझे बहुत अच्छी लगीं और मैं उनकी सहयोगी स्टाफ और शिक्षकों की प्रशंसा करता हूँ।', 1, '2026-10-02 07:55:52'),
(473, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital mein meri experience bohot sahi raha. Mere parivaar ki ek member ko treatment ke liye liya tha aur doctor ne bahut sahi se kuchh time ke saath hamesha searated usase bataya aur treatment ke saath hamesha searated usase samjha. \nDoctor ne mere parivaar ki ek member ko treatment ke liye liya tha aur very good searated usase samjha. Mere parivaar ki ek member ko bina koi problem ke saath treatment ho gaya. Highly recommend hoon Life Medicity Multi Speciality Hospital ko. \nDosto, Life Medicity Multi Speciality Hospital ka staff bahut sahi se kamaya aur treatment bahut sahi se dikhaya. Bina koi sochne kiya, mera kaam accha laga. Mera parivaar ki ek member ka treatment bahut sahi se ho gaya.', 1, '2026-10-02 07:57:41'),
(474, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital mein experience bohot sahi raha. Staff ka behaviour bohot accha tha, har saamanya problem ko solve karne mein wahin tha. Mere kaam ke liye wahin bohot uplabdhi hain. Wahin main bohot sahi tham deta hoon.', 1, '2026-10-02 07:59:19'),
(475, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital has been a lifesaver for me and my family. The doctors and staff were very helpful and caring throughout our treatment. I highly recommend them for any medical needs.', 1, '2026-10-02 07:59:26'),
(476, 9, 'Google Reviewer', NULL, NULL, 5, 'I was in a lot of pain after an accident and the team at Life Medicity Multi Speciality Hospital took great care of me. They were very patient and understanding, and their treatment was excellent. I was able to recover quickly and I\'m very grateful to them for that.', 1, '2026-10-02 07:59:41'),
(477, 9, 'Google Reviewer', NULL, NULL, 5, 'मैं Life Medicity Multi Speciality Hospital पर एक अच्छी अनुभूति हासिल की है। यहाँ के डॉक्टरों और स्टाफ का व्यवहार बहुत सर्वश्रेष्ठ रहा। मुझे यहाँ की सेवाओं पर पूरा भरोसा हुआ है।', 1, '2026-10-02 08:01:06'),
(478, 9, 'Google Reviewer', NULL, NULL, 5, 'मैंने Life Medicity Multi Speciality Hospital में अपना इलाज करवाया है। उनके डॉक्टर और स्टाफ बहुत सहयोगी और समझदार थे। यहाँ की सेवाओं पर पूरा भरोसा किया जा सकता है।', 1, '2026-10-02 08:01:37'),
(479, 9, 'Google Reviewer', NULL, NULL, 5, 'मैं अपने परिवार के साथ Life Medicity Multi Speciality Hospital में भर्ति हुए थे। उनकी सेवाएँ सर्वश्रेष्ठ थीं और हमें बहुत अच्छी देखभाल मिली। उनकी सहयोगी टीम ने हमारी हर जरूरत को पूरा किया। मैं यहाँ आने का सुझाव देता हूँ।', 1, '2026-10-02 08:03:21'),
(480, 9, 'Google Reviewer', NULL, NULL, 5, 'मैं अपने परिवार के साथ Life Medicity Multi Speciality Hospital में भर्ति हुए थे। उनकी सेवाएँ सर्वश्रेष्ठ थीं और हमें बहुत अच्छी देखभाल मिली। उनकी सहयोगी टीम ने हमारी हर जरूरत को पूरा किया। मैं यहाँ आने का सुझाव देता हूँ।', 1, '2026-10-02 08:03:31'),
(481, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital एक शानदार अस्पताल है जो अच्छी सेवाएँ प्रदान करता है। मैं यहाँ आने की सलाह देता हूँ, क्योंकि यहाँ का स्टाफ बहुत सहयोगी और मददगार है।', 1, '2026-10-02 08:05:33'),
(482, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital एक शानदार अस्पताल है जो अच्छी सेवाएँ प्रदान करता है। मैं यहाँ आने की सलाह देता हूँ, क्योंकि यहाँ का स्टाफ बहुत सहयोगी और मददगार है।', 1, '2026-10-02 08:06:08'),
(483, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital is truly a place you can trust for any medical issue. I visited with a problem and was given excellent treatment by the doctors and staff. I was very satisfied with the care I received.', 1, '2026-10-02 08:10:48'),
(484, 9, 'Google Reviewer', NULL, NULL, 5, 'मैं Life Medicity Multi Speciality Hospital की सर्वश्रेष्ठ सेवाओं का उपयोग करके अपने परिवार के स्वास्थ्य की देखभाल की है। यहाँ आने के बाद मेरे परिवार के स्वास्थ्य में काफी सुधार हुआ है। यहाँ के डॉक्टरों की सहयोगी और सही सलाह ने हमें पूर्ण भरोसा दिलाया है।', 1, '2026-10-02 08:11:46'),
(485, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bohot sahi raha. Mainne laparoscopic surgery ke lije Pluro Jabalpur Fertility and IVF Centre ka visit kiya. Doctor ne bahut hi safal operation ki aur main aaj bhi healthy hoon. Unka staff bahut hi supportive aur helpful tha, unhone maine sab kuchh jaankari di thi jaise procedure aur post-op care. Main bahut khush hoon ki mainne iske pehle se hi koi chinta nahin ki thi, main bahut dhanyavaad karta hoon Pluro Jabalpur Fertility and IVF Centre ki team ko. Highly recommend.', 1, '2026-10-02 09:48:15'),
(486, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bohot sahi raha. Maine apni pregnancy care ke liye inka doctor ko select kiya tha aur bohot achha decision laga. \n\nUnke doctor ne mere samasyaon ka samadhan karne ke liye puri tarah se sattyaagya rehakar sahi raha. Maine unke dawaad kiye aur bohot sahi laga. \n\nBohot accha aur professional treatment tha. Mere liye to inka hospital hamesha ke liye ek option raha hai. Highly satisfied hoon aur zaroor suggest karunga.', 1, '2026-10-02 09:59:14'),
(487, 9, 'Google Reviewer', NULL, NULL, 5, 'मैं Life Medicity Multi Speciality Hospital में एक शानदार अनुभव हासिल किया है। मेरी दोस्त को काफला घाव हुआ था, जिसे डॉक्टर्स ने बहुत अच्छी तरह से ठीक किया है। यहाँ के डॉक्टर्स और स्टाफ बहुत सहयोगी और मददगार रहे।', 1, '2026-10-04 09:32:33'),
(488, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital has taken care of my elderly mother\'s health issues and we are very satisfied with the treatment. The doctors and staff were very helpful and courteous throughout her stay.', 1, '2026-10-04 09:34:44'),
(489, 9, 'Google Reviewer', NULL, NULL, 5, 'I recently had a good experience at Life Medicity Multi Speciality Hospital. The staff was very cooperative and explained my condition thoroughly. I\'m looking forward to visiting them again for any future medical needs.', 1, '2026-10-04 09:35:14'),
(490, 9, 'Google Reviewer', NULL, NULL, 5, 'मैं अपने परिवार के साथ जीवन मेडिसिटी मल्टी स्पेशैलिटी अस्पताल में जा चुका हूँ। मुझे लगता है कि यह एक उत्कृष्ट सेवा प्रदान करने वाला स्थान है। अस्पताल का स्टाफ बहुत सहयोगी और मददगार है, जिन्होंने मुझे और मेरे परिवार को उचित मदद प्रदान की। मैं यहाँ आने की सलाह देता हूँ।', 1, '2026-10-04 09:38:19'),
(491, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital is a gem in the medical field. Their staff are extremely caring and attentive, they made my entire experience very comfortable.', 1, '2026-10-04 09:38:38'),
(492, 9, 'Google Reviewer', NULL, NULL, 5, 'I visited Life Medicity Multi Speciality Hospital and was extremely pleased with the treatment I received. The staff were very helpful and courteous, explaining everything clearly to me. They got me feeling better within no time!', 1, '2026-10-04 09:39:04'),
(493, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital is a real lifesaver. I was in a bad situation and they got me out of it in no time. The staff was very helpful and made me feel at ease.', 1, '2026-10-04 09:42:31'),
(494, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital is a great place to take care of your medical needs. The doctors and staff are very friendly and professional. I was very satisfied with the treatment I received.', 1, '2026-10-04 09:44:21'),
(495, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital provided me with excellent care. I was very satisfied with the services I received. The staff was friendly and the doctors were very helpful, I will definitely come back here if I need any medical attention in the future.', 1, '2026-10-04 09:44:48'),
(496, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital has exceeded my expectations in every way. Their staff was very helpful and courteous, making me feel at ease throughout my visit. I\'ll definitely consider them for any future medical needs.', 1, '2026-10-04 09:47:10'),
(497, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital is a great place to take care of your health. I went there for a check-up and was very satisfied with the service. The doctors and nurses were very friendly and attentive.', 1, '2026-10-04 09:49:53'),
(498, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital provided me with excellent service. The staff were very helpful and attentive throughout my visit. I\'ll definitely return for any future medical needs.', 1, '2026-10-04 09:56:12'),
(499, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital is a lifesaver. I had an excellent experience with my treatment and the staff was very cooperative. The hospital\'s facilities are well maintained and the doctors are very skilled.', 1, '2026-10-04 09:56:48'),
(500, 9, 'Google Reviewer', NULL, NULL, 5, 'मैं अपने परिवार के साथ Life Medicity Multi Speciality Hospital का जाने का अनुभव करता हूँ। यहाँ का माहौल उत्कृष्ट है और स्टाफ बहुत सहयोगी है। मैं यहाँ आने के लिए बोलूँगा और अपने परिवार के साथ समय बिताने के लिए एक बार फिर से यहाँ आऊँगा।', 1, '2026-10-04 09:58:24'),
(501, 9, 'Google Reviewer', NULL, NULL, 5, 'मैंने अपने परिवार के लिए सर्वश्रेष्ठ चिकित्सा सेवाओं की तलाश में Life Medicity Multi Speciality Hospital का चयन किया और मैं बहुत खुश हूँ कि मैंने ऐसा किया। उनकी उत्कृष्ट सेवाएँ और सहयोगी स्टाफ ने मुझे अपने सभी स्वास्थ्य संबंधी समस्याओं का समाधान करने में मदद की। मैं यहाँ आने के लिए बोलूँगा और अपने परिवार को भी यहाँ आने की सलाह दूँगा।', 1, '2026-10-04 09:59:36'),
(502, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital is truly a blessing to this city. Their staff is very friendly and helped me with everything.', 1, '2026-10-04 10:08:02'),
(503, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital has a great team of doctors and staff. They handled my mother\'s surgery with care and precision.', 1, '2026-10-04 10:08:59'),
(504, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital was a godsend when I needed emergency care. The doctors and nurses were very understanding and took the time to explain everything to me and my family.', 1, '2026-10-04 10:18:34');
INSERT INTO `reviews` (`id`, `client_id`, `customer_name`, `customer_mobile`, `customer_email`, `rating`, `review`, `is_positive`, `created_at`) VALUES
(505, 7, 'Karan ahuja', '7869191232', 'karanisback@gmail.com', 3, 'Doctors and nursing staff is good but the management is pathetic....a hospital with more than 200 beds capacity has a parking of 20 cars max and that too very disgusting behaviour by staff .....then comes admitting patient with health insurance....such a clumsy process you have to wait hours in long que just to geta freaking seal of credit/insurance....than there come the procedure for discharge which is another mess ....you are been asked to move to desk to desk just to ask weather our papers are ready or not....then for final settlement you have to wait for hours to discharge due to glitch in hospital cash less procedure ', 0, '2026-10-05 02:29:29'),
(506, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital is a great place to get quality medical care. The staff here is very helpful and attentive. I was very satisfied with the treatment I received for my condition.', 1, '2026-10-05 03:40:21'),
(507, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital is a great place to get quality medical care. The staff here is very helpful and attentive. I was very satisfied with the treatment I received for my condition.', 1, '2026-10-05 03:40:23'),
(508, 9, 'Nitin Vishwakarma jabalpur', '9926383089', 'narendavish321@gmail.com', 2, 'Good 👍', 0, '2026-10-05 04:15:35'),
(509, 9, 'Shyam Singh', '9516146133', 'shyamsingh96300@gmail.com', 3, 'The treatment was best and doctors also is highly professional the only thing I not like the staff of 4th floor and the general doctors of 4th floor they are not listening us I have to point out many times then they listen and the suggest different different thing when general doctors arrive according to them ', 0, '2026-10-05 07:50:31'),
(510, 9, 'Shyam Singh', '9516146133', 'shyamsingh96300@gmail.com', 3, 'The treatment was best and doctors also is highly professional the only thing I not like the staff of 4th floor and the general doctors of 4th floor they are not listening us I have to point out many times then they listen and the suggest different different thing when general doctors arrive according to them ', 0, '2026-10-05 07:50:31'),
(511, 9, 'Shyam Singh', '9516146133', 'shyamsingh96300@gmail.com', 3, 'The treatment was best and doctors also is highly professional the only thing I not like the staff of 4th floor and the general doctors of 4th floor they are not listening us I have to point out many times then they listen and the suggest different different thing when general doctors arrive according to them ', 0, '2026-10-05 07:50:31'),
(512, 9, 'Shyam Singh', '9516146133', 'shyamsingh96300@gmail.com', 3, 'The treatment was best and doctors also is highly professional the only thing I not like the staff of 4th floor and the general doctors of 4th floor they are not listening us I have to point out many times then they listen and the suggest different different thing when general doctors arrive according to them ', 0, '2026-10-05 07:50:39'),
(513, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital was a good experience overall. The staff was helpful and knowledgeable, they answered all my questions.', 1, '2026-10-05 08:18:11'),
(514, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital was a good experience overall. The staff was helpful and knowledgeable, they answered all my questions.', 1, '2026-10-05 08:19:28'),
(515, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital provided me with excellent care from the very start. I was extremely satisfied with the attention given to my case, and the treatment I received was top quality. I\'m so grateful for the experience, I\'ll definitely be returning here if I need medical attention again!', 1, '2026-10-05 08:36:13'),
(516, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bohot sahi raha. Mere laparoscopic surgery ko thik se karwaya aur doctor ne mere samay aur sehyogi tarike se apne kaam ko kiya. Jabalpur mein yahaan ka treatment bohot accha hai.', 1, '2026-10-05 09:31:10'),
(517, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital mein visit kiya aur bohot sahi experience tha. Doctor ne samjha aur procedure explain kiya. Equipment aur staff bhi accha laga. Highly recommend karunga.', 1, '2026-10-05 10:06:03'),
(518, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital mein experience bohot sahi raha. Maine apne parivaar ke saath dard ke ilaaj ke liye ja rahe the aur yahan ka treatment bohot accha hai. Doctor, staff sab theek se behave karte hain aur unki expertise bahut vishesh hai. Maine apne parivaar ke saamne yahan ka treatment zaroor suggest karunga.', 1, '2026-10-05 10:07:54'),
(519, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital mein experience bahut accha raha. Excellent, Very Satisfied, Yes ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-10-05 10:12:19'),
(520, 9, 'Google Reviewer', NULL, NULL, 5, 'मैंने अपने परिवार के सदस्य को Life Medicity Multi Speciality Hospital में भर्ती कराया और उनकी सर्वश्रेष्ठ सेवाओं का अनुभव करने के बाद मैं बहुत संतुष्ट हूँ। यहाँ की टीम उत्कृष्टता की भावना से भरपूर है और उन्होंने मेरे परिवार के सदस्य की देखभाल के लिए काम के स्तर को ऊंचा रखा। मैं यहाँ आने की सलाह दूँगा और भविष्य में भी यहाँ की सेवाओं पर पूरा भरोसा किया जा सकता है।', 1, '2026-10-05 10:19:22'),
(521, 10, 'Google Reviewer', NULL, NULL, 5, 'मैंने कल Navjyoti Eye Care में एकConsultaon के लिए जाना था। मुझे एक अनुभवी आंख का डॉक्टर मिला था जो मेरे सभी प्रश्नों का जवाब देने में सक्षम था। उनकी देखभाल और सेवाएँ शानदार थीं।', 1, '2026-10-06 05:52:02'),
(522, 10, 'Google Reviewer', NULL, NULL, 4, 'मैंने हाल ही में Navjyoti Eye Care में अपनी नियमित आंखों की जांच करवाई और मुझे बहुत अच्छी सेवा मिली। डॉक्टर ने मेरी समस्याओं को अच्छी तरह समझा और मुझे सर्वश्रेष्ठ सलाह दी। उनकी जांच और सलाह ने मेरे आंखों की समस्या को पूरी तरह से समाप्त किया और मैं अब एक स्वस्थ आंखों का मालिक हूँ।', 1, '2026-10-06 06:34:55'),
(523, 10, 'Google Reviewer', NULL, NULL, 5, 'मैंने कुछ दिन पहले Navjyoti Eye Care में जा कर अपनी आँखों का एक्सपीरियंस किया। उनके डॉक्टर ने मुझे बहुत अच्छे सलाह दीं। मुझे पहली बार किसी ऐसे डॉक्टर का मिलना हुआ जो एक्सपीरियंस है। उनकी आँखों की जाँच प्रक्रिया बहुत सरल और अच्छी लगी। मैं उनकी सेवाओं पर पूरा भरोसा किया है और मैं यहाँ आने की सलाह देता हूँ।', 1, '2026-10-06 08:06:28'),
(524, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital is a lifesaver. The doctors and staff were very supportive and explained everything clearly. I was extremely satisfied with the care I received.', 1, '2026-10-06 10:03:27'),
(525, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital has a wonderful staff and they helped me with my surgery. They were very professional and made me feel at ease throughout the whole process. I\'m very satisfied with the care I received.', 1, '2026-10-06 10:05:00'),
(526, 9, 'Google Reviewer', NULL, NULL, 5, 'I recently visited Life Medicity Multi Speciality Hospital and was very satisfied with the care I received. The doctors and staff were very helpful and explained everything clearly.', 1, '2026-10-06 10:05:19'),
(527, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital really saved my sister\'s life when she was in an accident. The team of doctors and nurses were excellent, very satisfied with the care she received. We will definitely come back if we need medical attention again.', 1, '2026-10-06 10:06:28'),
(528, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital is truly exceptional. I had a family member in need of medical attention and the doctors and staff were extremely helpful and professional throughout the process. They took care of us with kindness and understanding!', 1, '2026-10-06 10:06:32'),
(529, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital is a great place to get medical help. The staff is very friendly and helpful. I\'ve been back for check-ups and they always take good care of me.', 1, '2026-10-06 10:13:02'),
(530, 9, 'Google Reviewer', NULL, NULL, 5, 'I recently visited Life Medicity Multi Speciality Hospital and was thoroughly impressed with the care I received. The doctor was very kind and explained everything to me clearly, making me feel at ease throughout the process. I\'m extremely grateful for the wonderful experience I had there.', 1, '2026-10-06 10:13:11'),
(531, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital has a very caring staff. They helped me with my surgery and everything went smoothly.', 1, '2026-10-06 10:14:24'),
(532, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital was a great experience for me. Their doctors and nurses were very friendly and helpful. I\'d definitely go back if I ever need medical attention again.', 1, '2026-10-06 10:15:09'),
(533, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital has excellent staff and facilities. They took care of me when I was unwell and I was very satisfied with the service. I will definitely return here in the future if I need any medical attention.', 1, '2026-10-06 10:17:56'),
(534, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital has excellent staff and facilities. They took care of me when I was unwell and I was very satisfied with the service. I will definitely return here in the future if I need any medical attention.', 1, '2026-10-06 10:18:02'),
(535, 9, 'Google Reviewer', NULL, NULL, 5, 'I recently visited Life Medicity Multi Speciality Hospital with my family and we were treated with great care. The doctors and staff were very helpful and explained everything in a way that made us feel at ease. They made sure we were comfortable throughout the process.', 1, '2026-10-06 10:20:46'),
(536, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital has an excellent team of doctors. They took good care of my mother during her stay, very satisfied with the service. We will definitely come back here if needed again.', 1, '2026-10-06 10:53:55'),
(537, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital has exceeded my expectations in every way. The doctors and staff were very friendly and took the time to explain everything to me. I\'m so grateful for the excellent care I received during my visit.', 1, '2026-10-06 10:56:57'),
(538, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital is a hospital that knows how to treat its patients with care and respect. The doctors and nurses are very professional and took the time to explain everything to me and my family. We were very satisfied with the treatment we received.', 1, '2026-10-06 10:59:21'),
(539, 10, 'Google Reviewer', NULL, NULL, 5, 'I recently visited Navjyoti Eye Care for an eye checkup and treatment. The staff was very helpful and cooperative, they made me feel at ease during the entire process. I\'ll definitely be returning for any future eye care needs.', 1, '2026-10-06 12:10:21'),
(540, 7, 'Google Reviewer', NULL, NULL, 5, 'I recently had a severe allergic reaction and my family took me to Jabalpur Hospital for emergency treatment. The doctors were very calm and composed, and they got me the right medication quickly.', 1, '2026-10-07 04:35:48'),
(541, 7, 'Google Reviewer', NULL, NULL, 5, 'I had to visit the Jabalpur Hospital in a tight spot and was treated very well by their staff. The doctors were knowledgeable and made sure I got the right treatment for my condition. The facilities were clean and well-maintained.', 1, '2026-10-07 04:36:52'),
(542, 9, 'Google Reviewer', NULL, NULL, 5, 'मैंने अपने परिवार के लिए Life Medicity Multi Speciality Hospital में अपना इलाज करवाया। मुझे बताया गया कि डॉक्टर और नर्स बहुत जिम्मेदार और सहयोगी हैं। मेरे इलाज के बाद मुझे लगा कि मैं उत्कृष्ट सेवाओं पर पूरा भरोसा किया जा सकता है।', 1, '2026-10-07 08:06:53'),
(543, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bohot sahi raha. Mere IVF Treatment ke liye unka best IVF Doctor Jabalpur mein unhone best IVF Treatment laga diya jisse mera ek bache ki khwahish poori ho gayi. Unka treatment bohot accha hai.', 1, '2026-10-07 11:00:17'),
(544, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bohot sahi raha. Mere IVF treatment ki zaroorat thi aur unke Dr. ne bohot accha kaam kiya. Unke staff ka behavior bhi bohot achha tha. Mere IVF treatment ki zaroorat thi aur unke Dr. ne bohot accha kaam kiya. Jabalpur mein bohot kam centers mein IVF treatment kaam hota hai, lekin Pluro Jabalpur Fertility and IVF Centre ek hi anaj hai. Mere experience mein se koi bhi shak hai ki yahan ke doctors aur staff mein bohot sahiyaan hai.', 1, '2026-10-07 11:02:57'),
(545, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bohot sahi raha. Main upar se lekar neeche tak ka sab kuch accha tha. Doctor bhaiya bahut hi knowledgefull tha aur staff bahut hi helpful tha. Main apne sabse choti si beti ki maa ki daadhi bhi yahaan di hai aur main bahut hi satisfied hoon. I highly recommend.', 1, '2026-10-07 11:11:05'),
(546, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-08 04:07:47'),
(547, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-08 06:49:18'),
(548, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital का काम सच में लाजवाब है। excellent, very satisfied, yes के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-10-09 05:55:50'),
(549, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. IVF Treatment, Gynecology Treatment, Laparoscopic Surgery, Best IVF Doctor in Jabalpur, Best IVF Centre in Jabalpur, Best Fertility Specialist Clinic in Jabalpur, Best IVF Treatment in Jabalpur, Best Fertility Care, Best Gynecologist in Jabalpur, Best Laparoscopic Surgeon in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-10-10 06:48:30'),
(550, 7, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Jabalpur Hospital for Inpatient Care, Best Hospital in Jabalpur, Trusted Healthcare Facility in Jabalpur, Best Hospital in Jabalpur. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back! thankyou so much sir dr.bhavik dhirawani sir for support and sis.tanzeema she is also good 👍🏻.and all staff best, duty doctor and special thanks dr.bhavik sir. Manager come on round and aksed about patient status and said namaste ammaji ye bahot acha hai jo mr.akshay ji bolte the. Patient is mrs. Deshrani ji. ', 1, '2026-10-11 09:11:33'),
(551, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-12 05:48:23'),
(552, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-12 06:37:58'),
(553, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. IVF Treatment, Best IVF Doctor in Jabalpur, Best IVF Treatment in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-10-12 09:27:39'),
(554, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-12 10:19:31'),
(555, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Laparoscopic Surgery, Best Fertility Specialist Clinic in Jabalpur, Best Laparoscopic Surgeon in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-10-13 09:06:16'),
(556, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Laparoscopic Surgery, Best Fertility Specialist Clinic in Jabalpur, Best Laparoscopic Surgeon in Jabalpur, Best Gynecologist in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-10-14 08:11:12'),
(557, 10, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Navjyoti Eye Care for Eye Checkup, Experienced Eye Doctor, Eye Checkup Process. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-14 11:02:05'),
(558, 10, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Navjyoti Eye Care for Eye Checkup, Experienced Eye Doctor, Eye Checkup Process. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-14 11:02:05'),
(559, 10, 'Ashish Dubey', '9302300834', 'ashish9039062705@gmail.com', 3, 'ttyyttrytf', 0, '2026-10-14 11:05:08'),
(560, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care का काम सच में लाजवाब है। routine eye examination, सर्वश्रेष्ठ eye hospital, treatment and care के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-10-14 11:27:01'),
(561, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care का काम सच में लाजवाब है। eye checkup, सर्वश्रेष्ठ eye hospital, सर्वश्रेष्ठ eye specialist in ranjhi, jabalpur, eye checkup process के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-10-14 11:31:38'),
(562, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care का काम सच में लाजवाब है। eye treatment, experienced eye doctor, eye checkup process के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-10-14 14:38:52'),
(563, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care का काम सच में लाजवाब है। eye checkup, experienced eye doctor, doctor’s consultation and guidance के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-10-14 14:42:20'),
(564, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care का काम सच में लाजवाब है। eye checkup, experienced eye doctor, doctor’s consultation and guidance के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-10-14 14:42:35'),
(565, 10, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Navjyoti Eye Care for Eye Checkup, Quality Eye Care Services, Staff Behaviour and Clinic Environment. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-14 14:52:01'),
(566, 7, 'Google Reviewer', NULL, NULL, 4, 'Really glad I went with Jabalpur Hospital for Inpatient Care, Trusted Healthcare Facility in Jabalpur, Trusted Healthcare Service. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-15 04:54:55'),
(567, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care का काम सच में लाजवाब है। eye checkup, सर्वश्रेष्ठ eye specialist in ranjhi, jabalpur, doctor’s consultation and guidance के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-10-15 06:11:25'),
(568, 1, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Pluro Jabalpur Fertility and IVF Centre for Laparoscopic Surgery, Best IVF Doctor in Jabalpur, Best Gynecologist in Jabalpur, Best Laparoscopic Surgeon in Jabalpur. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-15 07:45:47'),
(569, 1, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Pluro Jabalpur Fertility and IVF Centre for Fertility Consultation, Gynecology Treatment, Laparoscopic Surgery, Best IVF Doctor in Jabalpur, Best IVF Centre in Jabalpur, Experienced Doctor, Best Gynecologist in Jabalpur, Best Laparoscopic Surgeon in Jabalpur. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-15 07:47:18'),
(570, 10, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Navjyoti Eye Care for Eye Checkup, Best Eye Hospital, Treatment and Care. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-15 11:09:01'),
(571, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care का काम सच में लाजवाब है। eye treatment, सर्वश्रेष्ठ eye hospital, treatment and care के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-10-15 11:58:40'),
(572, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care का काम सच में लाजवाब है। eye treatment, सर्वश्रेष्ठ eye hospital, eye checkup process के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-10-15 12:38:36'),
(573, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care का काम सच में लाजवाब है। eye checkup, experienced eye doctor, doctor’s consultation and guidance के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-10-17 06:02:30'),
(574, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care का काम सच में लाजवाब है। eye checkup, experienced eye doctor, treatment and care के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-10-17 06:04:06'),
(575, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care का काम सच में लाजवाब है। eye checkup, experienced eye doctor, eye checkup process के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-10-17 06:04:41'),
(576, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care का काम सच में लाजवाब है। eye checkup, सर्वश्रेष्ठ eye hospital, treatment and care के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-10-17 06:05:13'),
(577, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care का काम सच में लाजवाब है। eye checkup, experienced eye doctor, staff behaviour and clinic environment के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-10-17 06:06:17'),
(578, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care का काम सच में लाजवाब है। eye checkup, experienced eye doctor, staff behaviour and clinic environment के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-10-17 06:22:02'),
(579, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care mein experience bahut accha raha. Consultation for an Eye Problem, Best Eye Specialist in Ranjhi, Jabalpur, Doctor’s Consultation and Guidance ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-10-17 07:24:44'),
(580, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care का काम सच में लाजवाब है। eye treatment, experienced eye doctor, treatment and care के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-10-17 07:36:02'),
(581, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care का काम सच में लाजवाब है। eye treatment, experienced eye doctor, treatment and care के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-10-17 07:36:30'),
(582, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care का काम सच में लाजवाब है। eye treatment, experienced eye doctor, treatment and care के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-10-17 07:37:13'),
(583, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care का काम सच में लाजवाब है। eye treatment, experienced eye doctor, सर्वश्रेष्ठ eye hospital, eye checkup process के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-10-17 11:06:07'),
(584, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care का काम सच में लाजवाब है। eye checkup, eye treatment, सर्वश्रेष्ठ eye specialist in ranjhi, jabalpur, सर्वश्रेष्ठ eye hospital, treatment and care, staff behaviour and clinic environment के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-10-17 11:17:08'),
(585, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care का काम सच में लाजवाब है। eye checkup, सर्वश्रेष्ठ eye hospital, treatment and care के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-10-19 11:01:35'),
(586, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care का काम सच में लाजवाब है। eye checkup, experienced eye doctor, eye checkup process के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-10-19 12:23:19'),
(587, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care का काम सच में लाजवाब है। eye checkup, experienced eye doctor, eye checkup process के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-10-19 12:23:20'),
(588, 10, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Navjyoti Eye Care for Eye Checkup, Best Eye Specialist in Ranjhi, Jabalpur, Doctor’s Consultation and Guidance. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-19 14:15:02'),
(589, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care का काम सच में लाजवाब है। eye treatment, सर्वश्रेष्ठ eye specialist in ranjhi, jabalpur, eye checkup process के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-10-19 14:17:10'),
(590, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care का काम सच में लाजवाब है। eye treatment, routine eye examination, eye checkup, consultation for an eye problem, सर्वश्रेष्ठ eye hospital, गुणवत्ता eye care सेवाएं, experienced eye doctor, eye checkup process, treatment and care, doctor’s consultation and guidance, staff behaviour and clinic environment के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-10-19 14:19:12'),
(591, 7, 'Amit Dubey', '9202440055', 'amitaayu143@gmail.com', 1, 'Very discounted', 0, '2026-10-20 12:29:08'),
(592, 7, 'Amit Dubey', '9202440055', 'amitaayu143@gmail.com', 1, 'Very discounted', 0, '2026-10-20 12:29:09'),
(593, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care का काम सच में लाजवाब है। eye checkup, eye treatment, experienced eye doctor, eye checkup process, staff behaviour and clinic environment के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-10-21 07:10:46'),
(594, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Laparoscopic Surgery, Best Fertility Specialist Clinic in Jabalpur, Best Laparoscopic Surgeon in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-10-21 07:57:42'),
(595, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Laparoscopic Surgery, Experienced Doctor, Best Gynecologist in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-10-21 07:59:27'),
(596, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care का काम सच में लाजवाब है। eye checkup, सर्वश्रेष्ठ eye specialist in ranjhi, jabalpur, treatment and care के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-10-21 13:11:32'),
(597, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care mein experience bahut accha raha. Eye Checkup, Quality Eye Care Services, Eye Checkup Process ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-10-21 13:38:53'),
(598, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care का काम सच में लाजवाब है। routine eye examination, सर्वश्रेष्ठ eye hospital, treatment and care के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-10-21 13:47:29'),
(599, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care का काम सच में लाजवाब है। eye treatment, सर्वश्रेष्ठ eye hospital, staff behaviour and clinic environment के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-10-21 14:02:47'),
(600, 7, 'Bhavna bakshi', '8305447378', 'bakshibhavna5@gmail.com', 1, 'At your hospital, they spent 5 days conducting only blood tests on our patient, yet they failed to identify the illness.After this, he asked for bone marrow aspiration test at Dr. Ashish Gupta\'s office in Laxmi Narayan Hospital.After the bone marrow report came from Lakshmi Narayan Hospital, your hospital people did not tell us that you have to go to Lakshmi Narayan Hospital.Three days after the bone marrow aspiration report came, we were told to admit our patient in Ashish Gupta ji\'s hospital.When the bone marrow report came, your hospital people had to tell us to take our patient to Lakshmi Narayan Hospital.When we spoke to Saurabh Grover about this, he said that Ashish Sir was receiving primary treatment. However, when we met Ashish Sir, he said, \"I am not receiving any treatment.\"So, we\'re asking you all this: who will refund our extra money for three days? We\'ve saved every penny with great difficulty.One complaint is that after we had the requisition slip for the dengue test—which was to be billed on credit—cancelled, how did the pathology staff go ahead and collect a blood sample from the patient?The supervisors in your HDU—such as Mr. Yadav and a Mr. Pandey—had a very inappropriate way of speaking.The discharge summary states that one unit of RBCs was transfused, but our patient did not receive any blood. Only 2 units of SDP (Single Donor Platelets) were administered.The nursing staff in your HDU can\'t even take blood samples. I had to return to the blood bank four times to get a sample.Our patient was admitted to HDU 4 at Jabalpur Hospital under the name Pradeep Singh Rajput.', 0, '2026-10-21 14:26:43'),
(601, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-22 07:18:01'),
(602, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-22 07:19:31'),
(603, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-22 07:24:57'),
(604, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-22 07:26:34'),
(605, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-22 07:27:58'),
(606, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-22 07:30:02'),
(607, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-22 07:30:02'),
(608, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-22 07:30:02'),
(609, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-22 07:30:02'),
(610, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-22 07:30:05'),
(611, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-22 07:30:05'),
(612, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-22 07:30:06'),
(613, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-22 07:30:06'),
(614, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-22 07:30:07'),
(615, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-22 07:30:08'),
(616, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-22 07:30:08'),
(617, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-22 07:31:21'),
(618, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-22 07:34:16'),
(619, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-22 07:36:20'),
(620, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-22 07:36:51'),
(621, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-22 07:38:34'),
(622, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-22 07:42:41'),
(623, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-22 07:42:42'),
(624, 9, 'Google Reviewer', NULL, NULL, 4, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-22 07:45:07'),
(625, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-22 07:48:07'),
(626, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-22 07:48:25'),
(627, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-22 07:51:26'),
(628, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-22 07:52:44'),
(629, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-22 07:56:26'),
(630, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-22 07:56:27'),
(631, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-22 07:59:17'),
(632, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-22 07:59:18'),
(633, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-22 07:59:57'),
(634, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-22 08:03:13'),
(635, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-22 08:07:41'),
(636, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-22 08:09:36'),
(637, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-22 08:13:52'),
(638, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital का काम सच में लाजवाब है। excellent, very satisfied, yes के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-10-22 08:17:44'),
(639, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-22 08:19:29'),
(640, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-22 08:22:34'),
(641, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-22 08:22:35'),
(642, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-22 08:22:36'),
(643, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-22 08:22:37'),
(644, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-22 08:29:03'),
(645, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-22 08:36:20'),
(646, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-22 08:40:18'),
(647, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-22 09:15:23'),
(648, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-22 09:15:26'),
(649, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care का काम सच में लाजवाब है। eye checkup, सर्वश्रेष्ठ eye specialist in ranjhi, jabalpur, सर्वश्रेष्ठ eye hospital, doctor’s consultation and guidance, treatment and care के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-10-22 11:01:15'),
(650, 10, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Navjyoti Eye Care for Eye Checkup, Best Eye Specialist in Ranjhi, Jabalpur, Doctor’s Consultation and Guidance. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-22 11:37:39'),
(651, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital mein experience bahut accha raha. Health Checkup, Best Hospital in Jabalpur, Best Hospital in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-10-22 11:46:03'),
(652, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care का काम सच में लाजवाब है। eye checkup, experienced eye doctor, सर्वश्रेष्ठ eye specialist in ranjhi, jabalpur, eye checkup process के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-10-22 12:09:54'),
(653, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care का काम सच में लाजवाब है। eye checkup, सर्वश्रेष्ठ eye hospital, treatment and care के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-10-22 12:21:00'),
(654, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care का काम सच में लाजवाब है। eye checkup, eye treatment, सर्वश्रेष्ठ eye hospital, eye checkup process के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-10-22 13:59:00'),
(655, 10, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Navjyoti Eye Care for Eye Checkup, Consultation for an Eye Problem, Routine Eye Examination, Best Eye Specialist in Ranjhi, Jabalpur, Experienced Eye Doctor, Best Eye Hospital, Quality Eye Care Services, Doctor’s Consultation and Guidance, Treatment and Care, Staff Behaviour and Clinic Environment. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-22 14:02:59'),
(656, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care का काम सच में लाजवाब है। eye checkup, experienced eye doctor, गुणवत्ता eye care सेवाएं, सर्वश्रेष्ठ eye hospital, सर्वश्रेष्ठ eye specialist in ranjhi, jabalpur, doctor’s consultation and guidance, eye checkup process, treatment and care, staff behaviour and clinic environment के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-10-22 14:09:29'),
(657, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care mein experience bahut accha raha. Eye Checkup, Best Eye Specialist in Ranjhi, Jabalpur, Doctor’s Consultation and Guidance, Staff Behaviour and Clinic Environment ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-10-22 14:09:50'),
(658, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care mein experience bahut accha raha. Eye Checkup, Best Eye Specialist in Ranjhi, Jabalpur, Doctor’s Consultation and Guidance, Staff Behaviour and Clinic Environment ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-10-22 14:10:12'),
(659, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-23 06:26:38'),
(660, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-23 06:33:24'),
(661, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Laparoscopic Surgery, Gynecology Treatment, Best Fertility Specialist Clinic in Jabalpur, Experienced Doctor, Best IVF Doctor in Jabalpur, Best Fertility Care, Best Gynecologist in Jabalpur, Best IVF Treatment in Jabalpur, Best Laparoscopic Surgeon in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-10-23 06:42:13'),
(662, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-23 06:43:40');
INSERT INTO `reviews` (`id`, `client_id`, `customer_name`, `customer_mobile`, `customer_email`, `rating`, `review`, `is_positive`, `created_at`) VALUES
(663, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-23 06:45:24'),
(664, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-23 06:45:30'),
(665, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-23 06:48:51'),
(666, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-23 06:50:33'),
(667, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-23 06:53:15'),
(668, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-23 07:20:12'),
(669, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Gynecology Treatment, Laparoscopic Surgery, Pregnancy Care, Best IVF Centre in Jabalpur, Best IVF Doctor in Jabalpur, Best IVF Treatment in Jabalpur, Best Fertility Care, Best Gynecologist in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-10-23 10:14:13'),
(670, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Laparoscopic Surgery, IVF Treatment, Best IVF Doctor in Jabalpur, Best IVF Centre in Jabalpur, Best Fertility Specialist Clinic in Jabalpur, Best IVF Treatment in Jabalpur, Best Fertility Care, Best Gynecologist in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-10-24 06:13:14'),
(671, 10, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Navjyoti Eye Care for Eye Checkup, Eye Treatment, Experienced Eye Doctor, Best Eye Hospital, Staff Behaviour and Clinic Environment. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-24 06:22:31'),
(672, 1, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Pluro Jabalpur Fertility and IVF Centre for Gynecology Treatment, Pregnancy Care. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-24 10:39:22'),
(673, 1, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Pluro Jabalpur Fertility and IVF Centre for Fertility Consultation, Best Fertility Specialist Clinic in Jabalpur, Best Gynecologist in Jabalpur. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-24 10:43:24'),
(674, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. IVF Treatment, Fertility Consultation, Laparoscopic Surgery, Pregnancy Care, Best IVF Doctor in Jabalpur, Best IVF Centre in Jabalpur, Best Fertility Specialist Clinic in Jabalpur, Best IVF Treatment in Jabalpur, Best Fertility Care, Best Gynecologist in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-10-24 10:47:03'),
(675, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. IVF Treatment, Fertility Consultation, Laparoscopic Surgery, Pregnancy Care, Best IVF Doctor in Jabalpur, Best IVF Centre in Jabalpur, Best Fertility Specialist Clinic in Jabalpur, Best IVF Treatment in Jabalpur, Best Fertility Care, Best Gynecologist in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-10-24 10:51:12'),
(676, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care का काम सच में लाजवाब है। eye treatment, सर्वश्रेष्ठ eye specialist in ranjhi, jabalpur, staff behaviour and clinic environment के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-10-24 11:33:14'),
(677, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital का काम सच में लाजवाब है। general consultation, सर्वश्रेष्ठ hospital in jabalpur, सर्वश्रेष्ठ hospital in jabalpur के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-10-25 16:45:12'),
(678, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-26 10:42:37'),
(679, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Laparoscopic Surgery, Fertility Consultation, IVF Treatment, Best IVF Doctor in Jabalpur, Best IVF Centre in Jabalpur, Best Fertility Specialist Clinic in Jabalpur, Best IVF Treatment in Jabalpur, Best Fertility Care, Best Gynecologist in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-10-26 10:55:36'),
(680, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care का काम सच में लाजवाब है। eye checkup, सर्वश्रेष्ठ eye specialist in ranjhi, jabalpur, staff behaviour and clinic environment के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-10-26 11:44:46'),
(681, 10, 'Google Reviewer', NULL, NULL, 4, 'Really glad I went with Navjyoti Eye Care for Eye Checkup, Best Eye Specialist in Ranjhi, Jabalpur, Doctor’s Consultation and Guidance, Eye Checkup Process, Treatment and Care, Staff Behaviour and Clinic Environment. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-26 14:42:18'),
(682, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care का काम सच में लाजवाब है। consultation for an eye problem, सर्वश्रेष्ठ eye hospital, staff behaviour and clinic environment, treatment and care के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-10-27 07:13:02'),
(683, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care का काम सच में लाजवाब है। routine eye examination, experienced eye doctor, eye checkup process के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-10-27 08:00:15'),
(684, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care का काम सच में लाजवाब है। eye checkup, eye treatment, सर्वश्रेष्ठ eye hospital, treatment and care, staff behaviour and clinic environment के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-10-27 08:11:10'),
(685, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. IVF Treatment, Laparoscopic Surgery, Fertility Consultation, Best IVF Doctor in Jabalpur, Best Fertility Specialist Clinic in Jabalpur, Best IVF Centre in Jabalpur, Best IVF Treatment in Jabalpur, Best Fertility Care, Best Gynecologist in Jabalpur, Best Laparoscopic Surgeon in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-10-27 09:13:35'),
(686, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care का काम सच में लाजवाब है। eye checkup, सर्वश्रेष्ठ eye specialist in ranjhi, jabalpur, treatment and care, staff behaviour and clinic environment के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-10-27 14:21:35'),
(687, 10, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Navjyoti Eye Care for Eye Checkup, Experienced Eye Doctor, Doctor’s Consultation and Guidance, Treatment and Care. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-27 14:49:58'),
(688, 7, 'Google Reviewer', NULL, NULL, 4, 'Really glad I went with Jabalpur Hospital for Inpatient Care, Trusted Healthcare Facility in Jabalpur, Trusted Healthcare Service. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-28 05:33:40'),
(689, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care का काम सच में लाजवाब है। eye checkup, सर्वश्रेष्ठ eye hospital, staff behaviour and clinic environment के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-10-28 14:22:48'),
(690, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care का काम सच में लाजवाब है। eye treatment, सर्वश्रेष्ठ eye hospital के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-10-28 14:28:23'),
(691, 9, 'Google Reviewer', NULL, NULL, 4, 'Life Medicity Multi Speciality Hospital mein experience bahut accha raha. Excellent, Very Satisfied, Yes ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-10-29 06:47:25'),
(692, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital का काम सच में लाजवाब है। excellent, very satisfied, yes के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-10-29 06:48:00'),
(693, 9, 'Google Reviewer', NULL, NULL, 4, 'Really glad I went with Life Medicity Multi Speciality Hospital for Good, Satisfied, Maybe. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-29 06:48:32'),
(694, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital mein experience bahut accha raha. Excellent, Very Satisfied, Yes ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-10-29 06:49:59'),
(695, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-29 06:51:41'),
(696, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-29 07:09:24'),
(697, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital mein experience bahut accha raha. Excellent, Very Satisfied, Yes ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-10-29 10:49:37'),
(698, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-30 06:33:56'),
(699, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital का काम सच में लाजवाब है। excellent, very satisfied, yes के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-10-30 10:18:32'),
(700, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-30 10:18:40'),
(701, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Average, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-30 10:19:08'),
(702, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-30 10:19:15'),
(703, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-30 10:19:18'),
(704, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-30 10:19:55'),
(705, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-30 10:22:13'),
(706, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-30 10:22:49'),
(707, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-30 10:23:05'),
(708, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-30 10:23:41'),
(709, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-30 10:26:51'),
(710, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-30 10:28:49'),
(711, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-30 10:30:09'),
(712, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Satisfied, Maybe. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-30 10:38:10'),
(713, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital का काम सच में लाजवाब है। excellent, very satisfied, yes के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-10-30 10:38:28'),
(714, 9, 'Ajay', '8871096454', 'ajaythakur00009999@gmail.com', 2, 'Good hospital ', 0, '2026-10-30 10:42:25'),
(715, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care का काम सच में लाजवाब है। eye checkup, eye treatment, सर्वश्रेष्ठ eye specialist in ranjhi, jabalpur, staff behaviour and clinic environment, treatment and care के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-10-30 12:15:49'),
(716, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Average, Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-31 06:01:18'),
(717, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-31 06:17:24'),
(718, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Average, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-31 06:19:13'),
(719, 9, 'Google Reviewer', NULL, NULL, 4, 'Life Medicity Multi Speciality Hospital का काम सच में लाजवाब है। average, satisfied, maybe के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मै', 1, '2026-10-31 06:28:10'),
(720, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital का काम सच में लाजवाब है। excellent, very satisfied, yes के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-10-31 08:12:42'),
(721, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Gynecology Treatment, Laparoscopic Surgery, Pregnancy Care, Fertility Consultation, Low Sperm Count Treatment, IVF Treatment, Best IVF Doctor in Jabalpur, Best IVF Centre in Jabalpur, Best Fertility Specialist Clinic in Jabalpur, Experienced Doctor, Best IVF Treatment in Jabalpur, Best Fertility Care, Best Gynecologist in Jabalpur, Best Laparoscopic Surgeon in Jabalpur, Trusted IVF Centre ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-10-31 08:13:38'),
(722, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-31 08:18:52'),
(723, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-31 08:19:05'),
(724, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-10-31 08:19:57'),
(725, 10, 'Google Reviewer', NULL, NULL, 4, 'Navjyoti Eye Care का काम सच में लाजवाब है। eye checkup, सर्वश्रेष्ठ eye hospital, eye checkup process के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-10-31 11:19:56'),
(726, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care का काम सच में लाजवाब है। eye treatment, eye checkup, experienced eye doctor, सर्वश्रेष्ठ eye hospital, staff behaviour and clinic environment के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-10-31 13:32:47'),
(727, 9, 'Google Reviewer', NULL, NULL, 5, ' अच्छा, neutral, maybe के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा।', 1, '2026-11-01 09:26:36'),
(728, 9, 'Google Reviewer', NULL, NULL, 5, 'Very good hospital ', 1, '2026-11-01 09:27:31'),
(729, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital का काम सच में लाजवाब है। excellent, maybe के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-11-01 09:42:53'),
(730, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Good, Neutral, Maybe. ', 1, '2026-11-01 10:25:33'),
(731, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital का काम सच में लाजवाब है। excellent, very satisfied, yes के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-11-01 10:28:02'),
(732, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital का काम सच में लाजवाब है। ', 1, '2026-11-01 10:28:10'),
(733, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital का काम सच में लाजवाब है। excellent, very satisfied, yes के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-11-01 10:28:33'),
(734, 9, 'Google Reviewer', NULL, NULL, 5, '. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-11-01 10:31:57'),
(735, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Good, Satisfied, Maybe. ', 1, '2026-11-02 06:33:27'),
(736, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital का काम सच में लाजवाब है। ', 1, '2026-11-02 06:41:26'),
(737, 9, 'Ramkrishna patel ', '7974439126', 'rskrishna1510@gmail.com', 3, 'Very good treatment ', 0, '2026-11-02 06:42:44'),
(738, 9, 'Google Reviewer', NULL, NULL, 5, '. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-11-02 06:44:55'),
(739, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Average, Very Satisfied, Maybe. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-11-02 06:46:33'),
(740, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, ', 1, '2026-11-02 06:52:36'),
(741, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital का काम सच में लाजवाब है। average, neutral, maybe के मामले में इनकी सेवा बहुत शानदार थी, ', 1, '2026-11-02 06:54:39'),
(742, 10, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Navjyoti Eye Care for Eye Checkup, Best Eye Specialist in Ranjhi, Jabalpur, Staff Behaviour and Clinic Environment, Doctor’s Consultation and Guidance. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-11-02 13:37:07'),
(743, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care का काम सच में लाजवाब है। eye checkup, eye treatment, सर्वश्रेष्ठ eye specialist in ranjhi, jabalpur, treatment and care, staff behaviour and clinic environment के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-11-02 14:41:06'),
(744, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care का काम सच में लाजवाब है। eye treatment, eye checkup, experienced eye doctor, सर्वश्रेष्ठ eye specialist in ranjhi, jabalpur, staff behaviour and clinic environment के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-11-02 14:54:33'),
(745, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Average, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-11-03 06:53:09'),
(746, 9, 'Google Reviewer', NULL, NULL, 5, '. Solid experience, will be back!', 1, '2026-11-03 07:05:49'),
(747, 9, 'Google Reviewer', NULL, NULL, 5, '. Solid experience, will be back!', 1, '2026-11-03 07:05:50'),
(748, 9, 'Google Reviewer', NULL, NULL, 5, '. Solid experience, will be back!', 1, '2026-11-03 07:05:52'),
(749, 9, 'Google Reviewer', NULL, NULL, 5, '. Solid experience, will be back!', 1, '2026-11-03 07:05:54'),
(750, 9, 'Google Reviewer', NULL, NULL, 5, '. Solid experience, will be back!', 1, '2026-11-03 07:05:55'),
(751, 9, 'Google Reviewer', NULL, NULL, 5, '. Solid experience, will be back!', 1, '2026-11-03 07:05:55'),
(752, 9, 'Google Reviewer', NULL, NULL, 5, '. Solid experience, will be back!', 1, '2026-11-03 07:05:56'),
(753, 9, 'Google Reviewer', NULL, NULL, 5, '. Solid experience, will be back!', 1, '2026-11-03 07:05:56'),
(754, 9, 'Google Reviewer', NULL, NULL, 5, '. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-11-03 07:09:20'),
(755, 9, 'Google Reviewer', NULL, NULL, 5, 'average, satisfied, maybe के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-11-03 07:11:04'),
(756, 9, 'Google Reviewer', NULL, NULL, 4, 'Life Medicity Multi Speciality Hospital का काम सच में लाजवाब है। अच्छा, satisfied, yes के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-11-03 07:15:10'),
(757, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Average, Satisfied, Maybe. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-11-03 07:57:54'),
(758, 1, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Pluro Jabalpur Fertility and IVF Centre for IVF Treatment, Best IVF Doctor in Jabalpur, Best Fertility Specialist Clinic in Jabalpur, Experienced Doctor, Best IVF Centre in Jabalpur, Best IVF Treatment in Jabalpur, Trusted IVF Centre. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-11-03 10:24:44'),
(759, 10, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Navjyoti Eye Care for Eye Checkup, Experienced Eye Doctor, Doctor’s Consultation and Guidance. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-11-03 12:29:45'),
(760, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care का काम सच में लाजवाब है। eye checkup, सर्वश्रेष्ठ eye specialist in ranjhi, jabalpur, staff behaviour and clinic environment, treatment and care के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-11-03 13:36:42'),
(761, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care का काम सच में लाजवाब है। eye checkup, सर्वश्रेष्ठ eye specialist in ranjhi, jabalpur, staff behaviour and clinic environment, treatment and care के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-11-03 13:36:58'),
(762, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care का काम सच में लाजवाब है। consultation for an eye problem, गुणवत्ता eye care सेवाएं, doctor’s consultation and guidance, staff behaviour and clinic environment, eye checkup process के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-11-03 14:04:51'),
(763, 9, 'Google Reviewer', NULL, NULL, 4, 'Life Medicity Multi Speciality Hospital का काम सच में लाजवाब है। excellent, very satisfied, maybe के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-11-04 08:06:23'),
(764, 9, 'Google Reviewer', NULL, NULL, 4, 'Really glad I went with Life Medicity Multi Speciality Hospital for Average, Very Satisfied, ', 1, '2026-11-04 08:15:33'),
(765, 10, 'Google Reviewer', NULL, NULL, 4, 'Really glad I went with Navjyoti Eye Care for Eye Checkup, Quality Eye Care Services, Doctor’s Consultation and Guidance. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-11-04 08:34:52'),
(766, 10, 'Google Reviewer', NULL, NULL, 4, 'Navjyoti Eye Care का काम सच में लाजवाब है। eye checkup, सर्वश्रेष्ठ eye specialist in ranjhi, jabalpur, doctor’s consultation and guidance के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-11-04 08:36:34'),
(767, 10, 'Google Reviewer', NULL, NULL, 4, 'Navjyoti Eye Care का काम सच में लाजवाब है। eye checkup, सर्वश्रेष्ठ eye specialist in ranjhi, jabalpur, doctor’s consultation and guidance के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-11-04 08:37:13'),
(768, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital का काम सच में लाजवाब है। excellent, satisfied, yes के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-11-04 08:37:38'),
(769, 9, 'Google Reviewer', NULL, NULL, 4, 'Life Medicity Multi Speciality Hospital का काम सच में लाजवाब है। excellent, satisfied, yes के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-11-04 08:41:28'),
(770, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital का काम सच में लाजवाब है। average, satisfied, yes के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-11-04 10:45:29'),
(771, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. IVF Treatment, Fertility Consultation, Low Sperm Count Treatment, Laparoscopic Surgery, Pregnancy Care, Best IVF Doctor in Jabalpur, Best IVF Centre in Jabalpur, Experienced Doctor, Best IVF Treatment in Jabalpur, Best Fertility Care, Trusted IVF Centre ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-11-04 11:01:38'),
(772, 1, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Pluro Jabalpur Fertility and IVF Centre for Gynecology Treatment, Best IVF Doctor in Jabalpur, Best Fertility Specialist Clinic in Jabalpur, Best IVF Centre in Jabalpur, Experienced Doctor, Best Fertility Care, Best Gynecologist in Jabalpur, Best Laparoscopic Surgeon in Jabalpur, Trusted IVF Centre. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-11-05 08:58:32'),
(773, 1, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Pluro Jabalpur Fertility and IVF Centre for Gynecology Treatment, Fertility Consultation, Best IVF Doctor in Jabalpur, Best IVF Centre in Jabalpur, Best Fertility Specialist Clinic in Jabalpur, Experienced Doctor, Best IVF Treatment in Jabalpur, Best Fertility Care, Best Gynecologist in Jabalpur, Best Laparoscopic Surgeon in Jabalpur, Trusted IVF Centre. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-11-05 08:59:33'),
(774, 1, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Pluro Jabalpur Fertility and IVF Centre for Gynecology Treatment, Pregnancy Care, Best IVF Doctor in Jabalpur, Best IVF Centre in Jabalpur, Best Fertility Specialist Clinic in Jabalpur, Experienced Doctor, Best IVF Treatment in Jabalpur, Best Fertility Care, Best Gynecologist in Jabalpur, Best Laparoscopic Surgeon in Jabalpur, Trusted IVF Centre. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-11-05 09:01:42'),
(775, 10, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Navjyoti Eye Care for Eye Checkup, Best Eye Specialist in Ranjhi, Jabalpur, Staff Behaviour and Clinic Environment, Treatment and Care. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-11-05 15:04:21'),
(776, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care का काम सच में लाजवाब है। eye checkup, eye treatment, सर्वश्रेष्ठ eye specialist in ranjhi, jabalpur, staff behaviour and clinic environment, treatment and care के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-11-06 07:42:38'),
(777, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care का काम सच में लाजवाब है। eye checkup, eye treatment, सर्वश्रेष्ठ eye specialist in ranjhi, jabalpur, staff behaviour and clinic environment के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-11-07 06:31:14'),
(778, 10, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Navjyoti Eye Care for Eye Checkup, Routine Eye Examination, Consultation for an Eye Problem, Best Eye Specialist in Ranjhi, Jabalpur, Doctor’s Consultation and Guidance. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-11-07 07:54:56'),
(779, 9, 'Abhishek ', '7000635440', 'mehraashu69@gmail.com', 1, 'Bhuat hi ghatiya hospital ', 0, '2026-11-08 11:04:51'),
(780, 2, 'Google Reviewer', NULL, NULL, 5, 'DOAGuru InfoSystems का काम सच में लाजवाब है। web development, on-time डिलीवरी के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-11-09 08:10:52'),
(781, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Laparoscopic Surgery, Best Fertility Specialist Clinic in Jabalpur, Best Laparoscopic Surgeon in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-11-10 07:59:33'),
(782, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Laparoscopic Surgery, IVF Treatment, Best IVF Doctor in Jabalpur, Best Laparoscopic Surgeon in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-11-10 08:00:43'),
(783, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care mein experience bahut accha raha. Eye Treatment, Experienced Eye Doctor, Staff Behaviour and Clinic Environment ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-11-10 13:22:12'),
(784, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Pregnancy Care, Laparoscopic Surgery, Best IVF Centre in Jabalpur, Best IVF Doctor in Jabalpur, Best Fertility Specialist Clinic in Jabalpur, Experienced Doctor, Best Laparoscopic Surgeon in Jabalpur, Trusted IVF Centre ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-11-11 07:29:03'),
(785, 10, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Navjyoti Eye Care for Eye Checkup, Eye Treatment, Best Eye Specialist in Ranjhi, Jabalpur, Staff Behaviour and Clinic Environment, Treatment and Care. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-11-11 13:33:57'),
(786, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Fertility Consultation, Gynecology Treatment, Laparoscopic Surgery, Pregnancy Care, Best IVF Doctor in Jabalpur, Best IVF Centre in Jabalpur, Experienced Doctor, Best Laparoscopic Surgeon in Jabalpur, Trusted IVF Centre ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-11-12 06:50:33'),
(787, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Fertility Consultation, Gynecology Treatment, Laparoscopic Surgery, Pregnancy Care, Best IVF Doctor in Jabalpur, Best IVF Centre in Jabalpur, Experienced Doctor, Best Laparoscopic Surgeon in Jabalpur, Trusted IVF Centre ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-11-12 06:51:01'),
(788, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Fertility Consultation, Gynecology Treatment, Laparoscopic Surgery, Pregnancy Care, Best IVF Doctor in Jabalpur, Best IVF Centre in Jabalpur, Experienced Doctor, Best Laparoscopic Surgeon in Jabalpur, Trusted IVF Centre ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-11-12 06:51:38'),
(789, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Fertility Consultation, Gynecology Treatment, Laparoscopic Surgery, Pregnancy Care, Best IVF Doctor in Jabalpur, Best IVF Centre in Jabalpur, Experienced Doctor, Best Laparoscopic Surgeon in Jabalpur, Trusted IVF Centre ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-11-12 06:52:24'),
(790, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Fertility Consultation, Gynecology Treatment, Laparoscopic Surgery, Pregnancy Care, Best IVF Doctor in Jabalpur, Best IVF Centre in Jabalpur, Experienced Doctor, Best Laparoscopic Surgeon in Jabalpur, Trusted IVF Centre ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-11-12 06:52:53'),
(791, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Pregnancy Care, Experienced Doctor, Best Laparoscopic Surgeon in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-11-12 08:37:27'),
(792, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Gynecology Treatment, Laparoscopic Surgery, Pregnancy Care, Best IVF Doctor in Jabalpur, Best Fertility Specialist Clinic in Jabalpur, Best IVF Centre in Jabalpur, Best IVF Treatment in Jabalpur, Best Fertility Care, Best Gynecologist in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-11-12 09:03:47'),
(793, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care का काम सच में लाजवाब है। eye checkup, experienced eye doctor, eye checkup process के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-11-13 14:09:32'),
(794, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital का काम सच में लाजवाब है। अच्छा, satisfied, maybe के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-11-16 07:26:45'),
(795, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital का काम सच में लाजवाब है। अच्छा, satisfied, maybe के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-11-16 07:26:50'),
(796, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital का काम सच में लाजवाब है। अच्छा, satisfied, maybe के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-11-16 07:26:50'),
(797, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital का काम सच में लाजवाब है। अच्छा, satisfied, maybe के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-11-16 07:26:52'),
(798, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital का काम सच में लाजवाब है। excellent, very satisfied, yes के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-11-16 07:29:03'),
(799, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital का काम सच में लाजवाब है। excellent, very satisfied, yes के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-11-16 07:29:04'),
(800, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-11-16 07:51:59'),
(801, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Laparoscopic Surgery, Pregnancy Care, Best IVF Doctor in Jabalpur, Best IVF Centre in Jabalpur, Experienced Doctor, Best IVF Treatment in Jabalpur, Best Laparoscopic Surgeon in Jabalpur, Best Gynecologist in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-11-17 05:36:56'),
(802, 9, 'Priyansh Dubey', '9926537616', 'priyanshdubey1380@gmail.com', 2, 'good', 0, '2026-11-18 07:03:20'),
(803, 9, 'Google Reviewer', NULL, NULL, 5, '10 months ago\nI was blown away by the exceptional care i received at life medicity hospital. The staffs were professional, compassionate and went above and beyond to make sure I was comfortable and informed. The hospital\'s facility were state of the art and the food was surprisingly good . I\'m so grateful for the excellent care i received\nThank you life medicity hospital for the best treatment', 1, '2026-11-18 07:03:33'),
(804, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-11-18 07:03:49'),
(805, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital me treatment sahi hai par nursing staff baat nahi sunta hame hi jana padh raha hai ward nahi reheta hai ', 1, '2026-11-18 07:10:37'),
(806, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital mein experience bahut accha raha. Poor, Excellent, Very Satisfied, Yes ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-11-18 07:32:29'),
(807, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital mein experience bahut accha raha. Poor, Excellent, Very Satisfied, Yes ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-11-18 07:32:54'),
(808, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-11-18 07:33:30'),
(809, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Laparoscopic Surgery, Pregnancy Care, Best Fertility Specialist Clinic in Jabalpur, Experienced Doctor, Best Gynecologist in Jabalpur, Best Laparoscopic Surgeon in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-11-18 08:03:45'),
(810, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital mein experience bahut accha raha. Excellent, Very Satisfied, Yes ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-11-19 07:09:05'),
(811, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital mein experience bahut accha raha. Excellent, Very Satisfied, Yes ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-11-19 07:14:38'),
(812, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital mein experience bahut accha raha. Excellent, Very Satisfied, Yes ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-11-19 07:16:36'),
(813, 9, 'Google Reviewer', NULL, NULL, 4, 'Dr manika dubey mam is very good dr for gynecologist ', 1, '2026-11-19 07:19:05'),
(814, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Laparoscopic Surgery, Fertility Consultation, Low Sperm Count Treatment, Best IVF Doctor in Jabalpur, Best IVF Centre in Jabalpur, Best Fertility Specialist Clinic in Jabalpur, Best IVF Treatment in Jabalpur, Best Fertility Care, Best Gynecologist in Jabalpur, Best Laparoscopic Surgeon in Jabalpur, Trusted IVF Centre ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-11-19 07:21:42'),
(815, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Laparoscopic Surgery, Fertility Consultation, Low Sperm Count Treatment, Best IVF Doctor in Jabalpur, Best IVF Centre in Jabalpur, Best Fertility Specialist Clinic in Jabalpur, Best IVF Treatment in Jabalpur, Best Fertility Care, Best Gynecologist in Jabalpur, Best Laparoscopic Surgeon in Jabalpur, Trusted IVF Centre ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-11-19 07:21:43'),
(816, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. IVF Treatment, Fertility Consultation, Low Sperm Count Treatment, Gynecology Treatment, Best IVF Doctor in Jabalpur, Best IVF Centre in Jabalpur, Best Fertility Specialist Clinic in Jabalpur, Best IVF Treatment in Jabalpur, Best Fertility Care, Best Gynecologist in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-11-19 07:22:08'),
(817, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Gynecology Treatment, Pregnancy Care, Best IVF Doctor in Jabalpur, Best IVF Centre in Jabalpur, Best IVF Treatment in Jabalpur, Best Fertility Care, Best Gynecologist in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-11-19 07:23:06'),
(818, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital mein experience bahut accha raha. Excellent, Very Satisfied, Yes ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-11-19 07:27:01'),
(819, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital mein experience bahut accha raha. Excellent, Very Satisfied, Yes ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-11-19 07:27:22'),
(820, 9, 'Google Reviewer', NULL, NULL, 4, 'Dr Mukesh Shrivastava sir is very good dr for gastroenterology ', 1, '2026-11-19 07:27:26'),
(821, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Gynecology Treatment, Pregnancy Care, Best IVF Doctor in Jabalpur, Best IVF Centre in Jabalpur, Best IVF Treatment in Jabalpur, Best Fertility Care, Best Gynecologist in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-11-19 07:29:19'),
(822, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-11-19 07:30:46'),
(823, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital mein experience bahut accha raha. Excellent, Very Satisfied, Yes ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-11-19 07:31:22'),
(824, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital mein experience bahut accha raha. Excellent, Very Satisfied, Yes ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-11-19 07:34:29'),
(825, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital mein experience bahut accha raha. Excellent, Very Satisfied, Yes ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-11-19 07:39:54'),
(826, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital mein experience bahut accha raha. Excellent, Very Satisfied, Yes ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-11-19 07:40:10'),
(827, 1, 'Google Reviewer', NULL, NULL, 4, 'Really glad I went with Pluro Jabalpur Fertility and IVF Centre for Laparoscopic Surgery, Best Fertility Specialist Clinic in Jabalpur, Best Laparoscopic Surgeon in Jabalpur. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-11-19 07:42:57');
INSERT INTO `reviews` (`id`, `client_id`, `customer_name`, `customer_mobile`, `customer_email`, `rating`, `review`, `is_positive`, `created_at`) VALUES
(828, 1, 'Google Reviewer', NULL, NULL, 4, 'Really glad I went with Pluro Jabalpur Fertility and IVF Centre for Laparoscopic Surgery, Best Fertility Specialist Clinic in Jabalpur, Best Laparoscopic Surgeon in Jabalpur. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-11-19 07:42:58'),
(829, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital mein experience bahut accha raha. Excellent, Very Satisfied, Yes ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-11-19 07:43:24'),
(830, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Average, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-11-19 07:43:29'),
(831, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. IVF Treatment, Fertility Consultation, Gynecology Treatment, Best IVF Doctor in Jabalpur, Best Fertility Specialist Clinic in Jabalpur, Best IVF Centre in Jabalpur, Best IVF Treatment in Jabalpur, Best Fertility Care, Best Gynecologist in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-11-19 09:38:10'),
(832, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. IVF Treatment, Fertility Consultation, Gynecology Treatment, Best IVF Doctor in Jabalpur, Best Fertility Specialist Clinic in Jabalpur, Best IVF Centre in Jabalpur, Best IVF Treatment in Jabalpur, Best Fertility Care, Best Gynecologist in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-11-19 09:38:11'),
(833, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. IVF Treatment, Fertility Consultation, Best IVF Doctor in Jabalpur, Best IVF Centre in Jabalpur, Best Fertility Specialist Clinic in Jabalpur, Best IVF Treatment in Jabalpur, Best Fertility Care ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-11-19 09:39:28'),
(834, 1, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Pluro Jabalpur Fertility and IVF Centre for IVF Treatment, Best IVF Doctor in Jabalpur, Best IVF Treatment in Jabalpur. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-11-19 09:39:52'),
(835, 10, 'Google Reviewer', NULL, NULL, 5, 'Navjyoti Eye Care का काम सच में लाजवाब है। eye checkup, eye treatment, experienced eye doctor, सर्वश्रेष्ठ eye specialist in ranjhi, jabalpur, staff behaviour and clinic environment के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-11-19 13:03:15'),
(836, 7, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Jabalpur Hospital for Inpatient Care, Experienced Doctors, Professional Medical Team. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-11-20 07:59:59'),
(837, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Laparoscopic Surgery, Pregnancy Care, Gynecology Treatment, Best IVF Doctor in Jabalpur, Best IVF Centre in Jabalpur, Best Fertility Specialist Clinic in Jabalpur, Best Fertility Care, Best Gynecologist in Jabalpur, Best Laparoscopic Surgeon in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-11-24 07:11:17'),
(838, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital mein experience bahut accha raha. Excellent, Very Satisfied, Yes ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-11-24 07:54:02'),
(839, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital mein experience bahut accha raha. Excellent, Very Satisfied, Yes ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-11-24 08:02:38'),
(840, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Pregnancy Care, Experienced Doctor, Best Gynecologist in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-11-24 08:03:15'),
(841, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital mein experience bahut accha raha. Excellent, Very Satisfied, Yes ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-11-24 08:04:13'),
(842, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital mein experience bahut accha raha. Excellent, Very Satisfied, Yes ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-11-24 08:05:45'),
(843, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital का काम सच में लाजवाब है। average, satisfied, maybe के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-11-24 08:37:23'),
(844, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital का काम सच में लाजवाब है। average, satisfied, maybe के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-11-24 08:37:39'),
(845, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Average, Satisfied, Maybe. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-11-24 09:11:55'),
(846, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital mein experience bahut accha raha. Excellent, Very Satisfied, Yes ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-11-24 09:21:41'),
(847, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-11-24 09:44:28'),
(848, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-11-24 10:57:26'),
(849, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital mein experience bahut accha raha. Excellent, Very Satisfied, Yes ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-11-25 06:21:08'),
(850, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital का काम सच में लाजवाब है। excellent, very satisfied, yes के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-11-25 06:26:10'),
(851, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital का काम सच में लाजवाब है। emergency treatment, specialist consultation, diagnostic सेवाएं, 24×7 emergency सहायता, experienced doctors, सर्वश्रेष्ठ hospital in jabalpur के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-11-25 07:18:30'),
(852, 7, 'Google Reviewer', NULL, NULL, 5, 'Jabalpur Hospital का काम सच में लाजवाब है। emergency treatment, specialist consultation, diagnostic सेवाएं, 24×7 emergency सहायता, experienced doctors, सर्वश्रेष्ठ hospital in jabalpur के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-11-25 07:19:01'),
(853, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital mein experience bahut accha raha. Excellent, Very Satisfied, Yes ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-11-25 09:37:30'),
(854, 9, 'Google Reviewer', NULL, NULL, 4, 'Life Medicity Multi Speciality Hospital का काम सच में लाजवाब है। अच्छा, satisfied, maybe के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!', 1, '2026-11-25 09:53:20'),
(855, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-11-25 10:12:02'),
(856, 1, 'Google Reviewer', NULL, NULL, 5, 'Pluro Jabalpur Fertility and IVF Centre mein experience bahut accha raha. Pregnancy Care, Laparoscopic Surgery, Best IVF Doctor in Jabalpur, Best IVF Centre in Jabalpur, Best Gynecologist in Jabalpur, Best Laparoscopic Surgeon in Jabalpur ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-11-25 10:32:04'),
(857, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-11-25 10:45:23'),
(858, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital mein experience bahut accha raha. Excellent, Very Satisfied, Yes ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-11-26 06:20:39'),
(859, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Poor, Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-11-26 06:31:55'),
(860, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Excellent, Very Satisfied, Yes. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-11-26 06:46:44'),
(861, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Average, Satisfied, Maybe. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-11-26 08:46:12'),
(862, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Good, Satisfied, Maybe. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-11-26 08:47:19'),
(863, 9, 'Noorjahan', NULL, 'shekhaarif0761@gmail.com', 2, 'Good ', 0, '2026-11-26 09:03:52'),
(864, 9, 'Google Reviewer', NULL, NULL, 5, 'Dr abha diwan mam is very good dermatologist ', 1, '2026-11-26 09:58:15'),
(865, 9, 'Google Reviewer', NULL, NULL, 5, 'Life Medicity Multi Speciality Hospital mein experience bahut accha raha. Excellent, Very Satisfied, Yes ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!', 1, '2026-11-26 10:44:07'),
(866, 9, 'Google Reviewer', NULL, NULL, 5, 'Really glad I went with Life Medicity Multi Speciality Hospital for Average, Satisfied, Maybe. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!', 1, '2026-11-27 05:07:30');

-- --------------------------------------------------------

--
-- Table structure for table `review_questions`
--

CREATE TABLE `review_questions` (
  `id` bigint(20) NOT NULL,
  `client_id` bigint(20) NOT NULL,
  `question` varchar(500) NOT NULL,
  `options` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`options`)),
  `sort_order` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `review_questions`
--

INSERT INTO `review_questions` (`id`, `client_id`, `question`, `options`, `sort_order`, `is_active`) VALUES
(4, 2, 'Which service did you take?', '[\"Digital Marketing\", \"Web Development\", \"SEO Services\", \"Social Media Marketing\", \"Video Editing\", \"Graphic Designing\"]', 1, 1),
(5, 2, 'Why did you choose DOAGuru InfoSystems?', '[\"Great Communication\", \"On-time Delivery\", \"Professional Behavior\", \"Increased Sales/Leads\", \"Exceeded Expectations\"]', 2, 1),
(18, 5, 'Which service did you take?', '[\"X-Ray Service\",\"Ultrasound Scan\",\"Pathology Test\",\"Blood Test\",\"Health Checkup\"]', 0, 1),
(19, 5, 'Why did you choose us?', '[\"Best X-Ray Center in Rewa\",\"Best Ultrasound Centre in Rewa\",\"Trusted Pathology Lab\",\"Experienced Doctor\"]', 1, 1),
(20, 5, 'How would you describe our services?', '[\"Best Diagnostic Center in Rewa\",\"Best Pathology Lab in Rewa\",\"Accurate Reports\",\"Trusted Healthcare Service\",\"Highly Recommended\"]', 2, 1),
(21, 6, 'Which treatment/service did you take?', '[\"Normal Delivery Care\",\"C-Section Treatment\",\"Gynecology Treatment\",\"Laparoscopic Surgery\",\"Cancer Surgery\",\"PCOD Treatment\",\"Ectopic Pregnancy Treatment\",\"General Surgery\"]', 0, 1),
(22, 6, 'Why did you choose National Hospital?', '[\"Best Surgery Hospital in Rewa\",\"Best Delivery Hospital in Rewa\",\"Best Surgery Hospital in Rewa\",\"Best Gynecology Hospital in Rewa\",\"Experienced Doctors\"]', 1, 1),
(23, 6, 'How would you describe our services?', '[\"Cancer Surgery Hospital in Rewa\",\"Laparoscopic Surgery Hospital in Rewa\",\"Trusted Healthcare Service\",\"Best Patient Care\"]', 2, 1),
(24, 7, 'Which service did you take?', '[\"General Consultation\",\"Emergency Treatment\",\"Health Checkup\",\"Specialist Consultation\",\"Inpatient Care\",\"Diagnostic Services\",\"Surgery Treatment\"]', 0, 1),
(25, 7, 'Why did you choose Jabalpur Hospital?', '[\"Best Hospital in Jabalpur\",\"Trusted Healthcare Facility in Jabalpur\",\"Experienced Doctors\",\"Advanced Medical Services\",\"24×7 Emergency Support\"]', 1, 1),
(26, 7, 'How would you describe our hospital?', '[\"Best Hospital in Jabalpur\",\"Medical Care Center in Jabalpur\",\"Trusted Healthcare Service\",\"Professional Medical Team\"]', 2, 1),
(27, 3, 'Which treatment/service did you take?', '[\"IVF Treatment\",\"Fertility Consultation\",\"Laparoscopic Surgery\",\"Gynecology Treatment\",\"Pregnancy Care\",\"Infertility Treatment\"]', 0, 1),
(28, 3, 'Which service best describes us?', '[\"Best IVF Centre in Rewa\",\"Best Fertility Clinic in Rewa\",\"Best Gynecologist in Rewa\",\"Best Laparoscopic Surgeon in Rewa\",\"Trusted Women\'s Care Clinic\"]', 1, 1),
(29, 3, 'What did you like most about your experience?', '[\"Doctor\'s Guidance\",\"Staff Behavior\",\"Treatment Quality\",\"Friendly Communication\"]', 2, 1),
(39, 8, 'Which treatment/service did you take?', '[\"Infertility Treatment\",\"Pregnancy Care\",\"Normal Delivery\",\"Gynecology Consultation\",\"Women\'s Health Treatment\"]', 0, 1),
(40, 8, 'Why did you choose Dr. Pooja Gangwar Patel?', '[\"Best Gynecologist in Rewa\",\"Experienced Doctor\",\"Best Infertility Doctor in Rewa\",\"Trusted Pregnancy Care\"]', 1, 1),
(41, 8, 'How was your consultation experience?', '[\"Very Helpful\",\"Caring & Supportive\",\"Professional Advice\",\"Excellent Experience\"]', 2, 1),
(48, 1, 'Which treatment/service did you take?', '[\"IVF Treatment\",\"Fertility Consultation\",\"Low Sperm Count Treatment\",\"Gynecology Treatment\",\"Laparoscopic Surgery\",\"Pregnancy Care\"]', 0, 1),
(49, 1, 'Why did you choose our clinic?', '[\"Best IVF Doctor in Jabalpur\",\"Best IVF Centre in Jabalpur\",\"Best Fertility Specialist Clinic in Jabalpur\",\"Experienced Doctor\"]', 1, 1),
(50, 1, 'How would you describe our services?', '[\"Best IVF Treatment in Jabalpur\",\"Best Fertility Care\",\"Best Gynecologist in Jabalpur\",\"Best Laparoscopic Surgeon in Jabalpur\",\"Trusted IVF Centre\"]', 2, 1),
(60, 9, 'How would you rate the quality of care you received?', '[\"Excellent\",\"Average\",\"Good\",\"Poor\"]', 0, 1),
(61, 9, 'How satisfied were you with our doctors and hospital staff?', '[\"Very Satisfied\",\"Satisfied\",\"Neutral\",\"Dissatisfied\"]', 1, 1),
(62, 9, 'Would you recommend Life Medicity Multi Speciality Hospital to your family and friends?', '[\"Yes\",\"Maybe\",\"No\"]', 2, 1),
(63, 10, 'What service did you visit Navjyoti Eye Care for?', '[\"Eye Checkup\",\"Eye Treatment\",\"Routine Eye Examination\",\"Consultation for an Eye Problem\"]', 0, 1),
(64, 10, 'What was the main reason you chose this eye care clinic?', '[\"Best Eye Specialist in Ranjhi, Jabalpur\",\"Experienced Eye Doctor\",\"Best Eye Hospital\",\"Quality Eye Care Services\"]', 1, 1),
(65, 10, 'What did you like most about your experience?', '[\"Doctor’s Consultation and Guidance\",\"Eye Checkup Process\",\"Treatment and Care\",\"Staff Behaviour and Clinic Environment\"]', 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `subscriptions`
--

CREATE TABLE `subscriptions` (
  `id` bigint(20) NOT NULL,
  `client_id` bigint(20) NOT NULL,
  `plan_id` bigint(20) NOT NULL,
  `status` enum('active','inactive','expired','cancelled') DEFAULT 'active',
  `start_date` datetime NOT NULL DEFAULT current_timestamp(),
  `end_date` datetime NOT NULL,
  `renewal_date` datetime DEFAULT NULL,
  `auto_renew` tinyint(1) DEFAULT 1,
  `amount_paid` decimal(10,2) DEFAULT NULL,
  `payment_method` varchar(50) DEFAULT NULL,
  `transaction_id` varchar(100) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `reminder_sent` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subscriptions`
--

INSERT INTO `subscriptions` (`id`, `client_id`, `plan_id`, `status`, `start_date`, `end_date`, `renewal_date`, `auto_renew`, `amount_paid`, `payment_method`, `transaction_id`, `notes`, `created_at`, `updated_at`, `reminder_sent`) VALUES
(1, 1, 2, 'expired', '2026-06-13 09:17:25', '2026-07-13 09:17:25', NULL, 1, 399.00, 'manual', '', '', '2026-06-13 09:17:25', '2026-06-13 09:20:42', 0),
(2, 1, 2, 'active', '2026-06-13 09:20:42', '2026-07-13 09:20:42', NULL, 1, 399.00, 'manual', '', '', '2026-06-13 09:20:42', '2026-06-13 09:20:42', 0),
(3, 7, 2, 'expired', '2026-06-13 14:28:02', '2026-07-13 14:28:02', NULL, 1, 399.00, 'manual', '', '', '2026-06-13 14:28:02', '2026-06-18 08:39:11', 0),
(4, 6, 2, 'expired', '2026-06-13 14:28:11', '2026-07-13 14:28:11', NULL, 1, 399.00, 'manual', '', '', '2026-06-13 14:28:11', '2026-06-18 08:39:16', 0),
(5, 5, 2, 'expired', '2026-06-13 14:28:18', '2026-07-13 14:28:18', NULL, 1, 399.00, 'manual', '', '', '2026-06-13 14:28:18', '2026-06-18 08:39:24', 0),
(6, 3, 2, 'expired', '2026-06-13 14:28:25', '2026-07-13 14:28:25', NULL, 1, 399.00, 'manual', '', '', '2026-06-13 14:28:25', '2026-06-18 08:39:31', 0),
(7, 8, 2, 'cancelled', '2026-06-18 08:39:05', '2026-10-07 13:14:28', '2026-09-07 13:14:28', 1, 399.00, 'manual', '', '', '2026-06-18 08:39:05', '2026-09-07 13:19:15', 0),
(8, 7, 2, 'active', '2026-06-18 08:39:11', '2026-07-18 08:39:11', NULL, 1, 399.00, 'manual', '', '', '2026-06-18 08:39:11', '2026-06-18 08:39:11', 0),
(9, 6, 2, 'active', '2026-06-18 08:39:16', '2026-07-18 08:39:16', NULL, 1, 399.00, 'manual', '', '', '2026-06-18 08:39:16', '2026-06-18 08:39:16', 0),
(10, 5, 2, 'cancelled', '2026-06-18 08:39:24', '2026-07-18 08:39:24', NULL, 1, 399.00, 'manual', '', '', '2026-06-18 08:39:24', '2026-09-07 13:19:23', 0),
(11, 3, 2, 'cancelled', '2026-06-18 08:39:31', '2026-07-18 08:39:31', NULL, 1, 399.00, 'manual', '', '', '2026-06-18 08:39:31', '2026-09-07 13:19:26', 0),
(12, 10, 2, 'active', '2026-09-15 12:34:09', '2026-10-15 12:34:09', NULL, 1, 399.00, 'manual', '', '', '2026-09-15 12:34:09', '2026-09-15 12:34:09', 0);

-- --------------------------------------------------------

--
-- Table structure for table `subscription_history`
--

CREATE TABLE `subscription_history` (
  `id` bigint(20) NOT NULL,
  `client_id` bigint(20) NOT NULL,
  `subscription_id` bigint(20) DEFAULT NULL,
  `action` enum('created','renewed','upgraded','downgraded','cancelled','expired') NOT NULL,
  `old_plan_id` bigint(20) DEFAULT NULL,
  `new_plan_id` bigint(20) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subscription_history`
--

INSERT INTO `subscription_history` (`id`, `client_id`, `subscription_id`, `action`, `old_plan_id`, `new_plan_id`, `notes`, `created_at`) VALUES
(1, 1, 1, 'created', NULL, 2, NULL, '2026-06-13 09:17:25'),
(2, 1, 1, 'upgraded', 2, 2, 'Subscription changed', '2026-06-13 09:20:42'),
(3, 1, 2, 'created', NULL, 2, NULL, '2026-06-13 09:20:42'),
(4, 7, 3, 'created', NULL, 2, NULL, '2026-06-13 14:28:02'),
(5, 6, 4, 'created', NULL, 2, NULL, '2026-06-13 14:28:11'),
(6, 5, 5, 'created', NULL, 2, NULL, '2026-06-13 14:28:18'),
(7, 3, 6, 'created', NULL, 2, NULL, '2026-06-13 14:28:25'),
(8, 8, 7, 'created', NULL, 2, NULL, '2026-06-18 08:39:05'),
(9, 7, 3, 'upgraded', 2, 2, 'Subscription changed', '2026-06-18 08:39:11'),
(10, 7, 8, 'created', NULL, 2, NULL, '2026-06-18 08:39:11'),
(11, 6, 4, 'upgraded', 2, 2, 'Subscription changed', '2026-06-18 08:39:16'),
(12, 6, 9, 'created', NULL, 2, NULL, '2026-06-18 08:39:16'),
(13, 5, 5, 'upgraded', 2, 2, 'Subscription changed', '2026-06-18 08:39:24'),
(14, 5, 10, 'created', NULL, 2, NULL, '2026-06-18 08:39:24'),
(15, 3, 6, 'upgraded', 2, 2, 'Subscription changed', '2026-06-18 08:39:31'),
(16, 3, 11, 'created', NULL, 2, NULL, '2026-06-18 08:39:31'),
(17, 8, 7, 'renewed', NULL, NULL, NULL, '2026-09-07 13:14:28'),
(18, 8, 7, 'cancelled', NULL, NULL, NULL, '2026-09-07 13:19:15'),
(19, 5, 10, 'cancelled', NULL, NULL, NULL, '2026-09-07 13:19:23'),
(20, 3, 11, 'cancelled', NULL, NULL, NULL, '2026-09-07 13:19:26'),
(21, 10, 12, 'created', NULL, 2, NULL, '2026-09-15 12:34:09');

-- --------------------------------------------------------

--
-- Table structure for table `subscription_plans`
--

CREATE TABLE `subscription_plans` (
  `id` bigint(20) NOT NULL,
  `plan_code` varchar(50) NOT NULL,
  `plan_name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `currency` varchar(5) DEFAULT 'INR',
  `duration_days` int(11) DEFAULT 30,
  `max_reviews_per_month` int(11) DEFAULT NULL,
  `features` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`features`)),
  `badge` varchar(100) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subscription_plans`
--

INSERT INTO `subscription_plans` (`id`, `plan_code`, `plan_name`, `description`, `price`, `currency`, `duration_days`, `max_reviews_per_month`, `features`, `badge`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'starter', 'Starter', 'Essential tools to start collecting reviews', 0.00, 'INR', 30, 100, '[\"Review Collection System\",\"Review Tracking\"]', NULL, 1, '2026-06-13 06:05:04', '2026-06-13 06:09:21'),
(2, 'professional', 'Professional', 'Advanced tools to grow your business', 399.00, 'INR', 30, 100, '[\"AI-Powered Auto Reply\", \"WhatsApp Integration\", \"Negative Review Alerts (Email)\", \"Detailed Analytics & Insights\", \"Priority Support\"]', NULL, 1, '2026-06-13 06:05:04', '2026-06-13 06:05:04'),
(3, 'enterprise', 'Enterprise', 'Complete automation for scaling businesses', 599.00, 'INR', 30, NULL, '[\"Full Review Automation Suite\", \"Advanced AI Auto Reply (Customizable)\", \"WhatsApp Automation\", \"Real-Time Negative Review Alerts (Email + WhatsApp)\", \"24/7 Dedicated Support\"]', NULL, 1, '2026-06-13 06:05:04', '2026-06-13 06:05:04');

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
-- Indexes for table `businesses`
--
ALTER TABLE `businesses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_businesses_client` (`client_id`);

--
-- Indexes for table `business_branding`
--
ALTER TABLE `business_branding`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_branding_business` (`business_id`);

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `clientId` (`clientId`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `keywords`
--
ALTER TABLE `keywords`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_keywords_client` (`client_id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_notifications_client` (`client_id`),
  ADD KEY `idx_notifications_read` (`is_read`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_reviews_client` (`client_id`),
  ADD KEY `idx_reviews_rating` (`rating`);

--
-- Indexes for table `review_questions`
--
ALTER TABLE `review_questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_questions_client` (`client_id`);

--
-- Indexes for table `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_subscriptions_client` (`client_id`),
  ADD KEY `fk_subscriptions_plan` (`plan_id`);

--
-- Indexes for table `subscription_history`
--
ALTER TABLE `subscription_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_sub_history_client` (`client_id`),
  ADD KEY `fk_sub_history_sub` (`subscription_id`),
  ADD KEY `fk_sub_history_old_plan` (`old_plan_id`),
  ADD KEY `fk_sub_history_new_plan` (`new_plan_id`);

--
-- Indexes for table `subscription_plans`
--
ALTER TABLE `subscription_plans`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `plan_code` (`plan_code`),
  ADD UNIQUE KEY `plan_name` (`plan_name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `businesses`
--
ALTER TABLE `businesses`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `business_branding`
--
ALTER TABLE `business_branding`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `keywords`
--
ALTER TABLE `keywords`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=128;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=867;

--
-- AUTO_INCREMENT for table `review_questions`
--
ALTER TABLE `review_questions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT for table `subscriptions`
--
ALTER TABLE `subscriptions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `subscription_history`
--
ALTER TABLE `subscription_history`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `subscription_plans`
--
ALTER TABLE `subscription_plans`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `businesses`
--
ALTER TABLE `businesses`
  ADD CONSTRAINT `fk_businesses_client` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `business_branding`
--
ALTER TABLE `business_branding`
  ADD CONSTRAINT `fk_branding_business` FOREIGN KEY (`business_id`) REFERENCES `businesses` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `keywords`
--
ALTER TABLE `keywords`
  ADD CONSTRAINT `fk_keywords_client` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `fk_notifications_client` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `fk_reviews_client` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `review_questions`
--
ALTER TABLE `review_questions`
  ADD CONSTRAINT `fk_questions_client` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD CONSTRAINT `fk_subscriptions_client` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_subscriptions_plan` FOREIGN KEY (`plan_id`) REFERENCES `subscription_plans` (`id`);

--
-- Constraints for table `subscription_history`
--
ALTER TABLE `subscription_history`
  ADD CONSTRAINT `fk_sub_history_client` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_sub_history_new_plan` FOREIGN KEY (`new_plan_id`) REFERENCES `subscription_plans` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_sub_history_old_plan` FOREIGN KEY (`old_plan_id`) REFERENCES `subscription_plans` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_sub_history_sub` FOREIGN KEY (`subscription_id`) REFERENCES `subscriptions` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
