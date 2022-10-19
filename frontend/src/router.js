import { createWebHistory, createRouter } from 'vue-router';

import Todos from './components/Todos.vue';
import Account from './components/Account.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Todos,
  },
  {
    path: '/account',
    name: 'Account',
    component: Account,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
