<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(1)
</script>

<template>
  <h1>{{ msg }}</h1>

    <el-button type="button" @click="count++">count is {{ count }}</el-button>

    <el-row class="mb-4">
      <el-button round>Round</el-button>
      <el-button type="primary" round>Primary</el-button>
      <el-button type="success" round>Success</el-button>
      <el-button type="info" round>Info</el-button>
      <el-button type="warning" round>Warning</el-button>
      <el-button type="danger" round>Danger</el-button>
    </el-row>

    <el-row>
      <el-button :icon="Search" circle />
      <el-button type="primary" :icon="Edit" circle />
      <el-button type="success" :icon="Check" circle />
      <el-button type="info" :icon="Message" circle />
      <el-button type="warning" :icon="Star" circle />
      <el-button type="danger" :icon="Delete" circle />
    </el-row>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
