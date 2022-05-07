var foo = 'foo';
bar = 'bar';
let qux = 'qux';

console.log(global.foo);    // => undefined
console.log(global.bar);    // => bar
console.log(global.qux);    // => undefined
console.log(qux);           // => qux
