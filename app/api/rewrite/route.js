import OpenAI from "openai";

export async function POST(req) {
  try {
    const { story } = await req.json();

    if (!story) {
      return new Response(JSON.stringify({ error: "No story provided" }), {
        status: 400,
      });
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await client.responses.create({
      model: "gpt-4o-mini",
      input: `Rewrite the following story to be clearer, smoother, and more engaging, but keep the meaning the same:\n\n${story}`,
    });

    // NEW: Correct extraction for the Responses API
    const improved =
      response.output?.[0]?.content?.[0]?.text || "Rewrite failed.";

    return new Response(JSON.stringify({ improved }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Rewrite error:", error);
    return new Response(
      JSON.stringify({ error: "Rewrite failed", details: error.message }),
      { status: 500 }
    );
  }
}