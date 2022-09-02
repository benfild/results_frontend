import {Component, OnDestroy, OnInit} from '@angular/core';
import {map} from 'rxjs/operators';
import {Breakpoints, BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  cardLayout = this.breakpointObserver.observe([
    Breakpoints.XSmall,
    Breakpoints.Small,
    Breakpoints.Medium,
    Breakpoints.Large,
    Breakpoints.XLarge
  ]).pipe(
    map((state: BreakpointState) => {
      if (state.breakpoints[Breakpoints.XSmall]) {
        return {
          columns: 1,
          miniCard: {cols: 1, rows: 1},
          chart: {cols: 1, rows: 2},
          table: {cols: 1, rows: 4}
        };
      }
      if (state.breakpoints[Breakpoints.Small]) {
        return {
          columns: 2,
          miniCard: {cols: 1, rows: 1},
          chart: {cols: 1, rows: 2},
          table: {cols: 2, rows: 4}
        };
      }
      if (state.breakpoints[Breakpoints.Medium]) {
        return {
          columns: 2,
          miniCard: {cols: 1, rows: 1},
          chart: {cols: 1, rows: 2},
          table: {cols: 2, rows: 4}
        };
      }
      if (state.breakpoints[Breakpoints.Large]) {
        return {
          columns: 4,
          miniCard: {cols: 1, rows: 1},
          chart: {cols: 2, rows: 2},
          table: {cols: 4, rows: 4}
        };
      }
      if (state.breakpoints[Breakpoints.XLarge]) {
        return {
          columns: 4,
          miniCard: {cols: 1, rows: 1},
          chart: {cols: 2, rows: 2},
          table: {cols: 4, rows: 4}
        };
      }
      return
    })
  );
  transfers = 0;
  loadingState = false;
  
  subscriptions: Subscription[] = [];
  constructor(private breakpointObserver: BreakpointObserver) {}
  ngOnInit(): void {
        this.loadingState = true;};
    
        agency = 12345;
        primary = 2424343;
        totalBalance = 2345565;
 
}
