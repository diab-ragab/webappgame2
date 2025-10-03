<?php
require_once 'config.php';

try {
    $data = getRequestData();
} catch (Exception $e) {
    sendJsonResponse(['error' => 'Invalid request'], 400);
}

$username = strtolower(trim($data['username'] ?? ''));
$email = trim($data['email'] ?? '');
$password = trim($data['password'] ?? '');

if (!$username || !$email || !$password) {
    sendJsonResponse(['error' => 'All fields are required'], 400);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    sendJsonResponse(['error' => 'Invalid email format'], 400);
}

if (strlen($password) < 6) {
    sendJsonResponse(['error' => 'Password must be at least 6 characters'], 400);
}

if (!checkRateLimitByIP('register', 300)) {
    sendJsonResponse(['error' => 'Please wait a few minutes before registering again'], 429);
}

try {
    $conn = getDbConnection();

    $stmt = $conn->prepare("SELECT ID FROM users WHERE name = ?");
    if (!$stmt) {
        throw new Exception('Database error');
    }
    $stmt->bind_param("s", $username);
    $stmt->execute();
    if ($stmt->get_result()->num_rows > 0) {
        $stmt->close();
        sendJsonResponse(['error' => 'Username already exists'], 409);
    }
    $stmt->close();

    $stmt = $conn->prepare("SELECT ID FROM users WHERE email = ?");
    if (!$stmt) {
        throw new Exception('Database error');
    }
    $stmt->bind_param("s", $email);
    $stmt->execute();
    if ($stmt->get_result()->num_rows > 0) {
        $stmt->close();
        sendJsonResponse(['error' => 'Email already registered'], 409);
    }
    $stmt->close();

    $userId = getNextUserId($conn);
    $hash = hashPassword($username, $password);

    $stmt = $conn->prepare("
        INSERT INTO users (
            ID, name, passwd, passwd2, email, Prompt, answer, truename,
            idnumber, mobilenumber, province, city, phonenumber, address,
            postalcode, gender, birthday, creatime, qq
        ) VALUES (
            ?, ?, ?, ?, ?, '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 0, NULL, NOW(), ''
        )
    ");
    if (!$stmt) {
        throw new Exception('Prepare failed: ' . $conn->error);
    }

    if (!$stmt->bind_param("issss", $userId, $username, $hash, $hash, $email)) {
        throw new Exception('Bind failed: ' . $stmt->error);
    }

    if ($stmt->execute()) {
        $stmt->close();
        sendJsonResponse([
            'success' => true,
            'message' => 'Account created successfully'
        ], 201);
    } else {
        $error = $stmt->error;
        $stmt->close();
        throw new Exception('Execute failed: ' . $error);
    }
} catch (Exception $e) {
    error_log("Registration error: " . $e->getMessage());
    sendJsonResponse(['error' => 'Registration failed', 'details' => $e->getMessage()], 500);
}
?>
