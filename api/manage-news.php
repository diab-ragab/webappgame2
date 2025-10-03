<?php
require_once 'config.php';

try {
    $method = $_SERVER['REQUEST_METHOD'];

    if ($method === 'POST') {
        $data = getRequestData();

        if (empty($data['title']) || empty($data['content']) || empty($data['author'])) {
            sendJsonResponse(['error' => 'Title, content, and author are required'], 400);
        }

        $pdo = getDbConnection();

        $stmt = $pdo->prepare("
            INSERT INTO news (title, content, author, image_url, created_at, updated_at)
            VALUES (?, ?, ?, ?, NOW(), NOW())
        ");
        $stmt->execute([
            $data['title'],
            $data['content'],
            $data['author'],
            $data['image_url'] ?? null
        ]);

        sendJsonResponse([
            'success' => true,
            'message' => 'News article created successfully',
            'id' => $pdo->lastInsertId()
        ], 201);

    } elseif ($method === 'PUT') {
        $data = getRequestData();

        if (empty($data['id'])) {
            sendJsonResponse(['error' => 'News ID is required'], 400);
        }

        $pdo = getDbConnection();

        $updates = [];
        $params = [];

        if (isset($data['title'])) {
            $updates[] = "title = ?";
            $params[] = $data['title'];
        }
        if (isset($data['content'])) {
            $updates[] = "content = ?";
            $params[] = $data['content'];
        }
        if (isset($data['author'])) {
            $updates[] = "author = ?";
            $params[] = $data['author'];
        }
        if (isset($data['image_url'])) {
            $updates[] = "image_url = ?";
            $params[] = $data['image_url'];
        }

        $updates[] = "updated_at = NOW()";
        $params[] = $data['id'];

        if (empty($updates)) {
            sendJsonResponse(['error' => 'No fields to update'], 400);
        }

        $sql = "UPDATE news SET " . implode(', ', $updates) . " WHERE id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);

        sendJsonResponse([
            'success' => true,
            'message' => 'News article updated successfully'
        ]);

    } elseif ($method === 'DELETE') {
        $data = getRequestData();

        if (empty($data['id'])) {
            sendJsonResponse(['error' => 'News ID is required'], 400);
        }

        $pdo = getDbConnection();

        $stmt = $pdo->prepare("DELETE FROM news WHERE id = ?");
        $stmt->execute([$data['id']]);

        sendJsonResponse([
            'success' => true,
            'message' => 'News article deleted successfully'
        ]);

    } else {
        sendJsonResponse(['error' => 'Method not allowed'], 405);
    }

} catch (Exception $e) {
    sendJsonResponse(['error' => 'Failed to manage news: ' . $e->getMessage()], 500);
}
?>
