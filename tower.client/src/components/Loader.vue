<template>
    <div class="container">
        <div class="spinner"></div>
    </div>
</template>
  
<script>
  export default {
    props:{

    },
    setup() {
      return {
  
      }
    }
  }
</script>

<style scoped>
.container{
    height: 5.5rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
}
.spinner {
   position: relative;
   width: 22.4px;
   height: 22.4px;
}

.spinner::before,
.spinner::after {
   content: '';
   width: 100%;
   height: 100%;
   display: block;
   animation: spinner-b4c8mmmd 0.5s backwards, spinner-49opz7md 1.25s 0.5s infinite ease;
   border: 5.6px solid #ffd464;
   border-radius: 50%;
   box-shadow: 0 -33.6px 0 -5.6px #ffd464;
   position: absolute;
}

.spinner::after {
   animation-delay: 0s, 1.25s;
}

@keyframes spinner-b4c8mmmd {
   from {
      box-shadow: 0 0 0 -5.6px #ffd464;
   }
}

@keyframes spinner-49opz7md {
   to {
      transform: rotate(360deg);
   }
}
</style>