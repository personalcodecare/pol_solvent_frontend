import { Toaster } from '@/components/ui/toaster'
import { config } from '@/config/wagmi'
import { ContextProvider } from '@/contexts'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { Silkscreen } from 'next/font/google'
import { headers } from 'next/headers'
import Image from 'next/image'
import { cookieToInitialState } from 'wagmi'
import { AnimatedBackground } from './components/animations/animated-background'
import PageAnimatePresence from './components/hoc/page-animation-presence'
import { Header } from './components/shared/header'
import './globals.css'

const silkscreen = Silkscreen({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Solvent Labs',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const initialState = cookieToInitialState(config, headers().get('cookie'))

  return (
    <html lang="en">
      <body
        className={cn(
          'relative min-h-screen bg-darkMain font-sans text-white antialiased',
          silkscreen.variable,
        )}
      >
        <ContextProvider initialState={initialState}>
          <Header />

          <main>
            <AnimatedBackground />

            <div className="pointer-events-none absolute inset-0 z-[0]">
              <Image
                src="/images/splotches.png"
                alt="Background effect"
                layout="fill"
                objectFit="cover"
                className="hidden opacity-80 md:block"
              />
            </div>
            <PageAnimatePresence>{children}</PageAnimatePresence>
          </main>
          <Toaster />
        </ContextProvider>
      </body>
    </html>
  )
}
