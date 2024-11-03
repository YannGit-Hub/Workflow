import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Assurez-vous que ce chemin est correct

createApp(App)
  .use(router) // Utilisation du routeur
  .mount('#app');
