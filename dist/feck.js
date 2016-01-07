!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.feck=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],2:[function(require,module,exports){
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

},{"inherits":1}]},{},[2])(2)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZHVicm95L2Rldi9jZGcvZmVjay9ub2RlX21vZHVsZXMvaW5oZXJpdHMvaW5oZXJpdHNfYnJvd3Nlci5qcyIsIi9Vc2Vycy9kdWJyb3kvZGV2L2NkZy9mZWNrIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaWYgKHR5cGVvZiBPYmplY3QuY3JlYXRlID09PSAnZnVuY3Rpb24nKSB7XG4gIC8vIGltcGxlbWVudGF0aW9uIGZyb20gc3RhbmRhcmQgbm9kZS5qcyAndXRpbCcgbW9kdWxlXG4gIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaW5oZXJpdHMoY3Rvciwgc3VwZXJDdG9yKSB7XG4gICAgY3Rvci5zdXBlcl8gPSBzdXBlckN0b3JcbiAgICBjdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDdG9yLnByb3RvdHlwZSwge1xuICAgICAgY29uc3RydWN0b3I6IHtcbiAgICAgICAgdmFsdWU6IGN0b3IsXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICB9XG4gICAgfSk7XG4gIH07XG59IGVsc2Uge1xuICAvLyBvbGQgc2Nob29sIHNoaW0gZm9yIG9sZCBicm93c2Vyc1xuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGluaGVyaXRzKGN0b3IsIHN1cGVyQ3Rvcikge1xuICAgIGN0b3Iuc3VwZXJfID0gc3VwZXJDdG9yXG4gICAgdmFyIFRlbXBDdG9yID0gZnVuY3Rpb24gKCkge31cbiAgICBUZW1wQ3Rvci5wcm90b3R5cGUgPSBzdXBlckN0b3IucHJvdG90eXBlXG4gICAgY3Rvci5wcm90b3R5cGUgPSBuZXcgVGVtcEN0b3IoKVxuICAgIGN0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY3RvclxuICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIDIwMTUgUGF0cmljayBEdWJyb3kgPHBkdWJyb3lAZ21haWwuY29tPlxuLy8gVGhpcyBzb2Z0d2FyZSBpcyBkaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1JVCBMaWNlbnNlLlxuXG4ndXNlIHN0cmljdCc7XG5cbmNvbnN0IGluaGVyaXRzID0gcmVxdWlyZSgnaW5oZXJpdHMnKTtcblxuLy8gVGhlIHN1cGVyY2xhc3Mgb2YgRWZmZWN0IGtpbmRzLlxuY2xhc3MgRWZmZWN0IHt9XG5cbi8vIENyZWF0ZXMgYSBuZXcgZWZmZWN0IEtpbmQsIGFuZCByZXR1cm5zIGl0cyBjb25zdHJ1Y3RvciBmdW5jdGlvbi5cbi8vIGBraW5kTmFtZWAgd2lsbCBiZSB1c2VkIHRvIGxvb2sgdXAgaGFuZGxlcnMgZm9yIGVmZmVjdHMgb2YgdGhpcyBraW5kLlxuLy8gVGhlIHJlbWFpbmluZyBhcmd1bWVudHMgYXJlIHRoZSBuYW1lcyBvZiB0aGUgZWZmZWN0IHBhcmFtZXRlcnMuXG5mdW5jdGlvbiBjcmVhdGVLaW5kKGtpbmROYW1lIC8qICwgLi4ucGFyYW1zICovKSB7XG4gIGxldCBwYXJhbXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICBmdW5jdGlvbiBjdG9yKCkge1xuICAgIGxldCBlZmYgPSBPYmplY3QuY3JlYXRlKGN0b3IucHJvdG90eXBlKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhcmFtcy5sZW5ndGg7ICsraSkge1xuICAgICAgbGV0IG5hbWUgPSBwYXJhbXNbaV07XG4gICAgICBlZmZbbmFtZV0gPSBhcmd1bWVudHNbaV07XG4gICAgfVxuICAgIHJldHVybiBlZmY7XG4gIH1cbiAgaW5oZXJpdHMoY3RvciwgRWZmZWN0KTtcbiAgY3Rvci5wcm90b3R5cGUuX2tpbmROYW1lID0ga2luZE5hbWU7XG4gIHJldHVybiBjdG9yO1xufVxuXG4vLyBSZXR1cm4gZWZmZWN0cyBhcmUgdXNlZCB0byByZXR1cm4gYSB2YWx1ZSBmcm9tIHRoZSBnZW5lcmF0b3IuXG5jb25zdCBSZXR1cm4gPSBjcmVhdGVLaW5kKCdSZXR1cm4nLCAndmFsdWUnKTtcblxuLy8gRXhlY3V0ZXMgYW4gb3BlcmF0aW9uIHJlcHJlc2VudGVkIGJ5IHRoZSBpdGVyYXRvciBgaXRlcmAsIHVzaW5nIGBoYW5kbGVyYFxuLy8gdG8gaGFuZGxlIHRoZSBlZmZlY3RzLlxuZnVuY3Rpb24gZXhlYyhpdGVyLCBoYW5kbGVyKSB7XG4gIGxldCBzdGF0ZSA9IGl0ZXIubmV4dCgpO1xuICB3aGlsZSAoIXN0YXRlLmRvbmUpIHtcbiAgICBsZXQgZWZmID0gc3RhdGUudmFsdWU7XG4gICAgaWYgKGVmZiBpbnN0YW5jZW9mIFJldHVybikge1xuICAgICAgcmV0dXJuIGVmZi52YWx1ZTtcbiAgICB9XG4gICAgbGV0IHNlbGVjdG9yID0gJ2hhbmRsZScgKyBlZmYuX2tpbmROYW1lO1xuICAgIGxldCByZXN1bHQgPSBoYW5kbGVyW3NlbGVjdG9yXShlZmYpO1xuICAgIHN0YXRlID0gaXRlci5uZXh0KHJlc3VsdCk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7IGNyZWF0ZUtpbmQsIGV4ZWMsIFJldHVybiB9O1xuIl19
