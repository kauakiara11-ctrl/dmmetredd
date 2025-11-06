import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface CreatePixRequest {
  amount: number;
  email: string;
  name: string;
  description?: string;
  quizAttemptId: string;
  hasAIBump: boolean;
}

interface AbacatePayResponse {
  data: {
    id: string;
    amount: number;
    status: string;
    brCode: string;
    brCodeBase64: string;
    expiresAt: string;
  };
  error: null | any;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const abacatePayApiKey = Deno.env.get("ABACATE_PAY_API_KEY");
    
    if (!abacatePayApiKey) {
      throw new Error("Abacate Pay API key not configured");
    }

    const { amount, email, name, description, quizAttemptId, hasAIBump }: CreatePixRequest = await req.json();

    const amountInCents = Math.round(amount * 100);

    const abacatePayResponse = await fetch("https://api.abacatepay.com/v1/pixQrCode/create", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${abacatePayApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amountInCents,
        expiresIn: 3600,
        description: description || "Pagamento Mestre da DM",
        customer: {
          name: name,
          email: email,
          cellphone: "(00) 0000-0000",
          taxId: "000.000.000-00"
        },
        metadata: {
          quizAttemptId: quizAttemptId,
          hasAIBump: hasAIBump.toString()
        }
      }),
    });

    const result: AbacatePayResponse = await abacatePayResponse.json();

    if (result.error || !result.data) {
      throw new Error(result.error || "Failed to create PIX payment");
    }

    return new Response(
      JSON.stringify({
        success: true,
        pixData: {
          id: result.data.id,
          brCode: result.data.brCode,
          qrCodeBase64: result.data.brCodeBase64,
          expiresAt: result.data.expiresAt,
          amount: amount
        }
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error creating PIX payment:", error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred"
      }),
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