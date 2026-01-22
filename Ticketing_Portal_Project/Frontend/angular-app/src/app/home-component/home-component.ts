import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../auth-service';
import { NavbarComponent } from "../navbar-component/navbar-component";
import { TicketService } from '../ticket-service';
import { EmployeeService } from '../employee-service';
import { TickettypeService } from '../tickettype-service';
import { DepartmentService } from '../department-service';

@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './home-component.html',
  styleUrls: ['./home-component.css']
})
export class HomeComponent implements OnInit {
  totalTickets: number = 0;
  totalEmployees: number = 0;
  totalTicketTypes: number = 0;
  totalDepartments: number = 0;
  recentTickets: any[] = [];

  constructor(
    private ticketService: TicketService,
    private employeeService: EmployeeService,
    private ticketTypeService: TickettypeService,
    private departmentService: DepartmentService
  ) {}

  ngOnInit(): void {
    this.loadStats();
    this.loadRecentTickets();
  }

  loadStats(): void {
    // Load ticket count
    this.ticketService.getAllTickets().subscribe({
      next: (tickets) => this.totalTickets = tickets.length,
      error: (err) => console.error('Error loading tickets:', err)
    });

    // Load employee count
    this.employeeService.getAllEmployees().subscribe({
      next: (employees) => this.totalEmployees = employees.length,
      error: (err) => console.error('Error loading employees:', err)
    });

    // Load ticket type count
    this.ticketTypeService.getAllTicketTypes().subscribe({
      next: (types) => this.totalTicketTypes = types.length,
      error: (err) => console.error('Error loading ticket types:', err)
    });

    // Load department count
    this.departmentService.getAllDepartments().subscribe({
      next: (depts) => this.totalDepartments = depts.length,
      error: (err) => console.error('Error loading departments:', err)
    });
  }

  loadRecentTickets(): void {
    this.ticketService.getAllTickets().subscribe({
      next: (tickets) => {
        // Sort by date and get recent 6 tickets
        this.recentTickets = tickets
          .sort((a: any, b: any) => 
            new Date(b.ticketCreatedDate).getTime() - new Date(a.ticketCreatedDate).getTime()
          )
          .slice(0, 6);
      },
      error: (err) => console.error('Error loading recent tickets:', err)
    });
  }
}