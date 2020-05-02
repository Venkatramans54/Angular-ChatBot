import { Injectable } from '@angular/core';
import {environment} from '../environments/environment'
import {ApiAiClient} from 'api-ai-javascript/es6/ApiAiClient'
import {BehaviorSubject} from 'rxjs'

export class Message{
  constructor(public content:string, public sentby:string) {}
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  token=environment.dialogflow.angularBot
  client=new ApiAiClient({
    accessToken: this.token
  })

  conversation=new BehaviorSubject<Message[]>([]);
  constructor() { }

  update(msg:Message){
    this.conversation.next([msg])
  }

  converse(msg:string){
    const userMsg=new Message(msg, 'user');
    this.update(userMsg);

    return this.client.textRequest(msg)
      .then(res=>{
        const speech=res.result.fulfillment.speech;
        const botMsg=new Message(speech,'bot');
        this.update(botMsg)
      })
  }

}
