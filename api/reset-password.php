<?php
require_once 'config.php';

try {
    $data = getRequestData();

    if (empty($data['email']) || empty($data['newPassword'])) {
        sendJsonResponse(['error' => 'Email and new password are required'], 400);
    }

    $email = $data['email'];
    $newPassword = hashPassword($data['newPassword']);

    if (strlen($data['newPassword']) < 6) {
        sendJsonResponse(['error' => 'Password must be at least 6 characters'], 400);
    }

    $pdo = getDbConnection();

    $stmt = $pdo->prepare("SELECT ID, name FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $account = $stmt->fetch();

    if (!$account) {
        sendJsonResponse(['error' => 'No account found with this email'], 404);
    }

    $stmt = $pdo->prepare("UPDATE users SET passwd = ?, passwd2 = ? WHERE email = ?");
    $stmt->execute([$newPassword, $newPassword, $email]);

    sendJsonResponse([
        'success' => true,
        'message' => 'Password reset successfully',
        'username' => $account['name']
    ]);

} catch (Exception $e) {
    sendJsonResponse(['error' => 'Password reset failed: ' . $e->getMessage()], 500);
}
?>
