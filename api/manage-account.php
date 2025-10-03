<?php
require_once 'config.php';

try {
    $method = $_SERVER['REQUEST_METHOD'];

    if ($method === 'POST') {
        $data = getRequestData();

        if (empty($data['action'])) {
            sendJsonResponse(['error' => 'Action is required'], 400);
        }

        $pdo = getDbConnection();

        switch ($data['action']) {
            case 'add_zen':
                if (empty($data['account_id']) || !isset($data['amount'])) {
                    sendJsonResponse(['error' => 'Account ID and amount are required'], 400);
                }

                $stmt = $pdo->prepare("
                    UPDATE account
                    SET zen_balance = zen_balance + ?
                    WHERE id = ?
                ");
                $stmt->execute([$data['amount'], $data['account_id']]);

                $stmt = $pdo->prepare("
                    INSERT INTO zen_transactions (account_id, amount, reason, admin, created_at)
                    VALUES (?, ?, ?, ?, NOW())
                ");
                $stmt->execute([
                    $data['account_id'],
                    $data['amount'],
                    $data['reason'] ?? 'Admin added zen',
                    $data['admin'] ?? 'System'
                ]);

                sendJsonResponse([
                    'success' => true,
                    'message' => 'Zen added successfully'
                ]);
                break;

            case 'remove_zen':
                if (empty($data['account_id']) || !isset($data['amount'])) {
                    sendJsonResponse(['error' => 'Account ID and amount are required'], 400);
                }

                $stmt = $pdo->prepare("
                    UPDATE account
                    SET zen_balance = GREATEST(0, zen_balance - ?)
                    WHERE id = ?
                ");
                $stmt->execute([$data['amount'], $data['account_id']]);

                $stmt = $pdo->prepare("
                    INSERT INTO zen_transactions (account_id, amount, reason, admin, created_at)
                    VALUES (?, ?, ?, ?, NOW())
                ");
                $stmt->execute([
                    $data['account_id'],
                    -$data['amount'],
                    $data['reason'] ?? 'Admin removed zen',
                    $data['admin'] ?? 'System'
                ]);

                sendJsonResponse([
                    'success' => true,
                    'message' => 'Zen removed successfully'
                ]);
                break;

            case 'ban':
                if (empty($data['account_id'])) {
                    sendJsonResponse(['error' => 'Account ID is required'], 400);
                }

                $stmt = $pdo->prepare("
                    UPDATE account
                    SET banned = 1, ban_reason = ?, ban_date = NOW()
                    WHERE id = ?
                ");
                $stmt->execute([
                    $data['reason'] ?? 'Banned by admin',
                    $data['account_id']
                ]);

                sendJsonResponse([
                    'success' => true,
                    'message' => 'Account banned successfully'
                ]);
                break;

            case 'unban':
                if (empty($data['account_id'])) {
                    sendJsonResponse(['error' => 'Account ID is required'], 400);
                }

                $stmt = $pdo->prepare("
                    UPDATE account
                    SET banned = 0, ban_reason = NULL, ban_date = NULL
                    WHERE id = ?
                ");
                $stmt->execute([$data['account_id']]);

                sendJsonResponse([
                    'success' => true,
                    'message' => 'Account unbanned successfully'
                ]);
                break;

            case 'delete':
                if (empty($data['account_id'])) {
                    sendJsonResponse(['error' => 'Account ID is required'], 400);
                }

                $stmt = $pdo->prepare("DELETE FROM characters WHERE account_id = ?");
                $stmt->execute([$data['account_id']]);

                $stmt = $pdo->prepare("DELETE FROM account WHERE id = ?");
                $stmt->execute([$data['account_id']]);

                sendJsonResponse([
                    'success' => true,
                    'message' => 'Account deleted successfully'
                ]);
                break;

            default:
                sendJsonResponse(['error' => 'Invalid action'], 400);
        }

    } else {
        sendJsonResponse(['error' => 'Method not allowed'], 405);
    }

} catch (Exception $e) {
    sendJsonResponse(['error' => 'Failed to manage account: ' . $e->getMessage()], 500);
}
?>
