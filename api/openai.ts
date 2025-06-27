import type { VercelRequest, VercelResponse } from "@vercel/node"
import OpenAI from "openai"

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY
})

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { prompt } = req.body

  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ error: "Missing or invalid prompt" })
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-r1:free",
      messages: [{ role: "user", content: prompt }]
    })

    const reply = completion.choices?.[0]?.message?.content?.trim()

    return res.status(200).json({
      reply: reply || "No reply"
    })
  } catch (err) {
    console.error("OpenAI error:", err)

    const message = err instanceof Error ? err.message : "Unknown error occurred"

    res.status(500).json({
      reply: null,
      error: "OpenAI request failed",
      details: message
    })
  }
}
