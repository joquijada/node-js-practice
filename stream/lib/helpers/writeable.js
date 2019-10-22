const { Writable } = require('stream')

module.exports = new Writable({
  objectMode: true,
  write (chunk, encoding, callback) {
    console.log("CONSUMER: Received a chunk, " + chunk.toString())
    callback()
  }
})