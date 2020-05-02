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
  num: number;
  constructor( private chat: ChatService) { }

  ngOnInit(): void {
    this.messages=this.chat.conversation.asObservable().pipe(
      scan((acc,val)=>acc.concat(val))
    );
    this.num=0
  }

  getStyle(){
    if((this.num++)%2){
      return {
        'color': 'red',
        'background-color': '',
        'font-size': '20px',
        'border-radius':'25px',
        'width':'500px',
        'text-align':'left',
        'padding-top':'20px',
        'padding-left':'30px',
        'padding-bottom':'20px',
        'font-weight': 700,
        'border':'black',
        'border-style': 'double'
      }
    }
    else{
      return {
        'color': 'blue',
        'background-color': '',
        'border-radius':'25px',
        'width':'500px',
        'text-align':'right',
        'padding-right':'30px',
        'padding-top':'20px',
        'padding-bottom':'20px',
        'font-weight': 700,
        'border':'black',
        'border-style': 'double'
      }
    }
  }

  sendMessage(){
    this.chat.converse(this.formValue)
    this.formValue='';
  }
}
