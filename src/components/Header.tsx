import Link from 'next/link'
import { ThemeToggle } from './ThemeToggle'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-950/70 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tighter text-neutral-900 dark:text-white">
          Payload<span className="text-indigo-600 dark:text-indigo-400">Blog</span>.
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-neutral-600 hover:text-indigo-600 dark:text-neutral-400 dark:hover:text-indigo-400 transition-colors">
            Home
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
