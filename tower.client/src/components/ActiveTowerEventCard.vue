<template>
  <div class="active-event-card" v-if="towerEvent">
    <div class="event-background">
        <img :src="towerEvent.coverImg" :alt="towerEvent.name">
    </div>
    <div class="event-details">
        <div class="event-img">
            <img :src="towerEvent.coverImg" :alt="towerEvent.name">
        </div>

        <div class="event-content">

            <div class="title">
                <h2>{{ towerEvent.name }}</h2>
                <p>{{ towerEvent.startDate }}</p>
            </div>

            <div class="subtitle">
                <p>{{ towerEvent.location }}</p>
                <p>Starting at {{ towerEvent.startTime }}</p>
            </div>

            <div class="body">
                <p>{{ towerEvent.description  }}</p>
            </div>

            <div class="footer">
                
                <h3><span class="blue-text">{{ towerEvent.capacity - ticketCount }}</span> Spots Left</h3>
                <div v-if="!towerEvent.isCanceled">

                    <div v-if="towerEvent.capacity - towerEvent.ticketCount > 0"
                        class="my-1">
                        <div v-if="user.isAuthenticated && tickets">
                            <button 
                            class="btn btn-dark" 
                            @click="postTicketForEvent(towerEvent.id)"
                            v-if="!hasTicket">
                                Attend Event
                            </button>
                            <button 
                            class="btn btn-warning"
                            v-else
                            disabled>
                                Attending Event
                            </button>
                        </div>
                    </div>

                    <div v-else class="my-1">
                        <button class="btn btn-success" disabled>
                            Event Full
                        </button>
                    </div>

                </div>
                <div v-else class="my-1">
                    <button class="btn btn-danger" disabled>
                        Event Cancelled
                    </button>
                </div>
                <div v-if="user.id == towerEvent.creatorId">
                    <button 
                    class="btn btn-danger"
                    @click="cancelEvent(towerEvent.id)">
                        Cancel Event
                    </button>
                </div>
            </div>
        </div>
    </div>

  </div>
</template>
  
<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { TowerEvent } from '../models/TowerEvent'
import { ticketsService } from '../services/TicketsService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { towerEventsService } from '../services/TowerEventsService'
  export default {
    props:{
        towerEvent: {type: TowerEvent, required: true}
    },
    setup() {
      return {
        user: computed(() => AppState?.user),
        tickets: computed(() => AppState?.tickets),
        ticketCount: computed(()=> AppState?.tickets?.length),

        hasTicket: computed(()=>{
            let filter = AppState?.tickets.filter(t => t.accountId == AppState?.user.id )
            if(filter == 0){ return false }
            else{ return true }
        }),
        
        async postTicketForEvent(id){
            try {
                await ticketsService.postTicketForEvent(id)
            } catch (error) {
                Pop.error(error,'[ActvieTowerEventCard: postTicketForEvent()]')
                logger.log(error)
            }
        },
        
        async cancelEvent(id){
            try {
                await towerEventsService.cancelEvent(id)
            } catch (error) {
                Pop.error(error,'[ActvieTowerEventCard: postTicketForEvent()]')
                logger.log(error)
            }
        },
      }
    }
  }
</script>

<style scoped>
h2, h3, p{
    padding: 0;
    margin: 0;
}
h2{
    font-size: 1.65rem;
    font-weight: 500;
}
h3{
    font-size: 1.4rem;
    font-weight: 500;
    margin: 0.5rem 0;
}
p{
    font-weight: 400;
    font-size: 0.58rem;
}
.blue-text{
    color: aqua;
}
.active-event-card {
    background-color: #474C61;
    border: 0;
    border-radius: 0.35rem;
    display: block;
    position: relative;
    overflow-y:auto;
    width: calc(100% - 1rem);
    aspect-ratio: 7/3;
    margin: 0.5rem;
}
.event-background{
    filter: blur(4px);
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 5;
    background-color: rgb(14, 109, 172);
}
.event-background img{
    filter: grayscale(90%);
    opacity: 65%;
    border-radius: 0.25rem;
    width: 100%;
    height: 100%;
    object-position: 50% 50%;
    object-fit: cover;
}
.event-details{
    border-radius: 0.25rem;
    overflow: auto;
    position: absolute;
    width: 100%;
    z-index: 10;
    top: 0;
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
}
.event-img{
    margin: 0.75rem;
    height: calc(100% - 1.5rem);
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
}
.event-img img{
    border: solid 1px #474C61;
    border-radius: 0.05rem;
    height: 100%;
    aspect-ratio: 1/1;
    object-fit: cover;
}
.event-content{
    margin: 0.75rem 0.5rem 0.75rem 0;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    color: white;
}
.event-content .title{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
}
.event-content .subtitle{
    margin: 0.25rem 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
}
.event-content .body{
    margin: 0.25rem 0;
    flex-grow: 1;
}
.event-content .footer{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    margin: 0.25rem 0 0 0;
}
/* @media (min-width: 576px) { 
    .active-event-card {
    aspect-ratio: 1/3;
    }
}
@media (min-width: 768px) { 
    .active-event-card {
    aspect-ratio: 1/3;
    }
} */
@media (max-width: 992px) { 
    .active-event-card {
    height: 80vh;
    }
    .event-details{
    overflow: auto;
    flex-direction: column;
    }
    .event-img{
    margin: 0.3rem;
    height: 20%;
    width: auto;
    }
    .event-content{
        padding: 0.5rem;
        margin: 0.5rem 0;
    }
    .event-img img{
    border: solid 1px #474C61;
    border-radius: 0.05rem;
    width: 100%;
    }
}
/* @media (min-width: 1200px) { 
    .active-event-card {
    }
}
@media (min-width: 1400px){
    .active-event-card {
    }
} */
</style>