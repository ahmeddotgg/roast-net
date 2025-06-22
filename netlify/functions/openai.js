import OpenAI from "openai"

export const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  dangerouslyAllowBrowser: true
})

export async function handler(event) {
  try {
    const { prompt } = JSON.parse(event.body)

    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-r1:free",
      messages: [{ role: "user", content: prompt }]
    })

    return {
      statusCode: 200,
      body: JSON.stringify({
        reply: completion.choices?.[0]?.message?.content ?? "No reply."
      })
    }
  } catch (err) {
    console.error("Function error:", err)

    return {
      statusCode: 500,
      body: JSON.stringify({
        reply: null,
        error: "OpenAI request failed",
        details: err.message || String(err)
      })
    }
  }
}
