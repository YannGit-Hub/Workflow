<template>
    <div class="model-training-status-container">
        <h1>Suivi de l'État de l'Entraînement du Modèle</h1>
        <form @submit.prevent="getModelStatus">
            <input type="text" v-model="modelId" placeholder="ID du modèle" required />
            <button type="submit">Vérifier l'État</button>
        </form>

        <div v-if="status">
            <h2>Statut du Modèle : {{ status }}</h2>
            <p>Modèle ID : {{ modelDetails.model_id }}</p>
            <p>Status : {{ modelDetails.status }}</p>
            <h3>Métriques</h3>
            <p>Précision : {{ modelDetails.metrics?.precision }}</p>
            <p>Rappel : {{ modelDetails.metrics?.recall }}</p>
            <p>Exactitude : {{ modelDetails.metrics?.accuracy }}</p>
        </div>

        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
</template>

<script>
import { getModelStatus } from '../services/api'; // Assurez-vous que ce chemin est correct

export default {
    data() {
        return {
            modelId: '',
            modelDetails: null,
            status: null,
            errorMessage: null,
        };
    },
    methods: {
        async getModelStatus() {
            this.errorMessage = null; // Réinitialiser le message d'erreur
            try {
                const response = await getModelStatus(this.modelId);
                this.modelDetails = response.data; // Stocke les détails du modèle
                this.status = true; // Indique que l'état a été récupéré avec succès
            } catch (error) {
                console.error('Erreur lors de la récupération du statut du modèle:', error);
                this.errorMessage = 'Erreur lors de la récupération du statut du modèle. Vérifiez l\'ID du modèle.';
                this.status = false; // Indique une erreur dans la récupération de l'état
            }
        },
    },
};
</script>

<style scoped>
.model-training-status-container {
    max-width: 600px; /* Limite la largeur du conteneur */
    margin: 20px auto; /* Centrer le conteneur avec un margin */
    padding: 20px; /* Espacement interne */
    border: 1px solid #ccc; /* Bordure légère */
    border-radius: 8px; /* Coins arrondis */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Ombre légère pour un effet de profondeur */
    background-color: #f9f9f9; /* Couleur de fond claire */
}

h1 {
    text-align: center; /* Centre le titre principal */
    color: #333; /* Couleur du texte */
}

form {
    display: flex; /* Utilisation de Flexbox pour l'alignement des éléments */
    flex-direction: column; /* Aligne les éléments en colonne */
    gap: 10px; /* Espacement entre les éléments du formulaire */
    margin-bottom: 20px; /* Marge inférieure pour espacer le formulaire du reste du contenu */
}

input[type="text"] {
    padding: 10px; /* Espacement interne */
    border: 1px solid #ccc; /* Bordure légère */
    border-radius: 4px; /* Coins arrondis */
    font-size: 16px; /* Taille de police */
}

button {
    padding: 10px; /* Espacement interne du bouton */
    background-color: #007bff; /* Couleur de fond du bouton */
    color: white; /* Couleur du texte */
    border: none; /* Pas de bordure */
    border-radius: 4px; /* Coins arrondis */
    cursor: pointer; /* Curseur pointer pour indiquer que c'est cliquable */
    font-size: 16px; /* Taille de police */
    transition: background-color 0.3s; /* Transition pour le changement de couleur */
}

button:hover {
    background-color: #0056b3; /* Couleur de fond au survol */
}

h2 {
    margin-top: 20px; /* Marge supérieure pour séparer du formulaire */
    color: #333; /* Couleur du texte */
}

.error {
    color: red; /* Couleur rouge pour les messages d'erreur */
    margin-top: 10px; /* Marge supérieure pour séparer du contenu */
}

h3 {
    margin-top: 20px; /* Marge supérieure pour séparer des titres */
    color: #555; /* Couleur légèrement plus claire que le titre principal */
}
</style>
