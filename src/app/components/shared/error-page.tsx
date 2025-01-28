'use client'

import { Button } from '@/components/ui/button'

type ErrorAction = {
  label: string
  onClick: () => void
}

export const ErrorPage = ({
  title = 'Unexpected Error',
  message,
  error,
  action,
}: {
  title?: string
  message: string
  error?: Error
  action?: ErrorAction
}) => {
  const defaultAction: ErrorAction = {
    label: 'Refresh',
    onClick: () => window.location.reload(),
  }

  const { label, onClick } = action || defaultAction

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col gap-[20px] p-8 text-center">
        <h1 className="text-2xl font-bold text-lavaOrange">{title}</h1>
        <p className="text-white">{message}</p>
        {error && <p className="text-sm text-gray-500">{error.message}</p>}
        <div className="flex justify-center">
          <Button onClick={onClick} variant="outline">
            {label}
          </Button>
        </div>
      </div>
    </div>
  )
}
