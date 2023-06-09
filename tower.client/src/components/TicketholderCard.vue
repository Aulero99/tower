<template>
    <div class="holder">
        <div class="holder-img">
            <img :src="ticketholder.holderImg" 
            :alt="ticketholder.holderName" 
            :title="ticketholder.holderName">
        </div>
    </div>
</template>
  
<script>
import { Ticket } from '../models/Ticket'
  export default {
    props:{
        ticketholder: { type:Ticket, required:true }
    },
    setup() {
      return {
  
      }
    }
  }
</script>

<style scoped>
.holder{
    margin: 0.25rem;
}
.holder-img{
    width: 2rem;
    height: 2rem;
}
.holder-img img{
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 50% ;
}
</style>