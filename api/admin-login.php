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
        SELECT id, login as username, email, admin_level, created_at
        FROM account
        WHERE login = ? AND password = ? AND admin_level > 0
    ");
    $stmt->execute([$username, $password]);
    $admin = $stmt->fetch();

    if (!$admin) {
        sendJsonResponse(['error' => 'Invalid credentials or insufficient permissions'], 401);
    }

    $token = bin2hex(random_bytes(32));

    $stmt = $pdo->prepare("UPDATE account SET last_login = NOW() WHERE id = ?");
    $stmt->execute([$admin['id']]);

    sendJsonResponse([
        'success' => true,
        'message' => 'Admin login successful',
        'admin' => [
            'id' => $admin['id'],
            'username' => $admin['username'],
            'email' => $admin['email'],
            'adminLevel' => (int)$admin['admin_level'],
            'created_at' => $admin['created_at']
        ],
        'token' => $token
    ]);

} catch (Exception $e) {
    sendJsonResponse(['error' => 'Admin login failed: ' . $e->getMessage()], 500);
}
?>
