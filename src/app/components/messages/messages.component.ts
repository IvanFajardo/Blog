import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  @Input() message: string;
  @Input() messageCount: number;


  constructor() { }

  ngOnInit() {
    console.log(this.message);
  }

  close() {
    this.messageCount = null;
  }

  public sendMessage(message) {
    this.message = message;
  }

}
