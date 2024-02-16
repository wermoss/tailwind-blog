<template>
  <input class="border border-black m-3" v-model="number">
  <button @click="submit">Send</button>
  <hr>
  Response:
  <pre>
    {{ response }}
  </pre>

</template>

<script setup lang="ts">
const number = ref();
const response = ref();
const submit = () => {
  response.value = $fetch('/api/fccc47bfae9b5bec1e6f2a1870c5a7892f43941085be1dc747cfce32b3934636', {
    method: "POST",
    body: {
      number: number.value
    }
  })
}
</script>

<style scoped>

</style>