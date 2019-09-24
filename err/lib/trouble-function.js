const troubleFunctionThatCatchesItself = () => {
  return new Promise((res, rej) => {
    rej("Error on purpose")
  }).catch(err => "Caught in troubleFunction itself: " + err)
}


const troubleFunctionThatDoesntCatchItself = () => {
  return new Promise((res, rej) => {
    rej("Error on purpose")
  })
}

module.exports = {
  troubleFunctionThatCatchesItself,
  troubleFunctionThatDoesntCatchItself
}
