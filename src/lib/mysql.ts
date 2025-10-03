import mysql from 'mysql2/promise';

interface MySQLConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  ssl?: {
    rejectUnauthorized: boolean;
  };
  connectionLimit: number;
  connectTimeout: number;
  waitForConnections: boolean;
  queueLimit: number;
  enableKeepAlive: boolean;
  keepAliveInitialDelay: number;
  charset: string;
  timezone: string;
  multipleStatements: boolean;
}

const config: MySQLConfig = {
  host: import.meta.env.VITE_MYSQL_HOST || 'localhost',
  port: parseInt(import.meta.env.VITE_MYSQL_PORT || '3306'),
  user: import.meta.env.VITE_MYSQL_USER || '',
  password: import.meta.env.VITE_MYSQL_PASSWORD || '',
  database: import.meta.env.VITE_MYSQL_DATABASE || '',
  ssl: import.meta.env.VITE_MYSQL_SSL === 'true' ? {
    rejectUnauthorized: true
  } : undefined,
  connectionLimit: 10,
  connectTimeout: 10000,
  waitForConnections: true,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  charset: 'utf8mb4',
  timezone: '+00:00',
  multipleStatements: false,
};

let pool: mysql.Pool | null = null;

export const getPool = (): mysql.Pool => {
  if (!pool) {
    pool = mysql.createPool(config);
  }
  return pool;
};

export const closePool = async (): Promise<void> => {
  if (pool) {
    await pool.end();
    pool = null;
  }
};

export const testConnection = async (): Promise<boolean> => {
  try {
    const connection = await getPool().getConnection();
    await connection.ping();
    connection.release();
    return true;
  } catch (error) {
    console.error('MySQL connection test failed:', error);
    return false;
  }
};

export default getPool;
