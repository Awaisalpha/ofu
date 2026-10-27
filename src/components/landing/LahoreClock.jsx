import { Clock } from 'lucide-react'
import { useEffect, useState } from 'react'

const timeFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Asia/Karachi',
  hour: 'numeric',
  minute: '2-digit',
})

// No live region on purpose: screen readers read the time when they reach it,
// not every minute when it changes.
export default function LahoreClock() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    let intervalId
    // Wait for the next full minute, then tick every 60 s so the minute changes on time.
    const timeoutId = setTimeout(() => {
      setNow(new Date())
      intervalId = setInterval(() => setNow(new Date()), 60_000)
    }, 60_000 - (Date.now() % 60_000))

    return () => {
      clearTimeout(timeoutId)
      clearInterval(intervalId)
    }
  }, [])

  return (
    <time
      dateTime={now.toISOString()}
      className="flex h-9 items-center gap-1.5 px-3 text-[13px] font-medium text-ink tabular-nums"
    >
      <Clock size={14} aria-hidden="true" />
      {timeFormatter.format(now)} Lahore
    </time>
  )
}
