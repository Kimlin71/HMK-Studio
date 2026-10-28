import assert from 'node:assert/strict'
import { existsSync, statSync } from 'node:fs'
import test from 'node:test'
import { addItem, cartItemCount, cartTotal, hasPattern, removeItem, shopItemToNewCartItem, type CartItem } from '../src/content/cart.ts'
import { initialNorigae, norigaeProducts, norigaeShowcase } from '../src/content/norigae.ts'
import { PAYMENT_DELAY_MS, demoCustomer, formatOrderNumber, placeOrder, validateCustomer } from '../src/content/order.ts'
import { demoMeasurements } from '../src/content/pattern.ts'
import { formatPrice, price } from '../src/content/prices.ts'
import { parseRoute, routeHash } from '../src/content/routes.ts'
import { getShopItem, type ShopItemId } from '../src/content/shop.ts'

const NBSP = '\u00a0'

test('price: each item kind has a fictional SEK amount from one place', () => {
  assert.equal(price({ kind: 'bracelet', braceletId: 'signature-bracelet-1' }), 350)
  assert.equal(price({ kind: 'pattern', measurements: demoMeasurements }), 149)
})

test('price: norigae base price plus a long tassel surcharge', () => {
  const base = price({ kind: 'norigae', design: { ...initialNorigae, tasselLength: 'short' } })
  assert.equal(base, 450)
  assert.equal(price({ kind: 'norigae', design: { ...initialNorigae, tasselLength: 'medium' } }), base)
  assert.equal(price({ kind: 'norigae', design: { ...initialNorigae, tasselLength: 'long' } }), base + 50)
})

test('formatPrice writes kr in Swedish and SEK in English', () => {
  assert.equal(formatPrice(350, 'sv'), `350${NBSP}kr`)
  assert.equal(formatPrice(350, 'en'), 'SEK 350')
  assert.equal(formatPrice(1049, 'sv'), `1${NBSP}049${NBSP}kr`)
  assert.equal(formatPrice(1049, 'en'), 'SEK 1,049')
})

test('cart: add, remove and total without mutating the input', () => {
  const empty: CartItem[] = []
  const one = addItem(empty, { kind: 'bracelet', braceletId: 'signature-bracelet-2' })
  assert.equal(empty.length, 0)
  const two = addItem(one, { kind: 'norigae', design: norigaeShowcase })
  const three = addItem(two, { kind: 'pattern', measurements: demoMeasurements })
  assert.equal(three.length, 3)
  assert.equal(new Set(three.map((item) => item.id)).size, 3)
  assert.ok(three.every((item) => item.quantity === 1))
  assert.equal(cartTotal(three), 350 + 500 + 149)
  assert.equal(cartItemCount(three), 3)
  assert.equal(hasPattern(three), true)
  assert.equal(hasPattern(two), false)

  const withoutMiddle = removeItem(three, three[1].id)
  assert.equal(withoutMiddle.length, 2)
  assert.equal(three.length, 3)
  assert.equal(cartTotal(withoutMiddle), 350 + 149)
  const again = addItem(withoutMiddle, { kind: 'bracelet', braceletId: 'signature-bracelet-1' })
  assert.equal(new Set(again.map((item) => item.id)).size, 3, 'ids stay unique after a removal')
})

test('shop cards map to cart items; hanbok has none', () => {
  assert.deepEqual(shopItemToNewCartItem({ id: 'signature-bracelet-3', category: 'bracelet' }), { kind: 'bracelet', braceletId: 'signature-bracelet-3' })
  assert.deepEqual(shopItemToNewCartItem({ id: 'maedeup-norigae-3', category: 'maedeup' }), { kind: 'norigae', design: norigaeProducts['maedeup-norigae-3'], productId: 'maedeup-norigae-3' })
  assert.equal(shopItemToNewCartItem({ id: 'shirt-hanbok-demo', category: 'hanbok' }), null)
})

test('order: numbers come from a sequence and the order keeps items and total', () => {
  assert.equal(formatOrderNumber(1), 'HMS-DEMO-0001')
  assert.equal(formatOrderNumber(42), 'HMS-DEMO-0042')
  const items = addItem(addItem([], { kind: 'bracelet', braceletId: 'signature-bracelet-1' }), { kind: 'pattern', measurements: demoMeasurements })
  const order = placeOrder(items, 3)
  assert.equal(order.number, 'HMS-DEMO-0003')
  assert.equal(order.total, 499)
  assert.equal(order.hasPattern, true)
  assert.deepEqual(order.items, items)
  assert.equal(placeOrder([], 1).hasPattern, false)
})

test('order: the mock payment waits about 1.5 seconds', () => {
  assert.equal(PAYMENT_DELAY_MS, 1500)
})

test('checkout: the fictional customer is valid, empty fields are required', () => {
  assert.deepEqual(validateCustomer(demoCustomer), {})
  const errors = validateCustomer({ ...demoCustomer, email: '  ', card: '' })
  assert.equal(errors.email, 'required')
  assert.equal(errors.card, 'required')
  assert.equal(errors.name, undefined)
})

test('the demo customer uses fictional data only', () => {
  assert.match(demoCustomer.email, /@example\.se$/)
  assert.equal(demoCustomer.card, '4242 4242 4242 4242')
})

test('routes: only #kassa and #bekraftelse leave the normal page', () => {
  assert.equal(parseRoute(''), 'home')
  assert.equal(parseRoute('#butik'), 'home')
  assert.equal(parseRoute('#maedeup-bygge'), 'home')
  assert.equal(parseRoute('#kassa'), 'checkout')
  assert.equal(parseRoute('#bekraftelse'), 'confirmation')
  assert.equal(routeHash('checkout'), '#kassa')
  assert.equal(routeHash('confirmation'), '#bekraftelse')
})

test('the four finished Norigae are shop items with a photograph, a design and a price', () => {
  const ids = Object.keys(norigaeProducts)
  assert.equal(ids.length, 4)
  for (const id of ids) {
    const item = getShopItem(id as ShopItemId)
    assert.ok(item, `${id} is in the shop`)
    assert.equal(item.category, 'maedeup')
    assert.ok(existsSync(`public${item.image}`), `${item.image} exists`)
    assert.ok(statSync(`public${item.image}`).size < 400_000, `${item.image} is under 400 kB`)
    const cartItem = shopItemToNewCartItem(item)
    assert.ok(cartItem && price(cartItem) >= 450)
  }
})

test('the designs of the finished Norigae differ from each other and from the builder start', () => {
  const keys = Object.values(norigaeProducts).map((design) => JSON.stringify(design))
  assert.equal(new Set(keys).size, 4)
  assert.ok(!keys.includes(JSON.stringify(initialNorigae)))
})
