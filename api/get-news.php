<?php
require_once 'config.php';

try {
    $limit = (int)($_GET['limit'] ?? 10);
    if ($limit > 100) $limit = 100;

    $pdo = getDbConnection();

    $stmt = $pdo->prepare("
        SELECT
            id,
            title,
            content,
            author,
            image_url,
            created_at,
            updated_at
        FROM news
        ORDER BY created_at DESC
        LIMIT ?
    ");
    $stmt->execute([$limit]);
    $news = $stmt->fetchAll();

    sendJsonResponse([
        'success' => true,
        'news' => $news
    ]);

} catch (Exception $e) {
    sendJsonResponse(['error' => 'Failed to get news: ' . $e->getMessage()], 500);
}
?>
