// #1

function makeCounterLogger(firstNum) {
  return function(secondNum) {
    if (firstNum <= secondNum) {
      for (let i = firstNum; i <= secondNum; i += 1) {
        console.log(i);
      }
    } else {
      for (let i = firstNum; i >= secondNum; i -= 1) {
        console.log(i);
      }
    }
  }
}

let countlog = makeCounterLogger(5);
countlog(8);
// 5
// 6
// 7
// 8
countlog(2);
// 5
// 4
// 3
// 2

// #2

function makeList() {
  let list = [];

  return function(...args) {
    if (args.length === 0) {
      if (list.length === 0) {
        console.log('The list is empty.');
      } else {
        list.forEach(item => console.log(item));
      }
    } else if (list.includes(args[0])) {
      let itemIndex = list.indexOf(args[0]);
      list.splice(itemIndex, 1);
      console.log(`${args[0]} removed!`);
    } else {
      list.push(args[0]);
      console.log(`${args[0]} added!`);
    }
  }
}

let list = makeList();
list();
// The list is empty.
list('make breakfast');
// make breakfast added!
list('read book');
// read book added!
list();
// make breakfast
// read book
list('make breakfast');
// make breakfast removed!
list();
// read book
