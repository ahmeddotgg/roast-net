import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { Download, Upload } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useSpeedTestStore } from "../store"

interface TestCardProps {
  type: "download" | "upload"
  speed: number
  progress: number
  className?: string
}

const TestCard = ({ type, speed, progress, className }: TestCardProps) => {
  const { t, i18n } = useTranslation()

  return (
    <div className={cn("card-bg relative space-y-3 overflow-hidden rounded-xl py-4!", className)}>
      <span className="absolute inset-0 size-20 rounded-full bg-blue-600/90 blur-3xl" />

      <div className="space-y-2">
        {type === "download" ? (
          <div
            className={cn(
              "inline-flex rounded-md bg-emerald-700/20 p-2",
              progress && progress !== 100 ? "animate-pulse" : ""
            )}>
            <Download
              strokeWidth={3}
              className={cn(
                "text-emerald-400",
                progress && progress !== 100 ? "animate-pulse" : ""
              )}
            />
          </div>
        ) : (
          <div
            className={cn(
              "inline-flex rounded-md bg-yellow-700/20 p-2",
              progress && progress !== 100 ? "animate-pulse" : ""
            )}>
            <Upload
              strokeWidth={3}
              className={cn("text-amber-400", progress && progress !== 100 ? "animate-pulse" : "")}
            />
          </div>
        )}
        <h2 className="font-bold text-sm capitalize">{t(`card.${type}`)}</h2>
      </div>

      <h2 className="font-bold text-2xl">
        {speed.toFixed(2)}
        <span className="font-semibold text-neutral-400 text-xs"> Mbps</span>
      </h2>

      <Progress value={progress} dir={i18n.resolvedLanguage === "ar" ? "rtl" : "ltr"} />
    </div>
  )
}

export const TestCards = () => {
  const { i18n } = useTranslation()
  const { progress, speed } = useSpeedTestStore()

  return (
    <div
      className="space-y-3 sm:grid sm:grid-cols-2 sm:gap-3 sm:space-y-0"
      dir={i18n.resolvedLanguage === "ar" ? "rtl" : "ltr"}>
      <TestCard
        className="fade-in slide-in-from-top-10 animate-in duration-1000 ease-in-out"
        type="download"
        speed={speed.download}
        progress={progress.download}
      />
      <TestCard
        className="fade-in slide-in-from-top-10 animate-in duration-1000 ease-in-out"
        type="upload"
        speed={speed.upload}
        progress={progress.upload}
      />
    </div>
  )
}
