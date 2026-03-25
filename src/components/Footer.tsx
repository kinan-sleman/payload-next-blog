export function Footer() {
  return (
    <footer className="w-full border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 py-12 mt-16">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-2 text-center md:text-left">
          <p className="text-base font-semibold text-neutral-900 dark:text-white">PayloadBlog.</p>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            © {new Date().getFullYear()} Built with Payload CMS & Next.js.
          </p>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="text-sm font-medium text-neutral-600 hover:text-indigo-600 dark:text-neutral-400 dark:hover:text-indigo-400 transition-colors">Twitter</a>
          <a href="#" className="text-sm font-medium text-neutral-600 hover:text-indigo-600 dark:text-neutral-400 dark:hover:text-indigo-400 transition-colors">GitHub</a>
        </div>
      </div>
    </footer>
  )
}
