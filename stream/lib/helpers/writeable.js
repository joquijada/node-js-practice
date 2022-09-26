const { Writable } = require('stream')

module.exports = new Writable({
  objectMode: true,
  write (chunk, encoding, callback) {
    console.log("CONSUMER: Received a chunk, " + chunk.toString())
    /*
     * Toggle comment/uncomment the below to respectively simulate write error and success. Node
     * recommends using callback(err) as the correct way to propagate errors,
     * [REF|https://nodejs.org/api/stream.html#two-reading-modes|"Errors occurring during the processing of the writable._write(), writable._writev() and writable._final() methods must be propagated by invoking the callback and passing the error as the first argument. Throwing an Error from within these methods or manually emitting an 'error' event results in undefined behavior."]
     * This is symmetrical with Readable's way of prapagating errors, see faulty-readable.js.
     */
    // Toggle the below to respectively simulate write error and success
    //callback('CONSUMER stream has encountered an error (this is just a test)')
    callback()
  }
})
