<template>
  <div class="model-prediction-container">
    <h1>Prédiction avec un Modèle d'IA</h1>
    <form @submit.prevent="makePrediction">
      <textarea v-model="inputData" placeholder="Entrez vos données d'entrée sous forme JSON" required></textarea>
      <button type="submit">Faire une Prédiction</button>
    </form>

    <div v-if="predictions">
      <h2>Résultats de la Prédiction :</h2>
      <p>Prédictions : {{ predictions.join(', ') }}</p>
    </div>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { getModels, modelPrediction } from '../services/api'; // Assurez-vous que le chemin est correct

export default {
  data() {
    return {
      inputData: '',
      predictions: null,
      errorMessage: null,
      models: [], // Pour stocker les modèles récupérés
    };
  },
  async created() {
    await this.fetchModels(); // Appeler la méthode fetchModels pour récupérer les modèles
  },
  methods: {
    async fetchModels() {
      try {
        const response = await getModels(); // Assurez-vous que getModels est défini dans api.js
        this.models = response.data; // Stocker les modèles récupérés
      } catch (error) {
        console.error('Erreur lors de la récupération des modèles:', error);
        this.errorMessage = "Erreur lors de la récupération des modèles.";
      }
    },
    async makePrediction() {
      this.errorMessage = null; // Réinitialiser le message d'erreur
      try {
        const inputJson = JSON.parse(this.inputData); // Convertir le texte d'entrée en JSON
        const response = await modelPrediction(inputJson); // Appeler l'API de prédiction
        this.predictions = response.data.predictions; // Stocker les prédictions
      } catch (error) {
        console.error('Erreur lors de la prédiction:', error);
        this.errorMessage = 'Erreur lors de la prédiction. Vérifiez vos données d\'entrée.';
      }
    },
  },
};
</script>

<style scoped>
.model-prediction-container {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
}

h1 {
  text-align: center;
  color: #333;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

textarea {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  height: 100px; /* Hauteur du textarea */
  resize: none; /* Désactive le redimensionnement */
}

button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}

h2 {
  margin-top: 20px;
  color: #333;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>
