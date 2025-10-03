# PHP API Setup Guide

This directory contains the PHP API endpoints for your application.

## Installation

1. Copy the `api` folder to your web server's document root (e.g., `htdocs`, `www`, `public_html`)

2. Configure database connection in `config.php`:
   ```php
   define('DB_HOST', 'localhost');
   define('DB_PORT', '3306');
   define('DB_USER', 'your_mysql_user');
   define('DB_PASS', 'your_mysql_password');
   define('DB_NAME', 'your_database_name');
   ```

3. Make sure your MySQL database has the `account` table with these columns:
   - `id` (INT, PRIMARY KEY, AUTO_INCREMENT)
   - `login` (VARCHAR, unique username)
   - `password` (VARCHAR, hashed with SHA-256)
   - `email` (VARCHAR, unique email)
   - `created_at` (DATETIME)
   - `last_login` (DATETIME, nullable)

4. Update the `VITE_API_URL` in your `.env` file:
   ```
   VITE_API_URL=http://localhost/api
   ```
   Or if using a subdirectory:
   ```
   VITE_API_URL=http://localhost/your-project/api
   ```

## API Endpoints

### 1. Login
**POST** `/api/login.php`

Request:
```json
{
  "username": "player123",
  "password": "mypassword"
}
```

Response:
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": 1,
    "username": "player123",
    "email": "player@example.com",
    "created_at": "2024-01-01 12:00:00"
  },
  "token": "abc123..."
}
```

### 2. Register
**POST** `/api/register.php`

Request:
```json
{
  "username": "newplayer",
  "email": "newplayer@example.com",
  "password": "mypassword"
}
```

Response:
```json
{
  "success": true,
  "message": "Account created successfully"
}
```

### 3. Reset Password
**POST** `/api/reset-password.php`

Request:
```json
{
  "email": "player@example.com",
  "newPassword": "mynewpassword"
}
```

Response:
```json
{
  "success": true,
  "message": "Password reset successfully",
  "username": "player123"
}
```

### 4. Change Password
**POST** `/api/change-password.php`

Request:
```json
{
  "username": "player123",
  "currentPassword": "oldpassword",
  "newPassword": "newpassword"
}
```

Response:
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

### 5. Server Status
**GET** `/api/server-status.php`

Response:
```json
{
  "success": true,
  "status": "online",
  "players": {
    "online": 245,
    "max": 1000
  },
  "totalAccounts": 1547,
  "uptime": "99.9%",
  "lastUpdate": "2024-01-15 14:30:00"
}
```

## Security Features

- CORS headers configured for cross-origin requests
- SQL injection protection using prepared statements
- Password hashing with SHA-256
- Input validation and sanitization
- Proper error handling and HTTP status codes

## Database Schema Example

```sql
CREATE TABLE IF NOT EXISTS `account` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `login` VARCHAR(50) NOT NULL UNIQUE,
  `password` VARCHAR(64) NOT NULL,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `last_login` DATETIME NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

## Testing

Test the API endpoints using tools like:
- Postman
- cURL
- Browser console with fetch()

Example cURL test:
```bash
curl -X POST http://localhost/api/login.php \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"test123"}'
```

## Troubleshooting

1. **CORS errors**: Make sure your web server allows CORS headers
2. **Database connection failed**: Check database credentials in `config.php`
3. **404 errors**: Verify the API path matches your web server configuration
4. **JSON errors**: Ensure PHP has JSON extension enabled
