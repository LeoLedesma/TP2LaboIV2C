import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatList } from 'src/app/models/chat';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { UsuariosService } from 'src/app/services/usuarios-service.service';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.scss']
})
export class ConversationListComponent {
@Output() onChatListClick = new EventEmitter<{chatId: string, user: string}>();
@Input() currentChatId: string = '';
  searchInput: string = '';
  userList: string[] = [];
  conversationList: ChatList[] = [];
  private chatListSuscription!: Subscription
  currentChat: string = ''
  newChatOp: boolean = false;

  constructor(private auth: AuthService, private chatService: ChatService, private usuariosService:UsuariosService/*private eventService: EventsService*/) { }
  ngOnInit(): void {    
    this.chatListSuscription = this.chatService.getChatList().subscribe(chatList => {                  
      this.conversationList = chatList.sort((a,b) => a.lastMessage_date > b.lastMessage_date ? -1 : 1);
    })

    //this.eventService.onSendMessage.subscribe(a => this.reloadChatList());
  }

  ngOnDestroy(): void {
    this.chatListSuscription?.unsubscribe();

  }
  openChat(chatId: string) {
    let chatUser: string;
    this.conversationList.forEach(conv => {
      if (conv.id === chatId) {
        chatUser = conv.user1 === this.auth.usuarioLogueado?.username ? conv.user2 : conv.user1;
        this.onChatListClick.emit({ chatId: chatId, user: chatUser });
        this.searchInput = '';
      }
    })
  }

  reloadChatList(){
    this.chatListSuscription.unsubscribe();
    this.chatListSuscription = this.chatService.getChatList().subscribe(chatList => {
      this.conversationList = chatList.sort((a,b) => a.lastMessage_date > b.lastMessage_date ? -1 : 1);
    })
  }

  searchConversations(search: string) {
    this.searchInput = search;
    this.chatService.searchChatList(search).subscribe(chatList => this.conversationList = chatList).unsubscribe();
  }

  newChat(user: string) {
    this.chatService.createChat(user).then(chatId => {
      this.currentChat = chatId      
      this.reloadChatList()
      this.searchInput = '';
    })
      .catch(err => err);
  }

  searchUser(search: string) {
    this.userList = [];

    if (search === '') {
      this.userList = [];
      return;
    }
    this.usuariosService.searchUsers(search).then(users => {
      users.forEach(user => this.userList.push(user.username))
    })

  }

  showOtherUser(chat: ChatList) {
    if (chat.user1 === this.auth.usuarioLogueado?.username) {
      return chat.user2;
    }
    return chat.user1
  }

  openChatSearched(username: string) {    
    this.chatService.searchChatList(username).subscribe(chatList => {      
      let result = chatList.filter(chat => chat.user1 === username || chat.user2 === username)
      
      if (result.length > 0) {
        this.openChat(result[0].id)
      } else {
      
        this.newChat(username)
      }
    })
  }
}
