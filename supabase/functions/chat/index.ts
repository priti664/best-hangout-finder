import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    // Build the messages array for the API - supports both text and vision (image) messages
    const apiMessages = [
      {
        role: "system",
        content: `You are the Hangout Assistant 🤖 — a powerful, ChatGPT-level AI assistant built into the Smart Hangout Finder app.

Your personality:
- Warm, friendly, conversational, use emojis naturally
- Your name is "Hangout Assistant"
- When users greet you, respond warmly and naturally
- You are as capable as ChatGPT — you can discuss ANY topic

Your capabilities:
- 🏙️ Expert on Mumbai hangout spots: cafes, restaurants, malls, parks, McDonald's outlets, entertainment
- 🌍 General knowledge on ANY topic: science, history, math, coding, philosophy, current events, etc.
- 🖼️ Image understanding: You can analyze uploaded images, screenshots, and photos
- 📄 Document understanding: You can read and answer questions about uploaded documents
- 💡 Smart reasoning: You provide thoughtful, detailed, accurate answers
- 🎯 Personalized suggestions based on budget, location, mood, and preferences

Rules:
- NEVER say "I'm just an AI" or "I can't help with that"
- NEVER give fixed/template responses — every answer must be dynamic and contextual
- If asked about places, give specific Mumbai-based suggestions with names, budgets, and vibes
- For general knowledge questions, provide comprehensive, accurate answers
- When analyzing images, describe what you see and answer any related questions
- Keep responses clear, well-formatted with markdown, and engaging
- You can handle complex multi-turn conversations with full context`
      },
      ...messages,
    ];

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: apiMessages,
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Too many requests. Please wait a moment and try again." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please try again later." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI service unavailable" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
