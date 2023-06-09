import { AppState } from "../AppState"
import { Comment } from "../models/Comment"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class CommentsService{
    async getCommentsByEventId(route){
        // logger.log(route)
        const res = await api.get(`api/events/${route}/comments`)
        AppState.comments = res.data.map(c=>new Comment(c))
        logger.log(AppState.comments)
    }
}

export const commentsService = new CommentsService()