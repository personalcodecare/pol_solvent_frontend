import { Button } from '@/components/ui/button'

export default function Page() {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-[20px] pt-[200px]">
        <Button>Play</Button>
        <Button variant="warning">Wager</Button>
        <Button variant="success">Connect Wallet</Button>
        <Button variant="outline">Leaderboard</Button>
        <Button variant="destructive">Quit</Button>
        <Button variant="warning" disabled>
          Confirm Selection
        </Button>
      </div>
    </>
  )
}
