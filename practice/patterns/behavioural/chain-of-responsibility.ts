class Account {
  public balance = 0;
  private successor: Account;

  constructor(balance: number) {
    this.balance = balance;
  }

  setNext(account: Account) {
    this.successor = account;
  }

  pay(bill: number) {
    if (this.canPay(bill)) {
      this.balance -= bill;
      console.log('success');
    } else if (this.successor) {
      this.successor.pay(bill);
    } else {
      console.log('Not enought money');
    }
  }

  canPay(amount: number) {
    return this.balance >= amount;
  }
}

class Bank extends Account {
  public balance: number;

  constructor(balance: number) {
    super(balance);
  }
}

class PayPal extends Account {
  public balance: number;

  constructor(balance: number) {
    super(balance);
  }
}

class Bitcoin extends Account {
  public balance: number;

  constructor(balance: number) {
    super(balance);
  }
}

const bank = new Bank(10);
const payPal = new PayPal(20);
const bitCoin = new Bitcoin(30);

bank.setNext(payPal);
payPal.setNext(bitCoin);
