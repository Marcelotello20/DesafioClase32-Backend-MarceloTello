import { MessagesService } from "../repository";

export default class MessageController {

    constructor() {
        this.messageService = new MessagesService();
    }

    async addMessage(user, message) {
        return await this.messageService.add(user, message);
    }

    async getAllMessages() {
        return await this.messageService.getAll();
    }
    
}

