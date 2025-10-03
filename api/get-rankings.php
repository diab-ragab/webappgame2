<?php
require_once 'config.php';

try {
    $type = $_GET['type'] ?? 'level';
    $limit = (int)($_GET['limit'] ?? 100);

    if ($limit > 500) $limit = 500;

    $pdo = getDbConnection();

    $professionNames = [
        1 => 'Swordsman',
        2 => 'Taoist',
        4 => 'Archer',
        8 => 'Apothecary'
    ];

    switch ($type) {
        case 'level':
            $stmt = $pdo->prepare("
                SELECT
                    c.Name as name,
                    c.Profession,
                    c.Level as level,
                    0 as resets,
                    0 as master_resets,
                    u.name as account_name
                FROM basetab_sg c
                JOIN users u ON c.AccountID = u.ID
                ORDER BY c.Level DESC
                LIMIT ?
            ");
            break;

        case 'resets':
            $stmt = $pdo->prepare("
                SELECT
                    c.Name as name,
                    c.Profession,
                    c.Level as level,
                    0 as resets,
                    0 as master_resets,
                    u.name as account_name
                FROM basetab_sg c
                JOIN users u ON c.AccountID = u.ID
                ORDER BY c.Level DESC
                LIMIT ?
            ");
            break;

        case 'pk':
            $stmt = $pdo->prepare("
                SELECT
                    c.Name as name,
                    c.Profession,
                    c.Level as level,
                    c.PKWins as pk_count,
                    0 as pk_level,
                    u.name as account_name
                FROM basetab_sg c
                JOIN users u ON c.AccountID = u.ID
                WHERE c.PKWins > 0
                ORDER BY c.PKWins DESC
                LIMIT ?
            ");
            break;

        case 'guild':
            sendJsonResponse([
                'success' => true,
                'type' => $type,
                'rankings' => []
            ]);
            break;

        default:
            sendJsonResponse(['error' => 'Invalid ranking type'], 400);
    }

    $stmt->execute([$limit]);
    $rankings = $stmt->fetchAll();

    $rankings = array_map(function($rank) use ($professionNames) {
        if (isset($rank['Profession'])) {
            $rank['class'] = $professionNames[$rank['Profession']] ?? 'Unknown';
            unset($rank['Profession']);
        }
        return $rank;
    }, $rankings);

    sendJsonResponse([
        'success' => true,
        'type' => $type,
        'rankings' => $rankings
    ]);

} catch (Exception $e) {
    sendJsonResponse(['error' => 'Failed to get rankings: ' . $e->getMessage()], 500);
}
?>
