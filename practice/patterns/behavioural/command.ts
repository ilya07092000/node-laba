/**
 *  turns a request into a stand-alone object that contains all information about the request.
 *  This transformation lets you pass requests as a method arguments, delay or queue a request’s execution, and support undoable operations.
 */

class Bulb {
  turnOn() {
    console.log('ligt');
  }

  turnOff() {
    console.log('dark');
  }
}

interface Command {
  execute(): void;
  undo(): void;
  redo(): void;
}

class TurnOn implements Command {
  private bulb: Bulb;

  constructor(bulb: Bulb) {
    this.bulb = bulb;
  }

  execute(): void {
    this.bulb.turnOn();
  }

  redo(): void {
    this.execute();
  }

  undo(): void {
    this.bulb.turnOff();
  }
}

class TurnOff implements Command {
  private bulb: Bulb;

  constructor(bulb: Bulb) {
    this.bulb = bulb;
  }

  execute(): void {
    this.bulb.turnOff();
  }

  redo(): void {
    this.execute();
  }

  undo(): void {
    this.bulb.turnOn();
  }
}

class RemoteControl {
  submit(command: Command) {
    command.execute();
  }
}

let bulb = new Bulb();

let remoteControl = new RemoteControl();
remoteControl.submit(new TurnOff(bulb));
