<template>
  <div class="about text-center card">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
  <div v-for="t in tickets" :key="t.id">
    <UserTicket :ticket = 't'/>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState';
import Pop from '../utils/Pop';
import { logger } from '../utils/Logger';
import { ticketsService } from '../services/TicketsService';
export default {
  setup() {
    async function getMyTicketsFromApi(){
      try {
        await ticketsService.getMyTicketsFromApi()
      } catch (error) {
        Pop.error(error,'[AccountPage: getMyTicketsFromApi()]')
        logger.log(error)
      }
    }
    onMounted(()=>{
      getMyTicketsFromApi()
    })
    return {
      account: computed(() => AppState.account),
      tickets: computed(() => AppState?.tickets)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
