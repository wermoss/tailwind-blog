<template>
  <h1>Mongo DB</h1>

  <pre>{{ response }}</pre>

  <button @click="sendRequest">Test</button>

</template>


<script setup lang="ts">
import {ref} from 'vue'

const response = ref()

const sendRequest = async () => {
  const res = await fetch("/api/mongo", {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      number: '+48123456789'
    })
  })

  response.value = await res.json()
}

</script>
