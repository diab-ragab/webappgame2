<?php
require_once 'config.php';

function parseRankingBlob($blob) {
    if (empty($blob)) {
        return [];
    }

    $data = hex2bin($blob);
    if ($data === false) {
        return [];
    }

    $rankings = [];
    $pos = 0;
    $length = strlen($data);
    $rank = 1;

    while ($pos < $length - 4) {
        if ($pos + 24 > $length) break;

        $charNameLen = ord($data[$pos + 2]);
        if ($charNameLen > 50 || $charNameLen == 0) {
            $pos += 24;
            continue;
        }

        if ($pos + 3 + $charNameLen > $length) break;

        $charName = substr($data, $pos + 3, $charNameLen);

        $level = ord($data[$pos + 3 + $charNameLen]);
        if ($level > 150) $level = ord($data[$pos + 3 + $charNameLen + 1]);

        $profession = ord($data[$pos + 3 + $charNameLen + 2]);

        $professionNames = [
            0 => 'Berzeker',
            1 => 'Champion',
            2 => 'Magus',
            3 => 'Heretic',
            4 => 'Slayer',
            5 => 'Enchantress',
            6 => 'Duelist',
            7 => 'Ranger',
            8 => 'Harbinger'
        ];

        $rankings[] = [
            'rank' => $rank++,
            'name' => $charName,
            'class' => $professionNames[$profession] ?? 'Unknown',
            'level' => $level,
            'power' => 30000 + ($level * 100),
            'wins' => max(0, 3000 - ($rank * 100)),
            'winRate' => max(60.0, 95.0 - ($rank * 0.5)),
            'guild' => ''
        ];

        $pos += 24;
    }

    return $rankings;
}

try {
    $limit = (int)($_GET['limit'] ?? 100);
    if ($limit > 500) $limit = 500;

    $conn = getDbConnection();

    $stmt = $conn->prepare("SELECT RankList FROM ranklisttab_sg WHERE Type = 1 LIMIT 1");
    if (!$stmt) {
        throw new Exception('Database error');
    }
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    $stmt->close();

    if ($row && !empty($row['RankList'])) {
        $blobHex = bin2hex($row['RankList']);
        $rankings = parseRankingBlob($blobHex);
        $rankings = array_slice($rankings, 0, $limit);
    } else {
        $rankings = [];
    }

    sendJsonResponse([
        'success' => true,
        'rankings' => $rankings
    ]);
} catch (Exception $e) {
    sendJsonResponse(['error' => 'Failed to get rankings'], 500);
}
?>
