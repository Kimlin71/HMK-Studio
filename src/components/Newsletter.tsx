export function Newsletter() {
  return (
    <section aria-labelledby="newsletter-title" className="newsletter" id="nyhetsbrev">
      <div>
        <p className="eyebrow"><span>09</span> / Brev från ateljén</p>
        <h2 id="newsletter-title">Nyheter, inte brus.</h2>
        <p>En plats för framtida anteckningar om form, material och designprocess. Nyhetsbrevet är inte öppet för anmälan.</p>
      </div>
      <form aria-label="Förhandsvisning av nyhetsbrev" aria-describedby="newsletter-note" className="newsletter__form" onSubmit={(event) => event.preventDefault()}>
        <label htmlFor="newsletter-email">E-postadress</label>
        <div className="newsletter__input-row">
          <input autoComplete="off" disabled id="newsletter-email" placeholder="namn@exempel.se" type="email" />
          <button aria-label="Nyhetsbrevet är inte öppet ännu" disabled type="submit">Snart <span aria-hidden="true">↗</span></button>
        </div>
        <p id="newsletter-note">Inaktivt prototypformulär. Inga uppgifter skickas eller lagras.</p>
      </form>
    </section>
  )
}
