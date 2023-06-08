<template>
<router-link :to="{name: 'Event', params:{ id:towerEvent.id }}" :title="towerEvent.name">
  <div class="tower-event-card">
    <div class="event-img">
        <img :src="towerEvent.coverImg" alt="">
    </div>
    <div class="event-details">
        <div class="banner glass">
            <h5> {{ towerEvent.name }} </h5>
            <p> {{ towerEvent.location }} </p>
            <p> {{ towerEvent.startDate }} </p>
            <div class="notice" 
        v-if="towerEvent.isCancelled">
            Cancelled
        </div>
        <div class="notice"
        v-if="towerEvent.ticketCount == towerEvent.capacity">
            At Capacity
        </div>
        <div class="tickets" v-else>
           <span class="blue-text">{{ towerEvent.capacity - towerEvent.ticketCount }}</span> Tickets Left
            
        </div>
        </div>
    </div>

  </div>
</router-link>
</template>
  
<script>
import { TowerEvent } from '../models/TowerEvent'
  export default {
    props:{
        towerEvent: {type: TowerEvent, required: true}
    },
    setup() {
      return {
  
      }
    }
  }
</script>

<style scoped>
p{
    margin: 0;
    padding: 0;
    font-size: 0.65rem;
}
.tower-event-card {
    background-color: #474C61;
    margin: 0.35rem;
    border: 0;
    border-radius: 0.35rem;
    display: block;
    position: relative;
    cursor: pointer;
}
.blue-text{
    color: aqua;
}
.tower-event-card:hover .banner{
    padding: 0.25rem 0.5rem 0.65rem 0.5rem;
}
.event-img{
    padding: 0.25rem;
    width: 100%;
    aspect-ratio: 1/1;
    position: relative;
    z-index: 5;
}
.event-img img{
    border-radius: 0.25rem;
    width: 100%;
    aspect-ratio: 1/1;
    object-position: 50%;
    object-fit: cover;
}
.event-details {
    border-radius: 0.25rem;
    overflow: hidden;
    position: absolute;
    width: 100%;
    z-index: 10;
    top: 0;
    aspect-ratio: 1/1;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-content: flex-end;
}
.banner{
    width: 100%;
    color: white;
    padding: 0.25rem 0.5rem;
    transition: all 150ms;
}
.banner h5{
    font-size: 0.9rem;
    font-weight: 500;
}
.notice{
    background-color: red;
    border-radius: 0.25rem;
    color: white;
    font-size: 0.7rem;
    font-weight: 700;
    text-align: center;
    width: 100%;
    padding: 0.25rem 0.5rem;
}
.glass{
    background: rgba(0, 0, 0, 0.35);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(6.9px);
    -webkit-backdrop-filter: blur(6.9px);
}
.tickets{
    border-top:solid 2px rgba(106, 106, 106, 0.571) ;
    margin-top: 0.25rem;
    padding: 0.25rem 0.5rem;
    width: 100%;
    text-align: right;
    font-size: 0.65rem;
}
</style>