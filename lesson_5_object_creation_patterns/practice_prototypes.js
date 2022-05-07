// #1

function getDefiningObject(object, propKey) {
  let obj = object;
  while (obj !== null) {
    if (obj.hasOwnProperty(propKey)) return obj;
    obj = Object.getPrototypeOf(obj);
  }

  return obj;
}

let foo = {
  a: 1,
  b: 2,
};

let bar = Object.create(foo);
let baz = Object.create(bar);
let qux = Object.create(baz);

bar.c = 3;

console.log(getDefiningObject(qux, 'c') === bar);     // => true
console.log(getDefiningObject(qux, 'e'));             // => null

// #2

function shallowCopy(object) {
  let copy = Object.create(Object.getPrototypeOf(object));
  
  let objProps = Object.getOwnPropertyNames(object);
  objProps.forEach(prop => copy[prop] = object[prop]);
  
  return copy;
}

let foo = {
  a: 1,
  b: 2,
};

let bar = Object.create(foo);
bar.c = 3;
bar.say = function() {
  console.log('c is ' + this.c);
};

let baz = shallowCopy(bar);
console.log(baz.a);       // => 1
baz.say();                // => c is 3
console.log(baz.hasOwnProperty('a'));  // false
console.log(baz.hasOwnProperty('b'));  // false

// #3

function extend(destination, ...args) {
  args.forEach(obj => {
    let objProps = Object.getOwnPropertyNames(obj);
    objProps.forEach(prop => destination[prop] = obj[prop]);
  });
  
  return destination;
}

let foo = {
  a: 0,
  b: {
    x: 1,
    y: 2,
  },
};

let joe = {
  name: 'Joe'
};

let funcs = {
  sayHello() {
    console.log('Hello, ' + this.name);
  },

  sayGoodBye() {
    console.log('Goodbye, ' + this.name);
  },
};

let object = extend({}, foo, joe, funcs);

console.log(object.b.x);          // => 1
object.sayHello();                // => Hello, Joe
