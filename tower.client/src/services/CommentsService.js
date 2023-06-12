import { AppState } from "../AppState"
import { Comment } from "../models/Comment"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class CommentsService{
    async getCommentsByEventId(route){
        // logger.log(route)
        const res = await api.get(`api/events/${route}/comments`)
        AppState.comments = res.data.map(c=>new Comment(c))
        // logger.log(AppState.comments)
    }
    async newComment(formData){
        const newComment = {
            creatorId: AppState.user.id,
            eventId: AppState.activeTowerEvent.id,
            body: formData.body
        }
        const res = await api.post('api/comments', newComment)
        AppState.comments.push(new Comment(res.data))
    }
    async deleteComment(id){
        const res = await api.delete(`api/comments/${id}`)
        // logger.log('the deleted comment is:', res.data)
        AppState.comments = AppState.comments.filter(c=> c.id != id)
    }
}

export const commentsService = new CommentsService()