<template>
    <div class="comment-card">
        <div class="user">
            <img 
            :src="comment.creatorImg" 
            :alt="comment.creatorName"
            :title="comment.creatorName"
            class="elevation-2">
        </div>
        <div class="content elevation-2">
            <h5>{{ comment.creatorName }} <span v-if="hasTicket(comment.creatorId)" class="blue-text"> - Attending This Event</span></h5>
            <p>
                {{ comment.body }}
            </p>
        </div>
    </div>
</template>
  
<script>
import { computed } from 'vue'
import { Comment } from '../models/Comment'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
  export default {
    props:{
        comment: {type: Comment, required: true}
    },
    setup() {
      return {
        tickets: computed(()=> AppState?.tickets),
        hasTicket(id){
            let ticket = AppState?.tickets.filter(t=>t.accountId == id)
            logger.log('the filter params is', id, 'and returns', ticket)
            if(ticket != []){
                return false
            }
            return true
        }
      }
    }
  }
</script>

<style scoped>
h5{
    font-size: 0.75rem;
    line-height: normal;
    margin-bottom: 0.25rem;
    padding: 0;
}
p{
    font-size: 0.65rem;
    margin: 0;
    padding: 0;
}
.blue-text{
    color: #56C7FB;
}
.comment-card{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
    flex-wrap: wrap;
    width: 100%;
}
.content{
    flex-grow: 1;
    background-color: #E2F9FF;
    margin-left: 0.5rem;
    border-radius: 0.25rem;
    padding: 0.25rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
    flex-wrap: wrap;
}
.user{
    height: 3rem;
    aspect-ratio: 1/1;
}
.user img{
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 50%;
}
</style>