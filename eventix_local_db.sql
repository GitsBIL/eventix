-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 22, 2026 at 03:40 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `eventix_local_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `ID` int(11) NOT NULL,
  `OrganizerID` int(11) NOT NULL,
  `EventName` varchar(150) NOT NULL,
  `Description` text DEFAULT NULL,
  `Location` text DEFAULT NULL,
  `EventDate` datetime DEFAULT NULL,
  `BannerImage` varchar(255) DEFAULT NULL,
  `CompanyCode` varchar(32) DEFAULT NULL,
  `Status` tinyint(4) DEFAULT 1,
  `IsDeleted` tinyint(4) DEFAULT 0,
  `CreatedBy` varchar(32) DEFAULT NULL,
  `CreatedDate` datetime DEFAULT NULL,
  `LastUpdatedBy` varchar(32) DEFAULT NULL,
  `LastUpdatedDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`ID`, `OrganizerID`, `EventName`, `Description`, `Location`, `EventDate`, `BannerImage`, `CompanyCode`, `Status`, `IsDeleted`, `CreatedBy`, `CreatedDate`, `LastUpdatedBy`, `LastUpdatedDate`) VALUES
(1, 7, 'The Sounds Project', 'Festival musik yang jadi langganan rame tiap tahun dengan lineup campuran band indie, pop, rock, sampai musisi internasional. Vibes-nya terkenal sangat “anak tongkrongan”, penuh sing along, dan selalu dipadati penonton dari berbagai kota. Tahun 2026 event ini kembali jadi salah satu festival paling ditunggu.', 'Ecovention & Ecopark Ancol', '2026-12-01 19:00:00', 'banners/2qRX7uVOzUkwYRIp4rOh3kSzNj2qoNfCiQ9ifk4X.jpg', 'EVTX', 1, 0, 'Nabil Putra', '2026-05-07 17:55:19', NULL, NULL),
(2, 7, 'Pestapora', 'Festival musik lokal yang terkenal karena berhasil nyatuin berbagai genre dan generasi musisi Indonesia dalam satu tempat. Dari band indie, pop, rock, dangdut, sampai nostalgia era 2000-an semuanya ada. Vibes-nya super ramai, penuh sing along, dan jadi salah satu festival paling ditunggu tiap tahun.', 'Gambir Expo Kemayoran', '2026-12-02 13:00:00', 'banners/3Z2Ivcd89J1quwGSAqM4dNCUJ9Y4THI5ixXTbKrj.jpg', 'EVTX', 1, 0, 'Nabil Putra', '2026-05-07 18:00:25', NULL, NULL),
(3, 7, 'Synchronize Fest', 'Festival musik multi-genre yang terkenal dengan lineup lintas generasi dan suasana yang sangat “Indonesia banget”. Event ini punya identitas kuat karena selalu menghadirkan kolaborasi unik dan musisi legendaris bareng artis modern dalam satu panggung.', 'Gambir Expo Kemayoran', '2026-12-03 20:00:00', 'banners/JZpaxyBOdrNFI8ODhbIcvzv67dkwuCiqN94ZSdAa.jpg', 'EVTX', 1, 0, 'Nabil Putra', '2026-05-07 18:01:07', NULL, NULL),
(4, 7, 'Joyland Festival', 'Festival musik dengan konsep chill, artsy, dan intimate yang terkenal karena suasananya nyaman dan lineup berkualitas. Cocok buat user yang suka festival dengan nuansa santai tapi tetap ramai.', 'GBK Baseball Stadium', '2026-12-04 09:00:00', 'banners/pTgGucEwTHD34WDUZDeH0Vwu3KJ8Q3fP6cHYBacH.jpg', 'EVTX', 1, 0, 'Nabil Putra', '2026-05-07 18:02:01', NULL, NULL),
(5, 7, 'Prambanan Jazz Festival', 'Festival musik dengan latar megah Candi Prambanan yang menghadirkan perpaduan jazz, pop, dan musik lintas genre. Salah satu festival paling ikonik karena ambience-nya unik dan premium banget.', 'Candi Prambanan', '2026-12-05 08:00:00', 'banners/Be5L8qN2BKDQhwj2rarxcMa22Bt6G9RAwaPMwlR1.webp', 'EVTX', 1, 0, 'Nabil Putra', '2026-05-07 18:02:51', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `e_tickets`
--

CREATE TABLE `e_tickets` (
  `ID` int(11) NOT NULL,
  `OrderItemID` int(11) NOT NULL,
  `QRCodeString` varchar(255) DEFAULT NULL,
  `IsUsed` tinyint(4) DEFAULT 0,
  `CompanyCode` varchar(32) DEFAULT NULL,
  `Status` tinyint(4) DEFAULT 1,
  `IsDeleted` tinyint(4) DEFAULT 0,
  `CreatedBy` varchar(32) DEFAULT NULL,
  `CreatedDate` datetime DEFAULT NULL,
  `LastUpdatedBy` varchar(32) DEFAULT NULL,
  `LastUpdatedDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `midtrans_logs`
--

CREATE TABLE `midtrans_logs` (
  `ID` int(10) UNSIGNED NOT NULL,
  `OrderID` int(11) NOT NULL,
  `EventType` varchar(100) NOT NULL,
  `StatusCode` varchar(10) NOT NULL,
  `Payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`Payload`)),
  `SystemAction` text DEFAULT NULL,
  `CreatedDate` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `midtrans_logs`
--

INSERT INTO `midtrans_logs` (`ID`, `OrderID`, `EventType`, `StatusCode`, `Payload`, `SystemAction`, `CreatedDate`) VALUES
(3, 16, 'pending', '201', '{\"va_numbers\":[{\"va_number\":\"63442195014908389706102\",\"bank\":\"bca\"}],\"transaction_time\":\"2026-05-22 16:46:22\",\"transaction_status\":\"pending\",\"transaction_id\":\"ed312cd6-13ea-46f0-aa3a-6ac91210fbae\",\"status_message\":\"midtrans payment notification\",\"status_code\":\"201\",\"signature_key\":\"030f2c093990f73c68b58de539965d2e0b3ee7eba064004871407eb4ecb79d8f439925c1e3d69248cf35bc910ba60ed46bde19bead4cc0ca88de1c14cc5deaa9\",\"payment_type\":\"bank_transfer\",\"payment_amounts\":[],\"order_id\":\"EVTX-20260522-CWIFR\",\"merchant_id\":\"M312363442\",\"gross_amount\":\"25000.00\",\"fraud_status\":\"accept\",\"expiry_time\":\"2026-05-23 16:46:22\",\"customer_details\":{\"full_name\":\"lilban 258\"},\"currency\":\"IDR\"}', 'No action taken', '2026-05-22 02:46:24'),
(4, 16, 'settlement', '200', '{\"va_numbers\":[{\"va_number\":\"63442195014908389706102\",\"bank\":\"bca\"}],\"transaction_time\":\"2026-05-22 16:46:22\",\"transaction_status\":\"settlement\",\"transaction_id\":\"ed312cd6-13ea-46f0-aa3a-6ac91210fbae\",\"status_message\":\"midtrans payment notification\",\"status_code\":\"200\",\"signature_key\":\"ba26c57f7420d3b01746c2c283dcbee219ad133723075b0a57c8be1affe05bf2bb376eacd2375ea000f8a7c9b6ead3990d3753341f7c4016eb4572d02f54f9f2\",\"settlement_time\":\"2026-05-22 16:46:36\",\"payment_type\":\"bank_transfer\",\"payment_amounts\":[],\"order_id\":\"EVTX-20260522-CWIFR\",\"merchant_id\":\"M312363442\",\"gross_amount\":\"25000.00\",\"fraud_status\":\"accept\",\"expiry_time\":\"2026-05-23 16:46:22\",\"customer_details\":{\"full_name\":\"lilban 258\"},\"currency\":\"IDR\"}', '✓ Payment marked as PAID', '2026-05-22 02:46:37'),
(5, 17, 'pending', '201', '{\"va_numbers\":[{\"va_number\":\"63442555833145101236217\",\"bank\":\"bca\"}],\"transaction_time\":\"2026-05-22 20:15:57\",\"transaction_status\":\"pending\",\"transaction_id\":\"6c4f47f3-819d-4940-bf40-b513449c75e6\",\"status_message\":\"midtrans payment notification\",\"status_code\":\"201\",\"signature_key\":\"0d91c1ae7322f5a3e3aa8b78b22277ffab2824b08c8d2f470375ecc62998c244b2f54434cc344b58d0ba6b9eef495881b2172578e9246765f52afd737313f60f\",\"payment_type\":\"bank_transfer\",\"payment_amounts\":[],\"order_id\":\"EVTX-20260522-VSQZH\",\"merchant_id\":\"M312363442\",\"gross_amount\":\"1050000.00\",\"fraud_status\":\"accept\",\"expiry_time\":\"2026-05-23 20:15:57\",\"customer_details\":{\"full_name\":\"lilban 258\"},\"currency\":\"IDR\"}', 'No action taken', '2026-05-22 06:15:58'),
(6, 17, 'settlement', '200', '{\"va_numbers\":[{\"va_number\":\"63442555833145101236217\",\"bank\":\"bca\"}],\"transaction_time\":\"2026-05-22 20:15:57\",\"transaction_status\":\"settlement\",\"transaction_id\":\"6c4f47f3-819d-4940-bf40-b513449c75e6\",\"status_message\":\"midtrans payment notification\",\"status_code\":\"200\",\"signature_key\":\"db442af40b6ecb7c316a4901f97c0f69f0e9d48344b4a7f3662d1bcfb8892607d2b0b5d35d1dfb909f31b9972e1fafb8e966ad53c990fc5378ba2c65410b5b7e\",\"settlement_time\":\"2026-05-22 20:16:09\",\"payment_type\":\"bank_transfer\",\"payment_amounts\":[],\"order_id\":\"EVTX-20260522-VSQZH\",\"merchant_id\":\"M312363442\",\"gross_amount\":\"1050000.00\",\"fraud_status\":\"accept\",\"expiry_time\":\"2026-05-23 20:15:57\",\"customer_details\":{\"full_name\":\"lilban 258\"},\"currency\":\"IDR\"}', '✓ Payment marked as PAID', '2026-05-22 06:16:10');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(5, '2026_04_16_150210_add_2fa_columns_to_users_table', 2),
(6, '2026_05_21_033820_create_midtrans_logs_table', 3),
(7, '2026_05_21_033827_create_refund_requests_table', 3),
(8, '2026_05_21_173316_create_personal_access_tokens_table', 4);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `ID` int(11) NOT NULL,
  `CustomerID` int(11) NOT NULL,
  `OrderNo` varchar(50) DEFAULT NULL,
  `TotalAmount` decimal(10,2) DEFAULT NULL,
  `PaymentStatus` varchar(50) DEFAULT NULL,
  `SnapToken` varchar(100) DEFAULT NULL,
  `CompanyCode` varchar(32) DEFAULT NULL,
  `Status` tinyint(4) DEFAULT 1,
  `IsDeleted` tinyint(4) DEFAULT 0,
  `CreatedBy` varchar(32) DEFAULT NULL,
  `CreatedDate` datetime DEFAULT NULL,
  `LastUpdatedBy` varchar(32) DEFAULT NULL,
  `LastUpdatedDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`ID`, `CustomerID`, `OrderNo`, `TotalAmount`, `PaymentStatus`, `SnapToken`, `CompanyCode`, `Status`, `IsDeleted`, `CreatedBy`, `CreatedDate`, `LastUpdatedBy`, `LastUpdatedDate`) VALUES
(16, 8, 'EVTX-20260522-CWIFR', 25000.00, 'Paid', NULL, NULL, 1, 0, 'lilban 258', '2026-05-22 09:46:18', NULL, '2026-05-22 09:46:37'),
(17, 8, 'EVTX-20260522-VSQZH', 1050000.00, 'Paid', NULL, NULL, 1, 0, 'lilban 258', '2026-05-22 13:15:52', NULL, '2026-05-22 13:16:10');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `ID` int(11) NOT NULL,
  `OrderID` int(11) NOT NULL,
  `TicketCategoryID` int(11) NOT NULL,
  `Qty` int(11) DEFAULT NULL,
  `SubTotal` decimal(10,2) DEFAULT NULL,
  `CompanyCode` varchar(32) DEFAULT NULL,
  `Status` tinyint(4) DEFAULT 1,
  `IsDeleted` tinyint(4) DEFAULT 0,
  `CreatedBy` varchar(32) DEFAULT NULL,
  `CreatedDate` datetime DEFAULT NULL,
  `LastUpdatedBy` varchar(32) DEFAULT NULL,
  `LastUpdatedDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`ID`, `OrderID`, `TicketCategoryID`, `Qty`, `SubTotal`, `CompanyCode`, `Status`, `IsDeleted`, `CreatedBy`, `CreatedDate`, `LastUpdatedBy`, `LastUpdatedDate`) VALUES
(15, 16, 2, 1, 25000.00, NULL, 1, 0, 'lilban 258', '2026-05-22 09:46:18', NULL, NULL),
(16, 17, 7, 3, 1050000.00, NULL, 1, 0, 'lilban 258', '2026-05-22 13:15:52', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `refund_requests`
--

CREATE TABLE `refund_requests` (
  `ID` int(10) UNSIGNED NOT NULL,
  `OrderID` int(11) NOT NULL,
  `Amount` decimal(12,2) NOT NULL,
  `Reason` text NOT NULL,
  `AdminNotes` text DEFAULT NULL,
  `Status` enum('requested','under_review','approved','processed','rejected') NOT NULL DEFAULT 'requested',
  `CreatedBy` varchar(100) DEFAULT NULL,
  `CreatedDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `LastUpdatedBy` varchar(100) DEFAULT NULL,
  `LastUpdatedDate` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('aRZWPLkCBZTOGFxI7FFPTG3aFQLGU7bdyDYzh35X', 7, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36 Edg/148.0.0.0', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiTWZTNlBCQVplTlRNZjZkamlGVEE3MHVGczlTRUFMV2NzeXlKTmtiRSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzU6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC8yZmEvY2hhbGxlbmdlIjtzOjU6InJvdXRlIjtzOjEzOiIyZmEuY2hhbGxlbmdlIjt9czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6NztzOjEyOiIyZmFfdmVyaWZpZWQiO2I6MTt9', 1779443263),
('ms4yxsVdpXIqu4NDUmVpJ47aUnvuofmQJYSruE1F', 8, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36 Edg/148.0.0.0', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiV2trS21QS0RKYndvSVhja3dTS25VakR2dUkxaU02VWE1Z2Q0Q2NwcCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7czo1OiJyb3V0ZSI7czo0OiJob21lIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6ODt9', 1779457064);

-- --------------------------------------------------------

--
-- Table structure for table `ticket_categories`
--

CREATE TABLE `ticket_categories` (
  `ID` int(11) NOT NULL,
  `EventID` int(11) NOT NULL,
  `CategoryName` varchar(50) DEFAULT NULL,
  `Description` text DEFAULT NULL,
  `Price` decimal(10,2) DEFAULT NULL,
  `Discount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `Quota` int(11) DEFAULT NULL,
  `MaxPurchase` int(11) NOT NULL DEFAULT 5,
  `EntryType` varchar(50) DEFAULT NULL,
  `Benefits` varchar(255) DEFAULT NULL,
  `CompanyCode` varchar(32) DEFAULT NULL,
  `Status` tinyint(4) DEFAULT 1,
  `IsDeleted` tinyint(4) DEFAULT 0,
  `CreatedBy` varchar(32) DEFAULT NULL,
  `CreatedDate` datetime DEFAULT NULL,
  `LastUpdatedBy` varchar(32) DEFAULT NULL,
  `LastUpdatedDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ticket_categories`
--

INSERT INTO `ticket_categories` (`ID`, `EventID`, `CategoryName`, `Description`, `Price`, `Discount`, `Quota`, `MaxPurchase`, `EntryType`, `Benefits`, `CompanyCode`, `Status`, `IsDeleted`, `CreatedBy`, `CreatedDate`, `LastUpdatedBy`, `LastUpdatedDate`) VALUES
(2, 5, 'Early Bird', NULL, 25000.00, 0.00, 25, 5, NULL, NULL, 'EVTX', 1, 0, 'Nabil Putra', '2026-05-14 19:42:18', NULL, NULL),
(3, 5, 'Presale', NULL, 15000.00, 0.00, 10, 5, NULL, NULL, 'EVTX', 1, 0, 'Nabil Putra', '2026-05-14 19:42:39', NULL, NULL),
(4, 5, 'Tribune', NULL, 50000.00, 0.00, 50, 5, NULL, NULL, 'EVTX', 1, 0, 'Nabil Putra', '2026-05-14 19:42:56', NULL, NULL),
(5, 5, 'Festival', NULL, 65000.00, 0.00, 70, 5, NULL, NULL, 'EVTX', 1, 0, 'Nabil Putra', '2026-05-14 19:43:16', NULL, NULL),
(6, 5, 'VIP', NULL, 100000.00, 0.00, 20, 5, NULL, NULL, 'EVTX', 1, 0, 'Nabil Putra', '2026-05-14 19:43:36', NULL, NULL),
(7, 5, 'VVIP', NULL, 350000.00, 0.00, 5, 5, 'Festival Area', NULL, 'EVTX', 1, 0, 'Nabil Putra', '2026-05-14 19:43:50', 'Nabil Putra', '2026-05-20 15:37:36');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `ID` int(11) NOT NULL,
  `FullName` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `google_id` varchar(255) DEFAULT NULL,
  `Role` enum('Customer','EO','Admin','Staff') NOT NULL,
  `CompanyCode` varchar(32) DEFAULT NULL,
  `Status` tinyint(4) DEFAULT 1,
  `IsDeleted` tinyint(4) DEFAULT 0,
  `CreatedBy` varchar(32) DEFAULT NULL,
  `CreatedDate` datetime DEFAULT NULL,
  `LastUpdatedBy` varchar(32) DEFAULT NULL,
  `LastUpdatedDate` datetime DEFAULT NULL,
  `google2fa_secret` text DEFAULT NULL,
  `is_2fa_active` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`ID`, `FullName`, `Email`, `Password`, `google_id`, `Role`, `CompanyCode`, `Status`, `IsDeleted`, `CreatedBy`, `CreatedDate`, `LastUpdatedBy`, `LastUpdatedDate`, `google2fa_secret`, `is_2fa_active`) VALUES
(7, 'Nabil Putra', 'nabilputra099123@gmail.com', '$2y$12$IoibUu3pvfvMpK3yTsjtkOqSmuYvIJVTJTlnMpY2d/OYnRCos541K', '104984563050888252061', 'Admin', NULL, 1, 0, NULL, NULL, NULL, NULL, 'REYNR27UI6OWVY4R', 1),
(8, 'lilban 258', 'lilban595@gmail.com', '$2y$12$8iAFPecOPFMVIZEMksgdZ.yGkgC.H8bOOEBEqtVnjTXHFFPfWQw86', '103489809494255894616', 'Customer', NULL, 1, 0, NULL, NULL, NULL, NULL, NULL, 0),
(9, 'alam nature', 'naturealam83@gmail.com', '$2y$12$hoS6Gx8lP9sf05JxveP2ZO3jwDnD5QPAZxGX.IBh1GSRFe6XiT/ou', '112760826555049436009', 'Customer', NULL, 1, 0, NULL, NULL, NULL, NULL, NULL, 0),
(10, 'Yudharasyid Perdana', 'yudharasyidperdana@gmail.com', '$2y$12$whtCxXYHUHClytVldHwEVeMVIKvRBxLCQmQhm9yiMtNnWr3pKOmg6', '100982310010646851135', 'Customer', NULL, 1, 0, NULL, NULL, NULL, NULL, NULL, 0),
(11, 'Adam Yuda Pratama', 'adamyudapratama01@gmail.com', '$2y$12$yIWKGPaDTWwBw4yMepT5cOxmQ6X9mrqkEcikauoJQCBbiHjxksMOi', '108910258431895252081', 'Customer', NULL, 1, 0, NULL, NULL, NULL, NULL, NULL, 0),
(12, 'Rangga Arfianyah', 'rangga261205@gmail.com', '$2y$12$uwT/yA7EY9JKu0mRsm4B3uDhVpB57gBvqU2gFJZaNbMBk6MuEeoOq', '113245311575945357201', 'Customer', NULL, 1, 0, NULL, NULL, NULL, NULL, NULL, 0),
(13, 'Dafa M', 'dafamaulanaraka@gmail.com', '$2y$12$INK3azQiFabAAAXLNrMv6eHCQ5ahrMV3.MGi9G2ea0n3nssWHyH2e', '103389702507808721754', 'Admin', NULL, 1, 0, NULL, NULL, NULL, NULL, NULL, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_expiration_index` (`expiration`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_locks_expiration_index` (`expiration`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `OrganizerID` (`OrganizerID`);

--
-- Indexes for table `e_tickets`
--
ALTER TABLE `e_tickets`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `QRCodeString` (`QRCodeString`),
  ADD KEY `OrderItemID` (`OrderItemID`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `midtrans_logs`
--
ALTER TABLE `midtrans_logs`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `midtrans_logs_orderid_foreign` (`OrderID`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `CustomerID` (`CustomerID`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `OrderID` (`OrderID`),
  ADD KEY `TicketCategoryID` (`TicketCategoryID`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- Indexes for table `refund_requests`
--
ALTER TABLE `refund_requests`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `refund_requests_orderid_foreign` (`OrderID`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `ticket_categories`
--
ALTER TABLE `ticket_categories`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `EventID` (`EventID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `e_tickets`
--
ALTER TABLE `e_tickets`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `midtrans_logs`
--
ALTER TABLE `midtrans_logs`
  MODIFY `ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `refund_requests`
--
ALTER TABLE `refund_requests`
  MODIFY `ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ticket_categories`
--
ALTER TABLE `ticket_categories`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `events_ibfk_1` FOREIGN KEY (`OrganizerID`) REFERENCES `users` (`ID`);

--
-- Constraints for table `e_tickets`
--
ALTER TABLE `e_tickets`
  ADD CONSTRAINT `e_tickets_ibfk_1` FOREIGN KEY (`OrderItemID`) REFERENCES `order_items` (`ID`);

--
-- Constraints for table `midtrans_logs`
--
ALTER TABLE `midtrans_logs`
  ADD CONSTRAINT `midtrans_logs_orderid_foreign` FOREIGN KEY (`OrderID`) REFERENCES `orders` (`ID`) ON DELETE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`CustomerID`) REFERENCES `users` (`ID`);

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`OrderID`) REFERENCES `orders` (`ID`),
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`TicketCategoryID`) REFERENCES `ticket_categories` (`ID`);

--
-- Constraints for table `refund_requests`
--
ALTER TABLE `refund_requests`
  ADD CONSTRAINT `refund_requests_orderid_foreign` FOREIGN KEY (`OrderID`) REFERENCES `orders` (`ID`) ON DELETE CASCADE;

--
-- Constraints for table `ticket_categories`
--
ALTER TABLE `ticket_categories`
  ADD CONSTRAINT `ticket_categories_ibfk_1` FOREIGN KEY (`EventID`) REFERENCES `events` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
