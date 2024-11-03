<template>
    <div class="file-upload-container">
      <h1>Téléverser un Fichier</h1>
      <form @submit.prevent="uploadFile">
        <input type="file" @change="onFileChange" required />
        <button type="submit">Téléverser</button>
      </form>
  
      <div v-if="uploadResponse">
        <h2>Résultat de l'Upload :</h2>
        <p>{{ uploadResponse.message }}</p>
        <p><strong>Nom du fichier :</strong> {{ uploadResponse.filename }}</p>
      </div>
  
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { upload } from '../services/api';

  export default {
    data() {
      return {
        selectedFile: null, // Le fichier sélectionné
        uploadResponse: null, // La réponse de l'upload
        errorMessage: null,   // Message d'erreur
      };
    },
    methods: {
      onFileChange(event) {
        this.selectedFile = event.target.files[0]; // Assigner le fichier sélectionné
      },
      async uploadFile() {
        if (!this.selectedFile) {
          this.errorMessage = "Veuillez sélectionner un fichier à téléverser.";
          return;
        }
  
        const formData = new FormData();
        formData.append("file", this.selectedFile);
  
        try {
          const response = await axios.post("http://localhost:3000/file", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          this.uploadResponse = response.data; // Stocker la réponse de l'API
          this.errorMessage = null; // Réinitialiser le message d'erreur
        } catch (error) {
          console.error("Erreur lors de l'upload:", error);
          this.errorMessage = "Erreur lors du téléversement du fichier.";
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .file-upload-container {
    max-width: 400px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
    text-align: center;
  }
  
  h1, h2 {
    color: #333;
  }
  
  input[type="file"] {
    margin-bottom: 10px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #218838;
  }
  
  .error {
    color: red;
    margin-top: 10px;
  }
  </style>
  