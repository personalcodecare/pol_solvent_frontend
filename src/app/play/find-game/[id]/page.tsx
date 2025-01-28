'use client'
import { AnimatedList } from '@/app/components/animations/animated-list'
import { AnimatedText } from '@/app/components/animations/animated-text'
import JoinDuelComponent from '@/app/components/play/join-duel'
import { PotentialReturn } from '@/app/components/shared/potential-return'
import { TypingDots } from '@/app/components/shared/typing-dots'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useToast } from '@/components/ui/use-toast'
import { publicEnvs } from '@/config/env'
import svTokenABI from '@/config/sv-token-abi.json'
import { useSocket } from '@/contexts/socket'
import { getDuel } from '@/services/get-duel'
import { getFee } from '@/services/get-fee'
import { joinDuel } from '@/services/join-duel'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ethers } from 'ethers'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  useAccount,
  useBalance,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi'

const contractAddress =
  publicEnvs.NEXT_PUBLIC_CONTRACT_ADDRESS_SVTOKEN as `0x${string}`
const spenderAddress =
  publicEnvs.NEXT_PUBLIC_CONTRACT_ADDRESS_SOLVENT_LABS as `0x${string}`

const useDuel = (duelId: number) => {
  return useQuery({
    queryKey: ['duel', duelId],
    queryFn: () => getDuel(duelId),
    refetchInterval: 5000,
    refetchOnWindowFocus: true,
    enabled: !!duelId,
  })
}

const useFee = () => {
  return useQuery({
    queryKey: ['fee'],
    queryFn: () => getFee(),
  })
}

export default function JoinDuelPage() {
  const { socket } = useSocket()
  const { address } = useAccount()
  const params = useParams()
  const duelId = Number(params.id)
  const { toast } = useToast()
  const { writeContractAsync } = useWriteContract()
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
  const [joinMessage, setJoinMessage] = useState('')
  const router = useRouter()
  const [isApproving, setIsApproving] = useState(false)
  const [isPendingApproval, setIsPendingApproval] = useState(false)
  const [approvalHash, setApprovalHash] = useState<`0x${string}` | undefined>()

  const { data: svTokenBalance } = useBalance({
    address,
    token: contractAddress,
  })

  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    abi: svTokenABI,
    functionName: 'allowance',
    address: contractAddress,
    args: [address, spenderAddress],
  })

  const { isSuccess: isApprovalMined } = useWaitForTransactionReceipt({
    hash: approvalHash,
  })

  const joinDuelMutation = useMutation({
    mutationFn: joinDuel,
    onSuccess: () => {
      setJoinMessage('You have joined the match')
      setTimeout(() => {
        setJoinMessage('Duel is starting')
      }, 3000)
    },
    onError: (error) => {
      toast({
        title: 'Failed to join duel',
        description:
          error.message || 'An error occurred while joining the duel',
        variant: 'destructive',
      })
    },
  })

  const handleJoinDuel = async () => {
    if (!duel || !address) {
      return
    }

    await refetchAllowance()

    const wagerAmountInWei = ethers.parseEther(duel.wagerAmount)
    const requiredAllowance = (wagerAmountInWei * BigInt(20)) / BigInt(10)

    if (typeof allowance === 'bigint' && allowance < requiredAllowance) {
      try {
        setIsApproving(true)
        const hash = await writeContractAsync({
          address: contractAddress,
          abi: svTokenABI,
          functionName: 'approve',
          args: [spenderAddress, requiredAllowance],
        })

        if (hash) {
          setApprovalHash(hash)
          setIsPendingApproval(true)
          toast({
            title: 'Approval submitted',
            description: 'Please wait for the transaction to be mined.',
            variant: 'default',
          })
        }
      } catch (error) {
        console.error('Approval error:', error)
        toast({
          title: 'Failed to approve tokens',
          description:
            'An error occurred while approving tokens. Please try again.',
          variant: 'destructive',
        })
      } finally {
        setIsApproving(false)
      }
    } else {
      setJoinMessage('Joining match')
      joinDuelMutation.mutate({ duelId: Number(duel.id) })
    }
  }

  useEffect(() => {
    if (isApprovalMined) {
      setIsPendingApproval(false)
      refetchAllowance()
      toast({
        title: 'Approval successful',
        description: 'You can now join the game.',
        variant: 'default',
      })
    }
  }, [isApprovalMined, refetchAllowance, toast])

  useEffect(() => {
    if (!socket) return

    const onDuelStarted = (data: { duelId: number }) => {
      if (data.duelId === duelId) {
        router.push(`/duels/${duelId}`)
      }
    }

    socket.on('DUEL_STARTED', onDuelStarted)

    return () => {
      socket.off('DUEL_STARTED', onDuelStarted)
    }
  }, [duelId, router, socket])

  const hasSufficientBalance = () => {
    if (!svTokenBalance || !duel) return false
    const wagerAmountInWei = ethers.parseEther(duel.wagerAmount)
    const requiredBalance = (wagerAmountInWei * BigInt(20)) / BigInt(10) // 110% of wager amount
    return svTokenBalance.value >= requiredBalance
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
        <AnimatedText>
          <h1 className="pb-[20px] text-center text-[36px] leading-[36px] text-white md:text-[64px] md:leading-[64px]">
            {joinMessage.toLowerCase().includes('joined')
              ? 'Game Starting'
              : 'Find Game'}
          </h1>
        </AnimatedText>

        {joinMessage && (
          <AnimatedText>
            <span className="flex max-w-[340px] flex-row text-center text-[24px] leading-[24px]">
              {joinMessage}
              {(joinMessage.toLowerCase().includes('joining') ||
                joinMessage.toLowerCase().includes('starting')) && (
                <TypingDots />
              )}
            </span>
          </AnimatedText>
        )}

        {duel &&
          joinMessage &&
          joinMessage.toLowerCase().includes('joined') && (
            <AnimatedList className="flex flex-col items-center justify-center">
              <span className="text-[16px] leading-[20.48px] text-white">
                Your Wager
              </span>

              <PotentialReturn
                valueInUsd={1000}
                value={duel.wagerAmount}
                currency="SV"
                backgroundColor="#FFCE70"
                textColor="#3B3E43"
                secondaryTextColor="#474C52"
              />

              <span className="text-[16px] leading-[20.48px] text-white">
                Opponent&apos;s Wager
              </span>

              <PotentialReturn
                valueInUsd={1000}
                value={duel.wagerAmount}
                currency="SV"
                backgroundColor="#FFCE70"
                textColor="#3B3E43"
                secondaryTextColor="#474C52"
              />
            </AnimatedList>
          )}

        {duel && feeData && !joinMessage.toLowerCase().includes('joined') && (
          <JoinDuelComponent wagerAmount={duel.wagerAmount} fee={feeData.fee} />
        )}

        {!joinMessage && !joinMessage.length && (
          <AnimatedList>
            <Button
              variant="warning"
              onClick={() => handleJoinDuel()}
              disabled={
                !duel ||
                joinDuelMutation.isPending ||
                !hasSufficientBalance() ||
                isApproving ||
                isPendingApproval
              }
            >
              {joinDuelMutation.isPending && (
                <>
                  Joining <TypingDots />
                </>
              )}
              {isApproving && (
                <>
                  Approving <TypingDots />
                </>
              )}
              {isPendingApproval && (
                <>
                  Approving <TypingDots />
                </>
              )}
              {!joinDuelMutation.isPending &&
                !isApproving &&
                !isPendingApproval &&
                !hasSufficientBalance() &&
                'Insufficient Funds'}

              {!joinDuelMutation.isPending &&
                !isApproving &&
                !isPendingApproval &&
                hasSufficientBalance() &&
                'Join Game'}
            </Button>
            <Link href="/play/find-game">
              <Button variant="outline" disabled={joinDuelMutation.isPending}>
                Back
              </Button>
            </Link>
          </AnimatedList>
        )}
      </div>
    </div>
  )
}
