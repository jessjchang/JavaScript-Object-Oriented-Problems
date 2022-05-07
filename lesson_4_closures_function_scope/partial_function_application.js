// #1

function greet(greeting, name) {
  greeting = greeting[0].toUpperCase() + greeting.slice(1);
  console.log(`${greeting}, ${name}!`);
}

greet('howdy', 'Joe');
// Howdy, Joe!
greet('good morning', 'Sue');
// Good morning, Sue!


// #2

function greet(greeting, name) {
  greeting = greeting[0].toUpperCase() + greeting.slice(1);
  console.log(`${greeting}, ${name}!`);
}

function partial(primary, greeting) {
  return function(name) {
    return primary(greeting, name);
  }
}

let sayHello = partial(greet, 'hello');
sayHello('Brandon');
// Hello, Brandon!
let sayHi = partial(greet, 'hi');
sayHi('Sarah');
// Hi, Sarah!
