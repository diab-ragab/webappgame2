import { getPool } from './mysql';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

export const executeQuery = async <T extends RowDataPacket>(
  query: string,
  params: any[] = []
): Promise<T[]> => {
  try {
    const pool = getPool();
    const [rows] = await pool.execute<T[]>(query, params);
    return rows;
  } catch (error) {
    console.error('Query execution failed:', error);
    throw error;
  }
};

export const executeUpdate = async (
  query: string,
  params: any[] = []
): Promise<ResultSetHeader> => {
  try {
    const pool = getPool();
    const [result] = await pool.execute<ResultSetHeader>(query, params);
    return result;
  } catch (error) {
    console.error('Update execution failed:', error);
    throw error;
  }
};

export const executeTransaction = async (
  queries: Array<{ query: string; params: any[] }>
): Promise<void> => {
  const connection = await getPool().getConnection();
  try {
    await connection.beginTransaction();

    for (const { query, params } of queries) {
      await connection.execute(query, params);
    }

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    console.error('Transaction failed:', error);
    throw error;
  } finally {
    connection.release();
  }
};

export const sanitizeInput = (input: string): string => {
  return input.replace(/[^\w\s@.-]/gi, '');
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const hashPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};
