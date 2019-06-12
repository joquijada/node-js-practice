

/*
 * Broken: The last "i" assignment wins, and all functions display this last value assigned!!!
 */
var myFuncs = [];
for (var i = 0; i < 6; i++) {
    myFuncs[i] = function() {return i;};
}

invokeFuncAry(myFuncs);


/*
 * Fixed: Use closure to trap the value of "i" during each iteration
 */
var myFuncsClosure = [];
for (var i = 0; i < 6; i++) {
    myFuncsClosure[i] = (function (arg) { return function() {return arg;}})(i);
}

invokeFuncAry(myFuncsClosure);


/*
 * Fixed: As per https://decembersoft.com/posts/understanding-javascript-closures-in-for-loops/,
 *        use the JavaScript `let` keyword
 */
var myFuncsLet = [];
for (let i = 0; i < 6; i++) {
    myFuncsLet[i] = function() {return i;};
}

invokeFuncAry(myFuncsLet);


/**
 * Helper to invoke to function array
 * @param {array} funcAry 
 */
function invokeFuncAry(funcAry) {
    funcAry.forEach(function(item, index) {
        console.log("Function " + index + " says " + item());
      });
    console.log("\n\n");
}