<?php
require_once 'config.php';

try {
    $search = $_GET['search'] ?? '';
    $limit = (int)($_GET['limit'] ?? 50);
    if ($limit > 500) $limit = 500;

    $pdo = getDbConnection();

    if (!empty($search)) {
        $stmt = $pdo->prepare("
            SELECT
                ID as id,
                name as username,
                email,
                creatime as created_at,
                creatime as last_login,
                0 as zen_balance,
                0 as vip_level,
                0 as character_count,
                0 as max_level,
                'offline' as status
            FROM users
            WHERE name LIKE ? OR email LIKE ?
            ORDER BY creatime DESC
            LIMIT ?
        ");
        $searchTerm = "%{$search}%";
        $stmt->execute([$searchTerm, $searchTerm, $limit]);
    } else {
        $stmt = $pdo->prepare("
            SELECT
                ID as id,
                name as username,
                email,
                creatime as created_at,
                creatime as last_login,
                0 as zen_balance,
                0 as vip_level,
                0 as character_count,
                0 as max_level,
                'offline' as status
            FROM users
            ORDER BY creatime DESC
            LIMIT ?
        ");
        $stmt->execute([$limit]);
    }

    $accounts = $stmt->fetchAll();

    sendJsonResponse([
        'success' => true,
        'accounts' => $accounts
    ]);

} catch (Exception $e) {
    sendJsonResponse(['error' => 'Failed to get accounts: ' . $e->getMessage()], 500);
}
?>
