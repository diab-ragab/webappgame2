<?php
require_once 'config.php';

try {
    $data = getRequestData();

    if (empty($data['username'])) {
        sendJsonResponse(['error' => 'Username is required'], 400);
    }

    $username = $data['username'];
    $pdo = getDbConnection();

    $stmt = $pdo->prepare("
        SELECT
            id,
            login as username,
            email,
            created_at,
            last_login,
            zen_balance,
            vip_level,
            vip_expires_at
        FROM account
        WHERE login = ?
    ");
    $stmt->execute([$username]);
    $user = $stmt->fetch();

    if (!$user) {
        sendJsonResponse(['error' => 'User not found'], 404);
    }

    $stmt = $pdo->prepare("SELECT COUNT(*) as character_count FROM characters WHERE account_id = ?");
    $stmt->execute([$user['id']]);
    $characterCount = $stmt->fetch()['character_count'];

    sendJsonResponse([
        'success' => true,
        'user' => [
            'id' => $user['id'],
            'username' => $user['username'],
            'email' => $user['email'],
            'zenBalance' => (int)($user['zen_balance'] ?? 0),
            'characterCount' => (int)$characterCount,
            'registrationDate' => $user['created_at'],
            'lastLogin' => $user['last_login'],
            'vipLevel' => (int)($user['vip_level'] ?? 0),
            'vipExpiresAt' => $user['vip_expires_at']
        ]
    ]);

} catch (Exception $e) {
    sendJsonResponse(['error' => 'Failed to get user data: ' . $e->getMessage()], 500);
}
?>
