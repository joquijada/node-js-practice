const { Readable } = require('stream')

module.exports = new Readable({
  /*(size) {
    console.log('PRODUCER: Being asked for data, my read() method has been invoked')
    this.emit('error', new Error("PRODUCER: There was an error producing data"))
  }*/
})