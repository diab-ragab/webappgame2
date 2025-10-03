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
      "SELECT p.id, p.name, p.level, p.job, a.login as account_name, a.last_login FROM player p LEFT JOIN account a ON p.account_id = a.id WHERE a.last_login > DATE_SUB(NOW(), INTERVAL 5 MINUTE) ORDER BY a.last_login DESC"
    );

    const [countRows] = await connection.execute(
      "SELECT COUNT(*) as online_count FROM account WHERE last_login > DATE_SUB(NOW(), INTERVAL 5 MINUTE)"
    );

    await connection.end();

    return new Response(
      JSON.stringify({
        online_players: rows.map(player => ({
          id: player.id,
          name: player.name,
          level: player.level,
          job: player.job,
          accountName: player.account_name,
          lastLogin: player.last_login,
        })),
        total_online: countRows[0]?.online_count || 0,
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
      JSON.stringify({ error: "Failed to fetch online players", details: error.message }),
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