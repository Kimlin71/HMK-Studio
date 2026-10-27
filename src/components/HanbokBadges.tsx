import { useCopy } from '../i18n/LanguageContext'

// The demo and one-of-a-kind badges, shared by the hanbok list and the hanbok dialog.
export function HanbokBadges() {
  const { copy } = useCopy()

  return (
    <div className="hanbok-badges">
      <span className="hanbok-badge hanbok-badge--demo">{copy.shop.card.demoLabel}</span>
      <span className="hanbok-badge hanbok-badge--unique">{copy.shop.hanbok.oneOfAKind}</span>
    </div>
  )
}
