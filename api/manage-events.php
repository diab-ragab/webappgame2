<?php
require_once 'config.php';

try {
    $method = $_SERVER['REQUEST_METHOD'];

    if ($method === 'POST') {
        $data = getRequestData();

        if (empty($data['name']) || empty($data['type']) || empty($data['start_time']) || empty($data['end_time'])) {
            sendJsonResponse(['error' => 'Name, type, start time, and end time are required'], 400);
        }

        $pdo = getDbConnection();

        $stmt = $pdo->prepare("
            INSERT INTO events (name, type, start_time, end_time, rewards, max_participants, current_participants, status, created_at)
            VALUES (?, ?, ?, ?, ?, ?, 0, 'scheduled', NOW())
        ");
        $stmt->execute([
            $data['name'],
            $data['type'],
            $data['start_time'],
            $data['end_time'],
            $data['rewards'] ?? '',
            $data['max_participants'] ?? 0
        ]);

        sendJsonResponse([
            'success' => true,
            'message' => 'Event created successfully',
            'id' => $pdo->lastInsertId()
        ], 201);

    } elseif ($method === 'PUT') {
        $data = getRequestData();

        if (empty($data['id'])) {
            sendJsonResponse(['error' => 'Event ID is required'], 400);
        }

        $pdo = getDbConnection();

        $updates = [];
        $params = [];

        if (isset($data['name'])) {
            $updates[] = "name = ?";
            $params[] = $data['name'];
        }
        if (isset($data['type'])) {
            $updates[] = "type = ?";
            $params[] = $data['type'];
        }
        if (isset($data['start_time'])) {
            $updates[] = "start_time = ?";
            $params[] = $data['start_time'];
        }
        if (isset($data['end_time'])) {
            $updates[] = "end_time = ?";
            $params[] = $data['end_time'];
        }
        if (isset($data['rewards'])) {
            $updates[] = "rewards = ?";
            $params[] = $data['rewards'];
        }
        if (isset($data['max_participants'])) {
            $updates[] = "max_participants = ?";
            $params[] = $data['max_participants'];
        }
        if (isset($data['status'])) {
            $updates[] = "status = ?";
            $params[] = $data['status'];
        }

        $params[] = $data['id'];

        if (empty($updates)) {
            sendJsonResponse(['error' => 'No fields to update'], 400);
        }

        $sql = "UPDATE events SET " . implode(', ', $updates) . " WHERE id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);

        sendJsonResponse([
            'success' => true,
            'message' => 'Event updated successfully'
        ]);

    } elseif ($method === 'DELETE') {
        $data = getRequestData();

        if (empty($data['id'])) {
            sendJsonResponse(['error' => 'Event ID is required'], 400);
        }

        $pdo = getDbConnection();

        $stmt = $pdo->prepare("DELETE FROM events WHERE id = ?");
        $stmt->execute([$data['id']]);

        sendJsonResponse([
            'success' => true,
            'message' => 'Event deleted successfully'
        ]);

    } else {
        sendJsonResponse(['error' => 'Method not allowed'], 405);
    }

} catch (Exception $e) {
    sendJsonResponse(['error' => 'Failed to manage events: ' . $e->getMessage()], 500);
}
?>
