import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  Firestore,
  Timestamp,  
  collection,  
  doc,  
  getDocs,  
  onSnapshot,
  orderBy,
  query,
  setDoc,
  where,
  or, 
  updateDoc
} from '@angular/fire/firestore';
import { ChatList, ChatMessage } from '../models/chat';
import { UsuariosService } from './usuarios-service.service';
import { AuthService } from './auth.service';
import { CollectionsService } from './collections.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  colChatMessages: string = "chatMessages";
  colChat:string = "chats";
  constructor(private firestore: Firestore, private userService:UsuariosService,private auth:AuthService,private collections:CollectionsService) {}

  createChat(user2: string): Promise<string> {
    let user1 = this.auth.usuarioLogueado?.username;
    return new Promise<string>((resolve, reject) => {
      const chatRef = collection(this.firestore, 'chats');
      const queryRef = query(
        chatRef,
        where('user1', 'in', [user1, user2]),
        where('user2', 'in', [user1, user2])
      );

      getDocs(queryRef)
        .then(querySnapshot => {
          if (querySnapshot.empty) {
            const chatData = new ChatList("",user1!,user2,"Envia el primer mensaje!",Timestamp.now())             

            this.collections.addOne(this.colChat,chatData)
              .then(docRef => resolve(docRef.id))
              .catch(error => reject(error));
          } else {
            reject(new Error('La conversación ya existe.'));
          }
        })
        .catch(error => reject(error));
    });
  }

  updateLastMessage(chatId: string, message: string): Promise<void> {
    const chatRef = doc(this.firestore, 'chats', chatId);
    
    return updateDoc(chatRef, { "lastMessage_date":Timestamp.now(),"lastMessage": message});
  }

  sendMessage(chatId: string, userTo: string, message: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.updateLastMessage(chatId, message)
        .then(() => {          
          const chatMessageData: ChatMessage = { id:"",chatId:chatId, userTo, userFrom: this.auth.usuarioLogueado!.username, message:message, date: Timestamp.now() };

          this.collections.addOne(this.colChatMessages,chatMessageData)
            .then(() => resolve())
            .catch(error => reject(error));
        })
        .catch(error => reject(error));
    });
  }

  getChatMessages(chatId: string): Observable<ChatMessage[]> {
    const chatMessagesRef = collection(this.firestore, 'chatMessages');
    const queryRef = query(chatMessagesRef, where('chatId', '==', chatId), orderBy('date'));
  
    return new Observable(subscriber => {
      const unsubscribe = onSnapshot(queryRef,querySnapshot => {
        const chatMessages: ChatMessage[] = [];

        querySnapshot.forEach(doc => {
          const chatMessage = { ...doc.data() as ChatMessage };
          chatMessages.push(chatMessage);
        });

        subscriber.next(chatMessages);
      });

      // Cleanup the listener when unsubscribed
      return () => unsubscribe();
    });
  }


  getChatList(): Observable<ChatList[]> {
    const chatRef = collection(this.firestore, 'chats');
    const currentUser = this.auth.usuarioLogueado?.username
  
    const queryRef = query(chatRef, or(where('user2', '==', currentUser),where('user1', '==', currentUser)));   

    return new Observable(subscriber => {
      const unsubscribe = onSnapshot(queryRef,querySnapshot => {
        const chatList: ChatList[] = [];

        querySnapshot.forEach(doc => {
          
          const chatListObj = { id: doc.id, ...doc.data() } as ChatList;
          chatList.push(chatListObj);          
        });

        subscriber.next(chatList);
      });

      // Cleanup the listener when unsubscribed
      return () => unsubscribe();
    });
  }
  
  

  //Busca una lista donde search sea una parte del user1 o del user2
  searchChatList(search: string): Observable<any[]> {
    const chatRef = collection(this.firestore, 'chats');
    const currentUser = this.auth.usuarioLogueado?.username
  
    const queryUser1 = query(chatRef, where('user1', '==', currentUser), where('user2', '>=', search), where('user2', '<=', search + '\uf8ff'));
    const queryUser2 = query(chatRef, where('user2', '==', currentUser), where('user1', '>=', search), where('user1', '<=', search + '\uf8ff'));
  
    return new Observable<any[]>(subscriber => {
      Promise.all([getDocs(queryUser1), getDocs(queryUser2)])
        .then(([querySnapshotUser1, querySnapshotUser2]) => {
          const chatList: any[] = [];
  
          querySnapshotUser1.forEach(doc => {
            const chat = { id: doc.id, ...doc.data() };
            chatList.push(chat);
          });
  
          querySnapshotUser2.forEach(doc => {
            const chat = { id: doc.id, ...doc.data() };
            // Evitar duplicados en la lista
            if (!chatList.find(c => c.id === chat.id)) {
              chatList.push(chat);
            }
          });
  
          subscriber.next(chatList);
          subscriber.complete();
        })
        .catch(error => {
          subscriber.error(error);
        });
    });
  }
  
}
