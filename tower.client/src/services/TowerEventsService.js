import { AppState } from "../AppState.js"
import { TowerEvent } from "../models/TowerEvent.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class TowerEventsService{
    async getTowerEventsFromApi(){
        const res = await api.get('api/events')
        AppState.towerEvents = res.data.map( t => new TowerEvent(t) )
        // logger.log(AppState.towerEvents)
    }
    async getActiveEventFromApi(route){
        const res = await api.get(`api/events/${route}`)
        AppState.activeTowerEvent = new TowerEvent(res.data)
        // logger.log(AppState.activeTowerEvent)
    }
}

export const towerEventsService = new TowerEventsService()