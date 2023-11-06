/**
 * Flyweight is a structural design pattern that lets you fit
 *  more objects into the available amount of RAM by sharing common
 *  parts of state between multiple objects instead of keeping all of the data in each object.
 */

class KarakTea {}

class TeaMaker {
  private availableTea: object;

  make(preferences: string) {
    if (this.availableTea[preferences]) {
      return this.availableTea[preferences];
    }

    this.availableTea[preferences] = new KarakTea();
  }
}
