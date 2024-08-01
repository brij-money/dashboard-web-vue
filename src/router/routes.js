import LoginView from '@/views/login.vue';
import NotFoundView from '@/views/not-found.vue';
import OverviewView from '@/views/overview.vue';

export default [
  {
    path: '/',
    name: 'overview',
    component: OverviewView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFoundView,
  },
];
