/**
 * Here I wanted to experiment what happens if Promise.then() is passed a handler that executes
 * a sync vs an async function. The motivation came from what happens if lambdaWrapper is passed an
 * async or not, specifically if I should remove 'async' keyword from niko-stack origin response. It
 * turns out JavaScript handles this w/o issues:
 * [REF|https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then|"returns another pending promise object"]
 */
const nonAsyncFunc = () => {
    return 'JMQ: non-async function result'
}

const asyncFunc = async () => {
    return 'JMQ: async function result'
}

Promise.resolve().then(() => nonAsyncFunc()).then(console.log)
Promise.resolve().then(() => asyncFunc()).then(console.log)
