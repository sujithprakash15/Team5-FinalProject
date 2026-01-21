export class TicketType {

  public ticketTypeId: string;
  public typeName: string;
  public description: string;
  public slaId: string;
  public deptId: string;

  constructor(
    ticketTypeId: string,
    typeName: string,
    description: string,
    slaId: string,
    deptId: string
  ) {
    this.ticketTypeId = ticketTypeId;
    this.typeName = typeName;
    this.description = description;
    this.slaId = slaId;
    this.deptId = deptId;
  }
}
