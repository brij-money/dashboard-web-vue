import axios from 'axios';
import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';

export default defineStore('auth', () => {
  const _token = ref(localStorage.getItem('auth-store.token') || null);
  const _user = ref(null);
  const authenticated = computed(() => !!_token.value && !!_user.value);
  /** @type {import('vue').ComputedRef<User?>} */
  const user = computed(() => _user.value);

  /**
   * @param {string} email
   * @param {string} password
   * @param {AbortSignal?} [signal = null]
   * @param {(message: string) => void|Promise<void>} callback
   */
  async function login(email, password, signal = null, callback = null) {
    try {
      const response = await axios.post(
        '/api/auth/login',
        {email, password},
        {signal}
      );

      _token.value = response.data.data.token;
      _user.value = response.data.data.user;

      await callback?.(response.data.message);
    } catch(error) {
      if(!axios.isCancel(error)) {
        throw error;
      }
    }
  }

  watch(_token, value => {
    if(!!value) {
      localStorage.setItem('auth-store.token', value);
    } else {
      localStorage.removeItem('auth-store.token');
    }
  });

  axios.interceptors.request.use(config => {
    if(!!_token.value) {
      config.headers.Authorization = `Bearer ${_token.value}`;
    }

    return config;
  });
  axios.interceptors.response.use(undefined, error => {
    if(error.response?.status === 401) {
      _token.value = null;
      _user.value = null;
    }

    throw error;
  });

  return {
    authenticated,
    user,
    login,
  };
});
