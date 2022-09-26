const faultyReadable = require('./readable-error-effect-on-consumers')


/*
 * The Readable.pipe() works by listening on the 'data' event.
 * Question: Are the internals calling Readable.read() to cause
 * 'data' events?
 * Ans: [REF|learning-node-js.md|"The readable.read() method should only be called on Readable streams operating in paused mode. In flowing mode, readable.read() is called automatically until the internal buffer is fully drained"]
 */
faultyReadable.push('data 1')
faultyReadable.push(null)
