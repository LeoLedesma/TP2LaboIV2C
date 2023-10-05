import { Timestamp } from '@angular/fire/firestore';
import { ICollection } from "./i-collection";

export class ChatMessage implements ICollection {
    constructor(
        public id: string,
        public chatId:string,
        public message: string,
        public userFrom: string,
        public userTo: string,
        public date: Timestamp
    ) { }
}

export class ChatList implements ICollection {
    constructor(
        public id: string,
        public user1: string,
        public user2: string,
        public lastMessage: string,
        public lastMessage_date: Timestamp) { }

}

export class Chat implements ICollection {

    public id: string;
    public lastMessage: string;
    public userFrom: string;
    public userTo: string;
    public date: Timestamp
    constructor(private _chatInfo: ChatMessage, public chatList: ChatList) {
        this.id = _chatInfo.id;
        this.lastMessage = _chatInfo.message;
        this.userFrom = _chatInfo.userFrom;
        this.userTo = _chatInfo.userTo;
        this.date = _chatInfo.date;
    }

}