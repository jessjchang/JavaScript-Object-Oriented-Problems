const greeter = {
  message: (() => {
    const name = 'Naveed';
    const greeting = 'Hello';
    
    return `${greeting} ${name}!`;
  })(),

  sayGreetings() {
    console.log(this.message);
  }
};
