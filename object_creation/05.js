var Account = (function() {
  var userFirstName;
  var userLastName;
  var userEmail;
  var userPassword;

  function anonimize() {
    var chars = 'abcdejfhijklmnopqrstuvwxyz0123456789';
    var result = '';
    var i;

    while (result.length < 16) {
      i = Math.floor(Math.random() * chars.length);
      result += chars[i];
    }

    return result;
  }

  return {
    init: function(email, password, firstName, lastName) {
      userEmail = email;
      userPassword = password;
      userFirstName = firstName;
      userLastName = lastName;
      this.displayName = anonimize();
      return this;
    },

    reanonymize: function(passwordTry) {
      if (passwordTry === userPassword) {
        this.displayName = anonimize();
        return true;
      } else {
        return 'Invalid Password';
      }
    },

    resetPassword: function(passwordTry, newPassword) {
      if (passwordTry === userPassword) {
        userPassword = newPassword;
        return true;
      } else {
        return 'Invalid Password';
      }
    },

    firstName: function(passwordTry) {
      if (passwordTry === userPassword) {
        return userFirstName;
      } else {
        return 'Invalid Password';
      }
    },

    lastName: function(passwordTry) {
      if (passwordTry === userPassword) {
        return userLastName;
      } else {
        return 'Invalid Password';
      }
    },

    email: function(passwordTry) {
      if (passwordTry === userPassword) {
        return userEmail;
      } else {
        return 'Invalid Password';
      }
    },
  };
})();

var fooBar = Object.create(Account).init('foo@bar.com', '123456', 'foo', 'bar');
console.log(fooBar.firstName);                     // returns the firstName function
console.log(fooBar.email);                         // returns the email function
console.log(fooBar.firstName('123456'));           // logs 'foo'
console.log(fooBar.firstName('abc'));              // logs 'Invalid Password'
console.log(fooBar.displayName);                   // logs 16 character sequence
console.log(fooBar.resetPassword('123', 'abc'))    // logs 'Invalid Password';
console.log(fooBar.resetPassword('123456', 'abc')) // logs true

var displayName = fooBar.displayName;
console.log(fooBar.reanonymize('abc'));                         // returns true
console.log(displayName === fooBar.displayName);   // logs false
