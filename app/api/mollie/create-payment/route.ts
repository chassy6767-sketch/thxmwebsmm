import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Create a pending purchase record
    const { data: purchase, error: purchaseError } = await supabase
      .from("purchases")
      .insert({
        user_id: user.id,
        amount_cents: 1000,
        currency: "EUR",
        status: "pending",
      })
      .select()
      .single();

    if (purchaseError || !purchase) {
      return NextResponse.json({ error: "Failed to create purchase" }, { status: 500 });
    }

    // Create Mollie payment
    const mollieApiKey = process.env.MOLLIE_API_KEY;
    if (!mollieApiKey) {
      // If no Mollie key, simulate a successful payment for dev
      await supabase
        .from("purchases")
        .update({ status: "paid", payment_method: "simulated" })
        .eq("id", purchase.id);

      await supabase
        .from("profiles")
        .update({ is_verified_customer: true })
        .eq("id", user.id);

      return NextResponse.json({
        checkoutUrl: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/dashboard?payment=success`,
        purchaseId: purchase.id,
      });
    }

    const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const mollieRes = await fetch("https://api.mollie.com/v2/payments", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${mollieApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: {
          currency: "EUR",
          value: "10.00",
        },
        description: `THXM Middleman Service - Purchase #${purchase.id.slice(0, 8)}`,
        redirectUrl: `${origin}/dashboard?payment=success&purchase=${purchase.id}`,
        webhookUrl: `${origin}/api/mollie/webhook`,
        metadata: {
          purchase_id: purchase.id,
          user_id: user.id,
        },
        method: ["ideal", "bancontact", "creditcard", "applepay"],
      }),
    });

    const mollieData = await mollieRes.json();

    if (!mollieRes.ok) {
      return NextResponse.json(
        { error: mollieData.detail || "Mollie payment creation failed" },
        { status: 500 }
      );
    }

    // Store Mollie payment ID
    await supabase
      .from("purchases")
      .update({ mollie_payment_id: mollieData.id })
      .eq("id", purchase.id);

    return NextResponse.json({
      checkoutUrl: mollieData._links.checkout.href,
      purchaseId: purchase.id,
    });
  } catch (err) {
    console.error("Payment creation error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
