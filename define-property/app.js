/*
 * Taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
 * Intriguing way of reusing an object, but only the object is itself 
 * a function! Another way that JavaScript manifest its adhoc-ness
 * in how it was put together as a language. Also this follows in the theme
 * that functions are first class citizens. In other words, functions are 
 * also POJO's like any other. Java kind of started doing this with 
 * introduction of Lambdas in Java 8.
 */
function withValue(value) {
  var d = withValue.d || (
    withValue.d = {
      enumerable: false,
      writable: false,
      configurable: false,
      value: null
    }
  );

  // avoiding duplicate operation for assigning value
  if (d.value !== value) d.value = value;

  return d;
}

let a = withValue('foo')
let b = withValue('bar')
