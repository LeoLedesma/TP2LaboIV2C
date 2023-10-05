import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { ConversationListComponent } from './conversation-list/conversation-list.component';
import { ChatAreaComponent } from './chat-area/chat-area.component';
import { ChatDatePipe, ChatMessageList} from '../pipes/chat-date.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    ChatBoxComponent,
    ConversationListComponent,
    ChatAreaComponent,
    ChatDatePipe,
    SearchComponent,
    ChatMessageList
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    ChatBoxComponent,
    ConversationListComponent,
    ChatAreaComponent
  ]
})
export class ComponentsModule { }
