export function Newsletter() {
  return (
    <section aria-labelledby="newsletter-title" className="newsletter" id="nyhetsbrev">
      <div>
        <p className="eyebrow">Brev från ateljén</p>
        <h2 id="newsletter-title">Nyheter, inte brus.</h2>
        <p>Anteckningar om form, material och sådant som växer fram. Nyhetsbrevet öppnar snart.</p>
      </div>
      <form aria-label="Förhandsvisning av nyhetsbrev" className="newsletter__form" onSubmit={(event) => event.preventDefault()}>
        <label htmlFor="newsletter-email">E-postadress</label>
        <div className="newsletter__input-row">
          <input autoComplete="off" disabled id="newsletter-email" placeholder="namn@exempel.se" type="email" />
          <button aria-label="Nyhetsbrevet är inte öppet ännu" disabled type="submit">Snart <span aria-hidden="true">↗</span></button>
        </div>
        <p aria-live="polite">Formuläret är en förhandsvisning. Inga uppgifter samlas in.</p>
      </form>
    </section>
  )
}
