import axios from 'axios';

import useAuthStore from '@/stores/auth.js';
import useOverlayStore from '@/stores/overlay.js';

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.Accept = 'application/json';
axios.defaults.headers['ngrok-skip-browser-warning'] = 'skip-browser-warning';

const authStore = useAuthStore();
useOverlayStore();

try {
  await authStore.hydrate();
} catch {}
