<template>
<NavBar />
  <router-view />
</template>

<script>
import NavBar from "./components/NavBar.vue"

export default {
  components: {
    NavBar
  }
}
</script>

<style lang="scss">
@import "@/../public/variable.scss";

#app {
  font-family: Lato, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 950px;
  background-color: $color-secondary;
}
</style>
