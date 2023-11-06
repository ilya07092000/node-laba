/**
 *  
 */

interface Lion {
  roar(): void;
}

class AfricanLion implements Lion {
  roar(): void {
    console.log('Rrr')
  }
}

class AsionLion implements Lion {
  roar(): void {
    console.log('Rrr')
  }
}

class Hunter {
  hunt(lion: Lion) {

  }
}

class WildGod {
  bark() {

  }
}

class WildDogAdapter implements Lion {
  public dog;

  constructor(dog: WildGod) {
    this.dog = dog;
  }

  roar(): void {
    this.dog.bark()
  }
}

const wildDog = new WildGod();
const adatper = new WildDogAdapter(wildDog);

const hunter = new Hunter();

hunter.hunt(adatper)
adatper.roar()
