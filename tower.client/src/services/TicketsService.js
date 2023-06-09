import { AppState } from "../AppState"
import { Ticket } from "../models/Ticket"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TicketsService{
    async getTicketsByEventId(route){
        const res = await api.get(`api/events/${route}/tickets`)
        // logger.log(res.data)
        AppState.tickets = res.data.map(t=> new Ticket(t))
        logger.log('tickets', AppState.tickets)
    }
}
export const ticketsService = new TicketsService()