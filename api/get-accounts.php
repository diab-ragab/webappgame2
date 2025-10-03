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
                a.id,
                a.login as username,
                a.email,
                a.created_at,
                a.last_login,
                a.zen_balance,
                a.vip_level,
                COUNT(c.name) as character_count,
                MAX(c.level) as max_level,
                IF(a.last_login >= DATE_SUB(NOW(), INTERVAL 5 MINUTE), 'online', 'offline') as status
            FROM account a
            LEFT JOIN characters c ON a.id = c.account_id
            WHERE a.login LIKE ? OR a.email LIKE ?
            GROUP BY a.id
            ORDER BY a.last_login DESC
            LIMIT ?
        ");
        $searchTerm = "%{$search}%";
        $stmt->execute([$searchTerm, $searchTerm, $limit]);
    } else {
        $stmt = $pdo->prepare("
            SELECT
                a.id,
                a.login as username,
                a.email,
                a.created_at,
                a.last_login,
                a.zen_balance,
                a.vip_level,
                COUNT(c.name) as character_count,
                MAX(c.level) as max_level,
                IF(a.last_login >= DATE_SUB(NOW(), INTERVAL 5 MINUTE), 'online', 'offline') as status
            FROM account a
            LEFT JOIN characters c ON a.id = c.account_id
            GROUP BY a.id
            ORDER BY a.last_login DESC
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
