function makeCar(accelerationRate, brakingRate) {
  return {
    speed: 0,
    accelerationRate,
    brakingRate,
    accelerate() {
      this.speed += this.accelerationRate;
    },
    brake() {
      this.speed -= this.brakingRate;
      
      if (this.speed < 0) this.speed = 0;
    },
  };
}

let sedan = makeCar(8, 6);
sedan.accelerate();
console.log(sedan.speed); // 8

sedan.brake();
console.log(sedan.speed); // 2

sedan.brake();
console.log(sedan.speed); // 0
