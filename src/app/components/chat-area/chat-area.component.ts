import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ChatMessage } from 'src/app/models/chat';
import { AuthService } from 'src/app/services/auth.service';
import { ChatDatePipe } from 'src/app/pipes/chat-date.pipe';
import { ChatService } from 'src/app/services/chat.service';



@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.scss']
})
export class ChatAreaComponent implements OnInit, OnDestroy{

  @Input() messagesObs!:Observable<string>;
  @Input() currentChatId: string = "";
  @Input() currentChatUser: string = "";
  @Output() onSendMessage = new EventEmitter<string>();
  @ViewChild('chatMessagesContainer') chatMessagesContainer!: ElementRef;

  messagesSubscription:Subscription = new Subscription();
  messages:ChatMessage[] = [];
  
  private chatMessagesSubscription!: Subscription;

  constructor(private auth:AuthService, private chatService:ChatService){}
  ngOnDestroy(): void {
    this.messagesSubscription?.unsubscribe();
    this.chatMessagesSubscription?.unsubscribe();
    this.messages = [];
  }

  ngOnInit(): void {       
      this.messagesSubscription = this.messagesObs.subscribe((chatId) => this.getChatMessages(chatId));
  }


  get currentUser() { return this.auth.usuarioLogueado?.username };

  getChatMessages(chatId:string){           
    if(chatId !== "")
    {
      this.chatMessagesSubscription = this.chatService.getChatMessages(chatId).subscribe(data => {              
         this.messages = data
         this.scrollToBottom()
        });
    }
   }

   scrollToBottom() {    
    if (this.chatMessagesContainer) {       
      const element = this.chatMessagesContainer.nativeElement;
      element.scrollTop = element.scrollHeight;
    }
  }
}
