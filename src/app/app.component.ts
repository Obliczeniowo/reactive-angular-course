import { Component, OnInit } from '@angular/core';
import { MessagesService } from './services/messages.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(public messages: MessagesService) {}

  ngOnInit() {}

  logout() {}
}
