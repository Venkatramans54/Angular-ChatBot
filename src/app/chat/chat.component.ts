import { Component, OnInit } from '@angular/core';
import { ChatService, Message } from '../chat.service';
import {Observable} from 'rxjs'
import {scan} from 'rxjs/operators'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: Observable<Message[]>
  formValue:string

  constructor( private chat: ChatService) { }

  ngOnInit(): void {
    this.messages=this.chat.conversation.asObservable().pipe(
      scan((acc,val)=>acc.concat(val))
    );
  }

  sendMessage(){
    this.chat.converse(this.formValue)
    this.formValue='';
  }
}
