<?php
require_once 'config.php';

try {
    $data = getRequestData();

    if (empty($data['username']) || empty($data['currentPassword']) || empty($data['newPassword'])) {
        sendJsonResponse(['error' => 'Username, current password, and new password are required'], 400);
    }

    $username = strtolower(trim($data['username']));

    if (strlen($data['newPassword']) < 6) {
        sendJsonResponse(['error' => 'New password must be at least 6 characters'], 400);
    }

    $currentPassword = hashPassword($username, $data['currentPassword']);
    $newPassword = hashPassword($username, $data['newPassword']);

    $pdo = getDbConnection();

    $stmt = $pdo->prepare("SELECT ID FROM users WHERE name = ? AND passwd = ?");
    $stmt->execute([$username, $currentPassword]);
    $account = $stmt->fetch();

    if (!$account) {
        sendJsonResponse(['error' => 'Invalid username or current password'], 401);
    }

    $stmt = $pdo->prepare("UPDATE users SET passwd = ?, passwd2 = ? WHERE ID = ?");
    $stmt->execute([$newPassword, $newPassword, $account['ID']]);

    sendJsonResponse([
        'success' => true,
        'message' => 'Password changed successfully'
    ]);

} catch (Exception $e) {
    sendJsonResponse(['error' => 'Password change failed: ' . $e->getMessage()], 500);
}
?>
