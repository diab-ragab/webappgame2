<?php
require_once 'config.php';

try {
    $data = getRequestData();

    if (empty($data['username']) || empty($data['email']) || empty($data['password'])) {
        sendJsonResponse(['error' => 'Username, email, and password are required'], 400);
    }

    $username = strtolower(trim($data['username']));
    $email = trim($data['email']);

    if (strlen($data['password']) < 6) {
        sendJsonResponse(['error' => 'Password must be at least 6 characters'], 400);
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        sendJsonResponse(['error' => 'Invalid email address'], 400);
    }

    $password = hashPassword($username, $data['password']);

    $pdo = getDbConnection();

    $stmt = $pdo->prepare("SELECT ID FROM users WHERE name = ?");
    $stmt->execute([$username]);
    if ($stmt->fetch()) {
        sendJsonResponse(['error' => 'Username already exists'], 409);
    }

    $stmt = $pdo->prepare("SELECT ID FROM users WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        sendJsonResponse(['error' => 'Email already registered'], 409);
    }

    $userId = getNextUserId($pdo);

    $stmt = $pdo->prepare("
        INSERT INTO users (ID, name, passwd, Prompt, answer, truename, idnumber, email,
                          mobilenumber, province, city, phonenumber, address, postalcode,
                          gender, creatime, qq, passwd2)
        VALUES (?, ?, ?, '0', '0', '0', '0', ?, '0', '0', '0', '0', '0', '0', 0, NOW(), '', ?)
    ");
    $stmt->execute([$userId, $username, $password, $email, $password]);

    sendJsonResponse([
        'success' => true,
        'message' => 'Account created successfully'
    ], 201);

} catch (Exception $e) {
    sendJsonResponse(['error' => 'Registration failed: ' . $e->getMessage()], 500);
}
?>
