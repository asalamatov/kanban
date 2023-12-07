import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { Providers } from './GlobalRedux/provider'
import Provider from '@/components/Provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kanbanchik - Azamatizator',
  description: 'Kanbanchik task management app developed by Azamat Salamatov in September - December 2023',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <Provider> // Google Auth Provider */}
          <Providers>
            {children}
          </Providers>
        {/* </Provider> */}
      </body>
    </html>
  )
}
