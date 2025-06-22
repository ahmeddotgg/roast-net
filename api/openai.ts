import type { VercelRequest, VercelResponse } from "@vercel/node"
import OpenAI from "openai"

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  dangerouslyAllowBrowser: true
})

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const { prompt } = req.body

    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-r1:free",
      messages: [{ role: "user", content: prompt }]
    })

    res.status(200).json({
      reply: completion.choices?.[0]?.message?.content ?? "No reply"
    })
  } catch (err) {
    console.error("OpenAI error:", err)
    res.status(500).json({
      reply: null,
      error: "OpenAI request failed",
      details: err.message
    })
  }
}
