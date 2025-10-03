<?php
require_once 'config.php';

try {
    $data = getRequestData();

    if (empty($data['username']) || empty($data['email']) || empty($data['password'])) {
        sendJsonResponse(['error' => 'Username, email, and password are required'], 400);
    }

    $username = $data['username'];
    $email = $data['email'];
    $password = hashPassword($data['password']);

    if (strlen($data['password']) < 6) {
        sendJsonResponse(['error' => 'Password must be at least 6 characters'], 400);
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        sendJsonResponse(['error' => 'Invalid email address'], 400);
    }

    $pdo = getDbConnection();

    $stmt = $pdo->prepare("SELECT id FROM account WHERE login = ?");
    $stmt->execute([$username]);
    if ($stmt->fetch()) {
        sendJsonResponse(['error' => 'Username already exists'], 409);
    }

    $stmt = $pdo->prepare("SELECT id FROM account WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        sendJsonResponse(['error' => 'Email already registered'], 409);
    }

    $stmt = $pdo->prepare("
        INSERT INTO account (login, password, email, created_at)
        VALUES (?, ?, ?, NOW())
    ");
    $stmt->execute([$username, $password, $email]);

    sendJsonResponse([
        'success' => true,
        'message' => 'Account created successfully'
    ], 201);

} catch (Exception $e) {
    sendJsonResponse(['error' => 'Registration failed: ' . $e->getMessage()], 500);
}
?>
