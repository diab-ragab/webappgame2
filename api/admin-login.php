<?php
require_once 'config.php';

try {
    $data = getRequestData();

    if (empty($data['username']) || empty($data['password'])) {
        sendJsonResponse(['error' => 'Username and password are required'], 400);
    }

    $username = $data['username'];
    $password = hashPassword($data['password']);

    $pdo = getDbConnection();

    if ($username !== 'admin' || $data['password'] !== 'admin123') {
        sendJsonResponse(['error' => 'Invalid credentials or insufficient permissions'], 401);
    }

    $token = bin2hex(random_bytes(32));

    sendJsonResponse([
        'success' => true,
        'message' => 'Admin login successful',
        'admin' => [
            'id' => 1,
            'username' => 'admin',
            'email' => 'admin@example.com',
            'adminLevel' => 10,
            'created_at' => date('Y-m-d H:i:s')
        ],
        'token' => $token
    ]);

} catch (Exception $e) {
    sendJsonResponse(['error' => 'Admin login failed: ' . $e->getMessage()], 500);
}
?>
