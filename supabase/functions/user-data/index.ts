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
    const userId = url.searchParams.get("userId");

    if (!userId) {
      return new Response(
        JSON.stringify({ error: "User ID is required" }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const connection = await createClient({
      host: Deno.env.get("MYSQL_HOST"),
      port: parseInt(Deno.env.get("MYSQL_PORT") || "3306"),
      user: Deno.env.get("MYSQL_USER"),
      password: Deno.env.get("MYSQL_PASSWORD"),
      database: Deno.env.get("MYSQL_DATABASE"),
      ssl: Deno.env.get("MYSQL_SSL") === "true" ? { rejectUnauthorized: true } : undefined,
    });

    const [accountRows] = await connection.execute(
      "SELECT id, login, email, status, coins, cash, create_time, last_login FROM account WHERE id = ?",
      [userId]
    );

    if (accountRows.length === 0) {
      await connection.end();
      return new Response(
        JSON.stringify({ error: "User not found" }),
        {
          status: 404,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const user = accountRows[0];

    const [characterRows] = await connection.execute(
      "SELECT id, name, level, job, exp FROM player WHERE account_id = ?",
      [userId]
    );

    await connection.end();

    return new Response(
      JSON.stringify({
        user: {
          id: user.id,
          username: user.login,
          email: user.email,
          status: user.status,
          coins: user.coins || 0,
          cash: user.cash || 0,
          createTime: user.create_time,
          lastLogin: user.last_login,
        },
        characters: characterRows.map(char => ({
          id: char.id,
          name: char.name,
          level: char.level,
          job: char.job,
          exp: char.exp,
        })),
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
      JSON.stringify({ error: "Failed to fetch user data", details: error.message }),
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