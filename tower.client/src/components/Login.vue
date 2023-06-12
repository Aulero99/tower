<template>
  <span class="navbar-text">
    <div v-if="!user.isAuthenticated" class="login-container">
      <button class="btn text-success lighten-30 selectable text-lowercase" @click="login">
        Login
      </button>
    </div>
    <div v-else>
      <div class="dropdown my-2 my-lg-0">
        <div type="button" class="border-0 selectable no-select" aria-expanded="false">
          <div v-if="account.picture || user.picture" class="profile-img-container">
            <img :src="account.picture || user.picture" alt="account photo" />
          </div>
        </div>
        <button class="btn btn-danger" @click="logout">
              <i class="mdi mdi-logout"></i>
              logout
        </button>
      </div>
    </div>
  </span>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
export default {
  setup() {
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container{
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.profile-img-container{
  width: 100%;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
}
.profile-img-container img{
  width: 70%;
  border-radius: 50%;
}
</style>
