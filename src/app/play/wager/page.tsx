'use client'
import { AnimatedList } from '@/app/components/animations/animated-list'
import { AnimatedText } from '@/app/components/animations/animated-text'
import { Button } from '@/components/ui/button'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import Link from 'next/link'
import { useState } from 'react'
import { useAccount } from 'wagmi'

export default function Page() {
  const { isConnected } = useAccount()
  const { open } = useWeb3Modal()
  const [step, setStep] = useState(0)

  const handleLogin = async () => {
    if (!isConnected) {
      await open()
    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-[20px] px-[25px] pt-[20px] md:pt-[114px]">
        <AnimatedText>
          <h1 className="pb-[20px] text-center text-[64px] leading-[64px] text-white">
            Wager
          </h1>
        </AnimatedText>

        {step === 0 ? (
          <>
            <AnimatedText>
              <p className="max-w-[340px] text-center text-[16px] leading-[20.48px] text-white">
                Please be advised that This feature provided herein is purely
                for entertainment purposes.
                <br />
                <br />
                By engaging in this game Mode, users acknowledge and accept
                these risks, and waive any claims against the platform and its
                operators for losses incurred.
              </p>
            </AnimatedText>

            <AnimatedList>
              {isConnected ? (
                <Button variant="warning" onClick={() => setStep(1)}>
                  Continue
                </Button>
              ) : (
                <Button variant="success" onClick={handleLogin}>
                  Connect Wallet
                </Button>
              )}

              <Link href="/play">
                <Button variant="outline">Back</Button>
              </Link>
            </AnimatedList>
          </>
        ) : null}

        {step === 1 ? (
          <>
            <AnimatedList>
              <Link href="/play/host-game">
                <Button variant="warning">Host Game</Button>
              </Link>

              <Link href="/play/find-game">
                <Button variant="warning">Find Game</Button>
              </Link>

              <Button variant="outline" onClick={() => setStep(0)}>
                Back
              </Button>
            </AnimatedList>
          </>
        ) : null}
      </div>
    </>
  )
}
