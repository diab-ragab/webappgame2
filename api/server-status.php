<?php
require_once 'config.php';

try {
    $pdo = getDbConnection();

    $stmt = $pdo->query("SELECT COUNT(*) as total_accounts FROM users");
    $totalAccounts = $stmt->fetch()['total_accounts'];

    $stmt = $pdo->query("SELECT COUNT(*) as online_players FROM online");
    $onlinePlayers = $stmt->fetch()['online_players'];

    $stmt = $pdo->query("SELECT COUNT(*) as total_characters FROM basetab_sg");
    $totalCharacters = $stmt->fetch()['total_characters'];

    $stmt = $pdo->query("
        SELECT created_at
        FROM users
        ORDER BY created_at DESC
        LIMIT 1
    ");
    $lastAccountResult = $stmt->fetch();
    $lastAccountCreated = $lastAccountResult ? $lastAccountResult['created_at'] : null;

    $stmt = $pdo->query("
        SELECT RegisterTime
        FROM basetab_sg
        ORDER BY RegisterTime DESC
        LIMIT 1
    ");
    $lastCharacterResult = $stmt->fetch();
    $lastCharacterCreated = $lastCharacterResult ? $lastCharacterResult['RegisterTime'] : null;

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
