<?php
error_reporting(0);
ini_set('display_errors', 0);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

set_error_handler(function($errno, $errstr, $errfile, $errline) {
    error_log("PHP Error: $errstr in $errfile:$errline");
    http_response_code(500);
    echo json_encode(['error' => 'Internal server error', 'details' => $errstr]);
    exit();
});

set_exception_handler(function($exception) {
    error_log("PHP Exception: " . $exception->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Internal server error', 'details' => $exception->getMessage()]);
    exit();
});

define('DB_HOST', 'localhost');
define('DB_PORT', '3306');
define('DB_USER', 'your_mysql_user');
define('DB_PASS', 'your_mysql_password');
define('DB_NAME', 'your_database_name');

function getDbConnection() {
    static $conn = null;

    if ($conn === null) {
        try {
            $conn = @new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT);

            if ($conn->connect_error) {
                throw new Exception('Database connection failed');
            }

            $conn->set_charset("utf8mb4");
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Database connection failed']);
            exit();
        }
    }

    return $conn;
}

function hashPassword($username, $password) {
    return "0x" . strtoupper(md5($username . $password));
}

function getNextUserId($conn) {
    $result = $conn->query("SELECT MAX(ID) as max_id FROM users");
    $row = $result->fetch_assoc();
    return ($row['max_id'] ?? 0) + 1;
}

function checkRateLimitByIP($action, $limitSeconds = 300) {
    $ip = $_SERVER['REMOTE_ADDR'];
    $lockDir = __DIR__ . "/tmp_locks";
    $lockFile = $lockDir . "/" . $action . "_" . md5($ip) . ".lock";

    if (!is_dir($lockDir)) {
        mkdir($lockDir, 0777, true);
    }

    if (file_exists($lockFile)) {
        $lastTime = (int)file_get_contents($lockFile);
        if (time() - $lastTime < $limitSeconds) {
            return false;
        }
    }

    file_put_contents($lockFile, time());
    return true;
}

function sendJsonResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    echo json_encode($data);
    exit();
}

function getRequestData() {
    $input = @file_get_contents('php://input');
    if ($input === false) {
        return [];
    }

    $data = @json_decode($input, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        sendJsonResponse(['error' => 'Invalid JSON'], 400);
    }
    return $data ?? [];
}
?>
