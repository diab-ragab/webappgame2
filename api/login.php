<?php
require_once 'config.php';

$data = getRequestData();

$username = strtolower(trim($data['username'] ?? ''));
$password = trim($data['password'] ?? '');

if (!$username || !$password) {
    sendJsonResponse(['error' => 'Username and password are required'], 400);
}

if (!checkRateLimitByIP('login', 10)) {
    sendJsonResponse(['error' => 'Too many login attempts. Please wait.'], 429);
}

$conn = getDbConnection();

$hash = hashPassword($username, $password);

$stmt = $conn->prepare("SELECT ID, name, email, creatime FROM users WHERE name = ? AND passwd = ?");
$stmt->bind_param("ss", $username, $hash);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();
$stmt->close();

if (!$user) {
    sendJsonResponse(['error' => 'Invalid username or password'], 401);
}

$token = bin2hex(random_bytes(32));

sendJsonResponse([
    'success' => true,
    'message' => 'Login successful',
    'user' => [
        'id' => $user['ID'],
        'username' => $user['name'],
        'email' => $user['email'],
        'created_at' => $user['creatime']
    ],
    'token' => $token
]);
?>
