import { useState, type ReactNode } from 'react'
import { useCopy } from '../i18n/LanguageContext'
import { OptionGroup } from './BuilderControls'

// Preview shared by the bracelet and Norigae builders. The customer can look at the photograph or at the drawing.
// A photograph cannot be recoloured, so it always shows the original colours. Only the drawing follows every choice.

type View = 'photo' | 'drawing'

type DesignPreviewProps = {
  idPrefix: string
  /** The drawn colour study of the current design. */
  drawing: ReactNode
  drawingClassName?: string
  photo: string
  photoAlt: string
  /** True while the customer's colours are those of the photograph. */
  photoMatches: boolean
}

export function DesignPreview({ idPrefix, drawing, drawingClassName, photo, photoAlt, photoMatches }: DesignPreviewProps) {
  const { copy } = useCopy()
  const text = copy.shop.preview
  const [view, setView] = useState<View>('photo')
  const [failedPhoto, setFailedPhoto] = useState<string | null>(null)
  const photoMissing = failedPhoto === photo
  const showPhoto = view === 'photo' && !photoMissing

  return (
    <div className="design-preview">
      <OptionGroup
        hint={text.hint}
        legend={text.legend}
        name={`${idPrefix}-preview-view`}
        onChange={setView}
        options={[
          { value: 'photo', label: text.options.photo },
          { value: 'drawing', label: text.options.drawing },
        ]}
        value={view}
      />
      {showPhoto ? (
        <>
          <img alt={photoAlt} className="design-preview__photo" onError={() => setFailedPhoto(photo)} src={photo} />
          <p className="design-preview__note">{photoMatches ? text.photoNote : text.photoDiffers}</p>
        </>
      ) : (
        <>
          <div aria-hidden="true" className={drawingClassName ? `design-preview__drawing ${drawingClassName}` : 'design-preview__drawing'}>
            {drawing}
          </div>
          <p className="design-preview__note">{view === 'photo' ? text.photoMissing : text.drawingNote}</p>
        </>
      )}
    </div>
  )
}
