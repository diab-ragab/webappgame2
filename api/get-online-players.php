<?php
require_once 'config.php';

try {
    $pdo = getDbConnection();

    $professionNames = [
        1 => 'Swordsman',
        2 => 'Taoist',
        4 => 'Archer',
        8 => 'Apothecary'
    ];

    $stmt = $pdo->query("
        SELECT
            c.Name as name,
            c.Profession,
            c.Level as level,
            0 as resets,
            u.name as account_name
        FROM basetab_sg c
        JOIN users u ON c.AccountID = u.ID
        WHERE c.LastLoginTime >= DATE_SUB(NOW(), INTERVAL 5 MINUTE)
        ORDER BY c.Level DESC
        LIMIT 100
    ");
    $players = $stmt->fetchAll();

    $players = array_map(function($player) use ($professionNames) {
        $player['class'] = $professionNames[$player['Profession']] ?? 'Unknown';
        unset($player['Profession']);
        return $player;
    }, $players);

    sendJsonResponse([
        'success' => true,
        'count' => count($players),
        'players' => $players
    ]);

} catch (Exception $e) {
    sendJsonResponse(['error' => 'Failed to get online players: ' . $e->getMessage()], 500);
}
?>
