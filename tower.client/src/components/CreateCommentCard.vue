<template>
    <div class="post-card elevation-2 mt-3 mx-2" v-if="user.isAuthenticated">
        <div class="user-img">
            <img :src="account.picture" :alt="account.name">
        </div>
        <div class="post-form">
            <form @submit.prevent="handleSubmit">
                <textarea name="body" placeholder="Comment" v-model="editable.body" required></textarea>
                <div class="form-bar">
                    <button type="submit" class="btn btn-dark">
                        <i class="mdi mdi-post"></i> Post
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
  
<script>
import { computed, watchEffect, ref } from 'vue'
import { AppState } from '../AppState'
import Pop from '../utils/Pop'
import { commentsService } from '../services/CommentsService'

  export default {
    setup() {
        const editable = ref({})
        watchEffect(()=> {
            editable.value = AppState.comment
        })

        return {
            user: computed(()=>AppState.user),
            account: computed(()=>AppState.account),
            editable,
            async handleSubmit(){
                try { 
                    await commentsService.newComment(editable.value)
                    AppState.comment.body = '' 
                } 
                catch (error) { Pop.error(error, '[CreatePostCard: handleSubmit()]') }
            }
        }
        }
  }
</script>

<style scoped>
.post-card{
    border: solid 1px #a9a9a9;
    background-color: #fff;
    margin-bottom: 1rem;
    border-radius: 0.15rem;
    padding: 0.45rem;
    display: flex;
    flex-direction: row;
}
.user-img{
    height: 2.7rem;
    aspect-ratio: 1/1;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 0.5rem;
    background-color: black;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
}
.user-img img{
    height: 100%;
}
.post-form{
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}
.post-form textarea{
    all:unset;
    width: calc(100% - 1.25rem);
    overflow: hidden;
    border-radius: 0.25rem;
    resize: none;
    background-color: rgba(207, 207, 207, 0.205);
    padding: 0.25rem 0.5rem;
    border: 0.095rem dashed rgba(55, 192, 210, 0.927);
    transition: 100ms;
}
.post-form textarea:focus{
    background-color: #fff;
}
.form-bar{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.photo{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0.25rem;
    border-radius: 0.25rem;
    border: 0.099rem solid black;
}
</style>