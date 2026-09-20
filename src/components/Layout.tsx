import { Link } from "react-router-dom";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg">
      <header className="sticky top-0 z-30 border-b border-line bg-card/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-sm font-bold text-white">
              W
            </span>
            <span className="text-[15px] font-bold tracking-tight text-ink">Wombat</span>
            <span className="rounded-tag bg-cardSoft px-2 py-0.5 text-[11px] font-medium text-sub">
              Public DB
            </span>
          </Link>
          <nav className="flex items-center gap-4 text-xs text-faint">
            <span className="hidden sm:inline">Layer 1 · Public DB</span>
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
