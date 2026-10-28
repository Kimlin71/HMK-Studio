# Demo script: the prototype shop flow

About two minutes, for a screen share on Teams. Everything is a prototype with fictional data, and the script says so at the start and at the end. Click in this order. Reload the page (or press "Börja om" / "Start over") to run it again.

Run it in Swedish unless the audience is English. The names below are the English UI labels, with the Swedish in brackets where they differ.

## Before you start

- `npm run dev`, open the site at 1280 px wide or wider, and zoom the browser to 110 % so lines and text hold up when Teams compresses the video.
- Start on `#butik` with an empty cart. A reload gives you that.

## Walk-through

| Time | Click | Say |
| --- | --- | --- |
| 0:00 | Open **Butik** in the menu. | "This is the shop. It is a prototype: the prices are made up and nothing is saved or sent." |
| 0:10 | Under **Bracelets**, press **Add to cart** (Lägg i varukorgen) on bracelet No. 1. | "Three finished bracelets. Each has the signature pearl in two colours." |
| 0:20 | Scroll to **Maedeup with Norigae**. The four finished pieces can be added as they are. For the custom route, go on to **Design your Maedeup with Norigae**. Choose: knot **Deep Indigo**, cord **Deep Indigo**, signature pearl first colour **Deep Indigo**, second colour **Cameo Pink**, direction **Vertical**, tassel **Cameo Pink**, length **Long**. Show the photograph (it now matches the choices), then press **Add to cart**. | "The customer builds their own. These choices match the founder's photograph, so the photograph is a true preview. Change a colour and it switches to the drawing." |
| 0:55 | Scroll to **Sewing patterns** (Sömnadsmönster). Press **Your measurements** (Dina mått) on the trousers. Change **Waist** to 74 and press **Add to cart**. | "Patterns are dummies for the demo. The measurements are already filled in for a fictional customer, checked, and follow the pattern into the cart. Nothing is drawn or saved." |
| 1:20 | Press the **Cart** button in the header, then **Go to checkout** (Gå till kassan). | "Three items, one total, all marked demo." |
| 1:30 | On the checkout, press **Pay** (Betala). Wait for **Processing…**. | "The details are fictional and the card number is a test number. No payment provider is called." |
| 1:45 | On the confirmation, press **Download the pattern (PDF)**. | "The order has a pattern, so a download appears. The file is a fixed demo PDF, marked as a prototype." |
| 1:55 | Press **Start over**. | "Start over clears everything, so the demo can run again. To make it real we would replace prices, cart, payment and the pattern rules, which are separate modules." |

## If something goes wrong

- Press **Start over** (top right on the checkout and confirmation). It empties the cart and returns to the shop.
- If a mistake is in the Norigae, the cart panel has a **Remove** button on each line.
- If the pattern fields show an error, the **Generate pattern** button is disabled. Put the value back inside the range shown under the field.
