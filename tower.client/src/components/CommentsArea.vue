<template>
    <div v-if="user.isAuthenticated">
        <CreateCommentCard/>
    </div>
    <div v-if="!comments">
        <loader/>
    </div>
    <div v-else class="mx-2">
        <div v-for="c in comments" :key="c.id">
            <CommentCard :comment="c"/>
        </div>
    </div>
</template>
  
<script>
import { computed, onMounted, onUnmounted } from 'vue'
import Pop from '../utils/Pop'
import { logger } from '../utils/Logger'
import { commentsService } from '../services/CommentsService'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'

  export default {
    props:{

    },
    setup() {
        const route = useRoute().params.id

        async function getCommentsByEventId(){
            try {
                await commentsService.getCommentsByEventId(route)
            } catch (error) {
                Pop.error(error, '[CommentsArea: getCommentsByEventId()]')
                logger.log(error)
            }
        }

        onMounted(()=>{
            getCommentsByEventId()
        })
        onUnmounted(()=>{
            AppState.comments = null
        })
      return {
        user: computed(()=>AppState?.user),
        comments: computed(()=>AppState?.comments)
      }
    }
  }
</script>

<style scoped>

</style>