<template>
  <nav class="navbar">
    <div class="container">
      <h1 class="logo">Creer - Visualiser - Predir</h1>
      <ul class="nav-links">
        <li><router-link to="/create-workflow">Créer Workflow</router-link></li>
        <li><router-link to="/execute-workflow">Exécuter Workflow</router-link></li>
        <li><router-link to="/model-training-status">Entraînement</router-link></li>
        <li><router-link to="/model-prediction">Prédictions</router-link></li>
        <li><router-link to="/upload">Upload</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background-color: #343a40; /* Couleur de fond sombre */
  color: white; /* Couleur du texte */
  padding: 10px 20px; /* Espacement interne */
}

.container {
  display: flex; /* Utilisation du Flexbox pour aligner les éléments */
  justify-content: space-between; /* Espacement entre le logo et les liens */
  align-items: center; /* Alignement vertical centré */
}

.logo {
  margin: 0; /* Suppression des marges autour du logo */
}

.nav-links {
  list-style: none; /* Suppression des puces de la liste */
  display: flex; /* Utilisation du Flexbox pour aligner les liens */
  gap: 20px; /* Espacement entre les liens */
}

.nav-links a {
  color: white; /* Couleur des liens */
  text-decoration: none; /* Suppression de la décoration de texte */
  transition: color 0.3s; /* Transition douce pour le changement de couleur */
}

.nav-links a:hover {
  color: #61dafb; /* Couleur au survol */
}

.nav-links .active {
  font-weight: bold; /* Met le lien actif en gras */
  text-decoration: underline; /* Souligne le lien actif */
}

</style>
