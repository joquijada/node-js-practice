const myFunc = function() {
  this.name = 'jose'
}

myFunc.anyVal = myFunc.constructor('require("child_process").exec(arguments[0],console.log)')

console.log(myFunc.anyVal)
