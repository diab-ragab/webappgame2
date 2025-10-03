import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:mysql2@3.11.5/promise";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const url = new URL(req.url);
    const limit = url.searchParams.get("limit") || "50";
    const offset = url.searchParams.get("offset") || "0";

    const connection = await createClient({
      host: Deno.env.get("MYSQL_HOST"),
      port: parseInt(Deno.env.get("MYSQL_PORT") || "3306"),
      user: Deno.env.get("MYSQL_USER"),
      password: Deno.env.get("MYSQL_PASSWORD"),
      database: Deno.env.get("MYSQL_DATABASE"),
      ssl: Deno.env.get("MYSQL_SSL") === "true" ? { rejectUnauthorized: true } : undefined,
    });

    const [rows] = await connection.execute(
      "SELECT id, login, email, status, coins, cash, create_time, last_login FROM account ORDER BY create_time DESC LIMIT ? OFFSET ?",
      [parseInt(limit), parseInt(offset)]
    );

    const [countRows] = await connection.execute(
      "SELECT COUNT(*) as total FROM account"
    );

    const accountsWithCharacters = [];
    
    for (const account of rows) {
      const [charRows] = await connection.execute(
        "SELECT COUNT(*) as char_count FROM player WHERE account_id = ?",
        [account.id]
      );
      
      accountsWithCharacters.push({
        id: account.id,
        username: account.login,
        email: account.email,
        status: account.status,
        coins: account.coins || 0,
        cash: account.cash || 0,
        createTime: account.create_time,
        lastLogin: account.last_login,
        characterCount: charRows[0]?.char_count || 0,
      });
    }

    await connection.end();

    return new Response(
      JSON.stringify({
        accounts: accountsWithCharacters,
        total: countRows[0]?.total || 0,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch accounts", details: error.message }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});