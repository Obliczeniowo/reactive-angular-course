import { Component, OnInit } from '@angular/core';
import { AuthStorage } from './storages/auth.storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(public auth: AuthStorage) {}

  ngOnInit() {}

  logout() {
    this.auth.logout();
  }
}
