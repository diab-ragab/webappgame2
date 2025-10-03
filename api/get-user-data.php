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
            ID,
            name,
            email,
            creatime
        FROM users
        WHERE name = ?
    ");
    $stmt->execute([$username]);
    $user = $stmt->fetch();

    if (!$user) {
        sendJsonResponse(['error' => 'User not found'], 404);
    }

    $stmt = $pdo->prepare("SELECT COUNT(*) as count FROM basetab_sg WHERE AccountID = ?");
    $stmt->execute([$user['ID']]);
    $charCount = $stmt->fetch();

    $stmt = $pdo->prepare("SELECT COALESCE(SUM(Money), 0) as totalZen FROM basetab_sg WHERE AccountID = ?");
    $stmt->execute([$user['ID']]);
    $zenData = $stmt->fetch();

    sendJsonResponse([
        'success' => true,
        'user' => [
            'id' => $user['ID'],
            'username' => $user['name'],
            'email' => $user['email'],
            'zenBalance' => (int)$zenData['totalZen'],
            'characterCount' => (int)$charCount['count'],
            'registrationDate' => $user['creatime'],
            'lastLogin' => $user['creatime'],
            'vipLevel' => 0,
            'vipExpiresAt' => null
        ]
    ]);

} catch (Exception $e) {
    sendJsonResponse(['error' => 'Failed to get user data: ' . $e->getMessage()], 500);
}
?>
