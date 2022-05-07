function makeBank() {
  let accounts = [];

  function makeAccount(number) {
    let balance = 0;
    let transactions = [];

    return {
      number() {
        return number;
      },

      balance() {
        return balance;
      },

      transactions() {
        return transactions;
      },
    
      deposit(amount) {
        balance += amount;
        transactions.push({ type: "deposit", amount });
        return amount;
      },
  
      withdraw(amount) {
        if (amount > balance) amount = balance;
        transactions.push({ type: "withdraw", amount });
        balance -= amount;
        return amount;
      },
    };
  }

  return {
    openAccount() {
      let newAccount = makeAccount(accounts.length + 101);
      accounts.push(newAccount);
      return newAccount;
    },
    
    transfer(sourceAccount, destinationAccount, amount) {
      amount = sourceAccount.withdraw(amount);
      destinationAccount.deposit(amount);
      return amount;
    },
  };
}
