'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { AnimatedList } from '../components/animations/animated-list'
import { AnimatedText } from '../components/animations/animated-text'

export default function Page() {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-[20px] pt-[20px] md:pt-[114px]">
        <AnimatedText>
          <h1 className="pb-[20px] text-center text-[64px] leading-[64px] text-white">
            Settings
          </h1>
        </AnimatedText>

        <AnimatedList>
          <Button variant="default" className="bg-steelBlue">
            Sound : on
          </Button>
          <Link href="/">
            <Button variant="outline">Back</Button>
          </Link>
        </AnimatedList>
      </div>
    </>
  )
}
