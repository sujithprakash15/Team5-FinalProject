export class Employee {
  public empId: string;
  public empName: string;
  public password: string;
  public role: string;
  public deptId: string;

  constructor(empId: string, empName: string, password: string, role: string, deptId: string) {
    this.empId = empId;
    this.empName = empName;
    this.password = password;
    this.role = role;
    this.deptId = deptId;
  }
}
