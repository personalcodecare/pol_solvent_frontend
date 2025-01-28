'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { AnimatedList } from './components/animations/animated-list'
import { AnimatedText } from './components/animations/animated-text'

export default function Home() {
  const links = [
    { href: '/play', label: 'Play', variance: 'default' },
    { href: '/leaderboard', label: 'Leaderboard', variance: 'outline' },
    { href: '/how-to-play', label: 'How to play', variance: 'outline' },
    { href: '/settings', label: 'Settings', variance: 'outline' },
    { href: '/quit', label: 'Quit', variance: 'outline' },
  ]

  return (
    <div className="flex flex-col items-center justify-center gap-[20px] pt-[20px] md:pt-[114px]">
      <AnimatedText>
        <h1 className="pb-[20px] text-center text-heading1">Decision Duel</h1>
      </AnimatedText>

      <AnimatedList
        items={links}
        renderItem={(link) => (
          <Link href={link.href} key={link.href}>
            <Button
              variant={
                link.variance as
                  | 'default'
                  | 'warning'
                  | 'success'
                  | 'outline'
                  | 'destructive'
              }
            >
              {link.label}
            </Button>
          </Link>
        )}
      />
    </div>
  )
}
