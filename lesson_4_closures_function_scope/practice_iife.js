// #2

(function() {
  console.log("Sometimes, syntax isn't intuitive!")
})();


// #3

var sum = 0;
var numbers;

sum += 10;
sum += 31;

numbers = [1, 7, -3, 3];

sum += (function sum(arr) {
  return arr.reduce(function(sum, number) {
    sum += number;
    return sum;
  }, 0);
})(numbers);

console.log(sum); // 49

// #4

function countdown(num) {
  (function(n) {
    for (let i = n; i >= 0; i -= 1) {
      console.log(i);
    }
    
    console.log('Done!');
  })(num);
}

countdown(7);
// 7
// 6
// 5
// 4
// 3
// 2
// 1
// 0
// Done!


// #6

function countdown(count) {
  (function logCount(n) {
    if (n < 0) {
      console.log('Done!');
      return;
    }
    
    console.log(n);
    n -= 1;
    logCount(n);
  })(count);
}

countdown(7);
// 7
// 6
// 5
// 4
// 3
// 2
// 1
// 0
// Done!
