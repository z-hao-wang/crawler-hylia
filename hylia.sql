-- phpMyAdmin SQL Dump
-- version 4.2.9.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Oct 05, 2014 at 01:33 AM
-- Server version: 5.6.20
-- PHP Version: 5.4.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `hylia`
--

-- --------------------------------------------------------

--
-- Table structure for table `anime_mp3_albums`
--

CREATE TABLE IF NOT EXISTS `anime_mp3_albums` (
`album_id` int(11) NOT NULL,
  `url` varchar(200) NOT NULL,
  `title` varchar(100) NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=4628 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `anime_mp3_songs`
--

CREATE TABLE IF NOT EXISTS `anime_mp3_songs` (
`id` int(11) NOT NULL,
  `url` varchar(200) NOT NULL,
  `title` varchar(100) NOT NULL,
  `mp3_url` varchar(200) NOT NULL,
  `album_id` int(11) NOT NULL,
  `to_download` int(16) NOT NULL DEFAULT '0'
) ENGINE=MyISAM AUTO_INCREMENT=58682 DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `anime_mp3_albums`
--
ALTER TABLE `anime_mp3_albums`
 ADD PRIMARY KEY (`album_id`), ADD UNIQUE KEY `url` (`url`);

--
-- Indexes for table `anime_mp3_songs`
--
ALTER TABLE `anime_mp3_songs`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `url` (`url`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `anime_mp3_albums`
--
ALTER TABLE `anime_mp3_albums`
MODIFY `album_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4628;
--
-- AUTO_INCREMENT for table `anime_mp3_songs`
--
ALTER TABLE `anime_mp3_songs`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=58682;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
