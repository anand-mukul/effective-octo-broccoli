import './css/style.css'
import'@/app/globals.css'

import type { Metadata } from 'next'
import { Inter, Architects_Daughter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

import { Toaster } from 'sonner'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const architects_daughter = Architects_Daughter({
  subsets: ['latin'],
  variable: '--font-architects-daughter',
  weight: '400',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'NeoSync',
  description: 'Secret Vault',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={`${inter.variable} ${architects_daughter.variable} font-inter antialiased bg-gray-900 text-gray-200 tracking-tight`}>
        <div className="flex flex-col min-h-screen overflow-hidden">
         
          {children}
          
        </div>
        <Toaster position="bottom-center" richColors />
      </body>
    </html>
    </ClerkProvider>
  )
}
 