<template>
  <nav class="">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="logo-container">
        <img alt="logo" src="../assets/img/logo.svg"/>
      </div>
    </router-link>
    <div class="">
      <!-- LOGIN COMPONENT HERE -->
        <Login />
      <ul class="navbar-nav">
        <li>
          <router-link :to="{ name: 'Home' }" class="btn text-success lighten-30 selectable nav-link">
            Home
          </router-link>
        </li>
        <li v-if="user.isAuthenticated">
          <router-link  :to="{ name: 'Account' }" class="btn text-success lighten-30 selectable nav-link">
            Account
          </router-link>
        </li>
        <li v-if="user.isAuthenticated">
          <button class="btn text-success lighten-30 selectable nav-link">
            New Event
          </button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { computed } from 'vue';
import Login from './Login.vue';
import { AppState } from '../AppState';
export default {
  setup() {
    return {
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
    }
  },
  components: { Login }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  margin-bottom: 0.25rem;
  text-transform: lowercase;
  padding: 0.5rem;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
nav{
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0.5rem;
}
li {
  display: flex;
  justify-content: center;
  align-items: center;
}
.logo-container{
  width: 100%;
  aspect-ratio: 1/1;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.logo-container img{
  width: 70%;
}

@media screen and (min-width: 768px) {

}
</style>
