interface ChatRoomMediator {
  showMessage(user: User, message: string): void;
}

class ChatRoom implements ChatRoomMediator {
  showMessage(user: User, message: string): void {
    const time = new Date().toLocaleString();
    const sender = user.getName();
    console.log(`${sender} | [${time}]: ${message}`);
  }
}

class User {
  private name: string;
  private chatMediator: ChatRoomMediator;

  constructor(name: string, chatMediator: ChatRoomMediator) {
    this.name = name;
    this.chatMediator = chatMediator;
  }

  getName(): string {
    return this.name;
  }

  sendMessage(message: string) {
    this.chatMediator.showMessage(this, message);
  }
}

const mediator = new ChatRoom();
const user1 = new User('user1', mediator);
const user2 = new User('user2', mediator);
const user3 = new User('user3', mediator);
const user4 = new User('user4', mediator);
const user5 = new User('user5', mediator);
const user6 = new User('user6', mediator);
