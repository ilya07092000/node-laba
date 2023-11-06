/**
 * Facade is a structural design pattern that provides a simplified interface to a library,
 * a framework, or any other complex set of classes.
 */

class Computer {
  turnOnScreen(): void {}
  turnOffScreen(): void {}
  closeAllTabs(): void {}
  clickPowerButton(): void {}
  cleanCache(): void {}
  restoreAllTabs(): void {}
}

class ComputerFacade {
  private computer: Computer;

  constructor(computer: Computer) {
    this.computer = computer;
  }

  turnOn() {
    this.computer.clickPowerButton();
    this.computer.restoreAllTabs();
    this.computer.turnOnScreen();
  }

  turnOff() {
    this.computer.closeAllTabs();
    this.computer.cleanCache();
    this.computer.clickPowerButton();
  }
}
