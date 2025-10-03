<?php
require_once 'config.php';

try {
    $data = getRequestData();
} catch (Exception $e) {
    sendJsonResponse(['error' => 'Invalid request'], 400);
}

$username = strtolower(trim($data['username'] ?? ''));
$currentPassword = trim($data['currentPassword'] ?? '');
$newPassword = trim($data['newPassword'] ?? '');

if (!$username || !$currentPassword || !$newPassword) {
    sendJsonResponse(['error' => 'All fields are required'], 400);
}

if (strlen($newPassword) < 6) {
    sendJsonResponse(['error' => 'New password must be at least 6 characters'], 400);
}

if (!checkRateLimitByIP('change_password', 60)) {
    sendJsonResponse(['error' => 'Too many password change attempts. Please wait.'], 429);
}

try {
    $conn = getDbConnection();

    $currentHash = hashPassword($username, $currentPassword);

    $stmt = $conn->prepare("SELECT ID FROM users WHERE name = ? AND passwd = ?");
    if (!$stmt) {
        throw new Exception('Database error');
    }
    $stmt->bind_param("ss", $username, $currentHash);
    $stmt->execute();
    $result = $stmt->get_result();
    $account = $result->fetch_assoc();
    $stmt->close();

    if (!$account) {
        sendJsonResponse(['error' => 'Invalid username or current password'], 401);
    }

    $newHash = hashPassword($username, $newPassword);

    $stmt = $conn->prepare("UPDATE users SET passwd = ?, passwd2 = ? WHERE ID = ?");
    if (!$stmt) {
        throw new Exception('Database error');
    }
    $stmt->bind_param("ssi", $newHash, $newHash, $account['ID']);

    if ($stmt->execute()) {
        $stmt->close();
        sendJsonResponse([
            'success' => true,
            'message' => 'Password changed successfully'
        ]);
    } else {
        $stmt->close();
        throw new Exception('Failed to execute');
    }
} catch (Exception $e) {
    sendJsonResponse(['error' => 'Password change failed'], 500);
}
?>
