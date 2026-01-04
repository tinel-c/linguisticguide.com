<?php
/**
 * Contact Form Handler for eDomenii.ro
 * LinguisticGuide.com
 * 
 * This script handles contact form submissions and sends emails.
 * Compatible with eDomenii.ro shared hosting (PHP 7.4+)
 */

// Security: Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Set headers
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Configuration
define('RECIPIENT_EMAIL', 'monica.vlad@linguisticguide.com');
define('FROM_EMAIL', 'noreply@linguisticguide.com');
define('SUBJECT_PREFIX', '[LinguisticGuide] ');
define('MAX_MESSAGE_LENGTH', 5000);
define('ENABLE_RATE_LIMITING', true);
define('MAX_SUBMISSIONS_PER_HOUR', 5);
define('RECAPTCHA_SECRET_KEY', '6Ld73oEUAAAAAMo2y_9o0tFO6q_yW2ZAPfx5rAt3');

/**
 * Sanitize input data
 */
function sanitizeInput($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    return $data;
}

/**
 * Validate email address
 */
function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

/**
 * Rate limiting (basic IP-based)
 */
function checkRateLimit() {
    if (!ENABLE_RATE_LIMITING) {
        return true;
    }
    
    $ip = $_SERVER['REMOTE_ADDR'];
    $logFile = sys_get_temp_dir() . '/contact_form_log.txt';
    $currentTime = time();
    $hourAgo = $currentTime - 3600;
    
    // Read existing submissions
    $submissions = [];
    if (file_exists($logFile)) {
        $lines = file($logFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($lines as $line) {
            list($timestamp, $loggedIp) = explode('|', $line);
            if ($timestamp > $hourAgo) {
                $submissions[] = ['time' => $timestamp, 'ip' => $loggedIp];
            }
        }
    }
    
    // Count submissions from this IP
    $ipCount = 0;
    foreach ($submissions as $sub) {
        if ($sub['ip'] === $ip) {
            $ipCount++;
        }
    }
    
    // Check limit
    if ($ipCount >= MAX_SUBMISSIONS_PER_HOUR) {
        return false;
    }
    
    // Log this submission
    $submissions[] = ['time' => $currentTime, 'ip' => $ip];
    $logData = array_map(function($s) {
        return $s['time'] . '|' . $s['ip'];
    }, $submissions);
    file_put_contents($logFile, implode("\n", $logData));
    
    return true;
}

/**
 * Send email
 */
function sendEmail($data) {
    $to = RECIPIENT_EMAIL;
    $subject = SUBJECT_PREFIX . 'New Contact Form Submission';
    
    // Build email body
    $body = "New contact form submission from LinguisticGuide.com\n\n";
    $body .= "Name: " . $data['name'] . "\n";
    $body .= "Email: " . $data['email'] . "\n";
    $body .= "Service: " . $data['service'] . "\n";
    $body .= "Message:\n" . $data['message'] . "\n\n";
    $body .= "---\n";
    $body .= "Submitted: " . date('Y-m-d H:i:s') . "\n";
    $body .= "IP Address: " . $_SERVER['REMOTE_ADDR'] . "\n";
    
    // Email headers
    $headers = [];
    $headers[] = 'From: ' . FROM_EMAIL;
    $headers[] = 'Reply-To: ' . $data['email'];
    $headers[] = 'X-Mailer: PHP/' . phpversion();
    $headers[] = 'Content-Type: text/plain; charset=UTF-8';
    
    // Send email
    $success = mail($to, $subject, $body, implode("\r\n", $headers));
    
    return $success;
}

/**
 * Verify reCAPTCHA v3 token with Google
 */
function verifyRecaptcha($token, $expectedAction = 'submit') {
    if (empty($token)) {
        return false;
    }
    
    $secret = RECAPTCHA_SECRET_KEY;
    $url = 'https://www.google.com/recaptcha/api/siteverify';
    
    // Use cURL for better reliability on shared hosts
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query([
        'secret' => $secret,
        'response' => $token
    ]));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
    $response = curl_exec($ch);
    $error = curl_error($ch);
    curl_close($ch);
    
    if ($error) {
        error_log('reCAPTCHA cURL error: ' . $error);
        return false;
    }
    
    $data = json_decode($response, true);
    
    if (!$data || !isset($data['success']) || !$data['success']) {
        error_log('reCAPTCHA failure: ' . ($data['error-codes'][0] ?? 'unknown error'));
        return false;
    }
    
    // For v3, also verify the score and action
    // Threshold is 0.5 (1.0 is very likely a human, 0.0 is very likely a bot)
    if (!isset($data['score']) || $data['score'] < 0.5) {
        error_log('reCAPTCHA low score: ' . ($data['score'] ?? 'null'));
        return false;
    }
    
    if (isset($data['action']) && $data['action'] !== $expectedAction) {
        error_log('reCAPTCHA action mismatch: ' . $data['action']);
        return false;
    }
    
    return true;
}

// Main execution
try {
    // Check rate limiting
    if (!checkRateLimit()) {
        http_response_code(429);
        echo json_encode([
            'success' => false,
            'message' => 'Too many submissions. Please try again later.'
        ]);
        exit;
    }
    
    // Get POST data
    $rawData = file_get_contents('php://input');
    $data = json_decode($rawData, true);
    
    // Validate reCAPTCHA
    if (!isset($data['recaptchaToken']) || !verifyRecaptcha($data['recaptchaToken'])) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'reCAPTCHA verification failed. Please try again.'
        ]);
        exit;
    }
    
    // Validate required fields
    if (!isset($data['name']) || !isset($data['email']) || !isset($data['message'])) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Missing required fields'
        ]);
        exit;
    }
    
    // Sanitize inputs
    $name = sanitizeInput($data['name']);
    $email = sanitizeInput($data['email']);
    $service = isset($data['service']) ? sanitizeInput($data['service']) : 'Not specified';
    $message = sanitizeInput($data['message']);
    
    // Validate name
    if (empty($name) || strlen($name) < 2) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Please enter a valid name'
        ]);
        exit;
    }
    
    // Validate email
    if (!validateEmail($email)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Please enter a valid email address'
        ]);
        exit;
    }
    
    // Validate message
    if (empty($message) || strlen($message) < 10) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Message must be at least 10 characters'
        ]);
        exit;
    }
    
    if (strlen($message) > MAX_MESSAGE_LENGTH) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Message is too long'
        ]);
        exit;
    }
    
    // Prepare data
    $formData = [
        'name' => $name,
        'email' => $email,
        'service' => $service,
        'message' => $message
    ];
    
    // Send email
    $emailSent = sendEmail($formData);
    
    if ($emailSent) {
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => 'Thank you for your message! We will respond within 24 hours.'
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Failed to send email. Please try again or contact us directly.'
        ]);
    }
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'An error occurred. Please try again later.'
    ]);
    
    // Log error (optional)
    error_log('Contact form error: ' . $e->getMessage());
}
?>

