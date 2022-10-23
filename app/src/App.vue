<script>
import TheNavbar from './components/TheNavbar.vue'
import TheFooter from './components/TheFooter.vue'

export default {
  components: {
    TheNavbar,
    TheFooter,
  },
}
</script>

<template>
  <TheNavbar tagline="Tracker whatever you want to eat!" />
  <RouterView />
  <TheFooter />
</template>

<style></style>
