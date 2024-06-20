import { MessagesService } from "../repository";

export default class MessageController {

    constructor() {
        this.messageService = new MessagesService();
    }

    async add(user, message) {
        return await this.messageService.addMessage(user, message);
    }

    async getAll() {
        return await this.messageService.getMessages();
    }
    
}

