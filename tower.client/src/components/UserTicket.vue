<template>
  <div class="card my-2 p-2 mx-1 justify-content-between">
    {{ ticket.eventName }}
    <button @click="deleteThisTicket(ticket.id)" class="btn btn-danger">
      Delete Ticket
    </button>
  </div>
</template>
  
<script>
import { Ticket } from '../models/Ticket'
import { ticketsService } from '../services/TicketsService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
  export default {
    props:{
      ticket: {type: Ticket, required: true}
    },
    setup() {
      return {
        async deleteThisTicket(id){
          try {
            logger.log(id)
            await ticketsService.deleteThisTicket(id)
          } catch (error) {
            Pop.error(error,'[UserTicket: deleteThisTicket()]')
            logger.log(error)
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>