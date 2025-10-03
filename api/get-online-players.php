<?php
require_once 'config.php';

try {
    $pdo = getDbConnection();

    $stmt = $pdo->query("
        SELECT
            c.name,
            c.class,
            c.level,
            c.resets,
            a.login as account_name
        FROM characters c
        JOIN account a ON c.account_id = a.id
        WHERE c.is_online = 1 OR a.last_login >= DATE_SUB(NOW(), INTERVAL 5 MINUTE)
        ORDER BY c.level DESC
    ");
    $players = $stmt->fetchAll();

    sendJsonResponse([
        'success' => true,
        'count' => count($players),
        'players' => $players
    ]);

} catch (Exception $e) {
    sendJsonResponse(['error' => 'Failed to get online players: ' . $e->getMessage()], 500);
}
?>
