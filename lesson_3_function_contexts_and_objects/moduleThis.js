var foo = 'foo';
bar = 'bar';
let qux = 'qux';

console.log(this.foo);    // => undefined
console.log(this.bar);    // => undefined
console.log(this.qux);    // => undefined
console.log(this);        // => {}
