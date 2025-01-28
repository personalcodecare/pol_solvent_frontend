'use client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { AnimatedList } from '../components/animations/animated-list'
import { AnimatedText } from '../components/animations/animated-text'

export default function Page() {
  const links = [
    { href: '/play/ai', label: 'Play vs AI', variance: 'default' },
    { href: '/play/wager', label: 'Wager', variance: 'warning' },
    { href: '/', label: 'Back', variance: 'outline' },
  ]

  return (
    <div className="pb-[85px]">
      <div className="flex flex-col items-center justify-center gap-[20px] pt-[20px] md:pt-[114px]">
        <AnimatedText>
          <h1 className="pb-[20px] text-center text-[64px] leading-[64px] text-white">
            Play
          </h1>
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
    </div>
  )
}
