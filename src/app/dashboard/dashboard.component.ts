import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WashService } from '../services/wash.service';
import { WashSession } from '../models/wash-session.model';
import { AsyncPipe, NgFor, DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AsyncPipe, NgFor, DatePipe],
  templateUrl: './dashboard.component.html',
  styles: [] // Remove reference to non-existent CSS file
})
export class DashboardComponent implements OnInit {
  washSessions$: Observable<WashSession[]>;
  totalWashes: number = 0;

  constructor(private washService: WashService) {
    this.washSessions$ = this.washService.getWashSessions();
  }

  ngOnInit() {
    this.calculateTotalWashes();
  }

  logWashSession() {
    const newSession: WashSession = {
      date: new Date(),
      status: 'completed'
    };
    this.washService.logWashSession(newSession);
  }

  calculateTotalWashes() {
    this.washSessions$.subscribe(sessions => {
      const currentDate = new Date();
      const startOfCycle = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      this.totalWashes = sessions.filter(session => 
        session.status === 'completed' && session.date >= startOfCycle
      ).length;
    });
  }
}