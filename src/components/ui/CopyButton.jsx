import { Check, Link } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useToast } from '../../store/ToastContext'
import Button from './Button'

const COPIED_DURATION_MS = 2000

export default function CopyButton() {
  const [isCopied, setIsCopied] = useState(false)
  const { showToast } = useToast()

  // Switch back to the link icon after a short moment.
  useEffect(() => {
    if (!isCopied) return
    const timeoutId = setTimeout(() => setIsCopied(false), COPIED_DURATION_MS)
    return () => clearTimeout(timeoutId)
  }, [isCopied])

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setIsCopied(true)
    } catch {
      // The browser can block clipboard access.
      showToast({ message: "Couldn't copy. Copy the link from the address bar instead." })
    }
  }

  return (
    <Button variant="secondary" onClick={copyLink}>
      {isCopied ? (
        <Check size={16} className="text-green-700" aria-hidden="true" />
      ) : (
        <Link size={16} aria-hidden="true" />
      )}
      <span aria-live="polite">{isCopied ? 'Link copied' : 'Copy link'}</span>
    </Button>
  )
}
