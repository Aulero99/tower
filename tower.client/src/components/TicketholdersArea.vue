<template>
    <h5>See Who is Attending</h5>
    <div class="background">
        <div v-for="t in tickets" :key="t.id">
            <TicketholderCard :ticketholder="t"/>
        </div>
    </div>
</template>
  
<script>
import { computed, onMounted } from 'vue'
import Pop from '../utils/Pop'
import { logger } from '../utils/Logger'
import { ticketsService } from '../services/TicketsService'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
  export default {
    props:{

    },
    setup() {
        const route = useRoute().params.id

        async function getTicketsByEventId(){
            try {
                await ticketsService.getTicketsByEventId(route)
            } catch (error) {
                Pop.error(error,'[TicketholdersArea: getTicketsByEventId()]')
                logger.log(error)
            }
        }
        onMounted(()=>{
            getTicketsByEventId()
        })
      return {
        tickets: computed(()=> AppState.tickets ),
      }
    }
  }
</script>

<style scoped>
h5{
    color: #7981A6;
    font-size: 0.65rem;
}
.background{
    background-color: #474C61;
    padding: 0.5rem;
    border-radius: 0.35rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
</style>