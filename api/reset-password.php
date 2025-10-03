<?php
require_once 'config.php';

$data = getRequestData();

$email = trim($data['email'] ?? '');
$newPassword = trim($data['newPassword'] ?? '');

if (!$email || !$newPassword) {
    sendJsonResponse(['error' => 'Email and new password are required'], 400);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    sendJsonResponse(['error' => 'Invalid email format'], 400);
}

if (strlen($newPassword) < 6) {
    sendJsonResponse(['error' => 'Password must be at least 6 characters'], 400);
}

if (!checkRateLimitByIP('reset_password', 120)) {
    sendJsonResponse(['error' => 'Too many reset attempts. Please wait.'], 429);
}

$conn = getDbConnection();

$stmt = $conn->prepare("SELECT ID, name FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
$account = $result->fetch_assoc();
$stmt->close();

if (!$account) {
    sendJsonResponse(['error' => 'No account found with this email'], 404);
}

$username = strtolower($account['name']);
$newHash = hashPassword($username, $newPassword);

$stmt = $conn->prepare("UPDATE users SET passwd = ?, passwd2 = ? WHERE email = ?");
$stmt->bind_param("sss", $newHash, $newHash, $email);

if ($stmt->execute()) {
    $stmt->close();
    sendJsonResponse([
        'success' => true,
        'message' => 'Password reset successfully',
        'username' => $account['name']
    ]);
} else {
    $stmt->close();
    sendJsonResponse(['error' => 'Failed to reset password'], 500);
}
?>
