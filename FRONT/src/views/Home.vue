<!-- src/views/Home.vue -->
<template>
    <div>
      <h1>Bienvenue</h1>
      <div v-if="username">
        <p>Bienvenue, {{ username }} !</p>
      </div>
      <div v-else>
        <p>Veuillez vous connecter.</p>
      </div>
    </div>
  </template>
  
  <script>
  import { getCookie } from '../services/cookieService'; // Assurez-vous que le chemin est correct
  
  export default {
    data() {
      return {
        username: null,
      };
    },
    mounted() {
      // Vérifier si le cookie 'username' est présent
      this.username = getCookie('username');
    },
  };
  </script>
  
  <style scoped>
  /* Votre CSS ici */
  h1 {
    color: #333;
    text-align: center;
  }
  
  p {
    text-align: center;
  }
  </style>
  