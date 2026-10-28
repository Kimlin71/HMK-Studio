import { useEffect, useRef, type ReactNode } from 'react'
import { useCopy } from '../i18n/LanguageContext'

type PieceDialogShellProps = {
  /** True while a piece is selected. The dialog opens and closes with it. */
  open: boolean
  onClose: () => void
  labelledBy: string
  describedBy: string
  /** Extra class for a narrower or different dialog. */
  className?: string
  /** Accessible name of the close button. Defaults to the product-details wording. */
  closeLabel?: string
  children: ReactNode
}

// Shared modal shell for ProductDialog and HanbokDialog: native <dialog>, so showModal() traps
// focus, Escape closes it and focus returns to the element that opened it. A click on the
// backdrop or the close button also closes it. Content is rendered by the caller.
export function PieceDialogShell({ open, onClose, labelledBy, describedBy, className, closeLabel, children }: PieceDialogShellProps) {
  const { copy } = useCopy()
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      aria-describedby={describedBy}
      aria-labelledby={labelledBy}
      className={className ? `piece-dialog ${className}` : 'piece-dialog'}
      onClick={(event) => {
        if (event.target === dialogRef.current) dialogRef.current?.close()
      }}
      onClose={onClose}
      ref={dialogRef}
    >
      {open && (
        <>
          <div className="piece-dialog__toolbar">
            <button aria-label={closeLabel ?? copy.dialog.closeLabel} className="piece-detail__close" onClick={() => dialogRef.current?.close()} type="button">{copy.dialog.close} <span aria-hidden="true">×</span></button>
          </div>
          {children}
        </>
      )}
    </dialog>
  )
}
