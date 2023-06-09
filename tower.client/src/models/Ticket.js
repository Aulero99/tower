export class Ticket{
    constructor(data){
        this.accountId = data.accountId
        this.holderName = data.profile.name
        this.holderImg = data.profile.picture
        this.eventId = data.eventId
        this.eventName = data.event.name
        this.eventDate = data.event.startDate
        this.eventLocation = data.event.location
        this.isCanceled = data.event.isCanceled
    }
}