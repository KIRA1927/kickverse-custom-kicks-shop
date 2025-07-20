import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ResetEmailRequest {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email }: ResetEmailRequest = await req.json();

    if (!email) {
      throw new Error("Email is required");
    }

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Generate password reset link
    const { data, error } = await supabaseClient.auth.admin.generateLink({
      type: 'recovery',
      email: email,
      options: {
        redirectTo: `${req.headers.get("origin")}/reset-password`,
      }
    });

    if (error) {
      throw new Error(`Failed to generate reset link: ${error.message}`);
    }

    if (!data.properties?.action_link) {
      throw new Error("No reset link generated");
    }

    // Send email with Resend
    const emailResponse = await resend.emails.send({
      from: "KickVerse <noreply@resend.dev>",
      to: [email],
      subject: "Reset your KickVerse password",
      html: `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #7c3aed; margin: 0;">KickVerse</h1>
            <p style="color: #666; margin: 10px 0 0 0;">Password Reset Request</p>
          </div>
          
          <div style="background: #f8fafc; padding: 30px; border-radius: 8px; margin-bottom: 30px;">
            <h2 style="color: #333; margin: 0 0 15px 0;">Reset Your Password</h2>
            <p style="color: #666; line-height: 1.6; margin-bottom: 25px;">
              We received a request to reset the password for your KickVerse account. 
              Click the button below to set a new password.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${data.properties.action_link}" 
                 style="background: #7c3aed; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
                Reset Password
              </a>
            </div>
            
            <p style="color: #666; font-size: 14px; line-height: 1.6;">
              If the button above doesn't work, copy and paste this link into your browser:
            </p>
            <p style="word-break: break-all; color: #7c3aed; font-size: 14px;">
              ${data.properties.action_link}
            </p>
          </div>
          
          <div style="text-align: center; color: #666; font-size: 14px;">
            <p>If you didn't request this password reset, you can safely ignore this email.</p>
            <p>This link will expire in 1 hour for security reasons.</p>
            <p style="margin-top: 20px;">
              <strong>KickVerse Team</strong>
            </p>
          </div>
        </div>
      `,
    });

    console.log("Password reset email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Password reset email sent successfully" 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-reset-email function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message || "Failed to send password reset email" 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);