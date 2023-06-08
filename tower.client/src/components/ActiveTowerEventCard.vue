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
                <h3><span class="blue-text">{{ towerEvent.capacity - towerEvent.ticketCount }}</span> spots left</h3>
                <button class="btn btn-dark">Attend Event</button>
            </div>
        </div>
    </div>

  </div>
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
    overflow: hidden;
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
</style>