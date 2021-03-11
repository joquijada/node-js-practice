const { troubleFunctionThatCatchesItself, troubleFunctionThatDoesntCatchItself } = require('./trouble-function')

async function callForTrouble() {
    //const res = await troubleFunctionThatCatchesItSelf();
    return await troubleFunctionThatDoesntCatchItself()
}


/*
 * Async functions **always** return a Promise. See 
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function, search for
 * "A Promise which will be resolved "
 */
const ret = callForTrouble()
console.log("Return value callForTrouble is: " + ret)
ret.then((succ) => console.log("Success callForTrouble: " + succ),
  (err) => console.error("Failed callForTrouble:: " + err))

/**
 * What happens if an exception ocurrs inside an async function, or in code invoked by it? 
 * Let's try it out below.
 * As expected the async function returns a promise which reject
 * function is the one invoked when then()'ed
 */
async function callForTroubleDontCatchIt() {
  return await callForTrouble()
}

const prom = callForTroubleDontCatchIt()
console.log("Return value callForTroubleDontCatchIt is: " + prom)
prom.then((succ) => console.log("Success callForTroubleDontCatchIt: " + succ),
  (err) => console.error("Failed callForTroubleDontCatchIt: " + err))


async function callForTroubleAndCatchIt() {
  try {
    // W/o await, it will **never** go into catch() block, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function,
    // search for "The implicit wrapping of return values in"
    //return callForTrouble()
    return await callForTrouble()
  } catch (err) {
    return new Error("Caught error: " + err)
  }
}


const prom2 = callForTroubleAndCatchIt()
console.log("Return value callForTroubleAndCatchIt is: " + prom2)
prom2.then((succ) => console.log("Success callForTroubleAndCatchIt: " + succ),
  (err) => console.error("Failed callForTroubleAndCatchIt: " + err))



async function returnRejectedPromise () {

  async function reject() {
    try {
      /*
       * Respectively the below statements will result in these behaviors:
       * 1. The calling code is responsible for "catching" the exception. Control will go
       *    into the catch block of the calling code.
       * 2. `await` causes execution to go into the `catch` block of this method. If the client/calling code
       *    has wrapped the call in a try/catch, it will **not** go into the client/calling code's catch block. This
       *    is because we have caught the error ourselves.
       * 3. Same as #2 above
       * 4. Same as #2 above. This is just the chaining way of doing `try { await <some promise returning code> } catch (e) { ... } `. The
       *    `.catch()` attaches a callback to execute in case of failure
       * 
       * In essence, `await` has the effect on unwrapping the promise, handling the case
       * when the unwrapped gift is a bomb that blows up, or a sweet and fluffy teddy bear
       */
      //return Promise.reject("Rejected promise")                    // Behavior 1
      //await Promise.reject("Rejected promise")                     // Behavior 2
      //return await Promise.reject("Rejected promise")              // Behavior 3
      return Promise.reject("Rejected promise").catch(e => e) // Behavior 4
    } catch(err) {
      return err
    }
    
  }
  try {
    /*
     *
     */
    //const res = await reject()
    const res = await Promise.all([reject()])
    console.log("Control did **not** go to catch " + res)
  } catch (err) {
    console.log("Control **did** go into catch block: " + err)
  }
}


returnRejectedPromise()