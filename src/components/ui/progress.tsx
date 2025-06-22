import { cn } from "@/lib/utils"
import { Progress as ProgressPrimitive } from "radix-ui"
import type * as React from "react"

type ProgressProps = React.ComponentProps<typeof ProgressPrimitive.Root> & {
  value?: number
  dir?: "ltr" | "rtl"
}

function Progress({ className, value = 0, dir = "ltr", ...props }: ProgressProps) {
  const isRTL = dir === "rtl"

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className)}
      {...props}>
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="h-full w-full bg-primary transition-transform"
        style={{
          transformOrigin: isRTL ? "right" : "left",
          transform: `scaleX(${value / 100})`
        }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
