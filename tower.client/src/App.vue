<template>
  <main class="">

    <section class="view-section">
      <div class="fix">
        <router-view />
      </div>
    </section>
    
    <section class="nav-section elevation-4">
      <Navbar />
    </section>
  
  </main>

  <Modal id="newEvent">
    <CreateEventForm />
  </Modal>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root{
  --main-height: calc(100vh - 32px - 64px);
  --nav-bar-width: 7rem
}
main{
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
}
.view-section{
  padding: 0.25rem;
  width: calc(100vw - var(--nav-bar-width));
  margin-right: var(--nav-bar-width);
  // flex-grow: 1;
  background-color: #393939;
  position: relative;
}
.fix{
  width: 100%;
}
.nav-section{
  height: 100vh;
  position: fixed;
  width: var(--nav-bar-width);
  background: linear-gradient(180deg, #474C61 0%, rgb(24, 24, 24) 100%);
}
</style>
