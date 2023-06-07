import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"

class TicketsService{
    async deleteTicketById(ticketId, userId) {
        const ticket = await dbContext.Tickets.findById(ticketId)
        if(!ticket){
            throw new BadRequest(`Ticket id:${ticketId} not found.`)
        }
        if(userId != ticket.accountId){
            throw new Forbidden(`user id:${userId} does not have permission to delete this ticket.`)
        }
        await ticket.remove()
        return ticket
    }
    async postTicket(data) {
        const ticket = await dbContext.Tickets.create(data)
        await ticket.populate('profile event')
        return ticket
    }
    async getTicketsByTowerEventId(eventId) {
        const tickets = await dbContext.Tickets.find({eventId}).populate('profile event')
        return tickets
    }
    async getTicketsByUserId(accountId) {
        const tickets = await dbContext.Tickets.find({accountId}).populate('profile event')
        return tickets
    }
    async getTicketByTicketId(ticketId) {
        const ticket = await dbContext.Tickets.findById(ticketId)
        return ticket
    }

}

export const ticketsService = new TicketsService()