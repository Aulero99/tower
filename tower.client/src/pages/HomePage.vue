<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-12 page-top d-none d-md-flex">
        <div class="logo-container">
          <img src="../assets/img/logo-wide.svg" alt="logo">
        </div>
      </div>
    </section>
    

    <section v-if="!towerEvents">
      <Loader/>
    </section>

    <section v-if="towerEvents" class="row">
      
      <div class="col-12 p-1">
        <div class="d-flex flex-column flex-md-row flex-wrap justify-content-between m-1 bg-info rounded p-3">
          <button @click="filterBy = ''" class="btn btn-outline-light  mx-2">All</button>
          <button @click="filterBy = 'concert'" class="btn btn-outline-light  mx-2">Concerts</button>
          <button @click="filterBy = 'convention'" class="btn btn-outline-light  mx-2">Conventions</button>
          <button @click="filterBy = 'sport'" class="btn btn-outline-light  mx-2">Sports</button>
          <button @click="filterBy = 'digital'" class="btn btn-outline-light  mx-2">Digital</button>
        </div>
      </div>

      <div v-for="t in towerEvents" :key="t.id" class=" col-12 col-sm-6 col-md-3 p-0">
        <TowerEventCard :towerEvent="t"/>
      </div>
    
    </section>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { towerEventsService } from '../services/TowerEventsService'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
export default {
  setup() {
    const filterBy = ref('')

    async function getTowerEventsFromApi() {
      try { await towerEventsService.getTowerEventsFromApi() } 
      catch (error) { 
        Pop.error(error, '[HomePage: getTowerEventsFromApi()]')
        logger.log(error) 
      }
    }

    onMounted(()=>{
      getTowerEventsFromApi()
    })
    return {
      filterBy,
      towerEvents: computed(()=> {
        if (filterBy.value == "") {
          return AppState.towerEvents
        } else {
          return AppState.towerEvents.filter(a => a.type == filterBy.value)
        }
      }),
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}

.page-top{
  height: 10vh;
  min-height: 2.7rem;
  padding: 0.25rem;
}
.logo-container{
  height: 100%;
  padding: 0.4rem;
  img{
    height: 100%;
  }
}
</style>
