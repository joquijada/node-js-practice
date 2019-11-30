const { Readable } = require('stream')
/*
 * For explanation of behavior I see, namely that the `_read()` method 
 * was not getting called with no push() inside the _read() below, see
 * [REF|learning-node-js.txt|"I was piping the receiver into a Readable that was not pushing anything inside its"]
 */
module.exports = new Readable({
  read (size) {
    console.log('PRODUCER: Being asked for data, my read() method has been invoked')
    /*this.push(String.fromCharCode(this.currentCharCode++));
    if (this.currentCharCode > 90) {
      this.push(null);
    }*/
    //this.emit('error', new Error("PRODUCER: There was an error producing data"))
  }
})

module.exports.currentCharCode = 65;