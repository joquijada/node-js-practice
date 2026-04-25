/**
 * The 'callback' has no effect in the outer scope 'results' In other words, changes that 'callback'
 * makes to 'results' are only visible inside 'callback' itself. If a scope outside of 'callback' has 'results'
 * also, it will see the originally assigned array (the changes to 'results' made inside other scopes have no effect). Why?
 * [REF|https://stackoverflow.com/questions/55755013/is-it-possible-to-change-variables-inside-a-closure-in-javascript|"No, it is not possible because the scope of the variable is the function's block."]
 * I could instead modify the original array instead of overwriting the `results` pointer/reference to a new array. This is
 * similar to Java pass-by-value, but for closures
 */
function whatWillResultsArrayContain() {
  const {
    callback,
    results
  } = prepareCallback()
  callback()
  console.log(`results is ${results}`)
  function prepareCallback() {
    // var results = [1, 2, 3, 4]
    let results = [1, 2, 3, 4]
    return {
      callback: () => results = [5, 6, 7, 8],
      results
    }
  }
}

whatWillResultsArrayContain()

/*
 * Broken: The last "i" assignment wins, and all functions display this last value assigned!!!
 */
var myFuncs = [];
for (var i = 0; i < 6; i++) {
  myFuncs[i] = function () {
    return i;
  };
}

invokeFuncAry(myFuncs);


/*
 * Fixed: Use closure to trap the value of "i" during each iteration
 */
var myFuncsClosure = [];
for (var i = 0; i < 6; i++) {
  myFuncsClosure[i] = (function (arg) {
    return function () {
      return arg;
    }
  })(i);
}

invokeFuncAry(myFuncsClosure);


/*
 * Fixed: As per https://decembersoft.com/posts/understanding-javascript-closures-in-for-loops/,
 *        use the JavaScript `let` keyword
 */
var myFuncsLet = [];
for (let i = 0; i < 6; i++) {
  myFuncsLet[i] = function () {
    return i;
  };
}

invokeFuncAry(myFuncsLet);


/**
 * Helper to invoke to function array
 * @param {array} funcAry
 */
function invokeFuncAry(funcAry) {
  funcAry.forEach(function (item, index) {
    console.log("Function " + index + " says " + item());
  });
  console.log("\n\n");
}
