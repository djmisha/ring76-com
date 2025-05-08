<?php
/**
 * Form handler script - acts as a bridge between the contact form and send-mail.php
 * This ensures that send-mail.php can only be included from here, not accessed directly
 */

// Define the secure access constant to allow access to send-mail.php
define('SECURE_ACCESS', true);

// Include the send-mail.php file
include_once(__DIR__ . '/send-mail.php');
?>