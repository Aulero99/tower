import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const TowerEventSchema = new Schema(
    {
        creatorId: {type: ObjectId, required: true, ref: 'Account'},
        name: {type:String, required:true, maxlength: 50, minlength: 2},
        description: {type:String, required:true, maxlength: 1500, minlength: 3 },
        coverImg: {type:String, required:false, maxlength: 500, default:'https://wallpapercave.com/wp/wp7126218.jpg'},
        location: {type:String, required:true, maxlength: 100, minlength: 2},
        capacity: {type:Number, required:true, min: 1, max:200000},
        startDate: {type:Date, required:true},
        isCanceled: {type:Boolean, default:false},
        type: {type:String, required:true, enum:[
            'concert',
            'convention',
            'sport',
            'digital'
        ]}
    }, 
    {timestamps:true, toJSON:{virtuals:true}}
)

TowerEventSchema.virtual('creator',{
    localField:'creatorId',
    foreignField:'_id',
    ref:'Account',
    justOne:true
})

TowerEventSchema.virtual('ticketCount',{
    localField:'_id',
    foreignField:'eventId',
    ref:'Ticket',
    justOne: false,
    count: true
})