import axios from 'axios';
import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';

import UserModel from '@/models/user-model.js';

export default defineStore('auth', () => {
  /** @type {import('vue').Ref<string?>} */
  const _token = ref(localStorage.getItem('auth-store.token') || null);
  /** @type {import('vue').Ref<UserModel?>} */
  const _user = ref(null);
  const authenticated = computed(() => !!_token.value && !!_user.value);
  const fallback = computed(() => ({name: authenticated.value ? 'overview' : 'login'}));
  const user = computed(() => _user.value);

  /**
   * @param {AbortSignal?} [signal = null]
   * @returns {Promise<string>}
   */
  async function hydrate(signal = null) {
    try {
      const response = await axios.get(
        '/api/auth/user',
        {signal}
      );

      _user.value = new UserModel(response.data.data.user);

      return response.data.message;
    } catch(error) {
      if(!axios.isCancel(error)) {
        throw error;
      }
    }
  }

  /**
   * @param {string} email
   * @param {string} password
   * @param {AbortSignal?} [signal = null]
   * @returns {Promise<string>}
   */
  async function login(email, password, signal = null) {
    try {
      const response = await axios.post(
        '/api/auth/login',
        {email, password},
        {signal}
      );

      _token.value = response.data.data.token;
      _user.value = new UserModel(response.data.data.user);

      return response.data.message;
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
    fallback,
    user,
    hydrate,
    login,
  };
});
