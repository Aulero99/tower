import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class TowerEventsService{
    async cancelEvent(towerEventId, userId) {
        const towerEvent = await this.findTowerEventById(towerEventId)
        if(towerEvent.creatorId != userId){
            throw new Forbidden(`user ${userId} is not permitted to edit this event.`)
        }
        towerEvent.isCanceled = true
        await towerEvent.save()
        return towerEvent
    }
    async editEvent(towerEventId, userId, update) {
        const towerEvent = await this.findTowerEventById(towerEventId)
        if(towerEvent.isCanceled){
            throw new BadRequest(`event id:${towerEvent.id} is currently canceled and cannot be edited.`)
        }
        
        if(towerEvent.creatorId != userId){
            throw new Forbidden(`user ${userId} is not permitted to edit this event.`)
        }

        towerEvent.name = update.name || towerEvent.name
        towerEvent.description = update.description || towerEvent.description
        towerEvent.coverImg = update.coverImg || towerEvent.coverImg
        towerEvent.location = update.location || towerEvent.location
        towerEvent.capacity = update.capacity || towerEvent.capacity
        towerEvent.startDate = update.startDate || towerEvent.startDate
        towerEvent.type = update.type || towerEvent.type

        await towerEvent.save()
        return towerEvent
    }
    async findTowerEventById(towerEventId) {
        const towerEvent = await dbContext.TowerEvents.findById(towerEventId).populate('creator ticketCount')
        if(!towerEvent){
            throw new BadRequest(`Event id:${towerEvent} not found.`)
        }
        return towerEvent
    }
    async postTowerEvent(data) {
        const towerEvent = await dbContext.TowerEvents.create(data)
        await towerEvent.populate('creator ticketCount')
        return towerEvent
    }
    async findAllTowerEvents(data) {
        const towerEvents = await dbContext.TowerEvents.find(data).populate('creator ticketCount')
        return towerEvents
    }

}

export const towerEventsService = new TowerEventsService()