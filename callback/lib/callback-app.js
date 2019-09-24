/*
 * Defines a function that serves as an object constructor. It accepts two arguments:
 * 1. "data": any old string
 * 2. "callBackObj": Holds a function in the "on" property, which in turn
 *                   accepts another function which will get called sometime
 *                   later
 *                   a function
 */
function SomeConstructorFunction(data, consumer) {
        this.data = data;
        consumer.on('data', function () {
            console.log(this.data);
        });
}
 

/*
 * Takes whaver 
 */
var consumer = {
    on: function(event, callback) {
        setTimeout(callback, 1000);
    }
};

// called as
var obj = new SomeConstructorFunction('foo', consumer);


function SomeConstructorFunctionFixed(data, pConsumer) {
    this.data = data;
    let self = this;
    pConsumer.on('data', function () {
        console.log(self.data);
    });
}

var obj2 = new SomeConstructorFunctionFixed('foo', consumer);
