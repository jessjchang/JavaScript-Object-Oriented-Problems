// #1

let prot = {};

let foo = Object.create(prot);

// #2

let prot = {};

let foo = Object.create(prot);
console.log(Object.getPrototypeOf(foo) === prot); // true

// #3

let prot = {};

let foo = Object.create(prot);
console.log(prot.isPrototypeOf(foo)); // true

// #4

let prot = {};

let foo = Object.create(prot);

console.log(prot.isPrototypeOf(foo)); // true
console.log(Object.prototype.isPrototypeOf(foo)); // true
