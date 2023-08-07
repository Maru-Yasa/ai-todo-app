import { Toaster } from '@/components/ui/toaster'
import './globals.css'
import type { Metadata } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProvider'

const font = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Todo App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🧠</text></svg>" />

      </head>
      <body className={font.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          <footer className='w-full text-center text-sm font-medium mb-2'>
            Created with 🧠 by <a href="https://github.com/maru-yasa" className='underline text-blue-500'>maru</a>
          </footer>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
