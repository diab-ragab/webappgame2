import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:mysql2@3.11.5/promise";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const hashPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { username, oldPassword, newPassword } = await req.json();

    if (!username || !oldPassword || !newPassword) {
      return new Response(
        JSON.stringify({ error: "Username, old password, and new password are required" }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    if (newPassword.length < 6) {
      return new Response(
        JSON.stringify({ error: "New password must be at least 6 characters" }),
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

    const hashedOldPassword = await hashPassword(oldPassword);

    const [rows] = await connection.execute(
      "SELECT id FROM account WHERE login = ? AND password = ?",
      [username, hashedOldPassword]
    );

    if (rows.length === 0) {
      await connection.end();
      return new Response(
        JSON.stringify({ error: "Invalid username or old password" }),
        {
          status: 401,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const hashedNewPassword = await hashPassword(newPassword);

    await connection.execute(
      "UPDATE account SET password = ? WHERE id = ?",
      [hashedNewPassword, rows[0].id]
    );

    await connection.end();

    return new Response(
      JSON.stringify({ success: true, message: "Password changed successfully" }),
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
      JSON.stringify({ error: "Failed to change password", details: error.message }),
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