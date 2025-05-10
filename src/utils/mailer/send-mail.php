<?php
/**
 * Secure mail sender script for Ring 76 contact form
 * This script processes contact form submissions and sends emails securely
 */

// Prevent direct access to this file
if (!defined('SECURE_ACCESS') && basename($_SERVER['PHP_SELF']) === basename(__FILE__)) {
    header('HTTP/1.0 403 Forbidden');
    echo 'Access Denied';
    exit;
}

// Set error reporting settings for security
error_reporting(E_ALL);
ini_set('display_errors', 0); // Don't display errors to users

// Set headers for JSON response
header('Content-Type: application/json');

// Cross-site request forgery protection
session_start();

// Define allowed origin (adjust for your domains)
$allowed_origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
$allowed_hosts = [
    'http://localhost', 
    'https://localhost',
    'http://localhost:8080',
    'http://ring76.com',
    'https://ring76.com', 
    'http://www.ring76.com',
    'https://www.ring76.com'
];

// Check if the origin is allowed
if (in_array($allowed_origin, $allowed_hosts)) {
    header('Access-Control-Allow-Origin: ' . $allowed_origin);
}

// Only process POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method'
    ]);
    exit;
}

// Set recipient email (hardcoded for security)
$to_email = 'misha@ring76.com';

// Honeypot check - if the honeypot field is filled, it's likely a bot
if (!empty($_POST['website'])) {
    // Return a success message to fool bots, but don't actually send email
    echo json_encode([
        'success' => true,
        'message' => 'Thank you for your message!'
    ]);
    exit;
}

// Input validation
$name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
$phone = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_FULL_SPECIAL_CHARS);

// Validate required fields
if (empty($name) || empty($email) || empty($message) || empty($phone)) {
    echo json_encode([
        'success' => false,
        'message' => 'All required fields must be filled out'
    ]);
    exit;
}

// Additional email validation
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        'success' => false,
        'message' => 'Please provide a valid email address'
    ]);
    exit;
}

// Block .ru email addresses for security
if (preg_match('/\.ru$/i', $email)) {
    echo json_encode([
        'success' => false,
        'message' => 'Sorry, emails from this domain are not accepted for security reasons'
    ]);
    exit;
}

// Phone validation
if (!preg_match('/^[0-9\-\(\)\s\+\.]+$/', $phone)) {
    echo json_encode([
        'success' => false,
        'message' => 'Please provide a valid phone number'
    ]);
    exit;
}

try {
    // Prepare email headers (with security considerations)
    $headers = [
        'From' => 'Ring 76 Website <noreply@ring76.com>',
        'Reply-To' => $name . ' <' . $email . '>',
        'X-Mailer' => 'PHP/' . phpversion(),
        'Content-Type' => 'text/plain; charset=UTF-8',
    ];
    
    // Convert headers array to string
    $headers_str = '';
    foreach ($headers as $key => $value) {
        $headers_str .= $key . ': ' . $value . "\r\n";
    }
    
    // Create subject line (prevent header injection)
    $subject = 'Ring 76 Contact Form: ' . substr($name, 0, 30);
    
    // Create email body
    $body = "You have received a new message from the Ring 76 contact form.\n\n";
    $body .= "Name: " . $name . "\n";
    $body .= "Email: " . $email . "\n";
    $body .= "Phone: " . $phone . "\n";
    $body .= "Message:\n" . $message . "\n\n";
    $body .= "This message was sent on " . date('Y-m-d H:i:s') . "\n";
    $body .= "IP: " . $_SERVER['REMOTE_ADDR'] . "\n";
    
    // Send the email
    $mail_result = mail($to_email, $subject, $body, $headers_str);
    
    if ($mail_result) {
        // Log successful submissions (optional)
        error_log("Contact form submission from: " . $email . " | " . date('Y-m-d H:i:s') . "\n", 3, __DIR__ . "/../../logs/form_submissions.log");
        
        echo json_encode([
            'success' => true,
            'message' => 'Thank you! Your message has been sent successfully. Someone will be in touch with you shortly.'
        ]);
    } else {
        throw new Exception('Failed to send email');
    }
} catch (Exception $e) {
    // Log error for administrator (don't expose details to user)
    error_log('Mail error: ' . $e->getMessage(), 0);
    
    echo json_encode([
        'success' => false,
        'message' => 'Sorry, there was an error sending your message. Please try again later.'
    ]);
}
?>