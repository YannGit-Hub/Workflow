<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  components: {
    Navbar,
  },
};
</script>

<style>
/* Ajoutez des styles globaux si nécessaire */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

}

html, body {
    height: 100%;
    margin: 0; /* Supprimer les marges par défaut */
    background: linear-gradient(135deg, #0f2027, #2c5364); /* Dégradé futuriste */
    font-family: Arial, sans-serif; /* Exemple de police */
}

</style>
