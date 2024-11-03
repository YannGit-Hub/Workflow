<template>
  <div class="login-container">
    <h1>Connexion</h1>
    <form @submit.prevent="login" class="login-form">
      <input
        type="text"
        v-model="username"
        placeholder="Nom d'utilisateur"
        required
        class="input-field"
      />
      <input
        type="password"
        v-model="password"
        placeholder="Mot de passe"
        required
        class="input-field"
      />
      <button type="submit" class="submit-button">Se connecter</button> <!-- Assurez-vous que ce bouton est là -->
    </form>
    <div v-if="error" class="error-message">{{ error }}</div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';


export default {
  data() {
    return {
      username: '',
      password: '',
      error: null,
      validUsername: 'admin',
      validPassword: 'admin',
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    // Dans votre composant de connexion
    login() {
      if (this.username === this.validUsername && this.password === this.validPassword) {
        // Authentification réussie, redirection vers la page d'accueil
        this.router.push('/home'); // Assurez-vous que la route existe
        // Optionnel : Stockez le cookie
        setCookie('username', this.username, 7);
      } else {
        this.error = 'Nom d\'utilisateur ou mot de passe incorrect';
      }
    }
  },
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
}

.login-form {
  display: flex;
  flex-direction: column;
}

.input-field {
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.submit-button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #0056b3;
}

.error-message {
  color: red;
  text-align: center;
  margin-top: 10px;
}
</style>
