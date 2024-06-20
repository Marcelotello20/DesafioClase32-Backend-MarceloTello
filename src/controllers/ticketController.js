import { TicketsService } from "../repository";


export default class TicketController {

    constructor() {
        this.ticketService = new TicketsService();
    }

    async add(ticket) {
        const { code, purchase_datetime, amount, purchaser } = ticket;

        if (!code || !purchase_datetime || !amount || !purchaser) {
            throw new Error('Error al crear el ticket, falta información');
        }
        
        return await this.ticketService.createTicket({ code, purchase_datetime, amount, purchaser });
    }

    async getAll() {
        return await this.ticketService.getTickets();
    }

    async getByID(tid) {
        return await this.ticketService.getTicketById(tid);
    }

    async update(tid,update) {
        if (!tid || !update ) {
            throw new Error('Error al actualizar el Ticketo, falta información');
        }
        return await this.ticketService.updateTicket(tid,update);
    }
    
    async delete(tid) {
        return await this.ticketService.deleteTicket(tid);
    }

}