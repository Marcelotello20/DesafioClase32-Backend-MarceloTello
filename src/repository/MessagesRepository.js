import ContactDTO from "../dao/DTOs/contact.dto.js";

export default class MessageRepository {
    constructor (dao) {
        this.dao = dao;
    }
    
    async addMessage( user, message) {
        return await this.dao.add( user, message);
    }

    async getMessages() {
        return await this.dao.getAll();
    }
}

