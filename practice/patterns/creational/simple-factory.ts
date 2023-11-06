/**
 * use it when creating of object has some logic,
 * sow we do not want to repeat this logic everytime
 */

interface Door {
  getWidth(): number;
  getHeight(): number;
}

class WoodenDoor implements Door {
  private width: number;
  private height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  getWidth(): number {
    return this.width;
  }
  getHeight(): number {
    return this.height;
  }
}

class DoorFactory {
  public static makeDoor(width: number, height: number): Door {
    return new WoodenDoor(width, height);
  }
}

DoorFactory.makeDoor(10, 20);
