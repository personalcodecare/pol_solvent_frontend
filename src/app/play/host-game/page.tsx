'use client'
import { AnimatedList } from '@/app/components/animations/animated-list'
import { AnimatedText } from '@/app/components/animations/animated-text'
import { PotentialReturn } from '@/app/components/shared/potential-return'
import { TypingDots } from '@/app/components/shared/typing-dots'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { publicEnvs } from '@/config/env'
import svTokenABI from '@/config/sv-token-abi.json'
import { createDuel } from '@/services/create-duel'
import { getFee } from '@/services/get-fee'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ethers, parseUnits } from 'ethers'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
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

export default function Page() {
  const { address } = useAccount()
  const router = useRouter()
  const { toast } = useToast()
  const [wagerAmount, setWagerAmount] = useState('')
  const [hasSufficientAllowance, setHasSufficientAllowance] = useState(true)
  const { data: svTokenBalance, isLoading: isLoadingSvTokenBalance } =
    useBalance({
      address,
      token: contractAddress,
    })
  const { writeContract } = useWriteContract()
  const [isApproving, setIsApproving] = useState(false)
  const [isPendingApproval, setIsPendingApproval] = useState(false)
  const [approvalHash, setApprovalHash] = useState<`0x${string}` | undefined>()

  const { isSuccess: isApprovalMined } = useWaitForTransactionReceipt({
    hash: approvalHash,
  })

  const { data: feeData } = useQuery({
    queryKey: ['fee'],
    queryFn: () => getFee(),
  })

  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    abi: svTokenABI,
    functionName: 'allowance',
    address: contractAddress,
    args: [address, spenderAddress],
  })

  const potentialReturn = useMemo(() => {
    const wager = Number(wagerAmount)
    if (isNaN(wager) || wager <= 0 || !feeData) {
      return 0
    }
    const feePercentage = feeData.fee / 100
    const result = wager * 2 - wager * 2 * feePercentage
    const truncatedResult = Math.floor(result * 100000) / 100000
    return truncatedResult
  }, [wagerAmount, feeData])

  const createDuelMutation = useMutation({
    mutationFn: createDuel,
    onSuccess: (res) => {
      router.push(`/play/host-game/${res.id}`)
    },
    onError: (error) => {
      toast({
        title: 'Failed to host game',
        description:
          error.message || 'An error occurred while creating the game',
        variant: 'destructive',
      })
    },
  })

  const hasSufficientBalance = useMemo(() => {
    if (isLoadingSvTokenBalance) {
      return true
    }
    if (!svTokenBalance) {
      return false
    }
    if (!wagerAmount) {
      return true
    }
    const wager = Number(wagerAmount)
    if (isNaN(wager) || wager <= 0) {
      return false
    }
    try {
      const wagerInWei = parseUnits(wagerAmount, svTokenBalance.decimals)
      return BigInt(svTokenBalance.value) >= wagerInWei
    } catch (error) {
      console.error('Error parsing wager amount:', error)
      return false
    }
  }, [svTokenBalance, wagerAmount, isLoadingSvTokenBalance])

  const checkAndUpdateAllowance = async () => {
    if (!wagerAmount) return

    const wagerAmountInWei = ethers.parseEther(wagerAmount)
    const requiredAllowance = (wagerAmountInWei * BigInt(20)) / BigInt(10)

    setHasSufficientAllowance(
      typeof allowance === 'bigint' && allowance >= requiredAllowance,
    )
  }

  const handleHostGame = async () => {
    if (hasSufficientAllowance) {
      createDuelMutation.mutate({
        wagerAmount: Number(wagerAmount),
      })
    } else {
      const wagerAmountInWei = ethers.parseEther(wagerAmount)
      const requiredAllowance = (wagerAmountInWei * BigInt(20)) / BigInt(10)

      try {
        setIsApproving(true)
        writeContract(
          {
            address: contractAddress,
            abi: svTokenABI,
            functionName: 'approve',
            args: [spenderAddress, requiredAllowance],
          },
          {
            onSuccess: (data) => {
              setApprovalHash(data)
              setIsPendingApproval(true)
              toast({
                title: 'Approval submitted',
                description: 'Please wait for the transaction to be mined.',
                variant: 'default',
              })
            },
            onError: (error) => {
              console.error('Approval error:', error)
              toast({
                title: 'Failed to approve tokens',
                description:
                  'An error occurred while approving tokens. Please try again.',
                variant: 'destructive',
              })
            },
          },
        )
      } catch (error) {
        console.error(error)
        toast({
          title: 'Failed to approve tokens',
          description:
            'An error occurred while approving tokens. Check your Matic balance.',
          variant: 'destructive',
        })
      } finally {
        setIsApproving(false)
      }
    }
  }

  useEffect(() => {
    checkAndUpdateAllowance()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allowance, wagerAmount])

  useEffect(() => {
    if (isApprovalMined) {
      setIsPendingApproval(false)
      refetchAllowance()
      toast({
        title: 'Approval successful',
        description: 'You can now host the game.',
        variant: 'default',
      })
    }
  }, [isApprovalMined, refetchAllowance, toast])

  return (
    <div className="flex flex-col items-center justify-center gap-[20px] px-[25px] pt-[20px] md:pt-[114px]">
      <AnimatedText>
        <h1 className="pb-[20px] text-center text-[48px] leading-[48px] text-white md:text-[64px] md:leading-[64px]">
          Host Game
        </h1>
      </AnimatedText>

      <AnimatedText>
        <span className="text-[16px] leading-[20.48px] text-white">
          Your Wager
        </span>
      </AnimatedText>

      <AnimatedText>
        <Input
          value={wagerAmount}
          type="number"
          onChange={(e) => setWagerAmount(e.target.value)}
          prefix="$"
          token="SV"
          tokenValue={wagerAmount || '0'}
          hasError={!hasSufficientBalance}
          inputMode="decimal"
        />
      </AnimatedText>

      <AnimatedText>
        <span className="text-[16px] leading-[20.48px] text-white">
          Potential Return
        </span>
      </AnimatedText>

      <AnimatedText>
        <PotentialReturn
          value={potentialReturn}
          valuePrefix="$"
          valueInToken={potentialReturn || '0'}
        />
      </AnimatedText>

      <AnimatedText>
        <p className="max-w-[340px] text-center text-[14px] leading-[17.92px] text-white">
          Bets will not be withdrawn until all players have joined the match
        </p>
      </AnimatedText>

      <AnimatedList>
        <Button
          variant="warning"
          onClick={handleHostGame}
          disabled={
            createDuelMutation.isPending ||
            !hasSufficientBalance ||
            isApproving ||
            isPendingApproval
          }
        >
          {createDuelMutation.isPending && (
            <>
              <span>Creating</span>
              <TypingDots />
            </>
          )}

          {isApproving && (
            <>
              <span>Approving</span>
              <TypingDots />
            </>
          )}

          {isPendingApproval && (
            <>
              <span>Approving</span>
              <TypingDots />
            </>
          )}

          {!hasSufficientAllowance &&
            hasSufficientBalance &&
            !isApproving &&
            !isPendingApproval && <span>Approve tokens</span>}

          {hasSufficientAllowance &&
            hasSufficientBalance &&
            !createDuelMutation.isPending && <span>Host Game</span>}

          {!hasSufficientBalance && <span>Insufficient Funds</span>}
        </Button>

        <Button onClick={() => router.back()}>Back</Button>
      </AnimatedList>
    </div>
  )
}
