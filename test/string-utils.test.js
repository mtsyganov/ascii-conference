const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const code = fs.readFileSync(path.join(__dirname, '../public/js/string-utils.js'), 'utf8');
const context = {};
vm.createContext(context);
vm.runInContext(code, context);

const { str2ab, ab2str } = context;

const original = 'Hello, world!';
const buffer = str2ab(original);
const roundTrip = ab2str(new Uint8Array(buffer));

// ab2str appends null characters; trim them before comparison
const cleaned = roundTrip.replace(/\0+$/, '');
assert.strictEqual(cleaned, original);
console.log('string-utils round-trip test passed');

