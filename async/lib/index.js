let myConfig = {
  resolveCorrectly: true,
  semiCorrect: true,
  simError: false
}

tryMe(myConfig)


/**
 * The executor function gets executed by the JavaScript engine even before 
 * control exits from the Promise constructor. See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
 * search for "the executor is called before the Promise constructor even returns the created object". Can think of the
 * input executor function (what is passed in the `new Promise() constructor) as a Java Runnable
 * instance passed to `new Thread(Runnable)`. In Java though have to call `Thread.start()` for
 * execution to begin, as opposed to JavaScript where execution begins w/o additional instruction.
 * 
 * Inside the Promise constructor, the way to resolve or the reject values is respectively via
 * the resolve and reject callbacks passed to the callback function passed into the Promise constructor
 * method. Inside Promise.then() method, the way to pass the resolve or success values to the next 
 * then() on that Promise, is by **returning** a value in the respective resolve/reject function - if
 *  I don't return something, the next then()'s success/reject functions will get nothing (undefined). See
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then, search
 * for "returns a value, the promise returned by then gets resolved with the returned value as its value;"
 * 
 * The Promise.catch() method returns a promise, which if then()'ed, gets its success callback invoked, 
 * and the value passed into that callback is the value returned (if any) by the Promise.catch().
 */

function tryMe(config) {


  const myPromise = new Promise((resolve, reject) => {
    console.log("Promise initialized")
    if (config.simError) {
      // Below two ways are equivalent, difference being the messaging: `throw` prepends "Error: "
      //reject("Simulating an error")
      throw new Error("Simulating an error")
    }

    if (config.resolveCorrectly) {
      console.log("Resolving by returning the output of the resolve() function")
      /*
       * Initially I was doing `return resolve("...")`. Having `return` does not cause errors, but
       * I guess it does not make sense either. Also I **must** call resolve() (or reject() if
       * the operation fails), else the callbacks passed to any subsequent `then()` will
       * have `undefined` argument passed to them.
       */
      resolve("crap")
    } else if (config.semiCorrect) {
      /*
       * This does not work to resolve the promise. Inside Promise constructor, must invoke `resolve()`
       * function argument that the JavaScript engine passes to this executor (or `reject()` if the 
       * operation failed), see comment above.
       */
      console.log("Resolving by returning a string")
      return "half-ass"
    }
  })//.catch(reason => console.log("Failure reason is " + reason))

  // 
  const whatIsThis = myPromise.then()

  // Racy read of Promise returned by myPromise defined above, most likely will give
  // Promise { <pending> } (impossible to deterministically get its state when invoked this way)
  console.log("whatIsThis (racy read) is: ")
  console.log(whatIsThis)
  //console.log(Promise.prototype)

  /*
   * This `then()` will always get executed. Why? Because above we caught one of the two only
   * possible outcomes of the Promise, namely "resolved" or "rejected".
   */
  let andWtfIsThis = whatIsThis.then(function (x) {
    console.log("Was promise properly resolved? " + config.resolveCorrectly)
    /*
     * This read on the other hand is not racy because the "whatIsThis" promise
     * has already ben "resolved". We know that because this function, as per the Promise.then()
     * contract, is executed as a callback once the Promise has successfully resolved
     */
    console.log("First `then()`, Inside a callback that gets invoked after the Promise has been succcessfull"
      + " resolved. Resolved value is " + x + ", and the promise object itself is:")
    console.log(whatIsThis)
    return "first `then()` success value"
  }, (err) => console.log("Inside first `then()`, something bad happened: " + err)).then(function (y) {
    /*
     * Because the previous `then()` ommitted the arguments, as per the MDN docs [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then), 
     * this then() received the Promise in the same settled state as before that then().
     */
    console.log("Really? Called `then()` a second time, here's returned value of previous promise " 
    + "(if any): " + y
    + ", and the promise object itself is:")
    //console.log(this)
    return y
  }, (err) => console.log("Second `then()` reject handler says: " + err)).then((z) => {
    console.log("Really, again? Called `then()` a third time, value passed to success handler is " + z)
    console.log(whatIsThis)
  })

  // This call goes into JavaScript's main event loop, meaning that it's executed synchronously
  console.log("andWtfIsThis is " + andWtfIsThis)

  andWtfIsThis.then((w) => {
    console.log("Inside the andWtfIsThis.then()")
    console.log("andWtfIsThis done right is " + andWtfIsThis)
    console.log("andWtfIsThis' resolved value is " + w)
  })

  Promise.resolve.
}
