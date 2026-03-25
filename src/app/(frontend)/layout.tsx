import React from 'react'
import "./globals.css"
import { ThemeProvider } from '@payloadcms/ui'

export const metadata = {
    description: 'A blank template using Payload in a Next.js app.',
    title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
    const { children } = props

    return (
        <html lang="en" suppressHydrationWarning>
          <ThemeProvider>
            <body>
                <main>{children}</main>
            </body>
          </ThemeProvider>
        </html>
    )
}
