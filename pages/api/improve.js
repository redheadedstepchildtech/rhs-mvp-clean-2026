export default async function handler(req, res) {
  console.log("KEY LOADED:", !!process.env.OPENAI_API_KEY);

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Parse JSON body manually (required on Vercel + Next.js API routes)
  const body = await new Promise((resolve) => {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => resolve(JSON.parse(data)));
  });

  const { story } = body;

  const prompt = `
Rewrite the following text in a clearer, calmer, first-person voice.
Do NOT add details. Do NOT change meaning. Keep it respectful and concise.

Original:
"${story}"

Improved:
`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 200,
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    const improved =
      data?.choices?.[0]?.message?.content?.trim() ||
      story + " (AI rewrite failed, showing original)";

    return res.status(200).json({ improved });
  } catch (err) {
    console.error("AI ERROR:", err);
    return res.status(200).json({ improved: story });
  }
}