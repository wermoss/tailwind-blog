<template>
    <div v-if="formStatus === 'initial'">
      <form @submit.prevent="submitForm">
        <label for="phone">Numer telefonu:</label>
        <input 
          id="phone" 
          v-model="phone" 
          type="tel" 
          pattern="[0-9]*" 
          inputmode="numeric"
          @input="validateInput"
          maxlength="9"
          required
        >
        <button type="submit" :disabled="isDisabled">Wyślij</button>
      </form>
    </div>
    <div v-else-if="formStatus === 'success'" class="suc">
      Formularz został pomyślnie wysłany.
    </div>
    <div v-else-if="formStatus === 'error'" class="err">
      Wystąpił błąd podczas wysyłania formularza.
      <button @click="retry">Spróbuj ponownie</button>
    </div>
  </template>
  
  <script setup>
  import { ref, watchEffect } from 'vue'
  
  const phone = ref('')
  const isDisabled = ref(true)
  const formStatus = ref('initial')
  
  const submitForm = () => {
    // Tutaj możesz przetworzyć dane formularza
    console.log(phone.value)
    // Na potrzeby demonstracji, zakładamy, że formularz zawsze jest wysyłany pomyślnie.
    // W prawdziwej aplikacji, powinieneś użyć tutaj prawdziwej logiki wysyłania formularza.
    formStatus.value = 'success'
  }
  
  const validateInput = () => {
    phone.value = phone.value.replace(/[^0-9]/g, '')
  }
  
  const retry = () => {
  formStatus.value = 'initial'
  phone.value = ''
}
  
  watchEffect(() => {
    isDisabled.value = !phone.value || phone.value.length < 9
  })
  </script>