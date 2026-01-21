export class SLA {
  public slaId: string;
  public slaName: string;
  public priority: string;
  public responseTime: number;
  public resolutionHours: number;

  constructor(
    slaId: string,
    slaName: string,
    priority: string,
    responseTime: number,
    resolutionHours: number
  ) {
    this.slaId = slaId;
    this.slaName = slaName;
    this.priority = priority;
    this.responseTime = responseTime;
    this.resolutionHours = resolutionHours;
  }
}
