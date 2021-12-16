const { Readable } = require('stream')
/*
 * For explanation of behavior I see, namely that the `_read()` method
 * was not getting called with no push() inside the _read() below, see
 * [REF|learning-node-js.txt|"I was piping the receiver into a Readable that was not pushing anything inside its"]
 */
module.exports = new Readable({
  read (size) {
    const data = String.fromCharCode(this.currentCharCode++)
    console.log(`PRODUCER: Being asked for data, my read() method has been invoked, and I produced ${data}`)
    this.push(data);
    if (this.currentCharCode > 90) {
      // Signal to consumers that I'm done producing, namely by pushing 'null'
      this.push(null);
    }
    // Node.js docs say that emitting in this way results in undefined
    // behavior, [REF|https://nodejs.org/api/stream.html|"hrowing an Error from within readable._read() or manually emitting an 'error' event results in undefined behavior."]
    //this.emit('error', new Error('PRODUCER: There was an error producing data, propagated using "emit(err)", not recommended by Node, results in undefined behavior!!!'))
    //throw new Error('PRODUCER: There was an error producing data, propagated using "throw new Error(err)", Node does not recommend this because of undefined behavior')
    //this.destroy('PRODUCER: There was an error producing data, propagated using "destroy(err)", this is the proper way to do it in Node')
  }
})

module.exports.currentCharCode = 65;
