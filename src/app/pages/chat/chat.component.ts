import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ChatMessage } from 'src/app/models/chat';
import { ChatService } from 'src/app/services/chat.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  messages: ChatMessage[] = [];
  currentChatUser: string = '';
  currentChatId: string = '';
  
  eventsSubject: Subject<string> = new Subject<string>();

  ngOnInit(): void {
    if(this.auth.usuarioLogueado==undefined){      
      this.route.navigate(['../home']);
    }
  } 
  

  constructor(private chatService: ChatService,private auth:AuthService,private route: Router) { }


  sendMessage(message: string | any) {
    this.chatService.sendMessage(this.currentChatId, this.currentChatUser, message)
  }
  chatListClickHandler(chat: { chatId: string, user: string }) {
    this.currentChatId = chat.chatId;
    this.currentChatUser = chat.user;
        
    this.eventsSubject.next(this.currentChatId);
  }

}