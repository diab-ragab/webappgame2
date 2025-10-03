<?php
require_once 'config.php';

try {
    $data = getRequestData();

    if (empty($data['username'])) {
        sendJsonResponse(['error' => 'Username is required'], 400);
    }

    $username = $data['username'];
    $pdo = getDbConnection();

    $stmt = $pdo->prepare("SELECT ID FROM users WHERE name = ?");
    $stmt->execute([$username]);
    $account = $stmt->fetch();

    if (!$account) {
        sendJsonResponse(['error' => 'Account not found'], 404);
    }

    $professionNames = [
        1 => 'Swordsman',
        2 => 'Taoist',
        4 => 'Archer',
        8 => 'Apothecary'
    ];

    $stmt = $pdo->prepare("
        SELECT
            Name,
            Profession,
            Level,
            Money,
            Strength,
            Constitution,
            Agility,
            Intelligence,
            Energy,
            PKWins,
            PKTotals,
            RegisterTime,
            LastLoginTime
        FROM basetab_sg
        WHERE AccountID = ?
        ORDER BY Level DESC
    ");
    $stmt->execute([$account['ID']]);
    $characters = $stmt->fetchAll();

    $formattedCharacters = array_map(function($char) use ($professionNames) {
        return [
            'name' => $char['Name'],
            'class' => $professionNames[$char['Profession']] ?? 'Unknown',
            'level' => (int)$char['Level'],
            'resets' => 0,
            'masterResets' => 0,
            'pkLevel' => 0,
            'pkCount' => (int)($char['PKWins'] ?? 0),
            'zen' => (int)($char['Money'] ?? 0),
            'stats' => [
                'strength' => (int)($char['Strength'] ?? 0),
                'dexterity' => (int)($char['Agility'] ?? 0),
                'vitality' => (int)($char['Constitution'] ?? 0),
                'energy' => (int)($char['Energy'] ?? 0),
                'leadership' => (int)($char['Intelligence'] ?? 0)
            ],
            'createdAt' => $char['RegisterTime'],
            'lastOnline' => $char['LastLoginTime']
        ];
    }, $characters);

    sendJsonResponse([
        'success' => true,
        'characters' => $formattedCharacters
    ]);

} catch (Exception $e) {
    sendJsonResponse(['error' => 'Failed to get characters: ' . $e->getMessage()], 500);
}
?>
