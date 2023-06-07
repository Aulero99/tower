import { dbContext } from "../db/DbContext"

class TicketsService{
    async getTicketsByTowerEventId(towerEventId) {
        const tickets = await dbContext.Tickets.find()
        tickets.populate('account event')
    }

    async findTowerEventById(towerEventId) {
        const towerEvent = await dbContext.TowerEvents.findById(towerEventId).populate('creator ticketCount')
        if(!towerEvent){
            throw new BadRequest(`Event id:${towerEvent} not found.`)
        }
        return towerEvent
    }


}

export const ticketsService = new TicketsService()