import { Header } from "./Header"
import { Sidebar } from "./Sidebar"
import { BottomNav } from "./Bottom-nav"

export function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar className="hidden md:block" />
        <main className="flex-1 pb-16 md:pb-0">
          <div className="container px-4 py-6 md:px-6 md:py-8">{children}</div>
        </main>
      </div>
      <BottomNav />
    </div>
  )
}

