<template>
  <p>Hello World~</p>
  <p>叉叉: ⓧ</p>
  <p>勾勾: ✔</p>
  <span>LOGO: <img :src="logo" alt="" /></span>
</template>

<script setup>
  import logo from "../assets/logo.svg"
</script>

<style scoped>
  p {
    font-size: 24px;
  }
  img {
    width: 48px;
  }
</style>
