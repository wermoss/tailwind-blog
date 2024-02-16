<template>
    <div>
      <input v-model="name" type="text" placeholder="Name">
      <input v-model="phone" type="text" placeholder="Phone">
      <textarea v-model="message" placeholder="Message"></textarea>
      <button @click="sendEmail">Send</button>
      <div v-if="emailStatus === 'success'">suc</div>
      <div v-if="emailStatus === 'error'">er</div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  const config = useRuntimeConfig()
  const emailStatus = ref('')
  const name = ref('')
  const phone = ref('')
  const message = ref('')
  
  const sendEmail = async () => {
    try {
      const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          accept: "application/json",
          "api-key": config.public.brevoApiKey,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          sender: {
            name: "Lexxo.pl",
            email: "wershapes@gmail.com",
          },
          replyTo: {
            email: "wershapes@wershapes.com",
            name: "Lexxo.pl"
          },
          templateId: 5,
          params: {
            FORM_NAME: `${name.value}`,
            FORM_PHONE: `${phone.value}`,
            FORM_MESSAGE: `${message.value}`,
  },
          to: [
            { 
            email: "konrad@minister.com", 
            name: `${name.value}`,
            }
            ],
            subject: "Nowy furmularz kontaktowy",
            htmlContent:`<html><head></head><body><p>Imię i nazwisko: ${name.value}</p><p>${message.value}</p><p>Numer telefonu: ${phone.value}</p></body></html>`,
            textContent: "Nowy furmularz kontaktowy",
        }),
      })
      if (!response.ok) {
        throw new Error('Email sending failed')
      }
      emailStatus.value = 'success'
      // Clear the form fields
        name.value = ''
        phone.value = ''
        message.value = ''
      await sendSMS()
    } catch (error) {
      console.error(error)
      emailStatus.value = 'error'
    }
  }
  // Arek 436603950408
//   const sendSMS = async () => {
//     try {
//       const response = await fetch('https://portal.bulkgate.com/api/1.0/advanced/transactional', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           application_id: "31492",
//           application_token: "xcdf4QzO1n3A0nkVsrvIKQfhZt5zRgPhN01cNkWS1GLRtyikUR",
//           number: "48450066055",
//           unicode: true,
//           text: "Na stronie internetowej wypelniono formularz",
//           sender_id: "gText",
//           sender_id_value: "Lexxo.pl",
//           unicode: true
//         })
//       })
//       if (!response.ok) {
//         const errorData = await response.json();
//         console.error('SMS sending failed', errorData);
//         throw new Error('SMS sending failed')
//       }
//     } catch (error) {
//       console.error(error)
//     }
//   }
  </script>