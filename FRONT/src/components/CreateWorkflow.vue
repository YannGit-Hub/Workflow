<template>
  <div class="create-workflow-container">
    <h1>Créer un Workflow</h1>
    <form @submit.prevent="createWorkflow" class="workflow-form">
      <input type="text" v-model="workflowData.name" placeholder="Nom du workflow" required />
      <input type="text" v-model="workflowData.dataSource" placeholder="Source de données (ex: s3://bucket/dataset.csv)" required />

      <!-- Champs pour ajouter des étapes du workflow -->
      <div v-for="(step, index) in workflowData.steps" :key="index" class="step-input">
        <select v-model="step.step_type" required>
          <option disabled value="">Sélectionnez une étape</option>
          <option value="data_cleaning">Nettoyage des données</option>
          <option value="feature_engineering">Ingénierie des caractéristiques</option>
          <option value="model_training">Entraînement du modèle</option>
        </select>
        <input v-if="step.step_type === 'data_cleaning'" type="text" v-model="step.parameters.method" placeholder="Méthode de nettoyage" />
        <input v-if="step.step_type === 'feature_engineering'" type="text" v-model="step.parameters.techniques" placeholder="Techniques (ex: PCA, scaling)" />
        <input v-if="step.step_type === 'model_training'" type="text" v-model="step.model_type" placeholder="Type de modèle" />
        <button class="remove-step-btn" @click.prevent="removeStep(index)">Supprimer</button>
      </div>

      <button class="add-step-btn" @click.prevent="addStep">Ajouter une étape</button>
      <button type="submit" class="submit-btn">Créer Workflow</button>
    </form>

    <p v-if="workflowId">Workflow créé avec succès ! ID : {{ workflowId }}</p>
  </div>
</template>

<script>
import { ref, reactive } from 'vue';
import { createWorkflow } from '../services/api'; // Adjust to the actual path

export default {
  setup() {
    const workflowData = reactive({
      name: '',
      dataSource: '',
      steps: [{ step_type: '', parameters: {}, model_type: '' }],
    });

    const workflowId = ref(null);

    const createWorkflowFunc = async () => {
      if (!workflowData.name || !workflowData.dataSource) {
        console.error('Nom du workflow et source de données sont requis');
        return;
      }

      try {
        const workflowPayload = {
          name: workflowData.name,
          data_source: workflowData.dataSource,
          steps: workflowData.steps.filter(step => step.step_type),
        };
        
        const response = await createWorkflow(workflowPayload);
        workflowId.value = response.data.workflow_id;
      } catch (error) {
        console.error('Erreur lors de la création du workflow:', error);
      }
    };

    const addStep = () => {
      workflowData.steps.push({ step_type: '', parameters: {}, model_type: '' });
    };

    const removeStep = (index) => {
      workflowData.steps.splice(index, 1);
    };

    return {
      workflowData,
      workflowId,
      createWorkflow: createWorkflowFunc,
      addStep,
      removeStep,
    };
  },
};
</script>

<style scoped>
.create-workflow-container {
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
}

input, select {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.step-input {
  margin: 10px 0;
}

/* Style général du formulaire */
.workflow-form {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Style des champs d'entrée */
.workflow-form input[type="text"], .workflow-form select {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

/* Style du bouton "Ajouter une étape" */
.add-step-btn {
  display: inline-block;
  padding: 10px 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s;
}

.add-step-btn:hover {
  background-color: #45a049;
}

/* Style du bouton "Supprimer" */
.remove-step-btn {
  display: inline-block;
  padding: 8px 12px;
  background-color: #FF4C4C;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 5px;
}

.remove-step-btn:hover {
  background-color: #e64545;
}

/* Style du bouton "Créer Workflow" */
.submit-btn {
  display: inline-block;
  width: 100%;
  padding: 12px 20px;
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #1976d2;
}

</style>
