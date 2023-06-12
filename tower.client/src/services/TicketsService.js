import { AppState } from "../AppState"
import { Ticket } from "../models/Ticket"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TicketsService{
    async getTicketsByEventId(route){
        const res = await api.get(`api/events/${route}/tickets`)
        // logger.log(res.data)
        AppState.tickets = res.data.map(t=> new Ticket(t))
        // logger.log('tickets', AppState.tickets)
    }
    async getMyTicketsFromApi(){
        const res = await api.get(`account/tickets`)
        AppState.tickets = res.data.map(t=> new Ticket(t))
        // logger.log('tickets', AppState.tickets)
    }
    async deleteThisTicket(id){
        const res = await api.delete(`api/tickets/${id}`)
        AppState.tickets = AppState.tickets.filter(t=> t.id != id)
    }
    async postTicketForEvent(id){
        const post = {
            eventId:id,
            userId:AppState.user.id
        }
        const res = await api.post('api/tickets', post)
        AppState.tickets.push(new Ticket(res.data))
        // logger.log('tickets', AppState.tickets)
    }
}
export const ticketsService = new TicketsService()