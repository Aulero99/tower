import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const CommentSchema = new Schema (
    { 
        creatorId: {type: ObjectId, required: true, ref: 'Account'},
        eventId: {type:ObjectId, required: true, ref: 'TowerEvent'},
        body: {type:String, required:true, maxlength: 500, minlength: 2} 
    },
    {timestamps:true, toJSON:{virtuals:true}}
    
)
CommentSchema.virtual('creator',{
    localField:'creatorId',
    foreignField:'_id',
    ref:'Account',
    justOne:true
})
CommentSchema.virtual('event',{
    localField:'eventId',
    foreignField:'_id',
    ref:'TowerEvent',
    justOne:true
})