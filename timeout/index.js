let timeout = null
const obj = { flag: false }

/**
 * This is an experiment I wrote to see if it's possible to unwrap a promise, and return the gift with w/o
 * another promise to wrap it. The problem is that the event loop needs to execute in order get the promise
 * result, hence it's not even possible to unwrap the promise in the user input code, which executes completely
 * before the event loop starts. So it's like a catch-22.
 */
function bullshit() {
  if (!timeout) {
    timeout = timer()
  }

  function timer() {
    return setTimeout(function () {
      console.log('done set that shit to true')
      obj.flag = true
      console.log(`obj is ${JSON.stringify(obj)}`)
    }, 2000)
  }

  if (obj.flag) {
    return 'fuck you'
  } else {
    //console.log(`timeout is ${timeout}`)
    return null
  }
  console.log('this shit done come tru')
}

let res = bullshit()
while (!res) {
  //process.nextTick(() => res = bullshit())
  setTimeout(function() {
    res = bullshit()
  }, 0)
}
console.log(`JMQ: ${res}`)
