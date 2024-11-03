<template>
    <div class="workflow-status-container">
      <h1>Statut des Workflows</h1>
      <table>
        <thead>
          <tr>
            <th>ID du Workflow</th>
            <th>Statut</th>
            <th>Étapes</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="workflow in workflows" :key="workflow.workflow_id">
            <td>{{ workflow.workflow_id }}</td>
            <td>{{ workflow.status }}</td>
            <td>
              <ul>
                <li v-for="step in workflow.steps" :key="step.step_type">
                  {{ step.step_type }} : {{ step.status }}
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  import { getWorkflows } from "../services/api"; // Importez vos fonctions API
  
  export default {
    data() {
      return {
        workflows: [], // Pour stocker les workflows récupérés
        errorMessage: null, // Pour stocker les messages d'erreur
      };
    },
    async created() {
      try {
        // Récupérer la liste des workflows
        const response = await getWorkflows();
        this.workflows = response.data; // Supposons que l'API retourne un tableau de workflows
      } catch (error) {
        console.error("Erreur lors de la récupération des workflows:", error);
        this.errorMessage = "Erreur lors de la récupération des workflows.";
      }
    },
  };
  </script>
  
  <style scoped>
  .workflow-status-container {
    max-width: 800px;
    margin: 50px auto;
    padding: 20px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    text-align: center;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    padding: 12px;
    border: 1px solid #ddd;
    text-align: left;
  }
  
  th {
    background-color: #f2f2f2;
  }
  
  .error {
    color: red;
    text-align: center;
  }
  </style>
  