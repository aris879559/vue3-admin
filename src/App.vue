<script setup>
import HelloWorld from './components/HelloWorld.vue'
// import { useStore } from 'vuex'
// import { useRouter } from 'vue-router'
// const store = useStore();
// const router = useRouter();
// store.commit('addMenu', router);
</script>

<template>
  <router-view />
</template>

<style>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
#app {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
/* html,body {
  margin: 0;
  padding: 0;
} */
</style>
