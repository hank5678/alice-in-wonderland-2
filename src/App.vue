<template>
  <div class="container">
    <HelloWorld />
  </div>
</template>

<script setup>
import HelloWorld from "./components/HelloWorld.vue"
</script>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(45deg, #5189c1 25%, #41b883);
}
</style>
