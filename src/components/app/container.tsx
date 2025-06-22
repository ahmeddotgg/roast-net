import { cn } from "@/lib/utils"

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  constrained?: boolean
  ref?: React.RefObject<HTMLDivElement>
}

const Container = ({ className, constrained = false, ref, ...props }: ContainerProps) => (
  <div
    className={cn(
      "mx-auto w-full max-w-(--breakpoint-md)",
      constrained ? "sm:px-6 lg:px-8" : "px-4 sm:px-6 lg:px-8",
      className
    )}
    {...props}
    ref={ref}
  />
)

export { Container }
export type { ContainerProps }
