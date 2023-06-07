import { commentsService } from "../services/CommentsService";
import { ticketsService } from "../services/TicketsService";
import { towerEventsService } from "../services/TowerEventsService";
import BaseController from "../utils/BaseController";
import { Auth0Provider } from "@bcwdev/auth0provider";

export class TowerEventsController extends BaseController{
    constructor(){
        super('api/events')
        this.router
            .get('',this.findAllTowerEvents)
            .get('/:towerEventId',this.findTowerEventById)
            .get('/:towerEventId/tickets', this.findTicketsByTowerEventId)
            .get('/:towerEventId/comments', this.findCommentsByEventId)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.postTowerEvent)
            .put('/:towerEventId', this.editEvent)
            .delete('/:towerEventId', this.cancelEvent)
    }
    async findCommentsByEventId(req, res, next) {
        try {
            const towerEventId = req.params.towerEventId
            const comments = await commentsService.findCommentsByEventId(towerEventId)
            return res.send(comments) 
        } catch (error) {
            next(error)
        }
    }
    async findTicketsByTowerEventId(req, res, next) {
        try {
            const towerEventId = req.params.towerEventId
            const tickets = await ticketsService.getTicketsByTowerEventId(towerEventId)
            return res.send(tickets) 
        } catch (error) {
            next(error)
        }
    }
    async cancelEvent(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const userId = req.body.creatorId
            const towerEventId = req.params.towerEventId
            const towerEvent = await towerEventsService.cancelEvent(towerEventId, userId)
            return res.send(towerEvent)
        } catch (error) {
            next(error)
        }
    }
    async editEvent(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const userId = req.body.creatorId
            const towerEventId = req.params.towerEventId
            const update = req.body
            const towerEvent = await towerEventsService.editEvent(towerEventId, userId, update)
            return res.send(towerEvent)
        } catch (error) {
            next(error)
        }
    }
    async findTowerEventById(req, res, next) {
        try {
            const towerEventId = req.params.towerEventId
            const towerEvent = await towerEventsService.findTowerEventById(towerEventId)
            return res.send(towerEvent)
        } catch (error) {
            next(error)
        }
    }
    async postTowerEvent(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const towerEvent = await towerEventsService.postTowerEvent(req.body)
            return res.send(towerEvent)
        } catch (error) {
            next(error)
        }
    }
    async findAllTowerEvents(req, res, next) {
        try {
            const towerEvent = await towerEventsService.findAllTowerEvents(req.body)
            return res.send(towerEvent) 
        } catch (error) {
            next(error)
        }
    }
}