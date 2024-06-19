export default class ContactDTO {
    constructor (contact) {
        this.first_name = contact.first_name ?? 'Desconocido';
        this.last_name = contact.last_name ?? '';
        this.full_name = `${this.first_name} ${this.last_name}`;
        this.email = contact.email ?? 'Sin email' ;
    }
}