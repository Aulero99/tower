<template>
      <section v-if="!towerEvent">
        <Loader/>
      </section>
      <section v-if="towerEvent">
         <ActiveTowerEventCard :towerEvent="towerEvent"/>
      </section>
      <section>
        <TicketholdersArea/>
      </section>
      <section>
        <CommentsArea/>
      </section>
</template>
  
<script>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Pop from '../utils/Pop'
import { towerEventsService } from '../services/TowerEventsService'
import { AppState } from '../AppState'
import CommentsArea from '../components/CommentsArea.vue'
import { ticketsService } from '../services/TicketsService'
  export default {
  components: { CommentsArea },
    props:{

    },
    setup() {
      const route = useRoute().params.id

      async function getActiveEventFromApi(){
        try {
          await towerEventsService.getActiveEventFromApi(route)
        } catch (error) {
          Pop.error(error, '[ActiveEvenPage: getActiveEventFromApi()]')
        }
      }

      async function getTicketsForActiveEvent(){
        try {
        await ticketsService.getTicketsByEventId(route)
        } catch (error) {
          Pop.error(error, '[ActiveEvenPage: getTicketsForActiveEvent()]')
        }
      }

      onMounted(()=>{
        AppState.activeTowerEvent = null
        AppState.tickets = null
        getActiveEventFromApi()
        getTicketsForActiveEvent()
      })
      return {
        towerEvent: computed(()=>AppState?.activeTowerEvent)
      }
    }
  }
</script>

<style scoped>

</style>