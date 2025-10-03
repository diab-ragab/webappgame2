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

### 6. Get User Data
**POST** `/api/get-user-data.php`

Request:
```json
{
  "username": "player123"
}
```

Response:
```json
{
  "success": true,
  "user": {
    "id": 1,
    "username": "player123",
    "email": "player@example.com",
    "zenBalance": 2500000,
    "characterCount": 3,
    "registrationDate": "2024-01-01 12:00:00",
    "lastLogin": "2024-01-15 16:45:23",
    "vipLevel": 2,
    "vipExpiresAt": "2024-02-01 00:00:00"
  }
}
```

### 7. Get Characters
**POST** `/api/get-characters.php`

Request:
```json
{
  "username": "player123"
}
```

Response:
```json
{
  "success": true,
  "characters": [
    {
      "name": "DragonSlayer",
      "class": "Dark Knight",
      "level": 400,
      "resets": 25,
      "masterResets": 5,
      "pkLevel": 3,
      "pkCount": 150,
      "zen": 5000000,
      "stats": {
        "strength": 1500,
        "dexterity": 800,
        "vitality": 1200,
        "energy": 500,
        "leadership": 0
      }
    }
  ]
}
```

### 8. Get Rankings
**GET** `/api/get-rankings.php?type=level&limit=100`

Query Parameters:
- `type`: level, resets, pk, guild
- `limit`: number of results (max 500)

Response:
```json
{
  "success": true,
  "type": "level",
  "rankings": [
    {
      "name": "DragonSlayer",
      "class": "Dark Knight",
      "level": 400,
      "resets": 25,
      "master_resets": 5,
      "account_name": "player123"
    }
  ]
}
```

### 9. Get News
**GET** `/api/get-news.php?limit=10`

Response:
```json
{
  "success": true,
  "news": [
    {
      "id": 1,
      "title": "Server Update",
      "content": "New features added...",
      "author": "Admin",
      "image_url": "https://example.com/image.jpg",
      "created_at": "2024-01-15 10:00:00",
      "updated_at": "2024-01-15 10:00:00"
    }
  ]
}
```

### 10. Manage News (Admin)
**POST/PUT/DELETE** `/api/manage-news.php`

Create News (POST):
```json
{
  "title": "New Event",
  "content": "Details here...",
  "author": "Admin",
  "image_url": "https://example.com/image.jpg"
}
```

Update News (PUT):
```json
{
  "id": 1,
  "title": "Updated Title",
  "content": "Updated content..."
}
```

Delete News (DELETE):
```json
{
  "id": 1
}
```

### 11. Get Events
**GET** `/api/get-events.php`

Response:
```json
{
  "success": true,
  "events": [
    {
      "id": 1,
      "name": "PvP Tournament",
      "type": "PvP Event",
      "start_time": "2024-01-20 18:00:00",
      "end_time": "2024-01-20 20:00:00",
      "rewards": "Epic Items + 10M Zen",
      "max_participants": 100,
      "current_participants": 45,
      "status": "scheduled"
    }
  ]
}
```

### 12. Manage Events (Admin)
**POST/PUT/DELETE** `/api/manage-events.php`

Similar to manage-news.php structure.

### 13. Get Accounts (Admin)
**GET** `/api/get-accounts.php?search=player&limit=50`

Response:
```json
{
  "success": true,
  "accounts": [
    {
      "id": 1,
      "username": "player123",
      "email": "player@example.com",
      "created_at": "2024-01-01 12:00:00",
      "last_login": "2024-01-15 16:45:23",
      "zen_balance": 2500000,
      "vip_level": 2,
      "character_count": 3,
      "max_level": 400,
      "status": "online"
    }
  ]
}
```

### 14. Manage Account (Admin)
**POST** `/api/manage-account.php`

Add Zen:
```json
{
  "action": "add_zen",
  "account_id": 1,
  "amount": 1000000,
  "reason": "Event reward",
  "admin": "AdminName"
}
```

Remove Zen:
```json
{
  "action": "remove_zen",
  "account_id": 1,
  "amount": 500000,
  "reason": "Violation penalty"
}
```

Ban Account:
```json
{
  "action": "ban",
  "account_id": 1,
  "reason": "Cheating"
}
```

Unban Account:
```json
{
  "action": "unban",
  "account_id": 1
}
```

Delete Account:
```json
{
  "action": "delete",
  "account_id": 1
}
```

### 15. Admin Login
**POST** `/api/admin-login.php`

Request:
```json
{
  "username": "admin",
  "password": "adminpass"
}
```

Response:
```json
{
  "success": true,
  "message": "Admin login successful",
  "admin": {
    "id": 1,
    "username": "admin",
    "email": "admin@example.com",
    "adminLevel": 10,
    "created_at": "2024-01-01 00:00:00"
  },
  "token": "abc123..."
}
```

### 16. Get Online Players
**GET** `/api/get-online-players.php`

Response:
```json
{
  "success": true,
  "count": 245,
  "players": [
    {
      "name": "DragonSlayer",
      "class": "Dark Knight",
      "level": 400,
      "resets": 25,
      "account_name": "player123"
    }
  ]
}
```

## Database Schema Example

```sql
CREATE TABLE IF NOT EXISTS `account` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `login` VARCHAR(50) NOT NULL UNIQUE,
  `password` VARCHAR(64) NOT NULL,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `last_login` DATETIME NULL,
  `zen_balance` BIGINT DEFAULT 0,
  `vip_level` INT DEFAULT 0,
  `vip_expires_at` DATETIME NULL,
  `admin_level` INT DEFAULT 0,
  `banned` TINYINT DEFAULT 0,
  `ban_reason` TEXT NULL,
  `ban_date` DATETIME NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `characters` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `account_id` INT NOT NULL,
  `name` VARCHAR(50) NOT NULL UNIQUE,
  `class` VARCHAR(50) NOT NULL,
  `level` INT DEFAULT 1,
  `resets` INT DEFAULT 0,
  `master_resets` INT DEFAULT 0,
  `pk_level` INT DEFAULT 0,
  `pk_count` INT DEFAULT 0,
  `zen` BIGINT DEFAULT 0,
  `strength` INT DEFAULT 0,
  `dexterity` INT DEFAULT 0,
  `vitality` INT DEFAULT 0,
  `energy` INT DEFAULT 0,
  `leadership` INT DEFAULT 0,
  `is_online` TINYINT DEFAULT 0,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `last_online` DATETIME NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`account_id`) REFERENCES `account`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `news` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `content` TEXT NOT NULL,
  `author` VARCHAR(100) NOT NULL,
  `image_url` VARCHAR(500) NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `events` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `type` VARCHAR(100) NOT NULL,
  `start_time` DATETIME NOT NULL,
  `end_time` DATETIME NOT NULL,
  `rewards` TEXT NULL,
  `max_participants` INT DEFAULT 0,
  `current_participants` INT DEFAULT 0,
  `status` VARCHAR(50) DEFAULT 'scheduled',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `guilds` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL UNIQUE,
  `master_name` VARCHAR(50) NOT NULL,
  `level` INT DEFAULT 1,
  `score` INT DEFAULT 0,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `guild_members` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `guild_id` INT NOT NULL,
  `character_name` VARCHAR(50) NOT NULL,
  `rank` VARCHAR(50) DEFAULT 'Member',
  `joined_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`guild_id`) REFERENCES `guilds`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `zen_transactions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `account_id` INT NOT NULL,
  `amount` BIGINT NOT NULL,
  `reason` TEXT NULL,
  `admin` VARCHAR(100) NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`account_id`) REFERENCES `account`(`id`) ON DELETE CASCADE
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
