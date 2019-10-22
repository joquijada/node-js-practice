const faultyReadable = require('./helpers/faulty-readable')
const writeable = require('./helpers/writeable')
/**
 * The purpose of this file is to test what happens to consumers when the producer they're piped 
 * into experiences an error. Are they abruptly stopped by throwing an exception?Are they more gracefully
 * unpiped? What if any event is emmitted.
 * The startegy is to listen to every event possible emitted by a writeable to tet hypothesis that they
 * are gracefully disconnected.
 */


 faultyReadable.on('error', (err) => {
  console.log("PRODUCER: There was an error event: " + err)
})
 
 faultyReadable.pipe(writeable).on('close', () => {

 }).on('drain', () => {
   console.log("CONSUMER: There was a drain event")
}).on('error', () => {
  console.log("CONSUMER: There was an error event")
}).on('finish', () => {
  console.log("CONSUMER: There was a finish event")
}).on('pipe', () => {
  console.log("CONSUMER: There was a pipe event")
}).on('unpipe', () => {
  console.log("CONSUMER: There was an unpipe event")
})

 // Set up faulty producer

 // Connect consumer, and set up listeners on all the consumer events

 // Start producing,

 module.exports = faultyReadable