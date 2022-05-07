// #1

function makeMultipleLister(num) {
  return function() {
    for (let i = num; i < 100; i += num) {
      console.log(i);
    }
  };
}

let lister = makeMultipleLister(13);
lister();
// 13
// 26
// 39
// 52
// 65
// 78
// 91

// #2

let total = 0;

function add(num) {
  total += num;
  console.log(total);
}

function subtract(num) {
  total -= num;
  console.log(total);
}

add(1);
// 1
add(42);
// 43
subtract(39);
// 4
add(6);
// 10
