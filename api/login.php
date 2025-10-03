<?php
require_once 'config.php';

try {
    $data = getRequestData();

    if (empty($data['username']) || empty($data['password'])) {
        sendJsonResponse(['error' => 'Username and password are required'], 400);
    }

    $username = strtolower(trim($data['username']));
    $password = hashPassword($username, $data['password']);

    $pdo = getDbConnection();

    $stmt = $pdo->prepare("
        SELECT ID, name, email, creatime
        FROM users
        WHERE name = ? AND passwd = ?
    ");
    $stmt->execute([$username, $password]);
    $user = $stmt->fetch();

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

} catch (Exception $e) {
    sendJsonResponse(['error' => 'Login failed: ' . $e->getMessage()], 500);
}
?>
