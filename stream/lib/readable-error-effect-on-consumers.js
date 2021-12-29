const faultyReadable = require('./helpers/faulty-readable')
const writeable = require('./helpers/writeable')
const { pipeline } = require('stream/promises')
/**
 * The purpose of this file is to test what happens to consumers when the producer (I.e. the readable)
 * they're piped into experiences an error. Are they abruptly stopped by throwing an exception? Are they more gracefully
 * unpip'ed? What if any event is emmitted by the writeable?
 * The strategy is to listen to every event possible emitted by a writeable to test hypothesis that they
 * are gracefully disconnected.
 * Result: When using the API pipeline() method, all the streams are destroyed,
 * [REF|https://nodejs.org/api/stream.html|"stream.pipeline() will call stream.destroy(err) on all streams except:"]. I do
 *   see the Readable 'error' event getting triggered if for example the `Writeable` propagates an error,
 *   <pre>
 *   CONSUMER: There was an error event jackass
 *   CONSUMER: There was a close event undefined
 *   PRODUCER: There was an error event:  jackass
 *   Pipeline failed jackass
 *   </pre>
 *
 *   If I don't use pipeline(), if one stream fails the others are not auto-destroyed. So using pipeline() does offer
 *   its benefits.
 */


faultyReadable.on('error', (err) => {
  console.log('PRODUCER: There was an error event: ', err)
})

//faultyReadable.push('data added before piping')

const usePipeline = false

writeable.on('close', (e) => {
  console.log('CONSUMER: There was a close event', e)
}).on('drain', (e) => {
  console.log('CONSUMER: There was a drain event', e)
}).on('error', (e) => {
  console.log('CONSUMER: There was an error event', e)
}).on('finish', (e) => {
  console.log('CONSUMER: There was a finish event', e)
}).on('pipe', (e) => {
  console.log('CONSUMER: There was a pipe event', e)
}).on('unpipe', (e) => {
  console.log('CONSUMER: There was an unpipe event', e)
})

if (usePipeline) {
    pipeline(faultyReadable, writeable).catch(e => console.error('Pipeline failed', e))
} else {
  faultyReadable.on('error', () => writeable.destroy("CONSUMER: I caught an error from the Readable, therefore destro()'ing myself"))
  faultyReadable.pipe(writeable)
}


module.exports = faultyReadable
