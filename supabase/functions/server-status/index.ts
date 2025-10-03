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
    const connection = await createClient({
      host: Deno.env.get("MYSQL_HOST"),
      port: parseInt(Deno.env.get("MYSQL_PORT") || "3306"),
      user: Deno.env.get("MYSQL_USER"),
      password: Deno.env.get("MYSQL_PASSWORD"),
      database: Deno.env.get("MYSQL_DATABASE"),
      ssl: Deno.env.get("MYSQL_SSL") === "true" ? { rejectUnauthorized: true } : undefined,
    });

    const [rows] = await connection.execute(
      "SELECT COUNT(*) as online_players FROM account WHERE last_login > DATE_SUB(NOW(), INTERVAL 5 MINUTE)"
    );

    const [accountRows] = await connection.execute(
      "SELECT COUNT(*) as total_accounts FROM account"
    );

    const [characterRows] = await connection.execute(
      "SELECT COUNT(*) as total_characters FROM player"
    );

    await connection.end();

    const data = {
      status: "online",
      online_players: rows[0]?.online_players || 0,
      total_accounts: accountRows[0]?.total_accounts || 0,
      total_characters: characterRows[0]?.total_characters || 0,
      timestamp: new Date().toISOString(),
    };

    return new Response(JSON.stringify(data), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch server status", details: error.message }),
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