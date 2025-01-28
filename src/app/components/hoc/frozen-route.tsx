'use client'

import { usePreviousValue } from '@/hooks/usePreviousValue'
import { LayoutRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { useSelectedLayoutSegment } from 'next/navigation'
import { ReactNode, useContext } from 'react'

interface FrozenRouteProps {
  children: ReactNode
}

const FrozenRoute = ({ children }: FrozenRouteProps) => {
  const context = useContext(LayoutRouterContext)
  const prevContext = usePreviousValue(context) || null

  const segment = useSelectedLayoutSegment()
  const prevSegment = usePreviousValue(segment)

  const changed =
    segment !== prevSegment &&
    segment !== undefined &&
    prevSegment !== undefined

  return (
    <LayoutRouterContext.Provider value={changed ? prevContext : context}>
      {children}
    </LayoutRouterContext.Provider>
  )
}

export default FrozenRoute
