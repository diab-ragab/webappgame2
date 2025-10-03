<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

define('DB_HOST', 'localhost');
define('DB_PORT', '3306');
define('DB_USER', 'your_mysql_user');
define('DB_PASS', 'your_mysql_password');
define('DB_NAME', 'your_database_name');

function getDbConnection() {
    try {
        $dsn = "mysql:host=" . DB_HOST . ";port=" . DB_PORT . ";dbname=" . DB_NAME . ";charset=utf8mb4";
        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ];
        $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        return $pdo;
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database connection failed']);
        exit();
    }
}

function hashPassword($username, $password) {
    return "0x" . strtoupper(md5($username . $password));
}

function getNextUserId($pdo) {
    $stmt = $pdo->query("SELECT MAX(ID) as max_id FROM users");
    $result = $stmt->fetch();
    return ($result['max_id'] ?? 0) + 1;
}

function sendJsonResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    echo json_encode($data);
    exit();
}

function getRequestData() {
    $data = json_decode(file_get_contents('php://input'), true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        sendJsonResponse(['error' => 'Invalid JSON'], 400);
    }
    return $data;
}
?>
