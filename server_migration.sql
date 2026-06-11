-- ============================================================
-- GMB Project - Server Migration Script
-- Run this on the production server in: dilkeris_gmb database
-- Safe to run multiple times (uses IF NOT EXISTS / IF NOT EXISTS columns)
-- ============================================================

USE `dilkeris_gmb`;

-- --------------------------------------------------------
-- 1. admins table
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `admins` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- 2. clients table
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `clients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `questions` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`questions`)),
  PRIMARY KEY (`id`),
  UNIQUE KEY `clientId` (`clientId`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Add missing columns to clients if they don't exist (safe ALTER)
ALTER TABLE `clients`
  ADD COLUMN IF NOT EXISTS `websiteUrl` varchar(255) DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS `keywords` text DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS `primaryColor` varchar(7) DEFAULT '#3b82f6',
  ADD COLUMN IF NOT EXISTS `secondaryColor` varchar(7) DEFAULT '#2dd4bf',
  ADD COLUMN IF NOT EXISTS `questions` longtext DEFAULT NULL;

-- --------------------------------------------------------
-- 3. reviews table
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `reviews` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `clientId` varchar(50) NOT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `rating` int(11) NOT NULL,
  `review` text DEFAULT NULL,
  `isPositive` tinyint(1) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- 4. subscription_plans table
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `subscription_plans` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `plan_code` varchar(50) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `currency` varchar(5) DEFAULT 'INR',
  `duration_days` int(11) DEFAULT 30,
  `max_reviews_per_month` int(11) DEFAULT NULL,
  `features` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`features`)),
  `badge` varchar(100) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_plan_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Add missing columns to subscription_plans if they don't exist
ALTER TABLE `subscription_plans`
  ADD COLUMN IF NOT EXISTS `plan_code` varchar(50) DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS `badge` varchar(100) DEFAULT NULL;

-- Insert default plans (safe - won't duplicate)
INSERT INTO `subscription_plans` (`plan_code`, `name`, `description`, `price`, `currency`, `duration_days`, `max_reviews_per_month`, `features`, `badge`, `is_active`)
VALUES 
  ('starter', 'Starter', 'Essential tools to start collecting reviews', 0.00, 'INR', 30, 100, '["Review Collection System","Review Tracking"]', NULL, 1),
  ('professional', 'Professional', 'Advanced tools to grow your business', 399.00, 'INR', 30, 100, '["AI-Powered Auto Reply","WhatsApp Integration","Negative Review Alerts (Email)","Detailed Analytics & Insights","Priority Support"]', NULL, 1),
  ('enterprise', 'Enterprise', 'Complete automation for scaling businesses', 599.00, 'INR', 30, NULL, '["Full Review Automation Suite","Advanced AI Auto Reply (Customizable)","WhatsApp Automation","Real-Time Negative Review Alerts (Email + WhatsApp)","24/7 Dedicated Support"]', NULL, 1)
ON DUPLICATE KEY UPDATE
  plan_code = VALUES(plan_code),
  description = VALUES(description),
  price = VALUES(price),
  features = VALUES(features),
  is_active = VALUES(is_active);

-- --------------------------------------------------------
-- 5. subscriptions table
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `subscriptions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `reminder_sent` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `idx_subscriptions_client_status` (`clientId`,`status`),
  KEY `idx_subscriptions_plan` (`planId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Add foreign keys only if clients table has data and constraints not exist
-- (Skipped here - add manually if needed to avoid errors on existing data)

-- --------------------------------------------------------
-- 6. subscription_history table
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `subscription_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `clientId` varchar(50) NOT NULL,
  `subscriptionId` int(11) DEFAULT NULL,
  `action` enum('created','renewed','upgraded','downgraded','cancelled','expired') NOT NULL,
  `old_planId` int(11) DEFAULT NULL,
  `new_planId` int(11) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_subscription_history_client` (`clientId`),
  KEY `idx_subscription_history_subscription` (`subscriptionId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- 7. notifications table
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `notifications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `clientId` varchar(50) DEFAULT NULL,
  `type` varchar(50) NOT NULL,
  `message` text NOT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `notifications_client_fk` (`clientId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ============================================================
-- DONE! All tables created/verified in dilkeris_gmb
-- ============================================================
