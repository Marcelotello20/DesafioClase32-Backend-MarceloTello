import { UsersService } from "../repository";

export default class UserController {

    constructor() {
        this.userService = new UsersService();
    }

    async getAll() {
        return await this.userService.getUsers();
    }

    async getById(uid) {
        return await this.userService.getUserById(uid);
    }

    async create(user) {
        const {first_name, last_name, email} = user;

        if (!first_name || !last_name || !email) {
            throw new Error('Error al crear el usuario');
        }

        return await this.userService.createUser({first_name, last_name, email});
    }
}