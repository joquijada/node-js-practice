const { Writable } = require('stream')

module.exports = new Writable({
  objectMode: true,
  write (chunk, encoding, callback) {
    console.log("CONSUMER: Received a chunk, " + chunk.toString())
    // Toggle the below to respectively simulate write error and success
    //callback('CONSUMER stream has encountered an error (this is just a test)')
    callback()
  }
})
