<?php
require_once 'config.php';

try {
    $pdo = getDbConnection();

    $stmt = $pdo->query("SELECT COUNT(*) as total_accounts FROM account");
    $totalAccounts = $stmt->fetch()['total_accounts'];

    $stmt = $pdo->query("
        SELECT COUNT(DISTINCT id) as online_players
        FROM account
        WHERE last_login >= DATE_SUB(NOW(), INTERVAL 5 MINUTE)
    ");
    $onlinePlayers = $stmt->fetch()['online_players'];

    $stmt = $pdo->query("SELECT COUNT(*) as total_characters FROM basetab_sg");
    $totalCharacters = $stmt->fetch()['total_characters'];

    $stmt = $pdo->query("
        SELECT create_time
        FROM account
        ORDER BY create_time DESC
        LIMIT 1
    ");
    $lastAccountResult = $stmt->fetch();
    $lastAccountCreated = $lastAccountResult ? $lastAccountResult['create_time'] : null;

    $stmt = $pdo->query("
        SELECT create_time
        FROM basetab_sg
        ORDER BY create_time DESC
        LIMIT 1
    ");
    $lastCharacterResult = $stmt->fetch();
    $lastCharacterCreated = $lastCharacterResult ? $lastCharacterResult['create_time'] : null;

    $serverStatus = 'online';
    $maxPlayers = 1000;
    $serverUptime = '99.9%';

    try {
        $host = DB_HOST;
        $port = DB_PORT;
        $connection = @fsockopen($host, $port, $errno, $errstr, 1);
        if (!$connection) {
            $serverStatus = 'offline';
        } else {
            fclose($connection);
        }
    } catch (Exception $e) {
        $serverStatus = 'offline';
    }

    sendJsonResponse([
        'success' => true,
        'status' => $serverStatus,
        'players' => [
            'online' => (int)$onlinePlayers,
            'max' => $maxPlayers
        ],
        'totalAccounts' => (int)$totalAccounts,
        'totalCharacters' => (int)$totalCharacters,
        'lastAccountCreated' => $lastAccountCreated,
        'lastCharacterCreated' => $lastCharacterCreated,
        'uptime' => $serverUptime,
        'lastUpdate' => date('Y-m-d H:i:s')
    ]);

} catch (Exception $e) {
    sendJsonResponse(['error' => 'Failed to get server status: ' . $e->getMessage()], 500);
}
?>
