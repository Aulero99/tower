import { ticketsService } from "../services/TicketsService";
import BaseController from "../utils/BaseController";
import { Auth0Provider } from "@bcwdev/auth0provider";

export class TicketsController extends BaseController{
    constructor(){
        super('api/tickets')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.postTicket)
            .delete('/:ticketId', this.deleteTicketById)
    }
    async deleteTicketById(req, res, next) {
        try {
            const userId = req.userInfo.id
            const ticketId = req.params.ticketId
            const deletedTicket = await ticketsService.deleteTicketById(ticketId, userId)
            return res.send(deletedTicket) 
        } catch (error) {
            next(error)
        }
    }
    async postTicket(req, res, next) {
        try {
            req.body.accountId = req.userInfo.id
            const data = req.body
            const newTicket = await ticketsService.postTicket(data)
            return res.send(newTicket)
        } catch (error) {
            next(error)
        }
    }
}