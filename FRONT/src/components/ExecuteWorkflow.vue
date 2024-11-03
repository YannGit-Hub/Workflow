<template>
  <div class="execute-workflow-container">
    <h1>Exécuter un Workflow</h1>
    <form @submit.prevent="executeWorkflow">
      <input type="text" v-model="workflowId" placeholder="ID du workflow" required />
      <button type="submit">Exécuter Workflow</button>
      <workflow-list @messageSent="handleMessage" />
      <p v-if="message">{{ message }}</p> <!-- Afficher le message -->
    </form>

    <p v-if="status">Statut de l'exécution : {{ status }}</p>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

    <h2>Liste des Workflows</h2>
    <ul>
      <li v-for="workflow in workflows" :key="workflow.workflow_id">
        <strong>Name:</strong> {{ workflow.name }} - <strong>Id:</strong> {{ workflow.id }}
        <button @click="showStatusModal(workflow)">Vérifier le Statut</button>
        <button @click="deleteWorkflow(workflow.id)">Supprimer</button>
      </li>
    </ul>

    <Modal 
      :isVisible="isModalVisible" 
      :workflow="selectedWorkflow" 
      @close="isModalVisible = false" 
    />
  </div>
</template>

<script>
import { getWorkflows, executeWorkflow, deleteWorkflow } from '../services/api';
import Modal from './Modal.vue'; // Importez le composant Modal

export default {
  components: {
    Modal
  },
  data() {
    return {
      workflowId: '',
      status: null,
      errorMessage: null,
      workflows: [],
      isModalVisible: false,
      selectedWorkflow: null, // Pour stocker le workflow sélectionné
      message: null,
    };
  },
  methods: {
    handleMessage(msg) {
      this.message = msg; // Mettre à jour le message
    },
    async executeWorkflow() {
      this.status = null;
      this.errorMessage = null;

      try {
        const response = await executeWorkflow(this.workflowId);
        this.status = response.data.status;
      } catch (error) {
        console.error('Erreur lors de l\'exécution du workflow:', error);
        this.errorMessage = 'Erreur lors de l\'exécution du workflow. Veuillez vérifier l\'ID.';
      }
    },
    async getWorkflows() {
      try {
        const response = await getWorkflows();
        this.workflows = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des workflows:', error);
      }
    },
    showStatusModal(workflow) {
      this.selectedWorkflow = workflow; // Stockez le workflow sélectionné
      this.isModalVisible = true; // Ouvrez le modal
    },
    async deleteWorkflow(workflowId) {
      try {
        await deleteWorkflow(workflowId);
        this.$emit('messageSent', 'Tu as supprimer un workflow!');
        this.getWorkflows(); // Récupérer à nouveau la liste des workflows après suppression
      } catch (error) {
        console.error('Erreur lors de la suppression du workflow:', error);
      }
    },
  },
  mounted() {
    this.getWorkflows(); // Charger les workflows lors du montage du composant
  },
};
</script>

<style scoped>
/* Styles pour le Composant Exécuter un Workflow */
.execute-workflow-container {
  max-width: 800px; /* Largeur maximum du conteneur */
  margin: 50px auto; /* Centrer le conteneur */
  padding: 20px;
  background: white; /* Couleur de fond blanche */
  border-radius: 10px; /* Coins arrondis */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Ombre portée douce */
}

h1 {
  text-align: center; /* Centre le titre principal */
}

form {
  display: flex; /* Utiliser flexbox pour aligner les éléments */
  flex-direction: column; /* Colonne pour les éléments du formulaire */
  margin-bottom: 20px; /* Espace en bas du formulaire */
}

input {
  padding: 10px; /* Espace intérieur de l'input */
  margin: 10px 0; /* Marges au-dessus et en dessous */
  border: 1px solid #ccc; /* Bordure légère */
  border-radius: 5px; /* Coins arrondis */
  width: 100%; /* Prendre toute la largeur */
}

button {
  padding: 10px; /* Espace intérieur du bouton */
  background-color: #007bff; /* Couleur de fond du bouton */
  color: white; /* Couleur du texte du bouton */
  border: none; /* Pas de bordure */
  border-radius: 5px; /* Coins arrondis */
  cursor: pointer; /* Changement du curseur au survol */
}

button:hover {
  background-color: #0056b3; /* Couleur de fond au survol */
}

.error {
  color: red; /* Couleur rouge pour les messages d'erreur */
  text-align: center; /* Centre le message d'erreur */
}

h2 {
  margin-top: 20px; /* Espace au-dessus du titre de la liste */
}

/* Styles pour la liste Name et Id */
ul.workflow-list {
  list-style-type: none; /* Pas de puces */
  padding: 0; /* Pas de padding */
  margin: 20px 0; /* Espacement en haut et en bas de la liste */
  font-family: Arial, sans-serif; /* Police moderne */
}

.workflow-list li {
  display: flex; /* Alignement en ligne des éléments */
  justify-content: space-between; /* Espacement entre les éléments */
  align-items: center; /* Centrage vertical */
  padding: 15px; /* Espace intérieur */
  border: 1px solid #e0e0e0; /* Bordure légère */
  border-radius: 8px; /* Coins arrondis */
  margin-bottom: 10px; /* Espace entre les éléments */
  background-color: #f9f9f9; /* Fond doux */
  transition: box-shadow 0.2s ease; /* Animation douce pour l’ombre */
}

.workflow-list li:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Ombre légère au survol */
}

.workflow-list li span {
  font-weight: 600; /* Met en gras les textes Name et Id */
  color: #333; /* Couleur de texte pour un bon contraste */
}

.workflow-list li button {
  padding: 8px 12px; /* Espacement intérieur des boutons */
  margin-left: 10px; /* Espace entre les boutons */
  border: none; /* Pas de bordure */
  border-radius: 5px; /* Coins arrondis */
  font-size: 14px; /* Taille de police */
  cursor: pointer; /* Curseur en forme de main */
  transition: background-color 0.2s ease; /* Animation douce pour le changement de couleur */
}

.workflow-list li button:hover {
  opacity: 0.9; /* Effet de transparence légère au survol */
}

/* Bouton Vérifier le Statut */
.workflow-list li button:first-of-type {
  background-color: #007bff; /* Bleu pour le bouton de vérification */
  color: #fff; /* Couleur de texte blanc */
}

.workflow-list li button:first-of-type:hover {
  background-color: #0056b3; /* Couleur bleu plus foncé au survol */
}

/* Bouton Supprimer */
.workflow-list li button:last-of-type {
  background-color: #dc3545; /* Rouge pour le bouton de suppression */
  color: #fff; /* Couleur de texte blanc */
}

.workflow-list li button:last-of-type:hover {
  background-color: #c82333; /* Couleur rouge plus foncé au survol */
}


li {
  padding: 10px;
  border: 1px solid #ddd; /* Bordure légère pour les éléments de liste */
  margin-bottom: 10px; /* Espace entre les éléments de liste */
  display: flex; /* Utiliser flexbox pour les éléments de liste */
  justify-content: space-between; /* Espacement entre les éléments */
  align-items: center; /* Centrer verticalement */
}

li button {
  margin-left: 10px; /* Espace entre le texte et le bouton */
}

</style>
