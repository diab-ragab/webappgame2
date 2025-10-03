<?php
require_once 'config.php';

try {
    $pdo = getDbConnection();

    $stmt = $pdo->query("
        SELECT
            id,
            name,
            type,
            start_time,
            end_time,
            rewards,
            max_participants,
            current_participants,
            status,
            created_at
        FROM events
        ORDER BY start_time ASC
    ");
    $events = $stmt->fetchAll();

    sendJsonResponse([
        'success' => true,
        'events' => $events
    ]);

} catch (Exception $e) {
    sendJsonResponse(['error' => 'Failed to get events: ' . $e->getMessage()], 500);
}
?>
