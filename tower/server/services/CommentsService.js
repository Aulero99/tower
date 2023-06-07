import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"

class CommentsService{
    async deleteCommentByCommentId(commentId, userId) {
        const comment = await dbContext.Comments.findById(commentId)
        if(!comment){
            throw new BadRequest(`Comment id:${commentId} not found.`)
        }
        if(userId != comment.creatorId){
            throw new Forbidden(`user id:${userId} does not have permission to delete this ticket.`)
        }
        await comment.remove()
        return comment
    }
    async findCommentsByEventId(eventId) {
        const comments = await dbContext.Comments.find({eventId}).populate('creator event')
        return comments
    }
    async postNewComment(body) {
        const newComment = await dbContext.Comments.create(body)
        await newComment.populate('creator event')
        return newComment
    }

}

export const commentsService = new CommentsService()