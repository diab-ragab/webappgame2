import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:mysql2@3.11.5/promise";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const generateResetCode = (): string => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

const sendEmail = async (to: string, code: string): Promise<boolean> => {
  console.log(`Sending reset code ${code} to ${to}`);
  return true;
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { email } = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
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

    const [rows] = await connection.execute(
      "SELECT id FROM account WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      await connection.end();
      return new Response(
        JSON.stringify({ error: "No account found with this email" }),
        {
          status: 404,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const resetCode = generateResetCode();
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

    await connection.execute(
      "UPDATE account SET reset_code = ?, reset_code_expires = ? WHERE email = ?",
      [resetCode, expiresAt, email]
    );

    await sendEmail(email, resetCode);

    await connection.end();

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Password reset code sent to your email",
        code: resetCode
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
      JSON.stringify({ error: "Failed to request password reset", details: error.message }),
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