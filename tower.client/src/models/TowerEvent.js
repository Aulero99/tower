export class TowerEvent{
    constructor(data){
        this.id = data.id
        this.creatorId = data.creatorId
        this.creatorName = data.creator.name
        this.creatorPicture = data.creator.picture
        this.name = data.name || 'Untitled Event'
        this.description = data.description || 'No Description'
        this.coverImg = data.coverImg || ''
        this.location = data.location || ''
        this.capacity = data.capacity || 5
        this.ticketCount = data.ticketCount || 2
        this.type = data.type
        this.startDate = new Date(data.startDate).toLocaleDateString('en-US')
        this.startTime = new Date(data.startDate).toLocaleTimeString('en-US', {timeStyle: 'short'})
        this.createdAt = new Date(data.createdAt).toLocaleDateString('en-US')
        this.updatedAt = new Date(data.updatedAt).toLocaleDateString('en-US')
        this.isCancelled = data.isCancelled || false
    }
}