import React from 'react'
import "./globals.css"
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata = {
    description: 'A beautifully designed blog template using Payload CMS & Next.js.',
    title: 'PayloadBlog. | Modern CMS Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
    const { children } = props

    return (
        <html lang="en" suppressHydrationWarning className={inter.variable} data-yd-content-ready="true">
          <body className="font-sans antialiased text-neutral-900 bg-white dark:bg-neutral-950 dark:text-neutral-100 min-h-screen flex flex-col selection:bg-indigo-500/30">
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              <Header />
              <main className="flex-1 w-full flex flex-col">{children}</main>
              <Footer />
            </ThemeProvider>
          </body>
        </html>
    )
}
