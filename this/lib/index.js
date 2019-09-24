sum(3, 5)

const myObj = {
    prop1: "val1",
    prop2: "val2"
}
sum.call(myObj, 6, 7)
sum.apply(myObj, [5, 40])

function sum(a, b) {
  console.log("Sum is " + (a + b))
  console.log("The `this` object is " + this.toString())
}