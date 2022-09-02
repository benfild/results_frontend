import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit, OnDestroy {

  username = '';
  subscriptions: Subscription[] = []

  constructor(
    private auth: AuthService) { }

  ngOnInit(): void {
    const {username} = JSON.parse(<string>localStorage.getItem('customer')) ?
      JSON.parse(<string>localStorage.getItem('customer')) : ' ';
    this.username = username;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }
  logout(): void{
    this.auth.logout();
  }
}
