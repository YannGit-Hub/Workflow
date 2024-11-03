<template>
    <div class="modal" v-if="isVisible">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>Statut du Workflow</h2>
        <table>
          <tr>
            <th>ID du Workflow</th>
            <th>Statut</th>
            <th>Étapes</th>
          </tr>
          <tr>
            <td>{{ workflow.id }}</td>
            <td>{{ workflow.status }}</td>
            <td>
              <ul>
                <li v-for="step in workflow.steps" :key="step.step_type">
                  {{ step.step_type }} : {{ step.status }}
                </li>
              </ul>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isVisible: {
        type: Boolean,
        required: true
      },
      workflow: {
        type: Object,
        required: true
      }
    },
    methods: {
      closeModal() {
        this.$emit('close'); // Émet un événement pour fermer le modal
      }
    }
  };
  </script>
  
  <style scoped>
  /* Styles pour le Modal */
/* Styles pour le Modal */
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7); /* Couleur de fond semi-transparente */
  overflow: auto; /* Ajoute un défilement si le contenu est trop grand */
}

.modal-content {
  background: white;
  border-radius: 5px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2); /* Ombre portée douce */
  padding: 20px;
  max-width: 600px; /* Largeur maximum du modal */
  margin: auto; /* Centrer le modal */
  position: relative; /* Position pour le bouton de fermeture */
}

.close {
  color: #aaa;
  float: right; /* Positionne le bouton de fermeture à droite */
  font-size: 28px;
  font-weight: bold;
  cursor: pointer; /* Changement du curseur au survol */
}

.close:hover,
.close:focus {
  color: black; /* Changement de couleur au survol */
  text-decoration: none;
  cursor: pointer;
}

h2 {
  text-align: center; /* Centre le titre du modal */
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}


  </style>
  