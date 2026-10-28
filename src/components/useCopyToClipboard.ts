import { useCallback, useState } from 'react'

export type CopyStatus = 'idle' | 'copied' | 'failed'

// Copies text to the visitor's own clipboard and nothing else: no request, no storage.
// `reset` clears the status message, for example when the design changes after a copy.
export function useCopyToClipboard() {
  const [status, setStatus] = useState<CopyStatus>('idle')

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setStatus('copied')
    } catch {
      setStatus('failed')
    }
  }, [])

  const reset = useCallback(() => setStatus('idle'), [])

  return { status, copy, reset }
}
