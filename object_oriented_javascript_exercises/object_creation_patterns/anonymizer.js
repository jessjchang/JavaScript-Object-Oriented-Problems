let Account = (function() {
  const characterArray = createCharacterArray();
  let userEmail;
  let userPassword;
  let userFirstName;
  let userLastName;
  
  function isValidPassword(testPassword) {
    return userPassword === testPassword;
  }
  
  function randomCharacter() {
    let randomIndex = Math.floor(Math.random() * 62);
    return characterArray[randomIndex];
  }
  
  function createCharacterArray() {
    let result = [];
    addChars(result, '0', 9);
    addChars(result, 'a', 25);
    addChars(result, 'A', 25);
    return result;
  }
  
  function addChars(resultArray, startingChar, numChars) {
    let startCharCode = startingChar.charCodeAt(0);
    
    for (let i = 0; i <= numChars; i += 1) {
      resultArray.push(String.fromCharCode(startCharCode));
      startCharCode += 1;
    }
  }
  
  function anonymize() {
    let result = '';
    
    for (let i = 0; i < 16; i += 1) {
      result += randomCharacter();
    }
    
    return result;
  }
  
  return {
    init: function(email, password, firstName, lastName) {
      userEmail = email;
      userPassword = password;
      userFirstName = firstName;
      userLastName = lastName;
      this.displayName = anonymize();
      return this;
    },
    
    reanonymize(password) {
      if (isValidPassword(password)) {
        this.displayName = anonymize();
        return true;
      } else {
        return 'Invalid Password';
      }
    },
    
    resetPassword(currentPassword, newPassword) {
      if (isValidPassword(currentPassword)) {
        userPassword = newPassword;
        return true;
      } else {
        return 'Invalid Password';
      }
    },
    
    firstName: function(password) {
      if (isValidPassword(password)) {
        return userFirstName;
      } else {
        return 'Invalid Password';
      }
    },
    
    lastName: function(password) {
      if (isValidPassword(password)) {
        return userLastName;
      } else {
        return 'Invalid Password';
      }
    },
    
    email: function(password) {
      if (isValidPassword(password)) {
        return userEmail;
      } else {
        return 'Invalid Password';
      } 
    },
  };
})();

let fooBar = Object.create(Account).init('foo@bar.com', '123456', 'foo', 'bar');
console.log(fooBar.firstName);                     // returns the firstName function
console.log(fooBar.email);                         // returns the email function
console.log(fooBar.firstName('123456'));           // logs 'foo'
console.log(fooBar.firstName('abc'));              // logs 'Invalid Password'
console.log(fooBar.displayName);                   // logs 16 character sequence
console.log(fooBar.resetPassword('123', 'abc'))    // logs 'Invalid Password';
console.log(fooBar.resetPassword('123456', 'abc')) // logs true

let displayName = fooBar.displayName;
fooBar.reanonymize('abc');                         // returns true
console.log(displayName === fooBar.displayName);   // logs false


// FURTHER EXPLORATION
let Account = (function() {
  const characterArray = createCharacterArray();
  const users = {};
  
  function getUser(user) {
    return users[user.displayName];
  }
  
  function isValidPassword(userPassword, testPassword) {
    return userPassword === testPassword;
  }
  
  function randomCharacter() {
    let randomIndex = Math.floor(Math.random() * 62);
    return characterArray[randomIndex];
  }
  
  function createCharacterArray() {
    let result = [];
    addChars(result, '0', 9);
    addChars(result, 'a', 25);
    addChars(result, 'A', 25);
    return result;
  }
  
  function addChars(resultArray, startingChar, numChars) {
    let startCharCode = startingChar.charCodeAt(0);
    
    for (let i = 0; i <= numChars; i += 1) {
      resultArray.push(String.fromCharCode(startCharCode));
      startCharCode += 1;
    }
  }
  
  function anonymize() {
    let result = '';
    
    for (let i = 0; i < 16; i += 1) {
      result += randomCharacter();
    }
    
    return result;
  }
  
  return {
    init(email, password, firstName, lastName) {
      this.displayName = anonymize();
      let newUser = {
        email,
        password,
        firstName,
        lastName,
      };

      users[this.displayName] = newUser;
      return this;
    },
    
    reanonymize(password) {
      let user = getUser(this);
      if (isValidPassword(user.password, password)) {
        let oldDisplayName = this.displayName;
        this.displayName = anonymize();
        users[this.displayName] = user;
        delete users[oldDisplayName];
        return true;
      } else {
        return 'Invalid Password';
      }
    },
    
    resetPassword(currentPassword, newPassword) {
      let user = getUser(this);
      if (isValidPassword(user.password, currentPassword)) {
        user.password = newPassword;
        return true;
      } else {
        return 'Invalid Password';
      }
    },
    
    firstName(password) {
      let user = getUser(this);
      if (isValidPassword(user.password, password)) {
        return user.firstName;
      } else {
        return 'Invalid Password';
      }
    },
    
    lastName(password) {
      let user = getUser(this);
      if (isValidPassword(user.password, password)) {
        return user.lastName;
      } else {
        return 'Invalid Password';
      }
    },
    
    email(password) {
      let user = getUser(this);
      if (isValidPassword(user.password, password)) {
        return user.email;
      } else {
        return 'Invalid Password';
      } 
    },
  };
})();

let fooBar = Object.create(Account).init('foo@bar.com', '123456', 'foo', 'bar');
console.log(fooBar.firstName);                     // returns the firstName function
console.log(fooBar.email);                         // returns the email function
console.log(fooBar.firstName('123456'));           // logs 'foo'
console.log(fooBar.firstName('abc'));              // logs 'Invalid Password'
console.log(fooBar.displayName);                   // logs 16 character sequence
console.log(fooBar.resetPassword('123', 'abc'))    // logs 'Invalid Password'
console.log(fooBar.resetPassword('123456', 'abc')) // logs true

let displayName = fooBar.displayName;
fooBar.reanonymize('abc');                         // returns true
console.log(displayName === fooBar.displayName);   // logs false

let bazQux = Object.create(Account).init('baz@qux.com', '123456', 'baz', 'qux');
console.log(fooBar.firstName('abc'));              // logs 'foo'
console.log(fooBar.email('abc'));                  // logs 'foo@bar.com'
console.log(bazQux.firstName('123456'));              // logs 'baz'
console.log(bazQux.email('123456'));                  // logs 'baz@qux.com'
