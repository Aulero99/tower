import { AppState } from "../AppState.js"
import { TowerEvent } from "../models/TowerEvent.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class TowerEventsService{
    async getTowerEventsFromApi(){
        const res = await api.get('api/events')
        AppState.towerEvents = res.data.map( t => new TowerEvent(t) )
        // logger.log(AppState.towerEvents)
        return res.data
    }
    async getActiveEventFromApi(route){
        const res = await api.get(`api/events/${route}`)
        AppState.activeTowerEvent = new TowerEvent(res.data)
        // logger.log('The active event is:',AppState.activeTowerEvent)
        return res.data
    }
    async newEvent(formData){
        const newEvent = formData
        newEvent.creatorId = AppState.user.id
        const res = await api.post('api/events', formData)
        AppState.towerEvents.push(new TowerEvent(res.data))
        return res.data
    }
    async cancelEvent(id){
        const res = await api.delete(`api/events/${id}`)
        // logger.log(res.data)
        AppState.activeTowerEvent = new TowerEvent(res.data)

    }
}

export const towerEventsService = new TowerEventsService()