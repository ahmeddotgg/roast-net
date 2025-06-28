import { useSpeedTestStore } from "../speed-test/store"
import { usePreferencesStore } from "../user-preferences/store"

export async function requestRoast(prompt: string): Promise<string> {
  const res = await fetch("/api/openai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  })

  const json = await res.json()

  if (!res.ok) {
    throw new Error(json.error || "Roast API failed")
  }

  return json.reply || "No roast generated."
}

export function roastPrompt(): string {
  const { download, upload } = useSpeedTestStore.getState().speed
  const { language, dialect, tone } = usePreferencesStore.getState()

  return `Roast my internet speed — download: ${download}, upload: ${upload}.
            Instructions:
            - Respond strictly and entirely in **${language}** only${dialect ? `, using the ${dialect} dialect for tone and cultural flavor` : ""}.
            - **Do not** mix languages or provide translations.
            - Use **Arabic script and RTL direction** when Arabic is selected.
            - Keep it sane length: **6–10 sentences max**.
            - Tone: ${tone || "humorous, exaggerated, culturally savage"}.
            - Include emojis naturally in the response.
            - Base the humor on cultural references from the ${dialect ?? "relevant"} context (e.g., food, traffic, sayings).
            - Ensure perfect grammar and spelling, especially in Arabic.
            - Do **not** explain or comment on any words or phrases.
            - Do **not** add any asterisk at the end or the beginning of the respone.`
}
