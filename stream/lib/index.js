const faultyReadable = require('./readable-error-effect-on-consumers')


/*
 * The Readable.pipe() works by listening on the 'data' event.
 */
faultyReadable.push('data 1')
faultyReadable.push(null)