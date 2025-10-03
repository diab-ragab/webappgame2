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

    $stmt = $pdo->prepare("
        SELECT id, login as username, email, created_at
        FROM account
        WHERE login = ? AND password = ?
    ");
    $stmt->execute([$username, $password]);
    $user = $stmt->fetch();

    if (!$user) {
        sendJsonResponse(['error' => 'Invalid username or password'], 401);
    }

    $token = bin2hex(random_bytes(32));

    $stmt = $pdo->prepare("UPDATE account SET last_login = NOW() WHERE id = ?");
    $stmt->execute([$user['id']]);

    sendJsonResponse([
        'success' => true,
        'message' => 'Login successful',
        'user' => [
            'id' => $user['id'],
            'username' => $user['username'],
            'email' => $user['email'],
            'created_at' => $user['created_at']
        ],
        'token' => $token
    ]);

} catch (Exception $e) {
    sendJsonResponse(['error' => 'Login failed: ' . $e->getMessage()], 500);
}
?>
