import { Actions } from "@/components/actions"
import { Container } from "@/components/container"
import { Header } from "@/components/header"
import { HeadLine } from "@/components/headline"
import { Toaster } from "@/components/ui/sonner"
import { TestCards } from "@/modules/speed-test/components/test-cards"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./lib/i18n"
import "./main.css"

const root = document.getElementById("root") as HTMLElement

createRoot(root).render(
  <StrictMode>
    <div className="relative min-h-svh overflow-hidden">
      <div className="grid-pattern" />
      <main className="relative z-10 py-10 lg:py-20">
        <Container className="space-y-10 lg:space-y-16">
          <Header />
          <TestCards />
          <HeadLine />
          <Actions />
        </Container>
        <Toaster position="top-center" richColors />
      </main>
    </div>
  </StrictMode>
)
