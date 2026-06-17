import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const paymentId = formData.get("id") as string;

    if (!paymentId) {
      return NextResponse.json({ error: "Missing payment ID" }, { status: 400 });
    }

    const mollieApiKey = process.env.MOLLIE_API_KEY;
    if (!mollieApiKey) {
      return NextResponse.json({ error: "Mollie not configured" }, { status: 500 });
    }

    // Verify payment with Mollie
    const mollieRes = await fetch(`https://api.mollie.com/v2/payments/${paymentId}`, {
      headers: {
        Authorization: `Bearer ${mollieApiKey}`,
      },
    });

    const payment = await mollieRes.json();

    if (!mollieRes.ok) {
      return NextResponse.json({ error: "Failed to verify payment" }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Find purchase by mollie_payment_id
    const { data: purchase } = await supabase
      .from("purchases")
      .select("id, user_id, status")
      .eq("mollie_payment_id", paymentId)
      .single();

    if (!purchase) {
      return NextResponse.json({ error: "Purchase not found" }, { status: 404 });
    }

    if (payment.status === "paid") {
      // Update purchase status
      await supabase
        .from("purchases")
        .update({
          status: "paid",
          payment_method: payment.method || null,
        })
        .eq("id", purchase.id);

      // Mark user as verified customer
      await supabase
        .from("profiles")
        .update({ is_verified_customer: true })
        .eq("id", purchase.user_id);
    } else if (payment.status === "failed") {
      await supabase
        .from("purchases")
        .update({ status: "failed" })
        .eq("id", purchase.id);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
