'use client'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { deleteCookie } from 'cookies-next'
import Link from 'next/link'
import { useDisconnect } from 'wagmi'
import { AnimatedList } from '../components/animations/animated-list'
import { AnimatedText } from '../components/animations/animated-text'

export default function Page() {
  const { disconnect } = useDisconnect()
  const handleDisconnect = async () => {
    try {
      disconnect()
      deleteCookie('auth_token')
      toast({
        title: 'Wallet disconnected',
        description: 'You have successfully disconnected your wallet',
        variant: 'default',
      })
    } catch (error) {
      console.error('Disconnect error:', error)
      toast({
        title: 'Disconnect failed',
        description: 'An error occurred while disconnecting your wallet',
        variant: 'destructive',
      })
    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-[20px] pt-[20px] md:pt-[114px]">
        <AnimatedText>
          <h1 className="pb-[20px] text-center text-[64px] leading-[64px] text-white">
            Decision Duel
          </h1>
        </AnimatedText>

        <AnimatedText className='text-white" max-w-[340px] text-center text-[24px] leading-[24px]'>
          Are you sure you’d like to quit?
        </AnimatedText>

        <AnimatedList>
          <Button variant="destructive" onClick={handleDisconnect}>
            Quit
          </Button>
          <Link href="/">
            <Button variant="outline">Back</Button>
          </Link>
        </AnimatedList>
      </div>
    </>
  )
}
