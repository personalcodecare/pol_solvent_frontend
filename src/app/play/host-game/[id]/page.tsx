'use client'
import { PotentialReturn } from '@/app/components/shared/potential-return'
import { TypingDots } from '@/app/components/shared/typing-dots'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useToast } from '@/components/ui/use-toast'
import { useSocket } from '@/contexts/socket'
import { deleteDuel } from '@/services/delete-duel'
import { getDuel } from '@/services/get-duel'
import { getFee } from '@/services/get-fee'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

const useDuel = (duelId: number) => {
  return useQuery({
    queryKey: ['duel', duelId],
    queryFn: () => getDuel(duelId),
    refetchOnWindowFocus: true,
    refetchInterval: 5000,
    enabled: !!duelId,
  })
}

const useFee = () => {
  return useQuery({
    queryKey: ['fee'],
    queryFn: () => getFee(),
  })
}

export default function Page() {
  const router = useRouter()
  const params = useParams()
  const duelId = Number(params.id)
  const { toast } = useToast()
  const [isWaiting, setIsWaiting] = useState(false)
  const [opponentJoined, setOpponentJoined] = useState(false)
  const [joinMessage, setJoinMessage] = useState('')
  const { socket } = useSocket()

  const {
    data: duel,
    isLoading: isLoadingDuel,
    isError: isErrorDuel,
  } = useDuel(duelId)

  const {
    data: feeData,
    isLoading: isLoadingFee,
    isError: isErrorFee,
  } = useFee()

  useEffect(() => {
    if (isWaiting && duelId && socket) {
      socket.emit('HOST_GAME', { duelId })
    }
  }, [isWaiting, duelId, socket])

  useEffect(() => {
    if (duel) {
      if (duel.joinerId) {
        setOpponentJoined(true)
        setIsWaiting(false)
        setJoinMessage('A player has joined!')
        setTimeout(() => {
          setJoinMessage('Duel starting')
        }, 1500)
      } else {
        setIsWaiting(true)
        setOpponentJoined(false)
        setJoinMessage('')
      }
    }
  }, [duel, duelId, router])

  useEffect(() => {
    if (!socket) return

    const onDuelJoined = (data: { id: number }) => {
      if (data.id === duelId) {
        setOpponentJoined(true)
        setIsWaiting(false)
        setJoinMessage('A player is joining')
        setTimeout(() => {
          setJoinMessage('A player has joined!')
          setTimeout(() => {
            setJoinMessage('Duel starting')
          }, 1500)
        }, 1500)
      }
    }

    const onDuelStarted = (data: { duelId: number }) => {
      if (data.duelId === duelId) {
        router.push(`/duels/${duelId}`)
      }
    }

    socket.on('DUEL_JOINED', onDuelJoined)
    socket.on('DUEL_STARTED', onDuelStarted)

    return () => {
      socket.off('DUEL_JOINED', onDuelJoined)
      socket.off('DUEL_STARTED', onDuelStarted)
    }
  }, [socket, duelId, router])

  const potentialReturn = useMemo(() => {
    const wager = Number(duel?.wagerAmount)
    if (isNaN(wager) || wager <= 0 || !feeData) {
      return 0
    }
    const feePercentage = feeData.fee / 100
    const result = wager * 2 - wager * 2 * feePercentage
    const truncatedResult = Math.floor(result * 100000) / 100000
    return truncatedResult
  }, [duel?.wagerAmount, feeData])

  const deleteDuelMutation = useMutation({
    mutationFn: deleteDuel,
    onSuccess: () => {
      router.push('/play/wager')
    },
    onError: (error) => {
      toast({
        title: 'Failed to cancel game',
        description:
          error.message || 'An error occurred while cancelling the game',
        variant: 'destructive',
      })
    },
  })

  const handleCancelGame = () => {
    deleteDuelMutation.mutate({
      duelId,
    })
  }

  if (isLoadingDuel || isLoadingFee) {
    return (
      <div className="pb-[85px]">
        <div className="flex flex-col items-center justify-center gap-[20px] px-[25px] pt-[20px] md:pt-[114px]">
          <Skeleton className="h-[48px] w-[200px] md:h-[64px] md:w-[300px]" />
          <Skeleton className="h-[24px] w-[340px]" />
          <Skeleton className="h-[100px] w-[340px]" />
          <Skeleton className="h-[40px] w-[120px]" />
        </div>
      </div>
    )
  }

  if (isErrorDuel || isErrorFee) {
    return <div>An error occurred while loading the game</div>
  }

  return (
    <div className="pb-[85px]">
      <div className="flex flex-col items-center justify-center gap-[20px] px-[25px] pt-[20px] md:pt-[114px]">
        <h1 className="pb-[20px] text-center text-[48px] leading-[48px] text-white md:text-[64px] md:leading-[64px]">
          {joinMessage.includes('joined') ? 'Game Starting' : 'Host Game'}
        </h1>

        <span className="max-w-[340px] flex-row items-center justify-center gap-[10px] text-center text-[24px] leading-[24px] text-white">
          <span className="flex flex-row">
            {joinMessage}
            {(joinMessage.toLowerCase().includes('joining') ||
              joinMessage.toLowerCase().includes('starting')) && <TypingDots />}
          </span>
        </span>

        {opponentJoined && !joinMessage.includes('joined') ? (
          <>
            <PotentialReturn
              valueInUsd={1000}
              value={potentialReturn}
              currency="SV"
              borderColor="white"
            />

            <Button variant="outline" disabled>
              Cancel
            </Button>
          </>
        ) : null}

        {!isWaiting && opponentJoined && joinMessage.includes('joined') && (
          <>
            <span className="text-[16px] leading-[20.48px] text-white">
              Your Wager
            </span>

            <PotentialReturn
              valueInUsd={1000}
              value={potentialReturn}
              currency="SV"
              backgroundColor="#FFCE70"
              textColor="#3B3E43"
              secondaryTextColor="#474C52"
            />

            <span className="text-[16px] leading-[20.48px] text-white">
              Potential Return
            </span>

            <PotentialReturn
              valueInUsd={1000}
              value={potentialReturn}
              currency="SV"
              backgroundColor="#FFCE70"
              textColor="#3B3E43"
              secondaryTextColor="#474C52"
            />
          </>
        )}

        {isWaiting && (
          <>
            <p className="max-w-[340px] text-center text-[24px] leading-[24px] text-white">
              Waiting For <br />
              <span className="flex flex-row">
                Opponent <TypingDots />
              </span>
            </p>

            <PotentialReturn
              valueInUsd={1000}
              value={potentialReturn}
              currency="SV"
              borderColor="white"
            />

            <Button variant="outline" onClick={handleCancelGame}>
              Cancel
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
