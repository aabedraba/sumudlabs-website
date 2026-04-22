import Link from "next/link";

export function TopNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="h-14 md:h-16 flex items-center justify-between">
          <Link
            href="/"
            className="text-lg md:text-xl font-serif font-bold text-foreground tracking-tight"
          >
            Sumud Labs
          </Link>

          <nav className="flex items-center gap-6" aria-label="Main navigation">
            <Link
              href="/"
              className="text-sm md:text-base font-sans text-foreground/80 hover:text-foreground transition-colors"
            >
              Home
            </Link>

            <Link
              href="/research-groups"
              className="text-sm md:text-base font-sans text-foreground/80 hover:text-foreground transition-colors"
            >
              Research Groups
            </Link>

            <Link
              href="/news"
              className="text-sm md:text-base font-sans text-foreground/80 hover:text-foreground transition-colors"
            >
              News
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}