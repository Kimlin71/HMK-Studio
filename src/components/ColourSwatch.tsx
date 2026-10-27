import { colourLabels, type ModuleColour } from '../content/jewellery'

type ColourSwatchProps = {
  colour: ModuleColour
  note?: string
}

// A colour is never shown as a bare swatch: the name always travels with it.
// Colour names are Wada Sanzo's English names in both languages, so the name is marked lang="en".
export function ColourSwatch({ colour, note }: ColourSwatchProps) {
  return (
    <span className="swatch">
      <span aria-hidden="true" className={`swatch__chip tone--${colour}`} />
      <span className="swatch__name">
        <span lang="en">{colourLabels[colour]}</span>
        {note ? <small>{note}</small> : null}
      </span>
    </span>
  )
}
