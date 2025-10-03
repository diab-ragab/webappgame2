<?php
require_once 'config.php';

try {
    $data = getRequestData();

    if (empty($data['username'])) {
        sendJsonResponse(['error' => 'Username is required'], 400);
    }

    $username = $data['username'];
    $pdo = getDbConnection();

    $stmt = $pdo->prepare("SELECT id FROM account WHERE login = ?");
    $stmt->execute([$username]);
    $account = $stmt->fetch();

    if (!$account) {
        sendJsonResponse(['error' => 'Account not found'], 404);
    }

    $stmt = $pdo->prepare("
        SELECT
            name,
            class,
            level,
            resets,
            master_resets,
            pk_level,
            pk_count,
            zen,
            strength,
            dexterity,
            vitality,
            energy,
            leadership,
            created_at,
            last_online
        FROM characters
        WHERE account_id = ?
        ORDER BY level DESC, resets DESC
    ");
    $stmt->execute([$account['id']]);
    $characters = $stmt->fetchAll();

    $formattedCharacters = array_map(function($char) {
        return [
            'name' => $char['name'],
            'class' => $char['class'],
            'level' => (int)$char['level'],
            'resets' => (int)($char['resets'] ?? 0),
            'masterResets' => (int)($char['master_resets'] ?? 0),
            'pkLevel' => (int)($char['pk_level'] ?? 0),
            'pkCount' => (int)($char['pk_count'] ?? 0),
            'zen' => (int)($char['zen'] ?? 0),
            'stats' => [
                'strength' => (int)($char['strength'] ?? 0),
                'dexterity' => (int)($char['dexterity'] ?? 0),
                'vitality' => (int)($char['vitality'] ?? 0),
                'energy' => (int)($char['energy'] ?? 0),
                'leadership' => (int)($char['leadership'] ?? 0)
            ],
            'createdAt' => $char['created_at'],
            'lastOnline' => $char['last_online']
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
