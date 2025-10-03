<?php
require_once 'config.php';

try {
    $search = $_GET['search'] ?? '';
    $limit = (int)($_GET['limit'] ?? 50);
    if ($limit > 500) $limit = 500;

    $conn = getDbConnection();

    if (!empty($search)) {
        $searchTerm = "%{$search}%";
        $stmt = $conn->prepare("
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
        if (!$stmt) {
            throw new Exception('Database error');
        }
        $stmt->bind_param("ssi", $searchTerm, $searchTerm, $limit);
    } else {
        $stmt = $conn->prepare("
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
        if (!$stmt) {
            throw new Exception('Database error');
        }
        $stmt->bind_param("i", $limit);
    }

    $stmt->execute();
    $result = $stmt->get_result();
    $accounts = [];
    while ($row = $result->fetch_assoc()) {
        $accounts[] = $row;
    }
    $stmt->close();

    sendJsonResponse([
        'success' => true,
        'accounts' => $accounts
    ]);
} catch (Exception $e) {
    sendJsonResponse(['error' => 'Failed to get accounts'], 500);
}
?>
