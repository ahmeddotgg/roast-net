import ndt7 from "@m-lab/ndt7"
import { useSpeedTestStore } from "./store"

export function startSpeedTest() {
  const { setStatus, setProgress, setSpeed } = useSpeedTestStore.getState()

  const expectedDownloadDuration = 15
  const expectedUploadDurationSec = 10

  ndt7.test(
    {
      userAcceptedDataPolicy: true,
      downloadworkerfile: "/ndt7-download-worker.min.js",
      uploadworkerfile: "/ndt7-upload-worker.min.js"
    },
    {
      downloadMeasurement: (data) => {
        const elapsed = data.Data?.ElapsedTime
        const speed = data.Data?.MeanClientMbps

        if (typeof elapsed === "number") {
          const progress = Math.min((elapsed / expectedDownloadDuration) * 100, 100)
          setProgress("download", Math.round(progress))
        }

        if (typeof speed === "number") {
          setSpeed("download", speed)
        }
      },

      downloadComplete: (data) => {
        const final = data.LastClientMeasurement?.MeanClientMbps ?? 0
        setSpeed("download", final)
        setProgress("download", 100)
      },

      uploadMeasurement: (data) => {
        const elapsedMicro = data.Data?.TCPInfo?.ElapsedTime
        const bytes = data.Data?.TCPInfo?.BytesReceived

        if (typeof elapsedMicro === "number" && elapsedMicro > 0) {
          const elapsedSec = elapsedMicro / 1_000_000
          const progress = Math.min((elapsedSec / expectedUploadDurationSec) * 100, 100)
          setProgress("upload", Math.round(progress))

          if (typeof bytes === "number") {
            const mbps = (bytes * 8) / elapsedMicro
            setSpeed("upload", mbps)
          }
        }
      },

      uploadComplete: () => {
        setProgress("upload", 100)
        setStatus("completed")
      },

      error: () => {
        setStatus("idle")
        setProgress("download", 0)
        setProgress("upload", 0)
      }
    }
  )
}

export async function probeMlabServer(): Promise<"ok" | "rate-limit" | string> {
  try {
    const res = await fetch("https://locate.measurementlab.net/v2/nearest/ndt/ndt7")
    if (res.ok) return "ok"
    if (res.status === 429) return "rate-limit"
    return `Server probe failed (HTTP ${res.status})`
  } catch (err) {
    return `Probe request failed: ${err instanceof Error ? err.message : String(err)}`
  }
}
