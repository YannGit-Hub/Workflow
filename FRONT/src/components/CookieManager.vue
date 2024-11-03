<template>
    <div v-if="showModal" class="cookie-modal">
      <p>Ce site utilise des cookies pour améliorer votre expérience. Acceptez-vous les cookies ?</p>
      <button @click="acceptCookies">Accepter</button>
      <button @click="declineCookies">Refuser</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        showModal: false,
      };
    },
    mounted() {
      this.checkCookieConsent();
      this.startConsentCheckInterval();
    },
    methods: {
      checkCookieConsent() {
        const consent = this.getCookie("cookieConsent");
        if (consent !== "accepted") {
          this.showModal = true;
        }
      },
      acceptCookies() {
        this.setCookie("cookieConsent", "accepted", 7); // Enregistre le consentement pendant 7 jours
        this.showModal = false;
        clearInterval(this.consentInterval); // Arrête l'intervalle si l'utilisateur accepte
      },
      declineCookies() {
        this.setCookie("cookieConsent", "declined", 0.02); // Expire en 30 secondes
        this.showModal = false;
      },
      startConsentCheckInterval() {
        // Vérifie toutes les 30 secondes si l'utilisateur a refusé
        this.consentInterval = setInterval(() => {
          const consent = this.getCookie("cookieConsent");
          if (consent === "declined") {
            this.showModal = true;
          }
        }, 30000); // 30000 ms = 30 secondes
      },
      setCookie(name, value, days) {
        const expires = new Date(Date.now() + days * 864e5).toUTCString();
        document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
      },
      getCookie(name) {
        return document.cookie.split("; ").reduce((res, c) => {
          const [key, val] = c.split("=");
          return key === name ? decodeURIComponent(val) : res;
        }, "");
      },
    },
    beforeUnmount() {
      clearInterval(this.consentInterval); // Nettoie l'intervalle lors du démontage du composant
    },
  };
  </script>
  
  <style scoped>
  .cookie-modal {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    padding: 20px;
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
  
  button {
    background-color: #007bff;
    color: #fff;
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  