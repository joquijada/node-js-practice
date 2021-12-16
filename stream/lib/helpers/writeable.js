const { Writable } = require('stream')

module.exports = new Writable({
  objectMode: true,
  write (chunk, encoding, callback) {
    console.log("CONSUMER: Received a chunk, " + chunk.toString())
      // Toggle the below to respectively simutale write error and success
    callback('jackass')
    //callback()
  }
})
