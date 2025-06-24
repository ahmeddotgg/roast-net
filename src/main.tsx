import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Actions } from "./components/app/actions"
import { Container } from "./components/app/container"
import { Header } from "./components/app/header"
import { HeadLine } from "./components/app/headline"
import { TestCards } from "./components/app/test-cards"
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
      </main>
    </div>
  </StrictMode>
)
