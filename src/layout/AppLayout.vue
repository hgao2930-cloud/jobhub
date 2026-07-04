<template>
  <Header />
  <Sidebar />
  
  <router-view />
</template>

<script setup>
import Sidebar from './Sidebar.vue'
import Header from './Header.vue'
</script>

<style scoped></style>