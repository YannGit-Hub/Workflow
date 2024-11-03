import { createRouter, createWebHistory } from 'vue-router';
import CreateWorkflow from '../components/CreateWorkflow.vue';
import ExecuteWorkflow from '../components/ExecuteWorkflow.vue';
import ModelTrainingStatus from '../components/ModelTrainingStatus.vue';
import ModelPrediction from '../components/ModelPrediction.vue';
import Upload from '../components/Upload.vue';
import Login from '../components/login.vue';
import Home from '../views/Home.vue'; // Importez votre nouveau composant
import { getCookie } from '../services/cookieService'; // Vérifiez que le chemin est correct

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    //meta: { requiresAuth: true }, // Indique que cette route nécessite une authentification
  },
  {
    path: '/create-workflow',
    name: 'CreateWorkflow',
    component: CreateWorkflow,
   // meta: { requiresAuth: true }, // Indique que cette route nécessite une authentification
  },
  {
    path: '/execute-workflow',
    name: 'ExecuteWorkflow',
    component: ExecuteWorkflow,
  },
  {
    path: '/model-training-status',
    name: 'ModelTrainingStatus',
    component: ModelTrainingStatus,
  },
  {
    path: '/model-prediction',
    name: 'ModelPrediction',
    component: ModelPrediction,
  },
  {
    path: '/upload',
    name: 'Upload',
    component: Upload,
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Middleware pour protéger les routes
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!getCookie('username'); // Vérifiez si l'utilisateur est authentifié via le cookie

  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next('/'); // Rediriger vers la page de connexion si non authentifié
  } else {
    next(); // Continuez vers la route
  }
});

export default router;
