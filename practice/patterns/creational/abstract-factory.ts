/**
 * FACTORY OF A FACTORIES
 * lets you produce families of related objects without specifying their concrete classes.
 */
interface Door {
  getDescription(): void;
}

class WoodenDoor implements Door {
  getDescription(): void {
    console.log('Super puper wooden door');
  }
}

class IronDoor implements Door {
  getDescription(): void {
    console.log('I am the iron door');
  }
}

interface DoorFittingExpert {
  getDescription(): void;
}

class Carpenter implements DoorFittingExpert {
  getDescription(): void {
    console.log('I can only help with selecting of wooden doors');
  }
}

class Welder implements DoorFittingExpert {
  getDescription(): void {
    console.log('I can only help with selecting of iron doors');
  }
}

interface DoorFactory {
  makeDoor(): Door;
  makeFittingExpert(): DoorFittingExpert;
}

class WoodenDoorFactory implements DoorFactory {
  makeDoor(): Door {
    return new WoodenDoor();
  }

  makeFittingExpert(): DoorFittingExpert {
    return new Carpenter();
  }
}

class IronDoorFactory implements DoorFactory {
  makeDoor(): Door {
    return new IronDoor();
  }

  makeFittingExpert(): DoorFittingExpert {
    return new Welder();
  }
}

// let factory: DoorFactory = new WoodenDoorFactory();
let factory: DoorFactory = new IronDoorFactory();
let door = factory.makeDoor();
let expert = factory.makeFittingExpert();
