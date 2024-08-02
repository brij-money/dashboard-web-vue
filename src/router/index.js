import { createRouter, createWebHistory } from 'vue-router';

import guard from '@/router/guard.js';
import routes from '@/router/routes.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

guard(router);

export default router;
