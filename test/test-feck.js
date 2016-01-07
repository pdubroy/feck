'use strict';

const test = require('tape');
const feck = require('..');

const Get = feck.createKind('Get', 'name');
const Set = feck.createKind('Set', 'name', 'value');  // eslint-disable-line

// Handles getting and setting values of named variables in a flat namespace.
class VarHandler {
  constructor(initialVals) {
    this.vars = initialVals || {};
  }

  handleGet(eff) {
    return this.vars[eff.name];
  }

  handleSet(eff, gen) {
    return this.vars[eff.name] = eff.value;  // eslint-disable-line no-return-assign
  }
}

test('basic effects', function (t) {
  function* inc(name) {
    let currentVal = yield Get(name);
    let nextVal = yield Set(name, currentVal + 1);
    yield feck.Return(nextVal);
  }

  let handler = new VarHandler({x: 0});
  t.equal(feck.exec(inc('x'), handler), 1);
  t.equal(handler.vars.x, 1);
  t.equal(feck.exec(inc('x'), handler), 2);
  t.equal(handler.vars.x, 2);

  t.end();
});
