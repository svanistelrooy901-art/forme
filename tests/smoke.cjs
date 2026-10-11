const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const html = fs.readFileSync('index.html', 'utf8');
assert.match(html, /<meta name="viewport"/);
assert.match(html, /FORME/);
const js = html.match(/<script>([\s\S]*?)<\/script>/)?.[1];
assert.ok(js, 'inline storefront script must exist');
new vm.Script(js, { filename: 'storefront.js' });
const nodes = new Map();
const storage = new Map();
const document = { getElementById(id) {
  if (!nodes.has(id)) nodes.set(id, { innerHTML: '', textContent: '' });
  return nodes.get(id);
}};
const localStorage = {
  getItem(key) { return storage.get(key) ?? null; },
  setItem(key, value) { storage.set(key, value); }
};
const window = { scrollTo() {}, orderId: '' };
const ctx = vm.createContext({ document, localStorage, window, console, Math });
vm.runInContext(js, ctx);
assert.match(document.getElementById('app').innerHTML, /LESS,/);
vm.runInContext("route('shop')", ctx);
assert.match(document.getElementById('app').innerHTML, /Essential Tee/);
vm.runInContext('detail(0)', ctx);
assert.match(document.getElementById('app').innerHTML, /ADD TO BAG/);
vm.runInContext('add()', ctx);
assert.equal(JSON.parse(storage.get('forme-cart')).length, 1);
assert.match(document.getElementById('app').innerHTML, /Subtotal/);
vm.runInContext("route('checkout')", ctx);
assert.match(document.getElementById('app').innerHTML, /Demo payment/);
vm.runInContext('finish()', ctx);
assert.match(document.getElementById('app').innerHTML, /No payment was made/);
assert.equal(JSON.parse(storage.get('forme-cart')).length, 0);
console.log('FORME storefront smoke tests passed');
