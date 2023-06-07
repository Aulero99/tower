import BaseController from "../utils/BaseController";
import { Auth0Provider } from "@bcwdev/auth0provider";

export class TicketsController extends BaseController{
    constructor(){
        super('api/tickets')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .get('', this.getTicketsByUserId)
            .post('', this.postTicket)
            .delete('/:ticketId', this.deleteTicketById)
    }
    deleteTicketById(req, res, next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }
    postTicket(req, res, next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }
    getTicketsByUserId(req, res, next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }
    getTicketsByTowerEventId(req, res, next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }
}