// Copyright (c) 2015 Patrick Dubroy <pdubroy@gmail.com>
// This software is distributed under the terms of the MIT License.

'use strict';

const inherits = require('inherits');

// The superclass of Effect kinds.
class Effect {}

// Creates a new effect Kind, and returns its constructor function.
// `kindName` will be used to look up handlers for effects of this kind.
// The remaining arguments are the names of the effect parameters.
function createKind(kindName /* , ...params */) {
  let params = Array.prototype.slice.call(arguments, 1);
  function ctor() {
    let eff = Object.create(ctor.prototype);
    for (let i = 0; i < params.length; ++i) {
      let name = params[i];
      eff[name] = arguments[i];
    }
    return eff;
  }
  inherits(ctor, Effect);
  ctor.prototype._kindName = kindName;
  return ctor;
}

// Return effects are used to return a value from the generator.
const Return = createKind('Return', 'value');

// Executes an operation represented by the iterator `iter`, using `handler`
// to handle the effects.
function exec(iter, handler) {
  let state = iter.next();
  while (!state.done) {
    let eff = state.value;
    if (eff instanceof Return) {
      return eff.value;
    }
    let selector = 'handle' + eff._kindName;
    let result = handler[selector](eff);
    state = iter.next(result);
  }
}

module.exports = { createKind, exec, Return };
