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

      onMounted(()=>{
        AppState.activeTowerEvent = null
        getActiveEventFromApi()
      })
      return {
        towerEvent: computed(()=>AppState?.activeTowerEvent)
      }
    }
  }
</script>

<style scoped>

</style>