import { UsersService } from "../repository";

export default class UserController {

    constructor() {
        this.userService = new UsersService();
    }

    async getAllUsers() {
        return await this.userService.getAll();
    }

    async getUserByID(uid) {
        return await this.userService.getByID(uid);
    }

    async createUser(user) {
        const {first_name, last_name, email} = user;

        if (!first_name || !last_name || !email) {
            throw new Error('Error al crear el usuario');
        }

        return await this.userService.create({first_name, last_name, email});
    }
}