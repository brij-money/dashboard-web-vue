import { authMiddleware, guestMiddleware } from '@/router/middleware.js';
import LoginView from '@/views/login.vue';
import NotFoundView from '@/views/not-found.vue';
import OverviewView from '@/views/overview.vue';

export default [
  {
    path: '/',
    name: 'overview',
    component: OverviewView,
    meta: {
      middleware: [authMiddleware()],
    },
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      middleware: [guestMiddleware()],
    },
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFoundView,
  },
];
