<template>
    <div class="workflows-container">
      <h1>Liste des Workflows</h1>
      <button @click="fetchWorkflows">Rafraîchir la Liste</button>
      
      <div v-if="workflows.length">
        <div v-for="workflow in workflows" :key="workflow.workflow_id" class="workflow">
          <h2>Workflow ID : {{ workflow.workflow_id }}</h2>
          <p>Status : {{ workflow.status }}</p>
          <h3>Étapes :</h3>
          <ul>
            <li v-for="step in workflow.steps" :key="step.step_type">
              {{ step.step_type }} : {{ step.status }}
            </li>
          </ul>
        </div>
      </div>
      
      <p v-else>Aucun workflow trouvé.</p>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  import { getAllWorkflows } from '../services/api';
  
  export default {
    data() {
      return {
        workflows: [],
        errorMessage: null,
      };
    },
    methods: {
      async fetchWorkflows() {
        this.workflows = []; // Réinitialiser la liste des workflows
        this.errorMessage = null; // Réinitialiser le message d'erreur
  
        try {
          const response = await getAllWorkflows();
          this.workflows = response.data; // Mettre à jour avec les workflows récupérés
        } catch (error) {
          this.errorMessage = 'Erreur lors de la récupération des workflows.';
          console.error('Erreur:', error);
        }
      },
    },
    mounted() {
      this.fetchWorkflows(); // Appeler la fonction lors du montage du composant
    },
  };
  </script>
  
  <style scoped>
  .workflows-container {
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  .workflow {
    margin-bottom: 20px;
  }
  
  .error {
    color: red;
  }
  </style>
  