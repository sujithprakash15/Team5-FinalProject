import { Component, inject, OnInit } from '@angular/core';
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
export class SlaComponent implements OnInit {
 
  slaSvc: SlaService = inject(SlaService);
 
  slas: SLA[] = [];
  sla: SLA = new SLA('', '', '', 0, 0);
  errMsg: string = '';
 
  ngOnInit() {
    this.loadSlas();
  }
 
  loadSlas() {
    this.slaSvc.getAllSlas().subscribe({
      next: (res) => {
        this.slas = res;
        this.errMsg = '';
      },
      error: (err) => {
        console.error('Error loading SLAs:', err);
        this.errMsg = 'Failed to load SLAs. Please try again.';
      }
    });
  }
 
  addSla() {
 
    this.errMsg = '';
 
    if (!this.sla.slaId?.trim()) {
      this.errMsg = 'SLA ID is required.';
      return;
    }
 
    if (this.sla.slaId.length > 10) {
      this.errMsg = 'SLA ID cannot exceed 10 characters.';
      return;
    }
 
    if (!this.sla.slaName?.trim()) {
      this.errMsg = 'SLA Name is required.';
      return;
    }
 
    if (!this.sla.priority?.trim()) {
      this.errMsg = 'Priority is required.';
      return;
    }
 
    if (this.sla.responseTime <= 0) {
      this.errMsg = 'Response time must be greater than 0.';
      return;
    }
 
    if (this.sla.resolutionHours <= 0) {
      this.errMsg = 'Resolution time must be greater than 0.';
      return;
    }
 
    if (this.sla.resolutionHours < this.sla.responseTime) {
      this.errMsg = 'Resolution time must be greater than response time.';
      return;
    }
 
    this.slaSvc.addSla(this.sla).subscribe({
      next: () => {
        alert('SLA added successfully');
        this.newSla();
        this.loadSlas();
      },
      error: (err) => {
        console.error('Error adding SLA:', err);
 
        if (err.status === 400) {
          if (err.error?.includes('PRIMARY KEY')) {
            this.errMsg = 'SLA ID already exists.';
          } else {
            this.errMsg = err.error || 'Invalid SLA data.';
          }
        }
        else if (err.status === 409) {
          this.errMsg = 'Duplicate SLA entry.';
        }
        else if (err.status === 500) {
          this.errMsg = 'Server error while adding SLA.';
        }
        else {
          this.errMsg = 'Failed to add SLA.';
        }
      }
    });
  }
 
  newSla() {
    this.sla = new SLA('', '', '', 0, 0);
    this.errMsg = '';
  }
 
  getSla() {
 
    this.errMsg = '';
 
    if (!this.sla.slaId?.trim()) {
      this.errMsg = 'Please enter SLA ID to search.';
      return;
    }
 
    this.slaSvc.getSla(this.sla.slaId).subscribe({
      next: (res) => {
        this.sla = res;
        this.errMsg = '';
      },
      error: (err) => {
        console.error('Error fetching SLA:', err);
        if (err.status === 404) {
          this.errMsg = `SLA ${this.sla.slaId} not found.`;
        } else {
          this.errMsg = err.error || 'Error fetching SLA.';
        }
      }
    });
  }
 
  updateSla() {
 
    this.errMsg = '';
 
    if (!this.sla.slaId?.trim()) {
      this.errMsg = 'SLA ID is required for update.';
      return;
    }
 
    if (this.sla.responseTime <= 0 || this.sla.resolutionHours <= 0) {
      this.errMsg = 'Response and Resolution time must be greater than 0.';
      return;
    }
 
    this.slaSvc.updateSla(this.sla.slaId, this.sla).subscribe({
      next: () => {
        alert('SLA updated successfully');
        this.loadSlas();
      },
      error: (err) => {
        console.error('Error updating SLA:', err);
        if (err.status === 404) {
          this.errMsg = `SLA ${this.sla.slaId} not found.`;
        } else {
          this.errMsg = err.error || 'Error updating SLA.';
        }
      }
    });
  }
 
  deleteSla() {
 
    this.errMsg = '';
 
    if (!this.sla.slaId?.trim()) {
      this.errMsg = 'Please enter SLA ID to delete.';
      return;
    }
 
    if (!confirm(`Are you sure you want to delete SLA ${this.sla.slaId}?`)) {
      return;
    }
 
    this.slaSvc.deleteSla(this.sla.slaId).subscribe({
      next: () => {
        alert('SLA deleted successfully');
        this.newSla();
        this.loadSlas();
      },
      error: (err) => {
        console.error('Error deleting SLA:', err);
        if (err.status === 404) {
          this.errMsg = `SLA ${this.sla.slaId} not found.`;
        } else {
          this.errMsg = err.error || 'Error deleting SLA.';
        }
      }
    });
  }
}