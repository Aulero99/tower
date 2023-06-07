import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const CommentSchema = new Schema (
    { creatorId: {type: ObjectId, required: true, ref: 'Account'} },
    
)