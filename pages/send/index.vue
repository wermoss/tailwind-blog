<template>
    <form @submit.prevent="submitForm">
      <input v-model="name" type="text" placeholder="Twoje imię" required />
      <textarea
        v-model="message"
        placeholder="Twoja wiadomość"
        required
      ></textarea>
      <button type="submit">Wyślij</button>
    </form>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  const name = ref('');
  const message = ref('');
  
  const submitForm = async () => {
    try {
      const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
            "Access-Control-Allow-Origin": "*",
            'Access-Control-Allow-Credentials': 'true',
            "Access-Control-Allow-Headers": '*',
            "Access-Control-Expose-Headers": '*'
        },
        body: JSON.stringify({
          name: name.value,
          message: message.value,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // zresetuj formularz
      name.value = '';
      message.value = '';
    } catch (error) {
      console.error('There was a problem with the fetch operation: ', error);
    }
  };
  </script>
  