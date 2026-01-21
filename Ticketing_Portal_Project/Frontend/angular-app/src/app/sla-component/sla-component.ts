import { Component, inject } from '@angular/core';
import { SlaService } from '../sla-service';
import { SLA } from '../models/SLA';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sla-component',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './sla-component.html',
  styleUrl: './sla-component.css',
})
export class SlaComponent {

  slaSvc: SlaService = inject(SlaService);

  slas: SLA[];
  sla: SLA;
  errMsg: string;

  constructor() {
    this.slas = [];
    this.sla = new SLA('', '', '', 0, 0);
    this.errMsg = '';
    this.showAllSlas();
  }

  showAllSlas(): void {
    this.slaSvc.getAllSlas().subscribe({
      next: (response: SLA[]) => {
        this.slas = response;
        console.log(response);
        this.errMsg = '';
      },
      error: (err) => {
        this.errMsg = err.error;
        console.log(err);
      }
    });
  }

  addSla(): void {
    this.slaSvc.addSla(this.sla).subscribe({
      next: () => {
        alert('SLA added successfully');
        this.errMsg = '';
        this.newSla();
        this.showAllSlas();
      },
      error: (err) => {
        this.errMsg = err.error;
        console.log(err);
      }
    });
  }

  newSla(): void {
    this.sla = new SLA('', '', '', 0, 0);
  }

  getSla(): void {
    this.slaSvc.getSla(this.sla.slaId).subscribe({
      next: (response: SLA) => {
        this.sla = response;
        this.errMsg = '';
      },
      error: (err) => {
        this.errMsg = err.error;
        console.log(err);
      }
    });
  }

  updateSla(): void {
    this.slaSvc.updateSla(this.sla.slaId, this.sla).subscribe({
        next: (response: SLA) => {
          alert('SLA updated successfully');
          this.errMsg = '';
          this.showAllSlas();
        },
        error: (err) => {
          this.errMsg = err.error;
          console.log(err);
        }
      });
  }

  deleteSla(): void {
    this.slaSvc.deleteSla(this.sla.slaId).subscribe({
        next: () => {
          alert('SLA deleted successfully');
          this.errMsg = '';
          this.showAllSlas();
        },
        error: (err) => {
          this.errMsg = err.error;
          console.log(err);
        }
      });
  }
}
