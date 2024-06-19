import ContactDTO from "../dao/DTOs/contact.dto.js";

export default class UserRepository {
    constructor (dao) {
        this.dao = dao;
    }

    async getUsers() {
        return await this.dao.getAll();
    }

    async getUserByID(uid) {
        return await this.dao.getById(uid);
    }

    async createContact(contact) {
        const newContact = new ContactDTO(contact);
        return await this.dao.create(newContact);
    }
}

