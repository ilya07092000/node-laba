/**
 * Composite is a structural design pattern that lets you compose objects
 * into tree structures and then work with these structures as if they were individual objects.
 */

interface Employee {
  getName(): string;
  getSalary(): number;
  setSalary(num: number): void;
  getRoles(): string[];
}

class Developer implements Employee {
  private name: string;
  private salary: number;

  constructor(name, salary) {
    this.name = name;
    this.salary = salary;
  }

  getName(): string {
    return this.name;
  }

  getSalary(): number {
    return this.salary;
  }

  setSalary(num: number): void {
    this.salary = num;
  }

  getRoles(): string[] {
    return ['Develop', 'Conduct', 'Test'];
  }
}

class Organization {
  private employees: Employee[];

  addEmployee(employee: Employee) {
    this.employees.push(employee);
  }

  getNetSalaries(): number {
    return this.employees.reduce(
      (acc, employee) => acc + employee.getSalary(),
      0,
    );
  }
}
