'use client'

import { TypingDots } from './typing-dots'

export const PageLoading = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <span className="flex flex-row items-center">
        Loading
        <TypingDots />
      </span>
    </div>
  )
}
