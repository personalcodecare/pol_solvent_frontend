import { useEffect, useState } from 'react'

const useTypingDots = (intervalTime = 500) => {
  const [dots, setDots] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots.length < 3 ? prevDots + '.' : ''))
    }, intervalTime)

    return () => clearInterval(interval)
  }, [intervalTime])

  return dots
}

export default useTypingDots
