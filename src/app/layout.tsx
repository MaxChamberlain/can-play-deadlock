import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900'
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900'
})

export const metadata: Metadata = {
  title: 'Can I Play Deadlock?',
  description:
    'Check if you can play Deadlock in your region, and switch to a region where you can play.',
  keywords: [
    'Deadlock',
    'Valve',
    'Steam',
    'Region',
    'Switch',
    'Play',
    'Game',
    'Server',
    'Time',
    'Open',
    'Close',
    'Timezone'
  ],
  metadataBase: new URL('https://caniplaydeadlock.com')
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
