<?php
require_once 'config.php';

try {
    $type = $_GET['type'] ?? 'level';
    $limit = (int)($_GET['limit'] ?? 100);

    if ($limit > 500) $limit = 500;

    $pdo = getDbConnection();

    switch ($type) {
        case 'level':
            $stmt = $pdo->prepare("
                SELECT
                    c.name,
                    c.class,
                    c.level,
                    c.resets,
                    c.master_resets,
                    a.login as account_name
                FROM characters c
                JOIN account a ON c.account_id = a.id
                ORDER BY c.level DESC, c.resets DESC, c.master_resets DESC
                LIMIT ?
            ");
            break;

        case 'resets':
            $stmt = $pdo->prepare("
                SELECT
                    c.name,
                    c.class,
                    c.level,
                    c.resets,
                    c.master_resets,
                    a.login as account_name
                FROM characters c
                JOIN account a ON c.account_id = a.id
                ORDER BY c.resets DESC, c.master_resets DESC, c.level DESC
                LIMIT ?
            ");
            break;

        case 'pk':
            $stmt = $pdo->prepare("
                SELECT
                    c.name,
                    c.class,
                    c.level,
                    c.pk_count,
                    c.pk_level,
                    a.login as account_name
                FROM characters c
                JOIN account a ON c.account_id = a.id
                WHERE c.pk_count > 0
                ORDER BY c.pk_count DESC, c.pk_level DESC
                LIMIT ?
            ");
            break;

        case 'guild':
            $stmt = $pdo->prepare("
                SELECT
                    g.name as guild_name,
                    g.master_name,
                    g.level as guild_level,
                    g.score,
                    COUNT(gm.character_name) as member_count
                FROM guilds g
                LEFT JOIN guild_members gm ON g.id = gm.guild_id
                GROUP BY g.id
                ORDER BY g.score DESC, g.level DESC
                LIMIT ?
            ");
            break;

        default:
            sendJsonResponse(['error' => 'Invalid ranking type'], 400);
    }

    $stmt->execute([$limit]);
    $rankings = $stmt->fetchAll();

    sendJsonResponse([
        'success' => true,
        'type' => $type,
        'rankings' => $rankings
    ]);

} catch (Exception $e) {
    sendJsonResponse(['error' => 'Failed to get rankings: ' . $e->getMessage()], 500);
}
?>
