import { signatureBeadColours } from '../content/jewellery'
import { pearlPatterns, type PearlPattern, type SignaturePearlDesign } from '../content/signaturePearl'
import { useCopy } from '../i18n/LanguageContext'
import { ColourOptionGroup, OptionGroup } from './BuilderControls'
import { SignaturePearlShape } from './SignaturePearlDrawing'

// The signature pearl has two colours and a direction. Shared by the bracelet and Norigae builders.

function PatternSwatch({ pearl, pattern }: { pearl: SignaturePearlDesign; pattern: PearlPattern }) {
  return (
    <svg aria-hidden="true" className="pearl-swatch" focusable="false" viewBox="0 0 40 40">
      <SignaturePearlShape pearl={{ ...pearl, pattern }} r={17} x={20} y={20} />
    </svg>
  )
}

type PearlControlsProps = {
  idPrefix: string
  value: SignaturePearlDesign
  onChange: (value: SignaturePearlDesign) => void
}

export function PearlControls({ idPrefix, value, onChange }: PearlControlsProps) {
  const { copy } = useCopy()
  const text = copy.shop.signaturePearl

  return (
    <>
      <ColourOptionGroup
        colours={signatureBeadColours}
        hint={text.first.hint}
        legend={text.first.legend}
        name={`${idPrefix}-pearl-first`}
        onChange={(first) => onChange({ ...value, first })}
        value={value.first}
      />
      <ColourOptionGroup
        colours={signatureBeadColours}
        hint={text.second.hint}
        legend={text.second.legend}
        name={`${idPrefix}-pearl-second`}
        onChange={(second) => onChange({ ...value, second })}
        value={value.second}
      />
      <OptionGroup
        hint={text.pattern.hint}
        legend={text.pattern.legend}
        name={`${idPrefix}-pearl-pattern`}
        onChange={(pattern) => onChange({ ...value, pattern })}
        options={pearlPatterns.map((pattern) => ({
          value: pattern,
          label: (
            <>
              <PatternSwatch pattern={pattern} pearl={value} />
              {text.pattern.options[pattern]}
            </>
          ),
        }))}
        value={value.pattern}
        wide
      />
    </>
  )
}
